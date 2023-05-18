"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kumarHassebrook_1 = __importDefault(require("../similarities/kumarHassebrook"));
/**
 *Returns Jaccard distance between vectors a and b
 * @link [Jaccard algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function jaccard(a, b) {
    return 1 - (0, kumarHassebrook_1.default)(a, b);
}
exports.default = jaccard;
//# sourceMappingURL=jaccard.js.map