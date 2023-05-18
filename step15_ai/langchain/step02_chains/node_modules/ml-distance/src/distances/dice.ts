import { NumberArray } from 'cheminfo-types';
/**
 *Returns the Dice distance between vectors a and b
 * @link [Dice algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function dice(a: NumberArray, b: NumberArray): number {
  let a2 = 0;
  let b2 = 0;
  let prod2 = 0;
  for (let i = 0; i < a.length; i++) {
    a2 += a[i] * a[i];
    b2 += b[i] * b[i];
    prod2 += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return prod2 / (a2 + b2);
}
