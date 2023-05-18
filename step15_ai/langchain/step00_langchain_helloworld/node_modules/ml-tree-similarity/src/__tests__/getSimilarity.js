import { createTree } from '../createTree';
import { getSimilarity } from '../getSimilarity';

describe('simple trees', () => {
  it('same tree', () => {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    var tree1 = createTree([x, y]);
    var tree2 = createTree([x, y]);

    expect(getSimilarity(tree1, tree2, { beta: 1 })).toBe(1);
  });
});
