'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

function loadApp() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const dom = new JSDOM(html, {
    url: 'file://' + path.join(ROOT, 'index.html'),
    runScripts: 'outside-only'
  });
  const win = dom.window;
  for (const f of ['js/data.js', 'js/validate.js', 'js/countdown.js', 'js/form-state.js', 'js/app.js']) {
    win.eval(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  }
  win.App.init();
  return dom;
}

function goto(dom, hash) {
  dom.window.location.hash = hash;
  dom.window.App.render();
  return dom.window.document;
}

function fireInput(d, el, value) {
  el.value = value;
  el.dispatchEvent(new d.defaultView.Event('input', { bubbles: true }));
}

function fireChange(d, el, value) {
  el.value = value;
  el.dispatchEvent(new d.defaultView.Event('change', { bubbles: true }));
}

test('海报页渲染三个模块与立即报名按钮', () => {
  const dom = loadApp();
  const d = dom.window.document;
  assert.equal(d.querySelectorAll('#feature-list .feature-item').length, 3);
  assert.equal(d.querySelectorAll('#teacher-grid .teacher-card').length, 3);
  assert.equal(d.querySelectorAll('#work-grid .work-card').length, 3);
  assert.equal(d.querySelectorAll('.module-card .link-more').length, 3);
  const cta = d.querySelector('.cta-wrap .btn-primary');
  assert.ok(cta);
  assert.equal(cta.textContent.trim(), '立即报名');
});

test('海报页教师卡展示照片占位与院校姓名', () => {
  const dom = loadApp();
  const d = dom.window.document;
  const first = d.querySelector('#teacher-grid .teacher-card');
  assert.equal(first.querySelector('.teacher-photo').textContent.trim(), '图片');
  assert.equal(first.querySelector('.teacher-name').textContent.trim(), '尹广洋');
  assert.equal(first.querySelector('.teacher-school').textContent.trim(), '天津大学');
});

test('详情页路由显示对应标题与占位内容', () => {
  const dom = loadApp();
  let d = goto(dom, '#/detail/course');
  assert.ok(d.getElementById('view-detail').classList.contains('active'));
  assert.equal(d.getElementById('detail-title').textContent, '课程特色');
  assert.equal(d.getElementById('detail-body').textContent, '内容待更新');

  d = goto(dom, '#/detail/teachers');
  assert.equal(d.getElementById('detail-title').textContent, '师资力量');

  d = goto(dom, '#/detail/works');
  assert.equal(d.getElementById('detail-title').textContent, '往期学员成果');
});

test('未知 hash 回退到海报页', () => {
  const dom = loadApp();
  const d = goto(dom, '#/whatever');
  assert.ok(d.getElementById('view-poster').classList.contains('active'));
  assert.ok(!d.getElementById('view-detail').classList.contains('active'));
});

test('详情页返回链接指向海报', () => {
  const dom = loadApp();
  const d = dom.window.document;
  assert.equal(d.querySelector('#view-detail .btn-back').getAttribute('href'), '#/');
});

test('报名页展示初始表单结构', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  assert.ok(d.getElementById('view-register').classList.contains('active'));
  assert.equal(d.querySelectorAll('#parent-rows .row').length, 1);
  assert.equal(d.querySelectorAll('#child-rows .row').length, 1);
  assert.equal(d.querySelectorAll('#course-menu .course-option').length, 11);
  assert.equal(d.getElementById('submit').disabled, true);
  assert.equal(d.getElementById('send-code').textContent, '发送验证码');
});

test('年级下拉包含 18 个年级选项', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  const grade = d.querySelector('#child-rows .child-grade');
  const real = Array.from(grade.options).filter((o) => o.value !== '');
  assert.equal(real.length, 18);
  assert.equal(real[0].value, '幼儿园一年级');
  assert.equal(real[17].value, '博士');
});

test('手机号与验证码输入框占位和长度限制正确', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  const phone = d.getElementById('phone');
  assert.equal(phone.getAttribute('placeholder'), '12345678910');
  assert.equal(phone.getAttribute('maxlength'), '11');
  assert.equal(d.getElementById('code').getAttribute('maxlength'), '4');
});

