(function () {
  'use strict';
  var D = window.App;

  function renderPoster() {
    var featureList = document.getElementById('feature-list');
    if (featureList) {
      featureList.innerHTML = D.FEATURES.map(function (f) {
        return '<div class="feature-item">' +
          '<div class="feature-icon"></div>' +
          '<div class="feature-body"><h3>' + f.title + '</h3><p>' + f.text + '</p></div>' +
          '</div>';
      }).join('');
    }

    var teacherGrid = document.getElementById('teacher-grid');
    if (teacherGrid) {
      teacherGrid.innerHTML = D.TEACHERS.map(function (t) {
        return '<div class="teacher-card">' +
          '<div class="teacher-top">' +
            '<div class="teacher-photo">' + t.photo + '</div>' +
            '<div class="teacher-info">' +
              '<div class="teacher-name">' + t.name + '</div>' +
              '<div class="teacher-school">' + t.school + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="teacher-honors">' + t.honors + '</div>' +
          '</div>';
      }).join('');
    }

    var workGrid = document.getElementById('work-grid');
    if (workGrid) {
      var work = '';
      for (var i = 0; i < 3; i += 1) {
        work += '<div class="work-card">' +
          '<div class="work-photo">' + D.COPY.IMAGE_PLACEHOLDER + '</div>' +
          '<div class="work-label">往期学员作品（待更新）</div>' +
          '</div>';
      }
      workGrid.innerHTML = work;
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
      document.getElementById('detail-body').textContent = D.COPY.DETAIL_PLACEHOLDER;
      showView('detail');
    } else {
      showView(route.name);
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
      onDone: function () { btn.disabled = false; btn.textContent = D.COPY.SEND_CODE_LABEL; }
    });
    countdown.start(D.COPY.COUNTDOWN_SECONDS);
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
      syncSubmit();
    });

    document.getElementById('send-code').addEventListener('click', sendCode);
  }

  function init() {
    renderPoster();
    renderRegister();
    bindEvents();
    syncSubmit();
    render();
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
