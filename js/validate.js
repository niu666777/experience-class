(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function isValidPhone(value) {
    return /^1[3-9]\d{9}$/.test(String(value));
  }

  function isValidCode(value) {
    return /^\d{4}$/.test(String(value));
  }

  return { isValidPhone, isValidCode };
});
