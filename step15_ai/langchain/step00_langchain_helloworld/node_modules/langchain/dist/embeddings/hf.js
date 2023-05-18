import { HfInference } from "@huggingface/inference";
import { Embeddings } from "./base.js";
export class HuggingFaceInferenceEmbeddings extends Embeddings {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model =
            fields?.model ?? "sentence-transformers/distilbert-base-nli-mean-tokens";
        this.apiKey =
            fields?.apiKey ??
                (typeof process !== "undefined"
                    ? // eslint-disable-next-line no-process-env
                        process.env?.HUGGINGFACEHUB_API_KEY
                    : undefined);
        this.client = new HfInference(this.apiKey);
    }
    async _embed(texts) {
        // replace newlines, which can negatively affect performance.
        const clean = texts.map((text) => text.replace(/\n/g, " "));
        return this.caller.call(() => this.client.featureExtraction({
            model: this.model,
            inputs: clean,
        }));
    }
    embedQuery(document) {
        return this._embed([document]).then((embeddings) => embeddings[0]);
    }
    embedDocuments(documents) {
        return this._embed(documents);
    }
}
