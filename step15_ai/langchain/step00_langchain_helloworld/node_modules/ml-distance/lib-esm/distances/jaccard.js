import kumarHassebrook from '../similarities/kumarHassebrook';
/**
 *Returns Jaccard distance between vectors a and b
 * @link [Jaccard algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function jaccard(a, b) {
    return 1 - kumarHassebrook(a, b);
}
//# sourceMappingURL=jaccard.js.map