import { type TiktokenModel } from "js-tiktoken/lite";
export declare const getModelNameForTiktoken: (modelName: string) => TiktokenModel;
export declare const getEmbeddingContextSize: (modelName?: string) => number;
export declare const getModelContextSize: (modelName: string) => number;
interface CalculateMaxTokenProps {
    prompt: string;
    modelName: TiktokenModel;
}
export declare const calculateMaxTokens: ({ prompt, modelName, }: CalculateMaxTokenProps) => Promise<number>;
export {};
