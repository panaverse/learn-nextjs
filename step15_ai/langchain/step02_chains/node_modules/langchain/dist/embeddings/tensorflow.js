import { load } from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-core";
import { Embeddings } from "./base.js";
export class TensorFlowEmbeddings extends Embeddings {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "_cached", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        try {
            tf.backend();
        }
        catch (e) {
            throw new Error("No TensorFlow backend found, see instructions at ...");
        }
    }
    async load() {
        if (this._cached === undefined) {
            this._cached = load();
        }
        return this._cached;
    }
    _embed(texts) {
        return this.caller.call(async () => {
            const model = await this.load();
            return model.embed(texts);
        });
    }
    embedQuery(document) {
        return this._embed([document])
            .then((embeddings) => embeddings.array())
            .then((embeddings) => embeddings[0]);
    }
    embedDocuments(documents) {
        return this._embed(documents).then((embeddings) => embeddings.array());
    }
}
