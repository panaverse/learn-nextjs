import sum from 'ml-array-sum';

function mean(input) {
  return sum(input) / input.length;
}

export { mean as default };
