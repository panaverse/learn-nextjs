"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Matusita distance between vectors a and b
 * @link [Matusita algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function matusita(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.sqrt(a[i] * b[i]);
    }
    return Math.sqrt(2 - 2 * ans);
}
exports.default = matusita;
//# sourceMappingURL=matusita.js.map