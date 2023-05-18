"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMaxTokens = exports.getModelContextSize = exports.getEmbeddingContextSize = exports.getModelNameForTiktoken = void 0;
const tiktoken_js_1 = require("../util/tiktoken.cjs");
// https://www.npmjs.com/package/js-tiktoken
const getModelNameForTiktoken = (modelName) => {
    if (modelName.startsWith("gpt-3.5-turbo-")) {
        return "gpt-3.5-turbo";
    }
    if (modelName.startsWith("gpt-4-32k-")) {
        return "gpt-4-32k";
    }
    if (modelName.startsWith("gpt-4-")) {
        return "gpt-4";
    }
    return modelName;
};
exports.getModelNameForTiktoken = getModelNameForTiktoken;
const getEmbeddingContextSize = (modelName) => {
    switch (modelName) {
        case "text-embedding-ada-002":
            return 8191;
        default:
            return 2046;
    }
};
exports.getEmbeddingContextSize = getEmbeddingContextSize;
const getModelContextSize = (modelName) => {
    switch ((0, exports.getModelNameForTiktoken)(modelName)) {
        case "gpt-3.5-turbo":
            return 4096;
        case "gpt-4-32k":
            return 32768;
        case "gpt-4":
            return 8192;
        case "text-davinci-003":
            return 4097;
        case "text-curie-001":
            return 2048;
        case "text-babbage-001":
            return 2048;
        case "text-ada-001":
            return 2048;
        case "code-davinci-002":
            return 8000;
        case "code-cushman-001":
            return 2048;
        default:
            return 4097;
    }
};
exports.getModelContextSize = getModelContextSize;
const calculateMaxTokens = async ({ prompt, modelName, }) => {
    // fallback to approximate calculation if tiktoken is not available
    let numTokens = Math.ceil(prompt.length / 4);
    try {
        numTokens = (await (0, tiktoken_js_1.encodingForModel)(modelName)).encode(prompt).length;
    }
    catch (error) {
        console.warn("Failed to calculate number of tokens, falling back to approximate count");
    }
    const maxTokens = (0, exports.getModelContextSize)(modelName);
    return maxTokens - numTokens;
};
exports.calculateMaxTokens = calculateMaxTokens;
