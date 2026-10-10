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
