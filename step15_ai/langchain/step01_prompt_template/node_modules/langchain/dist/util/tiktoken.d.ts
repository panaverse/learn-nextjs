import { Tiktoken, TiktokenEncoding, TiktokenModel } from "js-tiktoken/lite";
export declare function getEncoding(encoding: TiktokenEncoding, options?: {
    signal?: AbortSignal;
    extendedSpecialTokens?: Record<string, number>;
}): Promise<Tiktoken>;
export declare function encodingForModel(model: TiktokenModel, options?: {
    signal?: AbortSignal;
    extendedSpecialTokens?: Record<string, number>;
}): Promise<Tiktoken>;
