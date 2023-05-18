# ml-distance-euclidean

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

Compute the euclidean distance between two vectors

## Installation

`$ npm install ml-distance-euclidean`

## API

```js
const { euclidean, squaredEuclidean } = require('ml-distance-euclidean');

euclidean([0, 1, 4, 6, 2], [3, 6, 9, 4, 3]); // 8
```

### euclidean(p, q)

Returns the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance#n_dimensions) between vectors p and q.

### squaredEuclidean(p, q)

Returns the [squared Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance) between vectors p and q.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-distance-euclidean.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-distance-euclidean
[travis-image]: https://img.shields.io/travis/mljs/distance-euclidean/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/distance-euclidean
[download-image]: https://img.shields.io/npm/dm/ml-distance-euclidean.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-distance-euclidean
