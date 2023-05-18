"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const squaredChord_1 = __importDefault(require("../distances/squaredChord"));
/**
 *Returns the Squared-chord distance between vectors a and b
 * @link [Squared-chord algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function squaredChord(a, b) {
    return 1 - (0, squaredChord_1.default)(a, b);
}
exports.default = squaredChord;
//# sourceMappingURL=squaredChord.js.map