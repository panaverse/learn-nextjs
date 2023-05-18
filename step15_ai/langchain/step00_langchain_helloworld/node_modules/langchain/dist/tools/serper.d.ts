import { Tool } from "./base.js";
export type SerperParameters = {
    gl?: string;
    hl?: string;
};
/**
 * Wrapper around serper.
 *
 * You can create a free API key at https://serper.dev.
 *
 * To use, you should have the SERPER_API_KEY environment variable set.
 */
export declare class Serper extends Tool {
    protected key: string;
    protected params: Partial<SerperParameters>;
    constructor(apiKey?: string | undefined, params?: Partial<SerperParameters>);
    name: string;
    /** @ignore */
    _call(input: string): Promise<any>;
    description: string;
}
