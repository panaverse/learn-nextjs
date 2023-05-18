"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the K divergence distance between vectors a and b
 * @link [K divergence algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function kdivergence(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += a[i] * Math.log((2 * a[i]) / (a[i] + b[i]));
    }
    return ans;
}
exports.default = kdivergence;
//# sourceMappingURL=kdivergence.js.map