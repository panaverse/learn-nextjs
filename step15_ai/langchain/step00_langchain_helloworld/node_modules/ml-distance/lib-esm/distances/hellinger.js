/**
 *Returns the Hellinger distance between vectors a and b
 * @link [Hellinger algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function hellinger(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.sqrt(a[i] * b[i]);
    }
    return 2 * Math.sqrt(1 - ans);
}
//# sourceMappingURL=hellinger.js.map