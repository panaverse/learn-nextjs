# tree-similarity

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Compares two spectra using a tree similarity.

## Installation

`$ npm i ml-tree-similarity`

## Usage

```js
import { createTree, treeSimilarity } from 'ml-tree-similarity';

const a = [[1, 2, 3, 4, 5, 6, 7], [0.3, 0.7, 4, 0.3, 0.2, 5, 0.3]];
const b = [[1, 2, 3, 4, 5, 6, 7], [0.3, 4, 0.7, 0.3, 5, 0.2, 0.3]];

// create a tree
const options = { from: 1, to: 7 };
const A = createTree(a, options);

// a pre-calculated tree is also a valid input
const ans = treeSimilarity(A, b, options);
```

## [API Documentation](https://mljs.github.io/tree-similarity/)

This algorithm was based in the following papers:

- [A new method for the comparison of 1H NMR predictors based on tree-similarity of spectra](https://doi.org/10.1186/1758-2946-6-9)
- [Fast and shift-insensitive similarity comparisons of NMR using a tree-representation of spectra](https://doi.org/10.1016/j.chemolab.2013.05.009)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-tree-similarity.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-tree-similarity
[travis-image]: https://img.shields.io/travis/mljs/tree-similarity/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/tree-similarity
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/tree-similarity.svg?style=flat-square
[codecov-url]: https://codecov.io/github/mljs/tree-similarity
[download-image]: https://img.shields.io/npm/dm/ml-tree-similarity.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-tree-similarity
