'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidPhone, isValidCode } = require('../js/validate.js');

test('isValidPhone 接受合法中国手机号', () => {
  assert.equal(isValidPhone('13800138000'), true);
  assert.equal(isValidPhone('19912345678'), true);
  assert.equal(isValidPhone('16600001111'), true);
});

test('isValidPhone 拒绝非法手机号', () => {
  assert.equal(isValidPhone('12012345678'), false);
  assert.equal(isValidPhone('1234567890'), false);
  assert.equal(isValidPhone('138001380000'), false);
  assert.equal(isValidPhone('1380013800a'), false);
  assert.equal(isValidPhone(' 13800138000 '), false);
  assert.equal(isValidPhone(''), false);
});

test('isValidCode 只接受 4 位数字', () => {
  assert.equal(isValidCode('1234'), true);
  assert.equal(isValidCode('123'), false);
  assert.equal(isValidCode('12345'), false);
  assert.equal(isValidCode('12a4'), false);
  assert.equal(isValidCode(''), false);
});
