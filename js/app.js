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

  function init() {
    renderPoster();
  }

  window.App.init = init;

  if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    init();
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
