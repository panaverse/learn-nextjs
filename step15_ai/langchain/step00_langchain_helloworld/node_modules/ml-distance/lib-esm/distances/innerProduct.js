/**
 *Returns the Inner Product similarity between vectors a and b
 * @link [Inner Product Similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function innerProduct(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += a[i] * b[i];
    }
    return ans;
}
//# sourceMappingURL=innerProduct.js.map