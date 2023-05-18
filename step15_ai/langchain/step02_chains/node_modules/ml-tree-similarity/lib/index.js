'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var binarySearch = _interopDefault(require('binary-search'));
var numSort = require('num-sort');

/**
 * Function that creates the tree
 * @param {Array<Array<number>>} spectrum
 * @param {object} [options]
 * @return {Tree|null}
 * left and right have the same structure than the parent,
 * or are null if they are leaves
 */
function createTree(spectrum, options = {}) {
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
  var start = binarySearch(X, from, numSort.ascending);
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

/**
 * Similarity between two nodes
 * @param {Tree|Array<Array<number>>} a - tree A node
 * @param {Tree|Array<Array<number>>} b - tree B node
 * @param {object} [options]
 * @return {number} similarity measure between tree nodes
 */
function getSimilarity(a, b, options = {}) {
  const { alpha = 0.1, beta = 0.33, gamma = 0.001 } = options;

  if (a === null || b === null) {
    return 0;
  }
  if (Array.isArray(a)) {
    a = createTree(a);
  }
  if (Array.isArray(b)) {
    b = createTree(b);
  }

  var C =
    (alpha * Math.min(a.sum, b.sum)) / Math.max(a.sum, b.sum) +
    (1 - alpha) * Math.exp(-gamma * Math.abs(a.center - b.center));

  return (
    beta * C +
    ((1 - beta) *
      (getSimilarity(a.left, b.left, options) +
        getSimilarity(a.right, b.right, options))) /
      2
  );
}

function treeSimilarity(A, B, options = {}) {
  return getSimilarity(A, B, options);
}

function getFunction(options = {}) {
  return (A, B) => getSimilarity(A, B, options);
}

exports.createTree = createTree;
exports.getFunction = getFunction;
exports.treeSimilarity = treeSimilarity;
