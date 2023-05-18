import tanimotoS from '../similarities/tanimoto';
/**
 *Returns the Tanimoto distance between vectors p and q, and accepts the bitVector use, see the test case for an example
 * @link [Tanimoto algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 * @param bitvector - bitVector
 *
 */
export default function tanimoto(a, b, bitvector) {
    if (bitvector) {
        return 1 - tanimotoS(a, b, bitvector);
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
        return (p + q - 2 * m) / (p + q - m);
    }
}
//# sourceMappingURL=tanimoto.js.map