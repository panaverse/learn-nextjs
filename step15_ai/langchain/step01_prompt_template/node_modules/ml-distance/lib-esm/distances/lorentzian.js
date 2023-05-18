/**
 *Returns the Lorentzian distance between vectors a and b
 * @link [Lorentzian algorithm](https://stat.ethz.ch/education/semesters/ss2012/ams/slides/v4.2.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function lorentzian(a, b) {
    let ans = 0;
    for (let i = 0; i < a.length; i++) {
        ans += Math.log(Math.abs(a[i] - b[i]) + 1);
    }
    return ans;
}
//# sourceMappingURL=lorentzian.js.map