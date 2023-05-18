import { Tool } from "./base.js";
declare class DadJokeAPI extends Tool {
    name: string;
    description: string;
    constructor();
    /** @ignore */
    _call(input: string): Promise<string>;
}
export { DadJokeAPI };
