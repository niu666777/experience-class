(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function studentBoy() {
    return '<svg viewBox="0 0 140 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="卡通学生">' +
      '<rect x="10" y="60" width="34" height="50" rx="10" fill="#F2A93B"/>' +
      '<rect x="10" y="64" width="34" height="8" fill="#E8952D"/>' +
      '<rect x="48" y="108" width="14" height="28" rx="7" fill="#3A3540"/>' +
      '<rect x="78" y="108" width="14" height="28" rx="7" fill="#3A3540"/>' +
      '<ellipse cx="55" cy="140" rx="12" ry="6" fill="#E8952D"/>' +
      '<ellipse cx="85" cy="140" rx="12" ry="6" fill="#E8952D"/>' +
      '<path d="M42 58 L98 58 L94 112 L46 112 Z" fill="#4E8EF7"/>' +
      '<rect x="58" y="62" width="24" height="30" rx="8" fill="#FFFFFF"/>' +
      '<path d="M44 64 Q30 72 32 92" stroke="#FFD9B8" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<path d="M96 64 Q110 72 108 92" stroke="#FFD9B8" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<rect x="58" y="44" width="24" height="14" rx="7" fill="#FFD9B8"/>' +
      '<circle cx="70" cy="26" r="25" fill="#FFD9B8"/>' +
      '<path d="M45 24 Q44 0 70 0 Q96 0 95 24 Q92 10 70 10 Q48 10 45 24 Z" fill="#3A3540"/>' +
      '<circle cx="60" cy="28" r="3" fill="#3A3540"/>' +
      '<circle cx="80" cy="28" r="3" fill="#3A3540"/>' +
      '<path d="M62 38 Q70 44 78 38" stroke="#3A3540" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="52" cy="37" r="4" fill="#FFB3A0"/>' +
      '<circle cx="88" cy="37" r="4" fill="#FFB3A0"/>' +
      '</svg>';
  }

  function studentGirl() {
    return '<svg viewBox="0 0 140 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="卡通学生">' +
      '<circle cx="22" cy="24" r="12" fill="#6B4A2F"/>' +
      '<circle cx="118" cy="24" r="12" fill="#6B4A2F"/>' +
      '<rect x="48" y="108" width="13" height="28" rx="6" fill="#FFD9B8"/>' +
      '<rect x="79" y="108" width="13" height="28" rx="6" fill="#FFD9B8"/>' +
      '<ellipse cx="54" cy="140" rx="12" ry="6" fill="#E85D75"/>' +
      '<ellipse cx="86" cy="140" rx="12" ry="6" fill="#E85D75"/>' +
      '<path d="M42 58 L98 58 L108 112 L32 112 Z" fill="#E85D75"/>' +
      '<path d="M44 64 Q30 72 32 92" stroke="#FFD9B8" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<path d="M96 64 Q110 72 108 92" stroke="#FFD9B8" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<rect x="58" y="44" width="24" height="14" rx="7" fill="#FFD9B8"/>' +
      '<circle cx="70" cy="26" r="25" fill="#FFD9B8"/>' +
      '<path d="M45 24 Q46 0 70 0 Q94 0 95 24 Q91 9 70 9 Q49 9 45 24 Z" fill="#6B4A2F"/>' +
      '<path d="M46 12 Q26 10 22 24 Q30 18 46 16 Z" fill="#6B4A2F"/>' +
      '<path d="M94 12 Q114 10 118 24 Q110 18 94 16 Z" fill="#6B4A2F"/>' +
      '<circle cx="60" cy="28" r="3" fill="#3A3540"/>' +
      '<circle cx="80" cy="28" r="3" fill="#3A3540"/>' +
      '<path d="M62 38 Q70 44 78 38" stroke="#3A3540" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="52" cy="37" r="4" fill="#FFB3A0"/>' +
      '<circle cx="88" cy="37" r="4" fill="#FFB3A0"/>' +
      '</svg>';
  }

  function featureArt(key) {
    var art = {
      subjects: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="多学科">' +
        '<rect x="10" y="14" width="56" height="12" rx="4" fill="#4E8EF7"/>' +
        '<rect x="14" y="28" width="62" height="12" rx="4" fill="#F2A93B"/>' +
        '<rect x="8" y="42" width="52" height="12" rx="4" fill="#4FBF8E"/>' +
        '<rect x="70" y="16" width="14" height="44" rx="6" fill="#E8952D"/>' +
        '</svg>',
      feedback: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="可视化反馈">' +
        '<rect x="22" y="8" width="52" height="58" rx="8" fill="#FFFFFF" stroke="#4E8EF7" stroke-width="3"/>' +
        '<rect x="38" y="4" width="20" height="10" rx="3" fill="#4E8EF7"/>' +
        '<rect x="32" y="52" width="10" height="10" fill="#4E8EF7"/>' +
        '<rect x="45" y="42" width="10" height="20" fill="#4FBF8E"/>' +
        '<rect x="58" y="32" width="10" height="30" fill="#F2A93B"/>' +
        '</svg>',
      continue: '<svg viewBox="0 0 96 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="课后延续">' +
        '<rect x="8" y="26" width="42" height="32" rx="6" fill="#F2A93B"/>' +
        '<rect x="8" y="26" width="42" height="7" fill="#E8952D"/>' +
        '<rect x="25" y="20" width="8" height="44" fill="#F7C873"/>' +
        '<rect x="52" y="30" width="38" height="30" rx="15" fill="#EAF4FF" stroke="#4E8EF7" stroke-width="3"/>' +
        '<circle cx="63" cy="45" r="3" fill="#4E8EF7"/>' +
        '<circle cx="72" cy="45" r="3" fill="#4E8EF7"/>' +
        '<circle cx="81" cy="45" r="3" fill="#4E8EF7"/>' +
        '</svg>'
    };
    return art[key] || art.subjects;
  }

  function workArt(kind) {
    var art = {
      math: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="数学">' +
        '<rect x="16" y="8" width="72" height="70" rx="7" fill="#FFFFFF" stroke="#4E8EF7" stroke-width="3"/>' +
        '<line x1="26" y1="24" x2="78" y2="24" stroke="#4E8EF7" stroke-width="2"/>' +
        '<line x1="26" y1="36" x2="70" y2="36" stroke="#4E8EF7" stroke-width="2"/>' +
        '<text x="26" y="56" font-size="17" fill="#F2A93B" font-weight="bold">72 → 96</text>' +
        '<text x="26" y="74" font-size="13" fill="#3A3540">+24 分</text>' +
        '<rect x="96" y="10" width="10" height="60" rx="4" fill="#F2A93B"/>' +
        '<polygon points="96,10 106,10 101,4" fill="#F7C873"/>' +
        '</svg>',
      english: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="英语口语">' +
        '<circle cx="34" cy="46" r="20" fill="#FFD9B8"/>' +
        '<path d="M14 42 Q14 20 34 20 Q54 20 54 42 Q52 30 34 30 Q16 30 14 42 Z" fill="#8B5A2B"/>' +
        '<circle cx="27" cy="46" r="2.5" fill="#3A3540"/>' +
        '<circle cx="41" cy="46" r="2.5" fill="#3A3540"/>' +
        '<path d="M29 54 Q34 58 39 54" stroke="#3A3540" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<circle cx="86" cy="46" r="20" fill="#F4C9A0"/>' +
        '<path d="M66 42 Q66 20 86 20 Q106 20 106 42 Q104 30 86 30 Q68 30 66 42 Z" fill="#3A3540"/>' +
        '<circle cx="79" cy="46" r="2.5" fill="#3A3540"/>' +
        '<circle cx="93" cy="46" r="2.5" fill="#3A3540"/>' +
        '<path d="M81 54 Q86 58 91 54" stroke="#3A3540" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<path d="M54 28 Q64 16 58 6 Q63 16 71 28 Z" fill="#EAF4FF" stroke="#4E8EF7" stroke-width="2"/>' +
        '</svg>',
      science: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="科学实验">' +
        '<path d="M52 14 L68 14 L68 40 L90 72 Q94 80 78 80 L42 80 Q26 80 30 72 L52 40 Z" fill="#D9F2E7" stroke="#4FBF8E" stroke-width="3"/>' +
        '<rect x="50" y="6" width="20" height="10" rx="3" fill="#4FBF8E"/>' +
        '<circle cx="50" cy="58" r="5" fill="#4FBF8E"/>' +
        '<circle cx="64" cy="66" r="4" fill="#4FBF8E"/>' +
        '<path d="M96 34 Q104 24 106 14 Q112 24 104 36 Z" fill="#4FBF8E"/>' +
        '<line x1="104" y1="36" x2="104" y2="52" stroke="#4FBF8E" stroke-width="3"/>' +
        '</svg>',
      art: '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="创意美术">' +
        '<ellipse cx="54" cy="52" rx="32" ry="26" fill="#FCE7C1" stroke="#F2A93B" stroke-width="3"/>' +
        '<circle cx="41" cy="43" r="6" fill="#E45B5B"/>' +
        '<circle cx="58" cy="37" r="6" fill="#4E8EF7"/>' +
        '<circle cx="71" cy="50" r="6" fill="#4FBF8E"/>' +
        '<circle cx="51" cy="62" r="6" fill="#8E6FE8"/>' +
        '<rect x="88" y="24" width="10" height="52" rx="5" fill="#B78B5A" transform="rotate(28 93 50)"/>' +
        '</svg>'
    };
    return art[kind] || art.math;
  }

  return { studentBoy, studentGirl, featureArt, workArt };
});
