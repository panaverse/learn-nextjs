"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Bhattacharyy distance between vectors a and b
 * @link [Bhattacharyy algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function bhattacharyya(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.sqrt(a[i] * b[i]);
    }
    return -Math.log(ans);
}
exports.default = bhattacharyya;
//# sourceMappingURL=bhattacharyya.js.map