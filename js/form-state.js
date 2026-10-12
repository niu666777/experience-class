(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(require('./validate.js')); }
  else { root.App = root.App || {}; Object.assign(root.App, factory(root.App)); }
})(typeof self !== 'undefined' ? self : this, function (V) {
  'use strict';

  function createInitialState() {
    return {
      parents: [''],
      children: [{ name: '', grade: '', courses: [] }],
      phone: '',
      code: ''
    };
  }

  function addParent(s) {
    return Object.assign({}, s, { parents: s.parents.concat('') });
  }

  function removeParent(s, i) {
    return Object.assign({}, s, { parents: s.parents.filter((_, idx) => idx !== i) });
  }

  function updateParent(s, i, v) {
    const parents = s.parents.slice();
    parents[i] = v;
    return Object.assign({}, s, { parents });
  }

  function addChild(s) {
    return Object.assign({}, s, { children: s.children.concat({ name: '', grade: '', courses: [] }) });
  }

  function removeChild(s, i) {
    return Object.assign({}, s, { children: s.children.filter((_, idx) => idx !== i) });
  }

  function updateChild(s, i, field, v) {
    const children = s.children.map((c, idx) => (idx === i ? Object.assign({}, c, { [field]: v }) : c));
    return Object.assign({}, s, { children });
  }

  function toggleCourse(s, i, course) {
    const children = s.children.map((c, idx) => {
      if (idx !== i) { return c; }
      const has = c.courses.indexOf(course) !== -1;
      const courses = has ? c.courses.filter((x) => x !== course) : c.courses.concat(course);
      return Object.assign({}, c, { courses });
    });
    return Object.assign({}, s, { children });
  }

  function setPhone(s, v) {
    return Object.assign({}, s, { phone: v });
  }

  function setCode(s, v) {
    return Object.assign({}, s, { code: v });
  }

  function isComplete(s) {
    return s.parents.length >= 1 && s.parents.every((p) => String(p).trim() !== '') &&
      s.children.length >= 1 && s.children.every((c) => String(c.name).trim() !== '' && String(c.grade).trim() !== '' && Array.isArray(c.courses) && c.courses.length >= 1) &&
      V.isValidPhone(s.phone) &&
      V.isValidCode(s.code);
  }

  return {
    createInitialState,
    addParent,
    removeParent,
    updateParent,
    addChild,
    removeChild,
    updateChild,
    toggleCourse,
    setPhone,
    setCode,
    isComplete
  };
});
