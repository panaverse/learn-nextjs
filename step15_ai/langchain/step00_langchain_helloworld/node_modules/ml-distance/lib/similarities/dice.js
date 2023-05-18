"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dice_1 = __importDefault(require("../distances/dice"));
/**
 *Returns the Dice similarity between vectors a and b
 * @link [Dice similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function dice(a, b) {
    return 1 - (0, dice_1.default)(a, b);
}
exports.default = dice;
//# sourceMappingURL=dice.js.map