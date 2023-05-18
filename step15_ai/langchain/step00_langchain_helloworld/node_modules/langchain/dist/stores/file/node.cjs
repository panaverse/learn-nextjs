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
exports.NodeFileStore = void 0;
const fs = __importStar(require("node:fs/promises"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const index_js_1 = require("../../schema/index.cjs");
class NodeFileStore extends index_js_1.BaseFileStore {
    constructor(basePath = (0, node_fs_1.mkdtempSync)("langchain-")) {
        super();
        Object.defineProperty(this, "basePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: basePath
        });
    }
    async readFile(path) {
        return await fs.readFile((0, node_path_1.join)(this.basePath, path), "utf8");
    }
    async writeFile(path, contents) {
        await fs.writeFile((0, node_path_1.join)(this.basePath, path), contents, "utf8");
    }
}
exports.NodeFileStore = NodeFileStore;
