"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const czekanowski_1 = __importDefault(require("../similarities/czekanowski"));
/**
 *Returns the Czekanowski distance between vectors a and b
 * @link [Czekanowski algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function czekanowskiDistance(a, b) {
    return 1 - (0, czekanowski_1.default)(a, b);
}
exports.default = czekanowskiDistance;
//# sourceMappingURL=czekanowski.js.map