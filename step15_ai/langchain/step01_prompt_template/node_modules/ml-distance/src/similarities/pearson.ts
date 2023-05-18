import { NumberArray } from 'cheminfo-types';
import mean from 'ml-array-mean';

import cosine from './cosine';

export default function pearson(a: NumberArray, b: NumberArray): number {
  let avgA = mean(a);
  let avgB = mean(b);

  let newA = new Array(a.length);
  let newB = new Array(b.length);
  for (let i = 0; i < newA.length; i++) {
    newA[i] = a[i] - avgA;
    newB[i] = b[i] - avgB;
  }

  return cosine(newA, newB);
}
