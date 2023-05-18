"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = void 0;
const chunkArray = (arr, chunkSize) => arr.reduce((chunks, elem, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    const chunk = chunks[chunkIndex] || [];
    // eslint-disable-next-line no-param-reassign
    chunks[chunkIndex] = chunk.concat([elem]);
    return chunks;
}, []);
exports.chunkArray = chunkArray;
