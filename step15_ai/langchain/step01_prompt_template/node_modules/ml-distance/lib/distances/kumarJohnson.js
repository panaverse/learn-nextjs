"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Kumar-Johnson distance between vectors a and b
 * @link [Kumar-Johnson algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function kumarJohnson(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += (a[i] * a[i] - b[i] * b[i]) ** 2 / (2 * (a[i] * b[i]) ** 1.5);
    }
    return ans;
}
exports.default = kumarJohnson;
//# sourceMappingURL=kumarJohnson.js.map