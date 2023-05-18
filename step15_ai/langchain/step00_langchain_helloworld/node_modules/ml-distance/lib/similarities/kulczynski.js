"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kulczynski_1 = __importDefault(require("../distances/kulczynski"));
/**
 *Returns the Kulczynski similarity between vectors a and b
 * @link [Kulczinski algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function kulczynski(a, b) {
    return 1 / (0, kulczynski_1.default)(a, b);
}
exports.default = kulczynski;
//# sourceMappingURL=kulczynski.js.map