import { DEFAULT_SQL_DATABASE_PROMPT } from "./sql_db_prompt.js";
import { BaseChain } from "../base.js";
import { LLMChain } from "../llm_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { calculateMaxTokens, getModelContextSize, } from "../../base_language/count_tokens.js";
import { getPromptTemplateFromDataSource } from "../../util/sql_utils.js";
export class SqlDatabaseChain extends BaseChain {
    constructor(fields) {
        super(fields);
        // LLM wrapper to use
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // SQL Database to connect to.
        Object.defineProperty(this, "database", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Prompt to use to translate natural language to SQL.
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_SQL_DATABASE_PROMPT
        });
        // Number of results to return from the query
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "result"
        });
        // Whether to return the result of querying the SQL table directly.
        Object.defineProperty(this, "returnDirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.llm = fields.llm;
        this.database = fields.database;
        this.topK = fields.topK ?? this.topK;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.prompt =
            fields.prompt ??
                getPromptTemplateFromDataSource(this.database.appDataSource);
    }
    /** @ignore */
    async _call(values, runManager) {
        const llmChain = new LLMChain({
            prompt: this.prompt,
            llm: this.llm,
            outputKey: this.outputKey,
            memory: this.memory,
        });
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        let inputText = `${question}\nSQLQuery:`;
        const tablesToUse = values.table_names_to_use;
        const tableInfo = await this.database.getTableInfo(tablesToUse);
        const llmInputs = {
            input: inputText,
            top_k: this.topK,
            dialect: this.database.appDataSourceOptions.type,
            table_info: tableInfo,
            stop: ["\nSQLResult:"],
        };
        await this.verifyNumberOfTokens(inputText, tableInfo);
        const intermediateStep = [];
        const sqlCommand = await llmChain.predict(llmInputs, runManager?.getChild());
        intermediateStep.push(sqlCommand);
        let queryResult = "";
        try {
            queryResult = await this.database.appDataSource.query(sqlCommand);
            intermediateStep.push(queryResult);
        }
        catch (error) {
            console.error(error);
        }
        let finalResult;
        if (this.returnDirect) {
            finalResult = { [this.outputKey]: queryResult };
        }
        else {
            inputText += `${sqlCommand}\nSQLResult: ${JSON.stringify(queryResult)}\nAnswer:`;
            llmInputs.input = inputText;
            finalResult = {
                [this.outputKey]: await llmChain.predict(llmInputs, runManager?.getChild()),
            };
        }
        return finalResult;
    }
    _chainType() {
        return "sql_database_chain";
    }
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
    static async deserialize(data, SqlDatabaseFromOptionsParams) {
        const llm = await BaseLanguageModel.deserialize(data.llm);
        const sqlDataBase = await SqlDatabaseFromOptionsParams(data.sql_database);
        return new SqlDatabaseChain({
            llm,
            database: sqlDataBase,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm: this.llm.serialize(),
            sql_database: this.database.serialize(),
        };
    }
    async verifyNumberOfTokens(inputText, tableinfo) {
        // We verify it only for OpenAI for the moment
        if (this.llm._llmType() !== "openai") {
            return;
        }
        const llm = this.llm;
        const promptTemplate = this.prompt.template;
        const stringWeSend = `${inputText}${promptTemplate}${tableinfo}`;
        const maxToken = await calculateMaxTokens({
            prompt: stringWeSend,
            // Cast here to allow for other models that may not fit the union
            modelName: llm.modelName,
        });
        if (maxToken < llm.maxTokens) {
            throw new Error(`The combination of the database structure and your question is too big for the model ${llm.modelName} which can compute only a max tokens of ${getModelContextSize(llm.modelName)}.
      We suggest you to use the includeTables parameters when creating the SqlDatabase object to select only a subset of the tables. You can also use a model which can handle more tokens.`);
        }
    }
}
