'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { formatCountdownLabel, Countdown } = require('../js/countdown.js');

test('formatCountdownLabel 生成倒计时文案', () => {
  assert.equal(formatCountdownLabel(60), '请60s后重试');
  assert.equal(formatCountdownLabel(1), '请1s后重试');
});

test('Countdown 按秒递减并在结束时回调一次', () => {
  let intervalCb = null;
  let cleared = 0;
  const setIntervalFn = (cb) => { intervalCb = cb; return 1; };
  const clearIntervalFn = () => { cleared += 1; };
  const ticks = [];
  let doneCalls = 0;

  const c = new Countdown({
    onTick: (r) => ticks.push(r),
    onDone: () => { doneCalls += 1; },
    setIntervalFn,
    clearIntervalFn
  });

  c.start(3);
  assert.deepEqual(ticks, [3]);
  assert.equal(c.isRunning(), true);

  intervalCb();
  intervalCb();
  intervalCb();

  assert.deepEqual(ticks, [3, 2, 1]);
  assert.equal(doneCalls, 1);
  assert.equal(c.isRunning(), false);
  assert.equal(cleared, 1);
});

test('Countdown.cancel 停止后续回调', () => {
  let intervalCb = null;
  const setIntervalFn = (cb) => { intervalCb = cb; return 1; };
  const clearIntervalFn = () => {};
  const ticks = [];
  let doneCalls = 0;

  const c = new Countdown({
    onTick: (r) => ticks.push(r),
    onDone: () => { doneCalls += 1; },
    setIntervalFn,
    clearIntervalFn
  });

  c.start(3);
  c.cancel();
  assert.equal(c.isRunning(), false);

  intervalCb();
  assert.deepEqual(ticks, [3]);
  assert.equal(doneCalls, 0);
});
