/**
 *Returns the Jeffreys distance between vectors a and b
 * @link [Jeffreys algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function jeffreys(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
    }
    return ans;
}
//# sourceMappingURL=jeffreys.js.map