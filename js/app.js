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

  function init() {
    renderPoster();
    render();
  }

  window.App.init = init;
  window.App.render = render;

  if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    init();
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
