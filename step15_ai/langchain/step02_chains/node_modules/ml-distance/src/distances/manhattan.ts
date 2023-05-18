import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Manhattan distance between vectors a and b
 * @link [Manhattan algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */

export default function manhattan(a: NumberArray, b: NumberArray): number {
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    d += Math.abs(a[i] - b[i]);
  }
  return d;
}
