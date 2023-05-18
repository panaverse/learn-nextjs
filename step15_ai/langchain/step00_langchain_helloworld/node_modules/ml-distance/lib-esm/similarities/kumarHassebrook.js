/**
 *Returns Kumar-Hassebrook similarity between vectors a and b
 * @link [Kumar-Hassebrook Similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function kumarHassebrook(a, b) {
    let p = 0;
    let p2 = 0;
    let q2 = 0;
    for (let i = 0; i < a.length; i++) {
        p += a[i] * b[i];
        p2 += a[i] * a[i];
        q2 += b[i] * b[i];
    }
    return p / (p2 + q2 - p);
}
//# sourceMappingURL=kumarHassebrook.js.map