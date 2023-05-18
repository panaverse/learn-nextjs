"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Intersection distance between vectors a and b
 * @link [Intersection algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function intersection(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.min(a[i], b[i]);
    }
    return 1 - ans;
}
exports.default = intersection;
//# sourceMappingURL=intersection.js.map