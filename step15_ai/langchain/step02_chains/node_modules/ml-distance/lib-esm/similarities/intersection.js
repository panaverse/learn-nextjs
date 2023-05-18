import intersectionD from '../distances/intersection';
/**
 *Returns the Intersection similarity distance between vectors a and b
 * @link [Intersection similarity algorithm](https://www.naun.org/main/NAUN/ijmmas/mmmas-49.pdf)
 * @param a - first vector
 * @param b - second vector
 *
 */
export default function intersection(a, b) {
    return 1 - intersectionD(a, b);
}
//# sourceMappingURL=intersection.js.map