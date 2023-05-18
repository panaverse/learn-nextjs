"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrompt = exports.PromptGenerator = void 0;
const zod_to_json_schema_1 = require("zod-to-json-schema");
const schema_js_1 = require("./schema.cjs");
class PromptGenerator {
    constructor() {
        Object.defineProperty(this, "constraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "commands", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resources", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "performance_evaluation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response_format", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.constraints = [];
        this.commands = [];
        this.resources = [];
        this.performance_evaluation = [];
        this.response_format = {
            thoughts: {
                text: "thought",
                reasoning: "reasoning",
                plan: "- short bulleted\n- list that conveys\n- long-term plan",
                criticism: "constructive self-criticism",
                speak: "thoughts summary to say to user",
            },
            command: { name: "command name", args: { "arg name": "value" } },
        };
    }
    add_constraint(constraint) {
        this.constraints.push(constraint);
    }
    add_tool(tool) {
        this.commands.push(tool);
    }
    _generate_command_string(tool) {
        let output = `"${tool.name}": ${tool.description}`;
        output += `, args json schema: ${JSON.stringify((0, zod_to_json_schema_1.zodToJsonSchema)(tool.schema).properties)}`;
        return output;
    }
    add_resource(resource) {
        this.resources.push(resource);
    }
    add_performance_evaluation(evaluation) {
        this.performance_evaluation.push(evaluation);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _generate_numbered_list(items, item_type = "list") {
        if (item_type === "command") {
            const command_strings = items.map((item, i) => `${i + 1}. ${this._generate_command_string(item)}`);
            const finish_description = "use this to signal that you have finished all your objectives";
            const finish_args = '"response": "final response to let people know you have finished your objectives"';
            const finish_string = `${items.length + 1}. ${schema_js_1.FINISH_NAME}: ${finish_description}, args: ${finish_args}`;
            return command_strings.concat([finish_string]).join("\n");
        }
        return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
    }
    generate_prompt_string() {
        const formatted_response_format = JSON.stringify(this.response_format, null, 4);
        const prompt_string = `Constraints:\n${this._generate_numbered_list(this.constraints)}\n\n` +
            `Commands:\n${this._generate_numbered_list(this.commands, "command")}\n\n` +
            `Resources:\n${this._generate_numbered_list(this.resources)}\n\n` +
            `Performance Evaluation:\n${this._generate_numbered_list(this.performance_evaluation)}\n\n` +
            `You should only respond in JSON format as described below ` +
            `\nResponse Format: \n${formatted_response_format} ` +
            `\nEnsure the response can be parsed by Python json.loads`;
        return prompt_string;
    }
}
exports.PromptGenerator = PromptGenerator;
function getPrompt(tools) {
    const prompt_generator = new PromptGenerator();
    prompt_generator.add_constraint("~4000 word limit for short term memory. " +
        "Your short term memory is short, " +
        "so immediately save important information to files.");
    prompt_generator.add_constraint("If you are unsure how you previously did something " +
        "or want to recall past events, " +
        "thinking about similar events will help you remember.");
    prompt_generator.add_constraint("No user assistance");
    prompt_generator.add_constraint('Exclusively use the commands listed in double quotes e.g. "command name"');
    for (const tool of tools) {
        prompt_generator.add_tool(tool);
    }
    prompt_generator.add_resource("Internet access for searches and information gathering.");
    prompt_generator.add_resource("Long Term memory management.");
    prompt_generator.add_resource("GPT-3.5 powered Agents for delegation of simple tasks.");
    prompt_generator.add_resource("File output.");
    prompt_generator.add_performance_evaluation("Continuously review and analyze your actions " +
        "to ensure you are performing to the best of your abilities.");
    prompt_generator.add_performance_evaluation("Constructively self-criticize your big-picture behavior constantly.");
    prompt_generator.add_performance_evaluation("Reflect on past decisions and strategies to refine your approach.");
    prompt_generator.add_performance_evaluation("Every command has a cost, so be smart and efficient. " +
        "Aim to complete tasks in the least number of steps.");
    const prompt_string = prompt_generator.generate_prompt_string();
    return prompt_string;
}
exports.getPrompt = getPrompt;
