'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const f = require('../js/form-state.js');

test('初始状态为空且不完整', () => {
  const s = f.createInitialState();
  assert.deepEqual(s, {
    parents: [''],
    children: [{ name: '', grade: '' }],
    courses: [],
    phone: '',
    code: ''
  });
  assert.equal(f.isComplete(s), false);
});

test('全部填写完成后 isComplete 为 true', () => {
  let s = f.createInitialState();
  s = f.updateParent(s, 0, '张三');
  s = f.updateChild(s, 0, 'name', '小明');
  s = f.updateChild(s, 0, 'grade', '小学三年级');
  s = f.toggleCourse(s, '语文');
  s = f.setPhone(s, '13800138000');
  s = f.setCode(s, '1234');
  assert.equal(f.isComplete(s), true);
});

test('添加孩子会追加一个空的孩子项', () => {
  let s = f.createInitialState();
  s = f.addChild(s);
  assert.equal(s.children.length, 2);
  assert.deepEqual(s.children[1], { name: '', grade: '' });
});

test('删光家长或孩子后仍不完整且不抛异常', () => {
  let s = f.createInitialState();
  s = f.removeParent(s, 0);
  assert.deepEqual(s.parents, []);
  assert.equal(f.isComplete(s), false);

  let s2 = f.createInitialState();
  s2 = f.removeChild(s2, 0);
  assert.deepEqual(s2.children, []);
  assert.equal(f.isComplete(s2), false);
});

test('toggleCourse 加入后再次调用移除', () => {
  let s = f.createInitialState();
  s = f.toggleCourse(s, '语文');
  assert.deepEqual(s.courses, ['语文']);
  s = f.toggleCourse(s, '语文');
  assert.deepEqual(s.courses, []);
});
