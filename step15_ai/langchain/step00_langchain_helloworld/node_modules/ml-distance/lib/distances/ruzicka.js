"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Ruzicka distance between vectors a and b
 * @link [Ruzicka algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
function ruzicka(a, b) {
    let up = 0;
    let down = 0;
    for (let i = 0; i < a.length; i++) {
        up += Math.min(a[i], b[i]);
        down += Math.max(a[i], b[i]);
    }
    return up / down;
}
exports.default = ruzicka;
//# sourceMappingURL=ruzicka.js.map