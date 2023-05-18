"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the Minkowski distance between vectors a and b for order p
 * @link [Minkowski algorithm](https://en.wikipedia.org/wiki/Minkowski_distance)
 * @param a - first vector
 * @param b - second vector
 * @param p - number of order
 *
 */
function minkowski(a, b, p) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += Math.abs(a[i] - b[i]) ** p;
    }
    return d ** (1 / p);
}
exports.default = minkowski;
//# sourceMappingURL=minkowski.js.map