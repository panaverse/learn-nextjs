/**
 *Returns the Divergence distance between vectors a and b
 * @link [Divergence algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function divergence(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]));
    }
    return 2 * d;
}
//# sourceMappingURL=divergence.js.map