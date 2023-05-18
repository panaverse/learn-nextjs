import { AgentActionOutputParser } from "../types.js";
export declare const FINAL_ANSWER_ACTION = "Final Answer:";
export declare class ChatAgentOutputParser extends AgentActionOutputParser {
    parse(text: string): Promise<{
        returnValues: {
            output: string;
        };
        log: string;
        tool?: undefined;
        toolInput?: undefined;
    } | {
        tool: any;
        toolInput: any;
        log: string;
        returnValues?: undefined;
    }>;
    getFormatInstructions(): string;
}
