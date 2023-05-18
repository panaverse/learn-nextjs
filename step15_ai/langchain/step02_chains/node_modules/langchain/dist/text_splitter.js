import { Document } from "./document.js";
import { getEncoding } from "./util/tiktoken.js";
export class TextSplitter {
    constructor(fields) {
        Object.defineProperty(this, "chunkSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        Object.defineProperty(this, "chunkOverlap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 200
        });
        this.chunkSize = fields?.chunkSize ?? this.chunkSize;
        this.chunkOverlap = fields?.chunkOverlap ?? this.chunkOverlap;
        if (this.chunkOverlap >= this.chunkSize) {
            throw new Error("Cannot have chunkOverlap >= chunkSize");
        }
    }
    async createDocuments(texts, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadatas = []) {
        const _metadatas = metadatas.length > 0 ? metadatas : new Array(texts.length).fill({});
        const documents = new Array();
        for (let i = 0; i < texts.length; i += 1) {
            const text = texts[i];
            let lineCounterIndex = 1;
            let prevChunk = null;
            for (const chunk of await this.splitText(text)) {
                // we need to count the \n that are in the text before getting removed by the splitting
                let numberOfIntermediateNewLines = 0;
                if (prevChunk) {
                    const indexChunk = text.indexOf(chunk);
                    const indexEndPrevChunk = text.indexOf(prevChunk) + prevChunk.length;
                    const removedNewlinesFromSplittingText = text.slice(indexEndPrevChunk, indexChunk);
                    numberOfIntermediateNewLines = (removedNewlinesFromSplittingText.match(/\n/g) || []).length;
                }
                lineCounterIndex += numberOfIntermediateNewLines;
                const newLinesCount = (chunk.match(/\n/g) || []).length;
                const loc = _metadatas[i].loc && typeof _metadatas[i].loc === "object"
                    ? { ..._metadatas[i].loc }
                    : {};
                loc.lines = {
                    from: lineCounterIndex,
                    to: lineCounterIndex + newLinesCount,
                };
                const metadataWithLinesNumber = {
                    ..._metadatas[i],
                    loc,
                };
                documents.push(new Document({
                    pageContent: chunk,
                    metadata: metadataWithLinesNumber,
                }));
                lineCounterIndex += newLinesCount;
                prevChunk = chunk;
            }
        }
        return documents;
    }
    async splitDocuments(documents) {
        const selectedDocuments = documents.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);
        const metadatas = selectedDocuments.map((doc) => doc.metadata);
        return this.createDocuments(texts, metadatas);
    }
    joinDocs(docs, separator) {
        const text = docs.join(separator).trim();
        return text === "" ? null : text;
    }
    mergeSplits(splits, separator) {
        const docs = [];
        const currentDoc = [];
        let total = 0;
        for (const d of splits) {
            const _len = d.length;
            if (total + _len >= this.chunkSize) {
                if (total > this.chunkSize) {
                    console.warn(`Created a chunk of size ${total}, +
which is longer than the specified ${this.chunkSize}`);
                }
                if (currentDoc.length > 0) {
                    const doc = this.joinDocs(currentDoc, separator);
                    if (doc !== null) {
                        docs.push(doc);
                    }
                    // Keep on popping if:
                    // - we have a larger chunk than in the chunk overlap
                    // - or if we still have any chunks and the length is long
                    while (total > this.chunkOverlap ||
                        (total + _len > this.chunkSize && total > 0)) {
                        total -= currentDoc[0].length;
                        currentDoc.shift();
                    }
                }
            }
            currentDoc.push(d);
            total += _len;
        }
        const doc = this.joinDocs(currentDoc, separator);
        if (doc !== null) {
            docs.push(doc);
        }
        return docs;
    }
}
export class CharacterTextSplitter extends TextSplitter {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "separator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "\n\n"
        });
        this.separator = fields?.separator ?? this.separator;
    }
    async splitText(text) {
        // First we naively split the large input into a bunch of smaller ones.
        let splits;
        if (this.separator) {
            splits = text.split(this.separator);
        }
        else {
            splits = text.split("");
        }
        return this.mergeSplits(splits, this.separator);
    }
}
export class RecursiveCharacterTextSplitter extends TextSplitter {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "separators", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["\n\n", "\n", " ", ""]
        });
        this.separators = fields?.separators ?? this.separators;
    }
    async splitText(text) {
        const finalChunks = [];
        // Get appropriate separator to use
        let separator = this.separators[this.separators.length - 1];
        for (const s of this.separators) {
            if (s === "") {
                separator = s;
                break;
            }
            if (text.includes(s)) {
                separator = s;
                break;
            }
        }
        // Now that we have the separator, split the text
        let splits;
        if (separator) {
            splits = text.split(separator);
        }
        else {
            splits = text.split("");
        }
        // Now go merging things, recursively splitting longer texts.
        let goodSplits = [];
        for (const s of splits) {
            if (s.length < this.chunkSize) {
                goodSplits.push(s);
            }
            else {
                if (goodSplits.length) {
                    const mergedText = this.mergeSplits(goodSplits, separator);
                    finalChunks.push(...mergedText);
                    goodSplits = [];
                }
                const otherInfo = await this.splitText(s);
                finalChunks.push(...otherInfo);
            }
        }
        if (goodSplits.length) {
            const mergedText = this.mergeSplits(goodSplits, separator);
            finalChunks.push(...mergedText);
        }
        return finalChunks;
    }
}
/**
 * Implementation of splitter which looks at tokens.
 */
export class TokenTextSplitter extends TextSplitter {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "encodingName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "allowedSpecial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "disallowedSpecial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tokenizer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.encodingName = fields?.encodingName ?? "gpt2";
        this.allowedSpecial = fields?.allowedSpecial ?? [];
        this.disallowedSpecial = fields?.disallowedSpecial ?? "all";
    }
    async splitText(text) {
        if (!this.tokenizer) {
            this.tokenizer = await getEncoding(this.encodingName);
        }
        const splits = [];
        const input_ids = this.tokenizer.encode(text, this.allowedSpecial, this.disallowedSpecial);
        let start_idx = 0;
        let cur_idx = Math.min(start_idx + this.chunkSize, input_ids.length);
        let chunk_ids = input_ids.slice(start_idx, cur_idx);
        while (start_idx < input_ids.length) {
            splits.push(this.tokenizer.decode(chunk_ids));
            start_idx += this.chunkSize - this.chunkOverlap;
            cur_idx = Math.min(start_idx + this.chunkSize, input_ids.length);
            chunk_ids = input_ids.slice(start_idx, cur_idx);
        }
        return splits;
    }
}
export class MarkdownTextSplitter extends RecursiveCharacterTextSplitter {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "separators", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                // First, try to split along Markdown headings (starting with level 2)
                "\n## ",
                "\n### ",
                "\n#### ",
                "\n##### ",
                "\n###### ",
                // Note the alternative syntax for headings (below) is not handled here
                // Heading level 2
                // ---------------
                // End of code block
                "```\n\n",
                // Horizontal lines
                "\n\n***\n\n",
                "\n\n---\n\n",
                "\n\n___\n\n",
                // Note that this splitter doesn't handle horizontal lines defined
                // by *three or more* of ***, ---, or ___, but this is not handled
                "\n\n",
                "\n",
                " ",
                "",
            ]
        });
    }
}
