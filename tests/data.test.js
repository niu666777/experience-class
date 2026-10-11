'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const data = require('../js/data.js');

test('GRADES 严格等于 18 项年级列表', () => {
  assert.deepEqual(data.GRADES, [
    '幼儿园一年级', '幼儿园二年级', '幼儿园三年级',
    '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级',
    '初一', '初二', '初三',
    '高一', '高二', '高三',
    '本科/专科', '硕士', '博士'
  ]);
});

test('COURSES 严格等于 11 项课程列表', () => {
  assert.deepEqual(data.COURSES, [
    '语文', '数学', '英语', '体育', '乐器', '舞蹈', '美术', '编程', '书法', '口才', '科学实验'
  ]);
});

test('FEATURES 有 3 项且第一项为多学科覆盖并含详情', () => {
  assert.equal(data.FEATURES.length, 3);
  assert.equal(data.FEATURES[0].title, '多学科覆盖');
  assert.ok(Array.isArray(data.FEATURES[0].groups));
  assert.ok(Array.isArray(data.FEATURES[1].points));
  assert.ok(Array.isArray(data.FEATURES[2].points));
});

test('TEACHERS 有 2 项且老师信息完整', () => {
  assert.equal(data.TEACHERS.length, 2);
  assert.deepEqual(data.TEACHERS[0], {
    name: '尹广洋',
    school: '天津大学',
    photo: 'images/teacher-yinguangyang.jpg',
    honors: ['本科生国家奖学金', '国创赛国家级银奖', '大学生数学竞赛国赛一等奖'],
    experience: '天津大学在读，长期辅导小学高年级至初中数学与思维拓展，擅长把抽象问题讲得直观有趣；累计授课 300+ 小时，注重培养解题习惯与举一反三的能力。'
  });
  assert.equal(data.TEACHERS[1].name, '牛世科');
  assert.equal(data.TEACHERS[1].photo, 'images/teacher-niushike.jpg');
  assert.ok(data.TEACHERS[1].experience.length > 0);
});

test('WORKS 有 4 项且字段完整', () => {
  assert.equal(data.WORKS.length, 4);
  assert.equal(data.WORKS[0].kind, 'math');
  assert.equal(data.WORKS[0].title, '数学成绩提升 24 分');
  assert.ok(data.WORKS.some((w) => w.kind === 'english'));
  for (const w of data.WORKS) {
    assert.ok(w.name && w.title && w.desc && w.kind && w.color);
  }
});

test('COPY 关键文案与常量正确', () => {
  assert.equal(data.COPY.PHONE_PLACEHOLDER, '12345678910');
  assert.equal(data.COPY.PHONE_ERROR, '请填写正确手机号');
  assert.equal(data.COPY.CODE_HINT, '请写出正确的四位数字验证码');
  assert.equal(data.COPY.CODE_ERROR, '请填写正确的验证码');
  assert.equal(data.COPY.COUNTDOWN_SECONDS, 60);
  assert.equal(data.COPY.RESULT_RED_TEXT, '信息已收到\n报名结果将在24小时内通过电话或短信通知');
  assert.equal(data.COPY.DETAIL_PLACEHOLDER, '内容待更新');
  assert.equal(data.COPY.KNOWN_TEXT, '报名结束，请耐心等待通知');
  assert.equal(data.COPY.UNKNOWN_TEXT, '请添加课程微信详细了解或耐心等待电话回访');
  assert.equal(data.COPY.VIDEO_PLACEHOLDER, '往期家长或学生的课程或采访视频');
  assert.equal(data.COPY.WECHAT_LINE, '若需第一时间确定报名结果或了解详情\n请添加课程微信：12345678910');
  assert.equal(data.COPY.MORE_TEACHERS, '更多名师持续更新，敬请期待');
});
