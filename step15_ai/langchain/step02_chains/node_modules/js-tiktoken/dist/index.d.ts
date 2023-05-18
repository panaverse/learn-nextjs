import { T as TiktokenEncoding, a as Tiktoken, b as TiktokenModel } from './core-0e8c0717.js';
export { c as TiktokenBPE, g as getEncodingNameForModel } from './core-0e8c0717.js';

declare function getEncoding(encoding: TiktokenEncoding, extendSpecialTokens?: Record<string, number>): Tiktoken;
declare function encodingForModel(model: TiktokenModel, extendSpecialTokens?: Record<string, number>): Tiktoken;

export { Tiktoken, TiktokenEncoding, TiktokenModel, encodingForModel, getEncoding };
