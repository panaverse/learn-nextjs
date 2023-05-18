import { DynamicTool, DynamicToolInput } from "./dynamic.js";
interface LambdaConfig {
    functionName: string;
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
}
declare class AWSLambda extends DynamicTool {
    private lambdaConfig;
    constructor({ name, description, ...rest }: LambdaConfig & Omit<DynamicToolInput, "func">);
    /** @ignore */
    _func(input: string): Promise<string>;
}
export { AWSLambda };
