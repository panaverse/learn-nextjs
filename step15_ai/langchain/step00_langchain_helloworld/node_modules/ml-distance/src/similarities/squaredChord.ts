import { NumberArray } from 'cheminfo-types';

import squaredChordD from '../distances/squaredChord';
/**
 *Returns the Squared-chord distance between vectors a and b
 * @link [Squared-chord algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function squaredChord(a: NumberArray, b: NumberArray): number {
  return 1 - squaredChordD(a, b);
}
