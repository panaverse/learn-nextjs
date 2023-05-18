"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extname = void 0;
const extname = (path) => `.${path.split(".").pop()}`;
exports.extname = extname;
