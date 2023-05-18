import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Squared Chord distance between vectors a and b
 * @link [Squared Chord algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function squaredChord(a: NumberArray, b: NumberArray): number {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) ** 2;
  }
  return ans;
}
