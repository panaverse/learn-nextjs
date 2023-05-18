type TiktokenEncoding = "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
type TiktokenModel = "text-davinci-003" | "text-davinci-002" | "text-davinci-001" | "text-curie-001" | "text-babbage-001" | "text-ada-001" | "davinci" | "curie" | "babbage" | "ada" | "code-davinci-002" | "code-davinci-001" | "code-cushman-002" | "code-cushman-001" | "davinci-codex" | "cushman-codex" | "text-davinci-edit-001" | "code-davinci-edit-001" | "text-embedding-ada-002" | "text-similarity-davinci-001" | "text-similarity-curie-001" | "text-similarity-babbage-001" | "text-similarity-ada-001" | "text-search-davinci-doc-001" | "text-search-curie-doc-001" | "text-search-babbage-doc-001" | "text-search-ada-doc-001" | "code-search-babbage-code-001" | "code-search-ada-code-001" | "gpt2" | "gpt-3.5-turbo" | "gpt-3.5-turbo-0301" | "gpt-4" | "gpt-4-0314" | "gpt-4-32k" | "gpt-4-32k-0314";

interface TiktokenBPE {
    pat_str: string;
    special_tokens: Record<string, number>;
    bpe_ranks: string;
}
declare class Tiktoken {
    constructor(ranks: TiktokenBPE, extendedSpecialTokens?: Record<string, number>);
    private static specialTokenRegex;
    encode(text: string, allowedSpecial?: Array<string> | "all", disallowedSpecial?: Array<string> | "all"): number[];
    decode(tokens: number[]): string;
}
declare function getEncodingNameForModel(model: TiktokenModel): "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";

export { TiktokenEncoding as T, Tiktoken as a, TiktokenModel as b, TiktokenBPE as c, getEncodingNameForModel as g };
