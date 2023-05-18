import { AgentActionOutputParser } from "../types.js";
export declare class ChatConversationalAgentOutputParser extends AgentActionOutputParser {
    parse(text: string): Promise<{
        returnValues: {
            output: any;
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
