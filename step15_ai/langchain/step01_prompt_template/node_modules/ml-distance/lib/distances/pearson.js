"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Pearson distance between vectors a and b
 * @link [Pearson algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function pearson(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += ((a[i] - b[i]) * (a[i] - b[i])) / b[i];
    }
    return d;
}
exports.default = pearson;
//# sourceMappingURL=pearson.js.map