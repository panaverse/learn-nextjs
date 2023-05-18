import { NumberArray } from 'cheminfo-types';

/**
 *Returns the Chebyshev distance between vectors a and b
 * @link [Chebyshev algorithm](https://en.wikipedia.org/wiki/Chebyshev_distance)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function chebyshev(a: NumberArray, b: NumberArray): number {
  let max = 0;
  let aux = 0;
  for (let i = 0; i < a.length; i++) {
    aux = Math.abs(a[i] - b[i]);
    if (max < aux) {
      max = aux;
    }
  }
  return max;
}
