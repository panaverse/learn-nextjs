# ml-distance

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

Distance functions to compare vectors.

## Installation

`$ npm i ml-distance`

## Methods

### Distances

- `euclidean(p, q)`

Returns the [euclidean distance](http://en.wikipedia.org/wiki/Euclidean_distance#n_dimensions) between vectors p and q

$d(p,q)=\sqrt{\sum\limits_{i=1}^{n}(p_i-q_i)^2}$

- `manhattan(p, q)`

Returns the [city block distance](http://en.wikipedia.org/wiki/Taxicab_geometry) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}$

- `minkowski(p, q, d)`

Returns the [Minkowski distance](http://en.wikipedia.org/wiki/Minkowski_distance) between vectors p and q for order d

- `chebyshev(p, q)`

Returns the [Chebyshev distance](http://en.wikipedia.org/wiki/Chebyshev_distance) between vectors p and q

$d(p,q)=\max\limits_i(|p_i-q_i|)$

- `sorensen(p, q)`

Returns the [Sørensen distance](http://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}}{\sum\limits_{i=1}^{n}{p_i+q_i}}$

- `gower(p, q)`

Returns the [Gower distance](https://stat.ethz.ch/education/semesters/ss2012/ams/slides/v4.2.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}}{n}$

- `soergel(p, q)`

Returns the [Soergel distance](http://www.orgchm.bas.bg/~vmonev/SimSearch.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}}{max(p_i,q_i)}$

- `kulczynski(p, q)`

Returns the [Kulczynski distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}}{min(p_i,q_i)}$

- `canberra(p, q)`

Returns the [Canberra distance](http://en.wikipedia.org/wiki/Canberra_distance) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}\frac{\left|{p_i-q_i}\right|}{p_i+q_i}$

- `lorentzian(p, q)`

Returns the [Lorentzian distance](https://stat.ethz.ch/education/semesters/ss2012/ams/slides/v4.2.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}\ln(\left|{p_i-q_i}\right|+1)$

- `intersection(p, q)`

Returns the [Intersection distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=1-\sum\limits_{i=1}^{n}min(p_i,q_i)$

- `waveHedges(p, q)`

Returns the [Wave Hedges distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}\left(1-\frac{min(p_i,q_i)}{max(p_i,q_i)}\right)$

- `czekanowski(p, q)`

Returns the [Czekanowski distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=1-\frac{2\sum\limits_{i=1}^{n}{min(p_i,q_i)}}{\sum\limits_{i=1}^{n}{p_i+q_i}}$

- `motyka(p, q)`

Returns the [Motyka distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=1-\frac{\sum\limits_{i=1}^{n}{min(p_i,q_i)}}{\sum\limits_{i=1}^{n}{p_i+q_i}}$

Note: distance between 2 identical vectors is 0.5 !

- `ruzicka(p, q)`

Returns the [Ruzicka similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{max(p_i,q_i)}}{\sum\limits_{i=1}^{n}{min(p_i,q_i)}}$

- `tanimoto(p, q, [bitVector])`

Returns the [Tanimoto distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q, and accepts the bitVector use, see the test case for an example

- `innerProduct(p, q)`

Returns the [Inner Product similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$s(p,q)=\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}$

- `harmonicMean(p, q)`

Returns the [Harmonic mean similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=2\sum\limits_{i=1}^{n}\frac{p_i\cdot{q_i}}{p_i+q_i}$

- `cosine(p, q)`

Returns the [Cosine similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}}{\sum\limits_{i=1}^{n}{p_i^2}\sum\limits_{i=1}^{n}{q_i^2}}$

- `kumarHassebrook(p, q)`

Returns the [Kumar-Hassebrook similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}}{\sum\limits_{i=1}^{n}{p_i^2}+\sum\limits_{i=1}^{n}{q_i^2}-\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}}$

- `jaccard(p, q)`

Returns the [Jaccard distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=1-\frac{\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}}{\sum\limits_{i=1}^{n}{p_i^2}+\sum\limits_{i=1}^{n}{q_i^2}-\sum\limits_{i=1}^{n}{p_i\cdot{q_i}}}$

- `dice(p,q)`

Returns the [Dice distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=1-\frac{\sum\limits_{i=1}^{n}{(p_i-q_i)^2}}{\sum\limits_{i=1}^{n}{p_i^2}+\sum\limits_{i=1}^{n}{q_i^2}}$

- `fidelity(p, q)`

Returns the [Fidelity similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\sqrt{p_i\cdot{q_i}}}$

- `bhattacharyya(p, q)`

Returns the [Bhattacharyya distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=-\ln\left(\sum\limits_{i=1}^{n}{\sqrt{p_i\cdot{q_i}}}\right)$

- `hellinger(p, q)`

Returns the [Hellinger distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=2\cdot\sqrt{1-\sum\limits_{i=1}^{n}{\sqrt{p_i\cdot{q_i}}}}$

- `matusita(p, q)`

Returns the [Matusita distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sqrt{2-2\cdot\sum\limits_{i=1}^{n}{\sqrt{p_i\cdot{q_i}}}}$

- `squaredChord(p, q)`

Returns the [Squared-chord distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{(\sqrt{p_i}-\sqrt{q_i})^2}$

- `squaredEuclidean(p, q)`

Returns the [squared euclidean distance](http://en.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{(p_i-q_i)^2}$

- `pearson(p, q)`

Returns the [Pearson distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2}{q_i}}$

- `neyman(p, q)`

Returns the [Neyman distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2}{p_i}}$

- `squared(p, q)`

Returns the [Squared distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2}{p_i+q_i}}$

- `probabilisticSymmetric(p, q)`

Returns the [Probabilistic Symmetric distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=2\cdot\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2}{p_i+q_i}}$

- `divergence(p, q)`

Returns the [Divergence distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=2\cdot\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2}{(p_i+q_i)^2}}$

- `clark(p, q)`

Returns the [Clark distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sqrt{\sum\limits_{i=1}^{n}{\left(\frac{\left|p_i-q_i\right|}{(p_i+q_i)}\right)^2}}$

- `additiveSymmetric(p, q)`

Returns the [Additive Symmetric distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\frac{(p_i-q_i)^2\cdot(p_i+q_i)}{p_i\cdot{q_i}}}$

- `kullbackLeibler(p, q)`

Returns the [Kullback-Leibler distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{p_i\cdot\ln\frac{p_i}{q_i}}$

- `jeffreys(p, q)`

Returns the [Jeffreys distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left((p_i-q_i)\ln\frac{p_i}{q_i}\right)}$

- `kdivergence(p, q)`

Returns the [K divergence distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left(p_i\cdot\ln\frac{2p_i}{p_i+q_i}\right)}$

- `topsoe(p, q)`

Returns the [Topsøe distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left(p_i\cdot\ln\frac{2p_i}{p_i+q_i}+q_i\cdot\ln\frac{2q_i}{p_i+q_i}\right)}$

- `jensenShannon(p, q)`

Returns the [Jensen-Shannon distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\frac{1}{2}\left[\sum\limits_{i=1}^{n}{p_i\cdot\ln\frac{2p_i}{p_i+q_i}}+\sum\limits_{i=1}^{n}{q_i\cdot\ln\frac{2q_i}{p_i+q_i}}\right]$

- `jensenDifference(p, q)`

Returns the [Jensen difference distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left[\frac{p_i\ln{p_i}+q_i\ln{q_i}}{2}-\left(\frac{p_i+q_i}{2}\right)\ln\left(\frac{p_i+q_i}{2}\right)\right]}$

- `taneja(p, q)`

Returns the [Taneja distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\left[\frac{p_i+q_i}{2}\ln\left(\frac{p_i+q_i}{2\sqrt{p_i\cdot{q_i}}}\right)\right]}$

- `kumarJohnson(p, q)`

Returns the [Kumar-Johnson distance](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

$d(p,q)=\sum\limits_{i=1}^{n}{\frac{\left(p_i^2-q_i^2\right)^2}{2(p_i\cdot{q_i})^{3/2}}}$

- `avg(p, q)`

Returns the average of city block and Chebyshev distances between vectors p and q

$d(p,q)=\frac{\sum\limits_{i=1}^{n}{\left|p_i-q_i\right|}+\max\limits_i(|p_i-q_i|)}{2}$

### Similarities

- `intersection(p, q)`

Returns the [Intersection similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `czekanowski(p, q)`

Returns the [Czekanowski similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `motyka(p, q)`

Returns the [Motyka similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `kulczynski(p, q)`

Returns the [Kulczynski similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `squaredChord(p, q)`

Returns the [Squared-chord similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `jaccard(p, q)`

Returns the [Jaccard similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `dice(p, q)`

Returns the [Dice similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q

- `tanimoto(p, q, [bitVector])`

Returns the [Tanimoto similarity](http://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf) between vectors p and q, and accepts the bitVector use, see the test case for an example

- `tree(a,b, from, to, [options])`

Refer to [ml-tree-similarity](https://github.com/mljs/tree-similarity)

## Contributing

A new metric should normally be in its own file in the src/dist directory. There should be a corresponding test file in test/dist.  
The metric should be then added in the exports of src/index.js with a relatively small but understandable name (use camelCase).  
It should also be added to this README with either a link to the formula or an inline description.

## Authors

- [Michaël Zasso](https://github.com/targos)
- [Miguel Angel Asencio Hurtado](https://github.com/maasencioh)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-distance.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-distance
[travis-image]: https://img.shields.io/travis/mljs/distance/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/distance
[download-image]: https://img.shields.io/npm/dm/ml-distance.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-distance
