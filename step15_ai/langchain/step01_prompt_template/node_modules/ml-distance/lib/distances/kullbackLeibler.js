"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Jensen-Shannon distance between vectors a and b
 * @link [Kullback-Leibler algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function kullbackLeibler(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += a[i] * Math.log(a[i] / b[i]);
    }
    return ans;
}
exports.default = kullbackLeibler;
//# sourceMappingURL=kullbackLeibler.js.map