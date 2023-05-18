import { NumberArray } from 'cheminfo-types';

import motykaD from '../distances/motyka';
/**
 *Returns the Motyka similarity between vectors a and b
 * @link [Motyka algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function motyka(a: NumberArray, b: NumberArray): number {
  return 1 - motykaD(a, b);
}
