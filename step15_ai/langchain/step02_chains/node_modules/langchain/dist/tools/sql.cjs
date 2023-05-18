"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCheckerTool = exports.ListTablesSqlTool = exports.InfoSqlTool = exports.QuerySqlTool = void 0;
const base_js_1 = require("./base.cjs");
const openai_js_1 = require("../llms/openai.cjs");
const llm_chain_js_1 = require("../chains/llm_chain.cjs");
const prompt_js_1 = require("../prompts/prompt.cjs");
class QuerySqlTool extends base_js_1.Tool {
    constructor(db) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query-sql"
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Input to this tool is a detailed and correct SQL query, output is a result from the database.
  If the query is not correct, an error message will be returned. 
  If an error is returned, rewrite the query, check the query, and try again.`
        });
        this.db = db;
    }
    /** @ignore */
    async _call(input) {
        try {
            return await this.db.run(input);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.QuerySqlTool = QuerySqlTool;
class InfoSqlTool extends base_js_1.Tool {
    constructor(db) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "info-sql"
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Input to this tool is a comma-separated list of tables, output is the schema and sample rows for those tables.
    Be sure that the tables actually exist by calling list-tables-sql first!
    
    Example Input: "table1, table2, table3.`
        });
        this.db = db;
    }
    /** @ignore */
    async _call(input) {
        try {
            const tables = input.split(",").map((table) => table.trim());
            return await this.db.getTableInfo(tables);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.InfoSqlTool = InfoSqlTool;
class ListTablesSqlTool extends base_js_1.Tool {
    constructor(db) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "list-tables-sql"
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Input is an empty string, output is a comma separated list of tables in the database.`
        });
        this.db = db;
    }
    /** @ignore */
    async _call(_) {
        try {
            const tables = this.db.allTables.map((table) => table.tableName);
            return tables.join(", ");
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.ListTablesSqlTool = ListTablesSqlTool;
class QueryCheckerTool extends base_js_1.Tool {
    constructor(llmChain) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query-checker"
        });
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `
    {query}
Double check the sqlite query above for common mistakes, including:
- Using NOT IN with NULL values
- Using UNION when UNION ALL should have been used
- Using BETWEEN for exclusive ranges
- Data type mismatch in predicates
- Properly quoting identifiers
- Using the correct number of arguments for functions
- Casting to the correct data type
- Using the proper columns for joins

If there are any of the above mistakes, rewrite the query. If there are no mistakes, just reproduce the original query.`
        });
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Use this tool to double check if your query is correct before executing it.
    Always use this tool before executing a query with query-sql!`
        });
        if (llmChain) {
            this.llmChain = llmChain;
        }
        else {
            const model = new openai_js_1.OpenAI({ temperature: 0 });
            const prompt = new prompt_js_1.PromptTemplate({
                template: this.template,
                inputVariables: ["query"],
            });
            this.llmChain = new llm_chain_js_1.LLMChain({ llm: model, prompt });
        }
    }
    /** @ignore */
    async _call(input) {
        return this.llmChain.predict({ query: input });
    }
}
exports.QueryCheckerTool = QueryCheckerTool;
