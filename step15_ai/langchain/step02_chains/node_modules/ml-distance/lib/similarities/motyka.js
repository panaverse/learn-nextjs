"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const motyka_1 = __importDefault(require("../distances/motyka"));
/**
 *Returns the Motyka similarity between vectors a and b
 * @link [Motyka algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function motyka(a, b) {
    return 1 - (0, motyka_1.default)(a, b);
}
exports.default = motyka;
//# sourceMappingURL=motyka.js.map