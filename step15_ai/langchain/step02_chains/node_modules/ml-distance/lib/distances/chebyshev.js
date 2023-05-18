"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Chebyshev distance between vectors a and b
 * @link [Chebyshev algorithm](https://en.wikipedia.org/wiki/Chebyshev_distance)
 * @param a - first vector
 * @param b - second vector
 *
 */
function chebyshev(a, b) {
    let max = 0;
    let aux = 0;
    for (let i = 0; i < a.length; i++) {
        aux = Math.abs(a[i] - b[i]);
        if (max < aux) {
            max = aux;
        }
    }
    return max;
}
exports.default = chebyshev;
//# sourceMappingURL=chebyshev.js.map