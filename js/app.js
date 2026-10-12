(function () {
  'use strict';
  var D = window.App;

  function renderPoster() {
    var featureList = document.getElementById('feature-list');
    if (featureList) {
      featureList.innerHTML = D.FEATURES.map(function (f) {
        return '<div class="feature-item">' +
          '<div class="feature-icon">' + D.featureArt(f.key) + '</div>' +
          '<div class="feature-body"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></div>' +
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
          '<div class="teacher-honors">' + esc(t.honors.join('、')) + '</div>' +
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
      return '<div class="row">' +
        '<input type="text" class="child-name" placeholder="请输入孩子姓名" value="' + esc(c.name) + '" data-index="' + i + '">' +
        '<select class="child-grade" data-index="' + i + '"><option value="">请选择年级</option>' + options + '</select>' +
        '<button type="button" class="row-del" data-index="' + i + '">×</button>' +
        '</div>';
    }).join('');
  }

  function renderCourseMenu() {
    var el = document.getElementById('course-menu');
    if (!el) { return; }
    el.innerHTML = D.COURSES.map(function (c) {
      var checked = state.courses.indexOf(c) !== -1 ? ' checked' : '';
      return '<label><input type="checkbox" class="course-option" value="' + esc(c) + '"' + checked + '> ' + esc(c) + '</label>';
    }).join('');
  }

  function renderCourseChips() {
    var el = document.getElementById('course-chips');
    if (!el) { return; }
    el.innerHTML = state.courses.map(function (c) {
      return '<span class="chip">' + esc(c) + '</span>';
    }).join('');
  }

  function renderRegister() {
    renderParentRows();
    renderChildRows();
    renderCourseMenu();
    renderCourseChips();
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
    var row = el.closest('.row');
    return Array.prototype.indexOf.call(row.parentNode.children, row);
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

  function submit() {
    var btn = document.getElementById('submit');
    if (btn.disabled) { return; }
    btn.disabled = true;
    btn.textContent = D.COPY.SUBMITTING_LABEL;

    currentSubmissionId = D.uuid();
    var payload = {
      id: currentSubmissionId,
      parents: state.parents.join('、'),
      children: state.children.map(function (c) { return c.name + '（' + c.grade + '）'; }).join('、'),
      courses: state.courses.join('、'),
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
      }
    });

    document.getElementById('child-rows').addEventListener('click', function (e) {
      if (e.target.classList.contains('row-del')) {
        state = D.removeChild(state, rowIndex(e.target));
        renderChildRows();
        syncSubmit();
      }
    });

    document.getElementById('course-select').addEventListener('click', function () {
      document.getElementById('course-menu').classList.toggle('open');
    });

    document.getElementById('course-menu').addEventListener('change', function (e) {
      if (e.target.classList.contains('course-option')) {
        state = D.toggleCourse(state, e.target.value);
        renderCourseMenu();
        renderCourseChips();
        syncSubmit();
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
      D.recordResultChoice(currentSubmissionId, '我已知悉').catch(function () {});
    });

    document.getElementById('btn-unknown').addEventListener('click', function () {
      document.getElementById('result-feedback').textContent = D.COPY.UNKNOWN_TEXT;
      D.recordResultChoice(currentSubmissionId, '未知悉').catch(function () {});
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
