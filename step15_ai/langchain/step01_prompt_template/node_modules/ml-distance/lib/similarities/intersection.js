"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const intersection_1 = __importDefault(require("../distances/intersection"));
/**
 *Returns the Intersection similarity distance between vectors a and b
 * @link [Intersection similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function intersection(a, b) {
    return 1 - (0, intersection_1.default)(a, b);
}
exports.default = intersection;
//# sourceMappingURL=intersection.js.map