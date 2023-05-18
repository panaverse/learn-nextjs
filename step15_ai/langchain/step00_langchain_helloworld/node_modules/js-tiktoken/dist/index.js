import { never, Tiktoken, getEncodingNameForModel } from './chunk-HORODD5P.js';
export { Tiktoken, getEncodingNameForModel } from './chunk-HORODD5P.js';
import { cl100k_base_default } from './chunk-H4GMFLYA.js';
import { gpt2_default } from './chunk-F7G2FLS4.js';
import { p50k_base_default } from './chunk-EFS4X6KN.js';
import { p50k_edit_default } from './chunk-BJSHOR2F.js';
import { r50k_base_default } from './chunk-LWEZBMPN.js';
import './chunk-XXPGZHWZ.js';

// src/index.ts
function getEncoding(encoding, extendSpecialTokens) {
  switch (encoding) {
    case "gpt2":
      return new Tiktoken(gpt2_default, extendSpecialTokens);
    case "r50k_base":
      return new Tiktoken(r50k_base_default, extendSpecialTokens);
    case "p50k_base":
      return new Tiktoken(p50k_base_default, extendSpecialTokens);
    case "p50k_edit":
      return new Tiktoken(p50k_edit_default, extendSpecialTokens);
    case "cl100k_base":
      return new Tiktoken(cl100k_base_default, extendSpecialTokens);
    default:
      never(encoding);
      throw new Error("Unknown encoding");
  }
}
function encodingForModel(model, extendSpecialTokens) {
  return getEncoding(getEncodingNameForModel(model), extendSpecialTokens);
}

export { encodingForModel, getEncoding };
