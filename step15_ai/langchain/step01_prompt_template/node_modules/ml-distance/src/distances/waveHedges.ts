import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Wave Hedges distance between vectors p and q, and accepts the bitVector use, see the test case for an example
 * @link [Wave Hedges algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 * @param bitvector - bitVector
 *
 */
export default function waveHedges(a: NumberArray, b: NumberArray): number {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += 1 - Math.min(a[i], b[i]) / Math.max(a[i], b[i]);
  }
  return ans;
}
