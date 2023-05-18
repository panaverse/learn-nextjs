import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Matusita distance between vectors a and b
 * @link [Matusita algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function matusita(a: NumberArray, b: NumberArray): number {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }
  return Math.sqrt(2 - 2 * ans);
}
