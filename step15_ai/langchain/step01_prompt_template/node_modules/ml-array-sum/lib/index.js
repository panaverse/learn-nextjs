'use strict';

var isAnyArray = require('is-any-array');

function sum(input) {
  if (!isAnyArray.isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += input[i];
  }
  return sumValue;
}

module.exports = sum;
