import { RecursiveCharacterTextSplitter, } from "../text_splitter.js";
export class BaseDocumentLoader {
    async loadAndSplit(splitter = new RecursiveCharacterTextSplitter()) {
        const docs = await this.load();
        return splitter.splitDocuments(docs);
    }
}
