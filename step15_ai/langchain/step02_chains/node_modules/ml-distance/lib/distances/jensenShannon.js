"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Jensen-Shannon distance between vectors a and b
 * @link [Jensen-Shannon algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function jensenShannon(a, b) {
    let p = 0;
    let q = 0;
    for (let i = 0; i < a.length; i++) {
        p += a[i] * Math.log((2 * a[i]) / (a[i] + b[i]));
        q += b[i] * Math.log((2 * b[i]) / (a[i] + b[i]));
    }
    return (p + q) / 2;
}
exports.default = jensenShannon;
//# sourceMappingURL=jensenShannon.js.map