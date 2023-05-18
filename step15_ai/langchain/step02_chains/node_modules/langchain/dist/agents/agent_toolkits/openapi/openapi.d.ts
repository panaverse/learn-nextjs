import { BaseLanguageModel } from "../../../base_language/index.js";
import { Tool } from "../../../tools/base.js";
import { JsonSpec } from "../../../tools/json.js";
import { AgentExecutor } from "../../executor.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { Headers } from "../../../tools/requests.js";
export declare class RequestsToolkit extends Toolkit {
    tools: Tool[];
    constructor(headers?: Headers);
}
export declare class OpenApiToolkit extends RequestsToolkit {
    constructor(jsonSpec: JsonSpec, llm: BaseLanguageModel, headers?: Headers);
}
export declare function createOpenApiAgent(llm: BaseLanguageModel, openApiToolkit: OpenApiToolkit, args?: ZeroShotCreatePromptArgs): AgentExecutor;
