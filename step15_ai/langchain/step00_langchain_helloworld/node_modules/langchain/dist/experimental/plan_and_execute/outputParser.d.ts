import { BaseOutputParser } from "../../schema/output_parser.js";
import { Plan } from "./base.js";
export declare class PlanOutputParser extends BaseOutputParser<Plan> {
    constructor();
    parse(text: string): Promise<Plan>;
    getFormatInstructions(): string;
}
