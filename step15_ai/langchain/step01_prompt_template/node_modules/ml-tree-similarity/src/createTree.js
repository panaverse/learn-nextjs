import binarySearch from 'binary-search';
import { ascending } from 'num-sort';

/**
 * Function that creates the tree
 * @param {Array<Array<number>>} spectrum
 * @param {object} [options]
 * @return {Tree|null}
 * left and right have the same structure than the parent,
 * or are null if they are leaves
 */
export function createTree(spectrum, options = {}) {
  var X = spectrum[0];
  const {
    minWindow = 0.16,
    threshold = 0.01,
    from = X[0],
    to = X[X.length - 1]
  } = options;

  return mainCreateTree(
    spectrum[0],
    spectrum[1],
    from,
    to,
    minWindow,
    threshold
  );
}

function mainCreateTree(X, Y, from, to, minWindow, threshold) {
  if (to - from < minWindow) {
    return null;
  }

  // search first point
  var start = binarySearch(X, from, ascending);
  if (start < 0) {
    start = ~start;
  }

  // stop at last point
  var sum = 0;
  var center = 0;
  for (var i = start; i < X.length; i++) {
    if (X[i] >= to) {
      break;
    }
    sum += Y[i];
    center += X[i] * Y[i];
  }

  if (sum < threshold) {
    return null;
  }

  center /= sum;
  if (center - from < 1e-6 || to - center < 1e-6) {
    return null;
  }
  if (center - from < minWindow / 4) {
    return mainCreateTree(X, Y, center, to, minWindow, threshold);
  } else {
    if (to - center < minWindow / 4) {
      return mainCreateTree(X, Y, from, center, minWindow, threshold);
    } else {
      return new Tree(
        sum,
        center,
        mainCreateTree(X, Y, from, center, minWindow, threshold),
        mainCreateTree(X, Y, center, to, minWindow, threshold)
      );
    }
  }
}

class Tree {
  constructor(sum, center, left, right) {
    this.sum = sum;
    this.center = center;
    this.left = left;
    this.right = right;
  }
}
