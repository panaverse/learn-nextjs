"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the Kulczynski distance between vectors a and b
 * @link [Kulczynski algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function kulczynski(a, b) {
    let up = 0;
    let down = 0;
    for (let i = 0; i < a.length; i++) {
        up += Math.abs(a[i] - b[i]);
        down += Math.min(a[i], b[i]);
    }
    return up / down;
}
exports.default = kulczynski;
//# sourceMappingURL=kulczynski.js.map