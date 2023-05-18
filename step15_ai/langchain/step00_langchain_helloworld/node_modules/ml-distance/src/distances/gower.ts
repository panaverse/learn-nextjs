import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Gower distance between vectors a and b
 * @link [Gower algorithm](https://stat.ethz.ch/education/semesters/ss2012/ams/slides/v4.2.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function gower(a: NumberArray, b: NumberArray): number {
  const ii = a.length;
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += Math.abs(a[i] - b[i]);
  }
  return ans / ii;
}
