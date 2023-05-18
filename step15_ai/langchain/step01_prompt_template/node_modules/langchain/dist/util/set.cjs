"use strict";
/**
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.difference = exports.union = exports.intersection = void 0;
/**
 * returns intersection of two sets
 */
function intersection(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
exports.intersection = intersection;
/**
 * returns union of two sets
 */
function union(setA, setB) {
    const _union = new Set(setA);
    for (const elem of setB) {
        _union.add(elem);
    }
    return _union;
}
exports.union = union;
/**
 * returns difference of two sets
 */
function difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}
exports.difference = difference;
