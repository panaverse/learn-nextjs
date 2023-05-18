/**
 *Returns the Clark distance between vectors a and b
 * @link [Clark algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function clark(a, b) {
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += (Math.abs(a[i] - b[i]) / (a[i] + b[i])) ** 2;
    }
    return Math.sqrt(d);
}
//# sourceMappingURL=clark.js.map