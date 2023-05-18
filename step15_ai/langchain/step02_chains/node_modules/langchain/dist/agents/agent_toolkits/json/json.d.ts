import { BaseLanguageModel } from "../../../base_language/index.js";
import { Tool } from "../../../tools/base.js";
import { JsonSpec } from "../../../tools/json.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { AgentExecutor } from "../../executor.js";
export declare class JsonToolkit extends Toolkit {
    jsonSpec: JsonSpec;
    tools: Tool[];
    constructor(jsonSpec: JsonSpec);
}
export declare function createJsonAgent(llm: BaseLanguageModel, toolkit: JsonToolkit, args?: ZeroShotCreatePromptArgs): AgentExecutor;
