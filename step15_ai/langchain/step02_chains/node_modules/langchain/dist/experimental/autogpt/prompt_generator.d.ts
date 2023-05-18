import { ObjectTool } from "./schema.js";
export declare class PromptGenerator {
    constraints: string[];
    commands: ObjectTool[];
    resources: string[];
    performance_evaluation: string[];
    response_format: object;
    constructor();
    add_constraint(constraint: string): void;
    add_tool(tool: ObjectTool): void;
    _generate_command_string(tool: ObjectTool): string;
    add_resource(resource: string): void;
    add_performance_evaluation(evaluation: string): void;
    _generate_numbered_list(items: any[], item_type?: string): string;
    generate_prompt_string(): string;
}
export declare function getPrompt(tools: ObjectTool[]): string;
