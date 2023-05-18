import { AIChatMessage, BasePromptValue, ChatMessage, HumanChatMessage, SystemChatMessage, } from "../schema/index.js";
import { BasePromptTemplate, } from "./base.js";
import { PromptTemplate } from "./prompt.js";
export class BaseMessagePromptTemplate {
    serialize() {
        return {
            _type: this.constructor.name,
            ...JSON.parse(JSON.stringify(this)),
        };
    }
}
export class ChatPromptValue extends BasePromptValue {
    constructor(messages) {
        super();
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.messages = messages;
    }
    toString() {
        return JSON.stringify(this.messages);
    }
    toChatMessages() {
        return this.messages;
    }
}
export class MessagesPlaceholder extends BaseMessagePromptTemplate {
    constructor(variableName) {
        super();
        Object.defineProperty(this, "variableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.variableName = variableName;
    }
    get inputVariables() {
        return [this.variableName];
    }
    formatMessages(values) {
        return Promise.resolve(values[this.variableName]);
    }
}
export class BaseMessageStringPromptTemplate extends BaseMessagePromptTemplate {
    constructor(prompt) {
        super();
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = prompt;
    }
    get inputVariables() {
        return this.prompt.inputVariables;
    }
    async formatMessages(values) {
        return [await this.format(values)];
    }
}
export class BaseChatPromptTemplate extends BasePromptTemplate {
    constructor(input) {
        super(input);
    }
    async format(values) {
        return (await this.formatPromptValue(values)).toString();
    }
    async formatPromptValue(values) {
        const resultMessages = await this.formatMessages(values);
        return new ChatPromptValue(resultMessages);
    }
}
export class ChatMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new ChatMessage(await this.prompt.format(values), this.role);
    }
    constructor(prompt, role) {
        super(prompt);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = role;
    }
    static fromTemplate(template, role) {
        return new this(PromptTemplate.fromTemplate(template), role);
    }
}
export class HumanMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new HumanChatMessage(await this.prompt.format(values));
    }
    constructor(prompt) {
        super(prompt);
    }
    static fromTemplate(template) {
        return new this(PromptTemplate.fromTemplate(template));
    }
}
export class AIMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new AIChatMessage(await this.prompt.format(values));
    }
    constructor(prompt) {
        super(prompt);
    }
    static fromTemplate(template) {
        return new this(PromptTemplate.fromTemplate(template));
    }
}
export class SystemMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    async format(values) {
        return new SystemChatMessage(await this.prompt.format(values));
    }
    constructor(prompt) {
        super(prompt);
    }
    static fromTemplate(template) {
        return new this(PromptTemplate.fromTemplate(template));
    }
}
export class ChatPromptTemplate extends BaseChatPromptTemplate {
    constructor(input) {
        super(input);
        Object.defineProperty(this, "promptMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.validateTemplate) {
            const inputVariablesMessages = new Set();
            for (const promptMessage of this.promptMessages) {
                for (const inputVariable of promptMessage.inputVariables) {
                    inputVariablesMessages.add(inputVariable);
                }
            }
            const inputVariablesInstance = new Set(this.partialVariables
                ? this.inputVariables.concat(Object.keys(this.partialVariables))
                : this.inputVariables);
            const difference = new Set([...inputVariablesInstance].filter((x) => !inputVariablesMessages.has(x)));
            if (difference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...difference,
                ]}\` are not used in any of the prompt messages.`);
            }
            const otherDifference = new Set([...inputVariablesMessages].filter((x) => !inputVariablesInstance.has(x)));
            if (otherDifference.size > 0) {
                throw new Error(`Input variables \`${[
                    ...otherDifference,
                ]}\` are used in prompt messages but not in the prompt template.`);
            }
        }
    }
    _getPromptType() {
        return "chat";
    }
    async formatMessages(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        let resultMessages = [];
        for (const promptMessage of this.promptMessages) {
            const inputValues = promptMessage.inputVariables.reduce((acc, inputVariable) => {
                if (!(inputVariable in allValues)) {
                    throw new Error(`Missing value for input variable \`${inputVariable}\``);
                }
                acc[inputVariable] = allValues[inputVariable];
                return acc;
            }, {});
            const message = await promptMessage.formatMessages(inputValues);
            resultMessages = resultMessages.concat(message);
        }
        return resultMessages;
    }
    serialize() {
        if (this.outputParser !== undefined) {
            throw new Error("ChatPromptTemplate cannot be serialized if outputParser is set");
        }
        return {
            input_variables: this.inputVariables,
            prompt_messages: this.promptMessages.map((m) => m.serialize()),
        };
    }
    async partial(values) {
        // This is implemented in a way it doesn't require making
        // BaseMessagePromptTemplate aware of .partial()
        const promptDict = { ...this };
        promptDict.inputVariables = this.inputVariables.filter((iv) => !(iv in values));
        promptDict.partialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        return new ChatPromptTemplate(promptDict);
    }
    static fromPromptMessages(promptMessages) {
        const flattenedMessages = promptMessages.reduce((acc, promptMessage) => acc.concat(
        // eslint-disable-next-line no-instanceof/no-instanceof
        promptMessage instanceof ChatPromptTemplate
            ? promptMessage.promptMessages
            : [promptMessage]), []);
        const flattenedPartialVariables = promptMessages.reduce((acc, promptMessage) => 
        // eslint-disable-next-line no-instanceof/no-instanceof
        promptMessage instanceof ChatPromptTemplate
            ? Object.assign(acc, promptMessage.partialVariables)
            : acc, Object.create(null));
        const inputVariables = new Set();
        for (const promptMessage of flattenedMessages) {
            for (const inputVariable of promptMessage.inputVariables) {
                if (inputVariable in flattenedPartialVariables) {
                    continue;
                }
                inputVariables.add(inputVariable);
            }
        }
        return new ChatPromptTemplate({
            inputVariables: [...inputVariables],
            promptMessages: flattenedMessages,
            partialVariables: flattenedPartialVariables,
        });
    }
}
