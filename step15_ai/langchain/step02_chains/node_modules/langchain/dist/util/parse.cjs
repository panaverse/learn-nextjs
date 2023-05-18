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
exports.parseFileConfig = exports.loadFileContents = void 0;
const yaml = __importStar(require("yaml"));
const extname_js_1 = require("./extname.cjs");
const loadFileContents = (contents, format) => {
    switch (format) {
        case ".json":
            return JSON.parse(contents);
        case ".yml":
        case ".yaml":
            return yaml.parse(contents);
        default:
            throw new Error(`Unsupported filetype ${format}`);
    }
};
exports.loadFileContents = loadFileContents;
const parseFileConfig = (text, path, supportedTypes) => {
    const suffix = (0, extname_js_1.extname)(path);
    if (![".json", ".yaml"].includes(suffix) ||
        (supportedTypes && !supportedTypes.includes(suffix))) {
        throw new Error(`Unsupported filetype ${suffix}`);
    }
    return (0, exports.loadFileContents)(text, suffix);
};
exports.parseFileConfig = parseFileConfig;
