"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRTLoader = void 0;
const text_js_1 = require("./text.cjs");
class SRTLoader extends text_js_1.TextLoader {
    constructor(filePathOrBlob) {
        super(filePathOrBlob);
    }
    async parse(raw) {
        const { SRTParser2 } = await SRTLoaderImports();
        const parser = new SRTParser2();
        const srts = parser.fromSrt(raw);
        return [
            srts
                .map((srt) => srt.text)
                .filter(Boolean)
                .join(" "),
        ];
    }
}
exports.SRTLoader = SRTLoader;
async function SRTLoaderImports() {
    try {
        const SRTParser2 = (await import("srt-parser-2")).default.default;
        return { SRTParser2 };
    }
    catch (e) {
        throw new Error("Please install srt-parser-2 as a dependency with, e.g. `yarn add srt-parser-2`");
    }
}
