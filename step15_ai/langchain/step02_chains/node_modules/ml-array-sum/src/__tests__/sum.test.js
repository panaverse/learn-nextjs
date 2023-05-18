import sum from '..';

describe('array-sum', () => {
  let typedArray = new Uint16Array(3);
  typedArray[0] = 1;
  typedArray[1] = 2;
  typedArray[2] = 3;

  it('should return the mean', () => {
    expect(sum([0])).toBe(0);
    expect(sum([1])).toBe(1);
    expect(sum([1, 2])).toBe(3);
    expect(sum([1, 2, 1])).toBe(4);
    expect(sum([3, 2, 1])).toBe(6);
    expect(sum(typedArray)).toBe(6);
  });

  it('should throw on invalid value', () => {
    expect(() => sum()).toThrow(/input must be an array/);
    expect(() => sum([])).toThrow(/input must not be empty/);
  });
});
