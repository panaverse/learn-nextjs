"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ml_array_mean_1 = __importDefault(require("ml-array-mean"));
const cosine_1 = __importDefault(require("./cosine"));
function pearson(a, b) {
    let avgA = (0, ml_array_mean_1.default)(a);
    let avgB = (0, ml_array_mean_1.default)(b);
    let newA = new Array(a.length);
    let newB = new Array(b.length);
    for (let i = 0; i < newA.length; i++) {
        newA[i] = a[i] - avgA;
        newB[i] = b[i] - avgB;
    }
    return (0, cosine_1.default)(newA, newB);
}
exports.default = pearson;
//# sourceMappingURL=pearson.js.map