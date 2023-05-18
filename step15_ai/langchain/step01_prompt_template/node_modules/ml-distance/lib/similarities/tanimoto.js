"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *Returns the Tanimoto similarity  between vectors p and q, and accepts the bitVector use, see the test case for an example
 * @link [Tanimoto similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 * @param bitvector - bitVector
 *
 */
function tanimoto(a, b, bitvector) {
    if (bitvector) {
        let inter = 0;
        let union = 0;
        for (let j = 0; j < a.length; j++) {
            inter += a[j] && b[j];
            union += a[j] || b[j];
        }
        if (union === 0) {
            return 1;
        }
        return inter / union;
    }
    else {
        let p = 0;
        let q = 0;
        let m = 0;
        for (let i = 0; i < a.length; i++) {
            p += a[i];
            q += b[i];
            m += Math.min(a[i], b[i]);
        }
        return 1 - (p + q - 2 * m) / (p + q - m);
    }
}
exports.default = tanimoto;
//# sourceMappingURL=tanimoto.js.map