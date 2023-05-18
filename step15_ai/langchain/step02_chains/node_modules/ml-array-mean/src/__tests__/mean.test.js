import mean from '..';

describe('array-mean', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the mean', () => {
    expect(mean([0])).toBe(0);
    expect(mean([1])).toBe(1);
    expect(mean([1, 2])).toBe(1.5);
    expect(mean([1, 2, 1])).toBe(4 / 3);
    expect(mean([3, 2, 1])).toBe(2);
    expect(mean(typedArray)).toBe(2);
  });

  it('should throw on invalid value', () => {
    expect(() => mean()).toThrow(/input must be an array/);
    expect(() => mean([])).toThrow(/input must not be empty/);
  });
});
