import { NumberArray } from 'cheminfo-types';
/**
 * Returns the Canberra distance between vectors a and b
 * @link [Canberra algorithm](https://en.wikipedia.org/wiki/Canberra_distance)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function canberra(a: NumberArray, b: NumberArray): number {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
  }
  return ans;
}
