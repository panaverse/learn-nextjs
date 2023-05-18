import { createTree } from '../createTree';

describe('simple trees', () => {
  it('two peaks, same height', () => {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    var tree = createTree([x, y]);

    expect(tree.center).toBe(5);
    expect(tree.sum).toBe(2);

    var left = tree.left;
    expect(left.center).toBe(3);
    expect(left.sum).toBe(1);
    expect(left.left).toStrictEqual(null);
    expect(left.right).toStrictEqual(null);

    var right = tree.right;
    expect(right.center).toBe(7);
    expect(right.sum).toBe(1);
    expect(right.left).toStrictEqual(null);
    expect(right.right).toStrictEqual(null);
  });

  it('two peaks, same height (higher)', () => {
    var x = new Array(101);
    var y = new Array(101);
    for (var i = 0; i < 101; i++) {
      x[i] = i;
      y[i] = 0;
    }
    y[20] = 20;
    y[80] = 20;

    var tree = createTree([x, y]);

    expect(tree.center).toBe(50);
    expect(tree.sum).toBe(40);

    var left = tree.left;
    expect(left.center).toBe(20);
    expect(left.sum).toBe(20);
    expect(left.left).toStrictEqual(null);
    expect(left.right).toStrictEqual(null);

    var right = tree.right;
    expect(right.center).toBe(80);
    expect(right.sum).toBe(20);
    expect(right.left).toStrictEqual(null);
    expect(right.right).toStrictEqual(null);
  });
});
