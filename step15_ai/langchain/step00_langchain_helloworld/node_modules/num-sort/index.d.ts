export type NumberComparator = (left: number, right: number) => number;

/**
Ascending sort comparator.

@example
```
import numberSort = require('num-sort');

[9, -3, -Infinity, 24, NaN].sort(numberSort.ascending);
//=> [NaN, -Infinity, -3, 9, 24]
```
*/
export const ascending: NumberComparator;

/**
Descending sort comparator.

@example
```
import numberSort = require('num-sort');

[9, -3, -Infinity, 24, NaN].sort(numberSort.descending);
//=> [24, 9, -3, -Infinity, NaN]
```
*/
export const descending: NumberComparator;
