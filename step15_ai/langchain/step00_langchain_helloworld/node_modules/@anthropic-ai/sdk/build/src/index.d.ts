export type SamplingParameters = {
    prompt: string;
    temperature?: number;
    max_tokens_to_sample: number;
    stop_sequences: string[];
    top_k?: number;
    top_p?: number;
    model: string;
    tags?: {
        [key: string]: string;
    };
};
export type OnOpen = (response: Response) => void | Promise<void>;
export type OnUpdate = (completion: CompletionResponse) => void | Promise<void>;
export declare const HUMAN_PROMPT = "\n\nHuman:";
export declare const AI_PROMPT = "\n\nAssistant:";
export type CompletionResponse = {
    completion: string;
    stop: string | null;
    stop_reason: "stop_sequence" | "max_tokens";
    truncated: boolean;
    exception: string | null;
    log_id: string;
};
export declare class Client {
    private apiKey;
    private apiUrl;
    constructor(apiKey: string, options?: {
        apiUrl?: string;
    });
    complete(params: SamplingParameters, options?: {
        signal?: AbortSignal;
    }): Promise<CompletionResponse>;
    completeStream(params: SamplingParameters, { onOpen, onUpdate, signal, }: {
        onOpen?: OnOpen;
        onUpdate?: OnUpdate;
        signal?: AbortSignal;
    }): Promise<CompletionResponse>;
}
