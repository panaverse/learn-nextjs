import { Embeddings } from "./base.js";
export class FakeEmbeddings extends Embeddings {
    constructor(params) {
        super(params ?? {});
    }
    embedDocuments(documents) {
        return Promise.resolve(documents.map(() => [0.1, 0.2, 0.3, 0.4]));
    }
    embedQuery(_) {
        return Promise.resolve([0.1, 0.2, 0.3, 0.4]);
    }
}
