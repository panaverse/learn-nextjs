"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Fidelity similarity between vectors a and b
 * @link [Fidelity Similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function fidelity(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.sqrt(a[i] * b[i]);
    }
    return ans;
}
exports.default = fidelity;
//# sourceMappingURL=fidelity.js.map