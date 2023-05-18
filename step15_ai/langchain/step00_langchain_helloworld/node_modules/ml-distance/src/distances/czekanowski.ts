import { NumberArray } from 'cheminfo-types';

import czekanowskiSimilarity from '../similarities/czekanowski';
/**
 *Returns the Czekanowski distance between vectors a and b
 * @link [Czekanowski algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function czekanowskiDistance(
  a: NumberArray,
  b: NumberArray,
): number {
  return 1 - czekanowskiSimilarity(a, b);
}
