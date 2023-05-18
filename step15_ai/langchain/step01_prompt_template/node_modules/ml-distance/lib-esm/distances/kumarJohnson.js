/**
 *Returns the Kumar-Johnson distance between vectors a and b
 * @link [Kumar-Johnson algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function kumarJohnson(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += (a[i] * a[i] - b[i] * b[i]) ** 2 / (2 * (a[i] * b[i]) ** 1.5);
    }
    return ans;
}
//# sourceMappingURL=kumarJohnson.js.map