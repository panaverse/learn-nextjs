/**
 * Returns the average of city block and Chebyshev distances between vectors a and b
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function avg(a, b) {
    let max = 0;
    let ans = 0;
    let aux = 0;
    for (let i = 0; i < a.length; i++) {
        aux = Math.abs(a[i] - b[i]);
        ans += aux;
        if (max < aux) {
            max = aux;
        }
    }
    return (max + ans) / 2;
}
//# sourceMappingURL=avg.js.map