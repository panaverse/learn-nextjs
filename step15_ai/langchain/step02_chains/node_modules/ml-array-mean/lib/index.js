'use strict';

var sum = require('ml-array-sum');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sum__default = /*#__PURE__*/_interopDefaultLegacy(sum);

function mean(input) {
  return sum__default['default'](input) / input.length;
}

module.exports = mean;
