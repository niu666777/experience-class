(function () {
  'use strict';
  var D = window.App;

  // 多学科覆盖：一组手绘学科小图标贴纸（书本/算式/对话/画板/音符/球/代码/试管）
  // 直接呼应素材规范「文字旁画一堆学科小图标」，强化"多学科"的视觉信号
  var SUBJECT_CHIPS = [
    { name: '语文', color: '#4E8DE8', svg: '<path d="M6.5 3.5h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 1.5-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9.5 3.5v17" stroke="currentColor" stroke-width="1.8"/>' },
    { name: '数学', color: '#4FAE8F', svg: '<rect x="4" y="3.5" width="16" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' },
    { name: '英语', color: '#F2A93B', svg: '<path d="M4 5.5h16v8H9.5l-3.5 3.5v-3.5H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 8.5l1.2 3.2h-2.4z M13 8.5v3.2 M13 8.5h2 M15 11.7h-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>' },
    { name: '美术', color: '#8E6FE8', svg: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17 3 3 0 0 0 3-3 2 2 0 0 1 2-2h1.5a3.5 3.5 0 0 0 3.5-3.5 8.5 8.5 0 0 0-10-8.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="8" cy="10.5" r="1.2" fill="currentColor"/><circle cx="12" cy="8" r="1.2" fill="currentColor"/><circle cx="16" cy="10.5" r="1.2" fill="currentColor"/>' },
    { name: '乐器', color: '#4E8DE8', svg: '<path d="M9.5 17.5V6.5l8-2v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="17.5" r="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15.5" cy="15.5" r="2" fill="none" stroke="currentColor" stroke-width="2"/>' },
    { name: '体育', color: '#4FAE8F', svg: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6.5v5.5l4 2 M12 12l-4 2 M12 12l5-1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' },
    { name: '编程', color: '#F2A93B', svg: '<path d="M9.5 8l-4 4 4 4 M14.5 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
    { name: '科学', color: '#8E6FE8', svg: '<path d="M9.5 3.5h5 M10.5 3.5v5L6 16.5a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3L13.5 8.5v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7.5 14.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' }
  ];

  function subjectChips() {
    return '<div class="subject-chips">' + SUBJECT_CHIPS.map(function (s) {
      return '<span class="sub-chip" style="color:' + s.color + '">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' + s.svg + '</svg>' +
        '<i>' + s.name + '</i></span>';
    }).join('') + '</div>';
  }

  function renderPoster() {
    var featureList = document.getElementById('feature-list');
    if (featureList) {
      featureList.innerHTML = D.FEATURES.map(function (f) {
        var extra = f.key === 'subjects' ? subjectChips() : '';
        return '<div class="feature-item">' +
          '<div class="feature-icon">' + D.featureCard(f.key) + '</div>' +
          '<div class="feature-body"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p>' + extra + '</div>' +
          '</div>';
      }).join('');
    }

    var teacherGrid = document.getElementById('teacher-grid');
    if (teacherGrid) {
      teacherGrid.innerHTML = D.TEACHERS.map(function (t) {
        return '<div class="teacher-card">' +
          '<div class="teacher-top">' +
            '<img class="teacher-photo" src="' + esc(t.photo) + '" alt="' + esc(t.name) + '">' +
            '<div class="teacher-info">' +
              '<div class="teacher-name">' + esc(t.name) + '</div>' +
              '<div class="teacher-school">' + esc(t.school) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="teacher-honors">' + t.honors.map(function (h) {
            return '<span class="honor-tag">' + esc(h) + '</span>';
          }).join('') + '</div>' +
          '</div>';
      }).join('');
    }

    var workGrid = document.getElementById('work-grid');
    if (workGrid) {
      workGrid.innerHTML = D.WORKS.slice(0, 3).map(function (w) {
        return '<div class="work-card">' +
          '<div class="work-photo"><img class="work-photo-img" src="' + esc(w.image) + '" alt="' + esc(w.title) + '"></div>' +
          '<div class="work-label">' + esc(w.title) + '</div>' +
          '</div>';
      }).join('');
    }
  }

  var DETAIL_TITLES = {
    course: '课程特色',
    teachers: '师资力量',
    works: '往期学员成果'
  };

  function currentRoute() {
    var h = location.hash || '#/';
    if (h.indexOf('#/detail/') === 0) {
      var key = h.slice('#/detail/'.length);
      return DETAIL_TITLES[key] ? { name: 'detail', key: key } : { name: 'poster' };
    }
    if (h === '#/register') { return { name: 'register' }; }
    if (h === '#/result') { return { name: 'result' }; }
    return { name: 'poster' };
  }

  function showView(name) {
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i += 1) {
      views[i].classList.remove('active');
    }
    var el = document.getElementById('view-' + name);
    if (el) { el.classList.add('active'); }
  }

  function render() {
    var route = currentRoute();
    if (route.name === 'detail') {
      document.getElementById('detail-title').textContent = DETAIL_TITLES[route.key];
      renderDetail(route.key);
      showView('detail');
    } else {
      showView(route.name);
      if (route.name === 'register') {
        var submitBtn = document.getElementById('submit');
        submitBtn.textContent = D.COPY.SUBMIT_LABEL;
        syncSubmit();
      }
    }
  }

  var state = D.createInitialState();

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderParentRows() {
    var el = document.getElementById('parent-rows');
    if (!el) { return; }
    el.innerHTML = state.parents.map(function (p, i) {
      return '<div class="row">' +
        '<input type="text" class="parent-name" placeholder="请输入家长姓名" value="' + esc(p) + '" data-index="' + i + '">' +
        '<button type="button" class="row-del" data-index="' + i + '">×</button>' +
        '</div>';
    }).join('');
  }

  function renderChildRows() {
    var el = document.getElementById('child-rows');
    if (!el) { return; }
    el.innerHTML = state.children.map(function (c, i) {
      var options = D.GRADES.map(function (g) {
        return '<option value="' + esc(g) + '"' + (c.grade === g ? ' selected' : '') + '>' + esc(g) + '</option>';
      }).join('');
      var courseOptions = D.COURSES.map(function (co) {
        var checked = c.courses.indexOf(co) !== -1 ? ' checked' : '';
        return '<label><input type="checkbox" class="child-course-option" value="' + esc(co) + '" data-index="' + i + '"' + checked + '> ' + esc(co) + '</label>';
      }).join('');
      var chips = c.courses.map(function (co) {
        return '<span class="chip">' + esc(co) + '</span>';
      }).join('');
      var btnLabel = c.courses.length ? '已选 ' + c.courses.length + ' 门课程' : '请选择课程';
      return '<div class="child-card">' +
        '<div class="row">' +
          '<input type="text" class="child-name" placeholder="请输入孩子姓名" value="' + esc(c.name) + '" data-index="' + i + '">' +
          '<select class="child-grade" data-index="' + i + '"><option value="">请选择年级</option>' + options + '</select>' +
          '<button type="button" class="row-del" data-index="' + i + '">×</button>' +
        '</div>' +
        '<div class="child-course-row">' +
          '<button type="button" class="course-select child-course-select" data-index="' + i + '">' + btnLabel + '</button>' +
        '</div>' +
        '<div class="course-menu child-course-menu" data-index="' + i + '">' + courseOptions + '</div>' +
        '<div class="chips">' + chips + '</div>' +
      '</div>';
    }).join('');
  }

  function renderRegister() {
    renderParentRows();
    renderChildRows();
  }

  function renderResult() {
    document.getElementById('result-red').textContent = D.COPY.RESULT_RED_TEXT;
    document.getElementById('video-placeholder').textContent = D.COPY.VIDEO_PLACEHOLDER;
    document.getElementById('wechat-line').textContent = D.COPY.WECHAT_LINE;
  }

  function renderDetail(key) {
    var body = document.getElementById('detail-body');
    if (!body) { return; }

    if (key === 'course') {
      body.innerHTML = D.FEATURES.map(function (f) {
        var extra = '';
        if (f.groups) {
          extra = '<div class="feat-groups">' + f.groups.map(function (g) {
            return '<div class="feat-group"><span class="feat-group-name">' + esc(g[0]) + '</span><span class="feat-group-items">' + esc(g[1]) + '</span></div>';
          }).join('') + '</div>';
        } else if (f.points) {
          extra = '<ul class="feat-points">' + f.points.map(function (p) {
            return '<li>' + esc(p) + '</li>';
          }).join('') + '</ul>';
        }
        return '<div class="detail-block" style="border-left:6px solid ' + f.accent + '">' +
          '<div class="detail-block-head">' +
            '<span class="detail-art">' + D.featureArt(f.key) + '</span>' +
            '<div class="detail-block-title"><h3>' + esc(f.title) + '</h3><p class="detail-subtitle">' + esc(f.subtitle) + '</p></div>' +
          '</div>' +
          '<p class="detail-desc">' + esc(f.desc) + '</p>' +
          extra +
          '</div>';
      }).join('');
    } else if (key === 'teachers') {
      body.innerHTML = '<div class="detail-teacher-list">' + D.TEACHERS.map(function (t) {
        return '<div class="detail-teacher">' +
          '<img class="detail-teacher-photo" src="' + esc(t.photo) + '" alt="' + esc(t.name) + '">' +
          '<div class="detail-teacher-main">' +
            '<div class="detail-teacher-name">' + esc(t.name) + '<span class="school-badge">' + esc(t.school) + '</span></div>' +
            '<div class="detail-teacher-section"><h4>荣誉</h4><ul>' + t.honors.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>' +
            '<div class="detail-teacher-section"><h4>教学经历</h4><p>' + esc(t.experience) + '</p></div>' +
          '</div>' +
          '</div>';
      }).join('') + '</div><div class="more-teachers">' + esc(D.COPY.MORE_TEACHERS) + '</div>';
    } else if (key === 'works') {
      body.innerHTML = '<div class="work-list">' + D.WORKS.map(function (w) {
        return '<div class="work-item">' +
          '<div class="work-item-image"><img class="work-item-img" src="' + esc(w.image) + '" alt="' + esc(w.title) + '"></div>' +
          '<div class="work-item-body">' +
            '<div class="work-item-name">' + esc(w.name) + '</div>' +
            '<div class="work-item-title">' + esc(w.title) + '</div>' +
            '<p class="work-item-desc">' + esc(w.desc) + '</p>' +
          '</div>' +
          '</div>';
      }).join('') + '</div>';
    }
  }

  var countdown = null;

  function rowIndex(el) {
    var v = el.getAttribute('data-index');
    if (v === null || v === '') { return -1; }
    return parseInt(v, 10);
  }

  function setPhoneError(msg) {
    document.getElementById('phone-error').textContent = msg;
  }

  function clearPhoneError() {
    setPhoneError('');
  }

  function syncSubmit() {
    var btn = document.getElementById('submit');
    btn.disabled = !D.isComplete(state);
  }

  function sendCode() {
    var btn = document.getElementById('send-code');
    if (!D.isValidPhone(state.phone)) {
      setPhoneError(D.COPY.PHONE_ERROR);
      return;
    }
    clearPhoneError();
    if (countdown && countdown.isRunning()) { return; }
    btn.disabled = true;
    countdown = new D.Countdown({
      onTick: function (r) { btn.textContent = D.formatCountdownLabel(r); },
      onDone: function () { btn.disabled = false; btn.textContent = D.COPY.SEND_CODE_LABEL; },
      setIntervalFn: window.setInterval.bind(window),
      clearIntervalFn: window.clearInterval.bind(window)
    });
    countdown.start(D.COPY.COUNTDOWN_SECONDS);
  }

  var currentSubmissionId = null;

  function rememberSubmissionId(id) {
    currentSubmissionId = id;
    try { sessionStorage.setItem('submissionId', id); } catch (e) {}
  }

  function recallSubmissionId() {
    if (currentSubmissionId) { return currentSubmissionId; }
    try { currentSubmissionId = sessionStorage.getItem('submissionId') || null; } catch (e) {}
    return currentSubmissionId;
  }

  function saveResultChoice(choice) {
    var id = recallSubmissionId();
    var status = document.getElementById('result-save-status');
    if (!id) {
      if (status) { status.textContent = '未能关联到本次报名，请返回重新提交'; status.className = 'result-save-status error'; }
      return;
    }
    var attempt = function (n) {
      D.recordResultChoice(id, choice).then(function () {
        if (status) { status.textContent = '结果已记录'; status.className = 'result-save-status ok'; }
      }, function () {
        if (n < 1) { setTimeout(function () { attempt(n + 1); }, 1500); }
        else if (status) { status.textContent = '结果记录失败，请检查网络后重试'; status.className = 'result-save-status error'; }
      });
    };
    attempt(0);
  }

  function submit() {
    var btn = document.getElementById('submit');
    if (btn.disabled) { return; }
    btn.disabled = true;
    btn.textContent = D.COPY.SUBMITTING_LABEL;

    var id = D.uuid();
    rememberSubmissionId(id);
    var payload = {
      id: id,
      parents: state.parents.join('、'),
      children: state.children.map(function (c) { return c.name + '（' + c.grade + '，课程：' + c.courses.join('、') + '）'; }).join('；'),
      courses: state.children.reduce(function (acc, c) {
        c.courses.forEach(function (co) { if (acc.indexOf(co) === -1) { acc.push(co); } });
        return acc;
      }, []).join('、'),
      phone: state.phone,
      code: state.code
    };

    var go = function () { location.hash = '#/result'; };
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 5000); });
    Promise.race([D.submitRegistration(payload), timeout]).then(go, go);
  }

  function bindEvents() {
    document.getElementById('add-parent').addEventListener('click', function () {
      state = D.addParent(state);
      renderParentRows();
      syncSubmit();
    });

    document.getElementById('add-child').addEventListener('click', function () {
      state = D.addChild(state);
      renderChildRows();
      syncSubmit();
    });

    document.getElementById('parent-rows').addEventListener('input', function (e) {
      if (e.target.classList.contains('parent-name')) {
        state = D.updateParent(state, rowIndex(e.target), e.target.value);
        syncSubmit();
      }
    });

    document.getElementById('parent-rows').addEventListener('click', function (e) {
      if (e.target.classList.contains('row-del')) {
        state = D.removeParent(state, rowIndex(e.target));
        renderParentRows();
        syncSubmit();
      }
    });

    document.getElementById('child-rows').addEventListener('input', function (e) {
      if (e.target.classList.contains('child-name')) {
        state = D.updateChild(state, rowIndex(e.target), 'name', e.target.value);
        syncSubmit();
      }
    });

    document.getElementById('child-rows').addEventListener('change', function (e) {
      if (e.target.classList.contains('child-grade')) {
        state = D.updateChild(state, rowIndex(e.target), 'grade', e.target.value);
        syncSubmit();
      } else if (e.target.classList.contains('child-course-option')) {
        state = D.toggleCourse(state, rowIndex(e.target), e.target.value);
        renderChildRows();
        syncSubmit();
      }
    });

    document.getElementById('child-rows').addEventListener('click', function (e) {
      if (e.target.classList.contains('row-del')) {
        state = D.removeChild(state, rowIndex(e.target));
        renderChildRows();
        syncSubmit();
      } else if (e.target.classList.contains('child-course-select')) {
        var menu = document.querySelector('.child-course-menu[data-index="' + rowIndex(e.target) + '"]');
        if (menu) { menu.classList.toggle('open'); }
      }
    });

    document.getElementById('phone').addEventListener('input', function (e) {
      state = D.setPhone(state, e.target.value);
      if (e.target.value !== '' && !D.isValidPhone(e.target.value)) {
        setPhoneError(D.COPY.PHONE_ERROR);
      } else {
        clearPhoneError();
      }
      syncSubmit();
    });

    document.getElementById('code').addEventListener('input', function (e) {
      state = D.setCode(state, e.target.value);
      var codeError = document.getElementById('code-error');
      if (e.target.value !== '' && !D.isValidCode(e.target.value)) {
        codeError.textContent = D.COPY.CODE_ERROR;
      } else {
        codeError.textContent = '';
      }
      syncSubmit();
    });

    document.getElementById('send-code').addEventListener('click', sendCode);

    document.getElementById('submit').addEventListener('click', submit);

    document.getElementById('btn-known').addEventListener('click', function () {
      document.getElementById('result-feedback').textContent = D.COPY.KNOWN_TEXT;
      saveResultChoice('家长已知悉');
    });

    document.getElementById('btn-unknown').addEventListener('click', function () {
      document.getElementById('result-feedback').textContent = D.COPY.UNKNOWN_TEXT;
      saveResultChoice('家长未知悉需回访');
    });
  }

  var initialized = false;

  function init() {
    if (initialized) { return; }
    initialized = true;
    renderPoster();
    renderRegister();
    renderResult();
    bindEvents();
    syncSubmit();
    render();
    window.addEventListener('hashchange', render);
  }

  window.App.init = init;
  window.App.render = render;
  window.App.renderRegister = renderRegister;

  if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    init();
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
