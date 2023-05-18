import sum from 'ml-array-sum';

export default function mean(input) {
  return sum(input) / input.length;
}
