# num-sort [![Build Status](https://travis-ci.com/sindresorhus/num-sort.svg?branch=master)](https://travis-ci.com/github/sindresorhus/num-sort)

> Sort an array of numbers

## Install

```
$ npm install num-sort
```

## Usage

```js
const numberSort = require('num-sort');

[9, -3, -Infinity, 24, NaN].sort(numberSort.ascending);
//=> [NaN, -Infinity, -3, 9, 24]
```

## API

### numberSort.ascending

Ascending sort comparator.

### numberSort.descending

Descending sort comparator.

## Related

- [alpha-sort](https://github.com/sindresorhus/alpha-sort) - Alphabetically sort an array of strings

