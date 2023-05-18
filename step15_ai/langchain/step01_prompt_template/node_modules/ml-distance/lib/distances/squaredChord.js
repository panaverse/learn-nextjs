"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Squared Chord distance between vectors a and b
 * @link [Squared Chord algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function squaredChord(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) ** 2;
    }
    return ans;
}
exports.default = squaredChord;
//# sourceMappingURL=squaredChord.js.map