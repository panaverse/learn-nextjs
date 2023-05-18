"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Divergence distance between vectors a and b
 * @link [Divergence algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function divergence(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]));
    }
    return 2 * d;
}
exports.default = divergence;
//# sourceMappingURL=divergence.js.map