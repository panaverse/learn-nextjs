import { isAnyArray } from 'is-any-array';

function sum(input) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var sumValue = 0;

  for (var i = 0; i < input.length; i++) {
    sumValue += input[i];
  }

  return sumValue;
}

export { sum as default };
