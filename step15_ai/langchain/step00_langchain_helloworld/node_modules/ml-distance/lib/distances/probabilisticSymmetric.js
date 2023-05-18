"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Probabilistic Symmetric distance between vectors a and b
 * @link [Probabilistic Symmetric algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function probabilisticSymmetric(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
    }
    return 2 * d;
}
exports.default = probabilisticSymmetric;
//# sourceMappingURL=probabilisticSymmetric.js.map