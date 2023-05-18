"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Topsoe distance between vectors a and b
 * @link [Topsoe algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function topsoe(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans +=
            a[i] * Math.log((2 * a[i]) / (a[i] + b[i])) +
                b[i] * Math.log((2 * b[i]) / (a[i] + b[i]));
    }
    return ans;
}
exports.default = topsoe;
//# sourceMappingURL=topsoe.js.map