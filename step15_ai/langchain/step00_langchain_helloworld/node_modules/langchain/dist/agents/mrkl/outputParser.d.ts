import { OutputParserArgs } from "../agent.js";
import { AgentActionOutputParser } from "../types.js";
export declare const FINAL_ANSWER_ACTION = "Final Answer:";
export declare class ZeroShotAgentOutputParser extends AgentActionOutputParser {
    finishToolName: string;
    constructor(fields?: OutputParserArgs);
    parse(text: string): Promise<{
        returnValues: {
            output: string;
        };
        log: string;
        tool?: undefined;
        toolInput?: undefined;
    } | {
        tool: string;
        toolInput: string;
        log: string;
        returnValues?: undefined;
    }>;
    getFormatInstructions(): string;
}
