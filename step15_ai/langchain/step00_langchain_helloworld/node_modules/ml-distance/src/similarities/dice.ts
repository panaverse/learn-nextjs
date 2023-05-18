import { NumberArray } from 'cheminfo-types';

import diceD from '../distances/dice';
/**
 *Returns the Dice similarity between vectors a and b
 * @link [Dice similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function dice(a: NumberArray, b: NumberArray): number {
  return 1 - diceD(a, b);
}