test('手机号非法时显示错误提示，合法时清除', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  const phone = d.getElementById('phone');
  fireInput(d, phone, '120');
  assert.equal(d.getElementById('phone-error').textContent, '请填写正确手机号');
  fireInput(d, phone, '13800138000');
  assert.equal(d.getElementById('phone-error').textContent, '');
});

test('非法手机号点击发送验证码不启动倒计时', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  fireInput(d, d.getElementById('phone'), '120');
  d.getElementById('send-code').click();
  assert.equal(d.getElementById('send-code').textContent, '发送验证码');
  assert.equal(d.getElementById('send-code').disabled, false);
  assert.equal(d.getElementById('phone-error').textContent, '请填写正确手机号');
});

test('合法手机号点击发送验证码后按钮进入倒计时', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  fireInput(d, d.getElementById('phone'), '13800138000');
  d.getElementById('send-code').click();
  const btn = d.getElementById('send-code');
  assert.equal(btn.disabled, true);
  assert.equal(btn.textContent, '请60s后重试');
  dom.window.close();
});

test('所有必填项填写完成后立即报名启用', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  const submit = d.getElementById('submit');
  assert.equal(submit.disabled, true);

  fireInput(d, d.querySelector('#parent-rows .parent-name'), '张三');
  fireInput(d, d.querySelector('#child-rows .child-name'), '小明');
  fireChange(d, d.querySelector('#child-rows .child-grade'), '小学三年级');
  const opt = d.querySelector('#course-menu .course-option[value="语文"]');
  opt.checked = true;
  opt.dispatchEvent(new d.defaultView.Event('change', { bubbles: true }));
  fireInput(d, d.getElementById('phone'), '13800138000');
  fireInput(d, d.getElementById('code'), '1234');
  assert.equal(submit.disabled, false);
});

test('添加孩子会追加一个带年级下拉的行', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  d.getElementById('add-child').click();
  assert.equal(d.querySelectorAll('#child-rows .row').length, 2);
  assert.equal(d.querySelectorAll('#child-rows .child-grade').length, 2);
});

test('删光孩子后提交保持禁用', () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  d.querySelector('#child-rows .row-del').click();
  assert.equal(d.querySelectorAll('#child-rows .row').length, 0);
  assert.equal(d.getElementById('submit').disabled, true);
});

test('结果页展示红字提示与视频占位', () => {
  const dom = loadApp();
  const d = goto(dom, '#/result');
  assert.ok(d.getElementById('view-result').classList.contains('active'));
  assert.equal(d.getElementById('result-red').textContent, '信息已收到，报名结果将在24h内通过电话或短信通知');
  assert.equal(d.getElementById('video-placeholder').textContent, '往期家长或学生的视频');
});

test('结果页按钮显示对应反馈文字', () => {
  const dom = loadApp();
  const d = goto(dom, '#/result');
  d.getElementById('btn-known').click();
  assert.equal(d.getElementById('result-feedback').textContent, '报名结束，请耐心等待通知');
  d.getElementById('btn-unknown').click();
  assert.equal(d.getElementById('result-feedback').textContent, '请添加课程微信详细了解或耐心等待电话回访');
});

test('提交后按钮变为正在提交并跳转结果页', async () => {
  const dom = loadApp();
  const d = goto(dom, '#/register');
  fireInput(d, d.querySelector('#parent-rows .parent-name'), '张三');
  fireInput(d, d.querySelector('#child-rows .child-name'), '小明');
  fireChange(d, d.querySelector('#child-rows .child-grade'), '小学三年级');
  const opt = d.querySelector('#course-menu .course-option[value="语文"]');
  opt.checked = true;
  opt.dispatchEvent(new d.defaultView.Event('change', { bubbles: true }));
  fireInput(d, d.getElementById('phone'), '13800138000');
  fireInput(d, d.getElementById('code'), '1234');

  const submit = d.getElementById('submit');
  assert.equal(submit.disabled, false);
  submit.click();
  assert.equal(submit.disabled, true);
  assert.equal(submit.textContent, '正在提交…');

  await new Promise((resolve) => setTimeout(resolve, 600));
  assert.ok(d.getElementById('view-result').classList.contains('active'));
  dom.window.close();
});
