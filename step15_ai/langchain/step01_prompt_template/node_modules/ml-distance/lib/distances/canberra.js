"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the Canberra distance between vectors a and b
 * @link [Canberra algorithm](https://en.wikipedia.org/wiki/Canberra_distance)
 * @param a - first vector
 * @param b - second vector
 *
 */
function canberra(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
    }
    return ans;
}
exports.default = canberra;
//# sourceMappingURL=canberra.js.map