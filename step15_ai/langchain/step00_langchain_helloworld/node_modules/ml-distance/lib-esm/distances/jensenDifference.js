/**
 *Returns the Jensen difference distance between vectors a and b
 * @link [Jensen difference algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function jensenDifference(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans +=
            (a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2 -
                ((a[i] + b[i]) / 2) * Math.log((a[i] + b[i]) / 2);
    }
    return ans;
}
//# sourceMappingURL=jensenDifference.js.map