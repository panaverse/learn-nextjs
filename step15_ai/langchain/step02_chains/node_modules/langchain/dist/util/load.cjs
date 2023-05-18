"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromFile = void 0;
const loadFromFile = async (uri, loader, values = {}) => {
    try {
        const fs = await import("node:fs/promises");
        return loader(await fs.readFile(uri, { encoding: "utf-8" }), uri, values);
    }
    catch (e) {
        console.error(e);
        throw new Error(`Could not load file at ${uri}`);
    }
};
exports.loadFromFile = loadFromFile;
