(function () {
  'use strict';
  var D = window.App;

  function renderPoster() {
    var featureList = document.getElementById('feature-list');
    if (featureList) {
      featureList.innerHTML = D.FEATURES.map(function (f) {
        return '<div class="feature-item">' +
          '<div class="feature-icon">' + f.icon + '</div>' +
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
          '<div class="work-photo">' + svgForWork(w.kind) + '</div>' +
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

  function svgForWork(kind) {
    var svgs = {
      math: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img">' +
        '<rect x="18" y="10" width="68" height="66" rx="6" fill="#FFFFFF" stroke="#4E8EF7" stroke-width="3"/>' +
        '<line x1="30" y1="28" x2="74" y2="28" stroke="#4E8EF7" stroke-width="2"/>' +
        '<line x1="30" y1="40" x2="74" y2="40" stroke="#4E8EF7" stroke-width="2"/>' +
        '<line x1="30" y1="52" x2="66" y2="52" stroke="#4E8EF7" stroke-width="2"/>' +
        '<line x1="30" y1="62" x2="58" y2="62" stroke="#F2A93B" stroke-width="3"/>' +
        '<rect x="94" y="12" width="10" height="58" rx="4" fill="#F2A93B"/>' +
        '<polygon points="94,12 104,12 99,4" fill="#F7C873"/>' +
        '</svg>',
      science: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img">' +
        '<path d="M52 14 L68 14 L68 40 L90 72 Q94 80 78 80 L42 80 Q26 80 30 72 L52 40 Z" fill="#D9F2E7" stroke="#4FBF8E" stroke-width="3"/>' +
        '<rect x="50" y="6" width="20" height="10" rx="3" fill="#4FBF8E"/>' +
        '<circle cx="50" cy="58" r="5" fill="#4FBF8E"/>' +
        '<circle cx="64" cy="66" r="4" fill="#4FBF8E"/>' +
        '<circle cx="72" cy="50" r="3" fill="#4FBF8E"/>' +
        '</svg>',
      art: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img">' +
        '<ellipse cx="56" cy="54" rx="34" ry="27" fill="#FCE7C1" stroke="#F2A93B" stroke-width="3"/>' +
        '<circle cx="42" cy="44" r="6" fill="#E45B5B"/>' +
        '<circle cx="60" cy="38" r="6" fill="#4E8EF7"/>' +
        '<circle cx="74" cy="52" r="6" fill="#4FBF8E"/>' +
        '<circle cx="52" cy="64" r="6" fill="#8E6FE8"/>' +
        '<rect x="88" y="28" width="10" height="50" rx="5" fill="#B78B5A" transform="rotate(30 93 53)"/>' +
        '</svg>',
      code: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img">' +
        '<rect x="22" y="14" width="76" height="52" rx="7" fill="#FFFFFF" stroke="#8E6FE8" stroke-width="3"/>' +
        '<path d="M40 28 L30 40 L40 52" fill="none" stroke="#8E6FE8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M80 28 L90 40 L80 52" fill="none" stroke="#8E6FE8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<line x1="55" y1="26" x2="65" y2="54" stroke="#F2A93B" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="18" y="72" width="84" height="10" rx="5" fill="#8E6FE8"/>' +
        '</svg>'
    };
    return svgs[kind] || svgs.math;
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
        return '<div class="detail-block">' +
          '<div class="detail-block-head"><span class="detail-icon">' + f.icon + '</span><h3>' + esc(f.title) + '</h3></div>' +
          '<p class="detail-subtitle">' + esc(f.subtitle) + '</p>' +
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
          '<div class="work-item-image">' + svgForWork(w.kind) + '</div>' +
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

  function submit() {
    var btn = document.getElementById('submit');
    if (btn.disabled) { return; }
    btn.disabled = true;
    btn.textContent = D.COPY.SUBMITTING_LABEL;
    setTimeout(function () {
      location.hash = '#/result';
    }, 500);
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
    });

    document.getElementById('btn-unknown').addEventListener('click', function () {
      document.getElementById('result-feedback').textContent = D.COPY.UNKNOWN_TEXT;
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
