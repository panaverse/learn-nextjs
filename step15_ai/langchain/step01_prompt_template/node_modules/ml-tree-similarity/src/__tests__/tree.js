import { treeSimilarity, getFunction } from '..';

var a = [[1, 2, 3, 4, 5, 6, 7], [0.3, 0.7, 4, 0.3, 0.2, 5, 0.3]];
var b = [[1, 2, 3, 4, 5, 6, 7], [0.3, 4, 0.7, 0.3, 5, 0.2, 0.3]];

describe('Tree similarity', () => {
  it('should work with two arrays', () => {
    expect(treeSimilarity(a, b)).toBeCloseTo(0.653354, 4);
  });

  it('should currify the options', () => {
    var options = {
      alpha: 0.4,
      beta: 0.5,
      gamma: 0.001
    };
    var func = getFunction(options);
    expect(func(a, b)).toBe(treeSimilarity(a, b, options));
  });
});
