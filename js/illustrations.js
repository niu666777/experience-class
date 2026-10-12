(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function featureArt(key) {
    var art = {
      subjects: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="多学科">'
        + '<defs><linearGradient id="fa-sub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7BA6F2"/><stop offset="1" stop-color="#4E8EF7"/></linearGradient></defs>'
        + '<rect x="8" y="6" width="80" height="60" rx="14" fill="#EAF4FF" stroke="#4E8EF7" stroke-width="2.5"/>'
        + '<rect x="18" y="16" width="42" height="9" rx="4.5" fill="url(#fa-sub)"/>'
        + '<rect x="18" y="30" width="56" height="9" rx="4.5" fill="#F2A93B"/>'
        + '<rect x="18" y="44" width="34" height="9" rx="4.5" fill="#4FBF8E"/>'
        + '<circle cx="66" cy="47" r="8" fill="#8E6FE8"/>'
        + '<path d="M62 47 L66 50 L72 43" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
        + '</svg>',
      feedback: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="可视化反馈">'
        + '<rect x="8" y="6" width="80" height="60" rx="14" fill="#EAFBF1" stroke="#4FBF8E" stroke-width="2.5"/>'
        + '<rect x="22" y="14" width="42" height="42" rx="7" fill="#FFFFFF" stroke="#4E8EF7" stroke-width="2.5"/>'
        + '<rect x="38" y="9" width="10" height="8" rx="2" fill="#4E8EF7"/>'
        + '<rect x="27" y="46" width="7" height="7" rx="2" fill="#4E8EF7"/>'
        + '<rect x="37" y="38" width="7" height="15" rx="2" fill="#4FBF8E"/>'
        + '<rect x="47" y="31" width="7" height="22" rx="2" fill="#F2A93B"/>'
        + '<path d="M70 22 L86 22 M70 30 L84 30 M70 38 L88 38" stroke="#4FBF8E" stroke-width="3" stroke-linecap="round"/>'
        + '</svg>',
      continue: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="课后延续">'
        + '<rect x="8" y="6" width="80" height="60" rx="14" fill="#FFF4E2" stroke="#F2A93B" stroke-width="2.5"/>'
        + '<rect x="14" y="22" width="34" height="26" rx="6" fill="#F2A93B"/>'
        + '<rect x="14" y="22" width="34" height="7" fill="#E8952D"/>'
        + '<path d="M28 16 L36 44 L20 44 Z" fill="#F7C873"/>'
        + '<rect x="54" y="24" width="30" height="24" rx="12" fill="#FFFFFF" stroke="#4E8EF7" stroke-width="2.5"/>'
        + '<circle cx="62" cy="36" r="2.5" fill="#4E8EF7"/><circle cx="69" cy="36" r="2.5" fill="#4E8EF7"/><circle cx="76" cy="36" r="2.5" fill="#4E8EF7"/>'
        + '</svg>'
    };
    return art[key] || art.subjects;
  }

  // 课程特色的卡通配图（3:2，与插画框比例一致）
  var PHOTOS = {
    subjects: 'images/feature-subjects.png',
    feedback: 'images/feature-feedback.png',
    continue: 'images/feature-continue.png'
  };

  var PHOTO_ALT = {
    subjects: '举着双手的小朋友，周围环绕着书本、地球仪、火箭、画笔、足球等学科道具',
    feedback: '老师举着学情反馈单向孩子和家长讲解，桌上摊开课本',
    continue: '课后孩子在家书桌前写作业，家长站在身后陪伴'
  };

  // 首屏插画框：大配图 + 右下角小图标印章
  function featureCard(key) {
    var photo = PHOTOS[key] || PHOTOS.subjects;
    var alt = PHOTO_ALT[key] || '';
    return '<img src="' + photo + '" alt="' + alt + '" width="480" height="320">' + featureArt(key);
  }

  return { featureArt: featureArt, featureCard: featureCard };
});
