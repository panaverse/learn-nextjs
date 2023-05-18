/**
 *Returns the Taneja distance between vectors a and b
 * @link [Taneja algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function taneja(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans +=
            ((a[i] + b[i]) / 2) *
                Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
    }
    return ans;
}
//# sourceMappingURL=taneja.js.map