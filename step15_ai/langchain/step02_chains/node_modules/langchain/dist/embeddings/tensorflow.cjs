"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TensorFlowEmbeddings = void 0;
const universal_sentence_encoder_1 = require("@tensorflow-models/universal-sentence-encoder");
const tf = __importStar(require("@tensorflow/tfjs-core"));
const base_js_1 = require("./base.cjs");
class TensorFlowEmbeddings extends base_js_1.Embeddings {
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
            this._cached = (0, universal_sentence_encoder_1.load)();
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
exports.TensorFlowEmbeddings = TensorFlowEmbeddings;
