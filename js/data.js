(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.App = root.App || {}; Object.assign(root.App, factory()); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const GRADES = [
    '幼儿园一年级', '幼儿园二年级', '幼儿园三年级',
    '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级',
    '初一', '初二', '初三',
    '高一', '高二', '高三',
    '本科/专科', '硕士', '博士'
  ];

  const COURSES = [
    '语文', '数学', '英语', '体育', '乐器', '舞蹈', '美术', '编程', '书法', '口才', '科学实验'
  ];

  const FEATURES = [
    {
      key: 'subjects',
      icon: '📚',
      title: '多学科覆盖',
      subtitle: '全学科覆盖，总有一门适合您的孩子',
      text: '语文 / 数学 / 英语 / 体育 / 乐器 / 舞蹈 / 美术 / 编程 / 书法 / 口才 / 科学实验…… 全学科覆盖，总有一门适合您的孩子',
      desc: '从语言、理科到艺体、科技，一站体验多种课程，让孩子先找到真正感兴趣的领域。',
      groups: [
        ['语言', '语文 · 英语 · 口才'],
        ['理科', '数学 · 科学实验'],
        ['艺体', '体育 · 乐器 · 舞蹈 · 美术 · 书法'],
        ['科技', '编程']
      ]
    },
    {
      key: 'feedback',
      icon: '📊',
      title: '可视化反馈',
      subtitle: '课堂表现看得见，不“上完就失联”',
      text: '课堂全程记录答题正确率、发言次数、专注时长；课后生成 1 页学情反馈单；老师现场与家长沟通 5 分钟',
      desc: '把看不见的学习过程变成一张清晰反馈单：学会了什么、哪里还要加强，一眼看清。',
      points: [
        '全程记录：答题正确率、发言次数、专注时长',
        '课后生成 1 页学情反馈单',
        '老师现场与家长沟通 5 分钟，给出后续学习建议'
      ]
    },
    {
      key: 'continue',
      icon: '🎁',
      title: '课后延续',
      subtitle: '体验结束，学习不结束',
      text: '赠送课程配套讲义 + 同类题型拓展练习 5 道；3 天内微信答疑；免费加入“每日一题”学习群',
      desc: '体验课不是终点，讲义、答疑、每日一题让学习状态不断线。',
      points: [
        '赠送课程配套讲义 + 同类题型拓展练习 5 道',
        '3 天内可微信向老师提问本节课相关问题',
        '免费加入“每日一题”学习群，持续保持学习状态'
      ]
    }
  ];

  const TEACHERS = [
    {
      name: '尹广洋',
      school: '天津大学',
      photo: 'images/teacher-yinguangyang.jpg',
      honors: ['本科生国家奖学金', '国创赛国家级银奖', '大学生数学竞赛国赛一等奖'],
      experience: '天津大学在读，长期辅导小学高年级至初中数学与思维拓展，擅长把抽象问题讲得直观有趣；累计授课 300+ 小时，注重培养解题习惯与举一反三的能力。'
    },
    {
      name: '牛世科',
      school: '天津大学',
      photo: 'images/teacher-niushike.jpg',
      honors: ['本科生国家奖学金', '节能减排国赛二等奖', '“力学+X”竞赛创新作品'],
      experience: '天津大学在读，专注物理与力学启蒙，喜欢用生活现象引入知识点；累计授课 200+ 小时，课堂节奏清晰，善于引导孩子动手验证、爱上思考。'
    }
  ];

  const WORKS = [
    {
      name: '小明 · 小学三年级',
      title: '数学思维笔记',
      desc: '用画图法整理“和差问题”，思路清晰、书写工整，被评为本期“最会讲题小老师”。',
      kind: 'math',
      color: '#4E8EF7'
    },
    {
      name: '小雨 · 初一',
      title: '科学实验报告',
      desc: '独立完成“种子发芽对比实验”，记录详实、结论完整，科学态度满分。',
      kind: 'science',
      color: '#4FBF8E'
    },
    {
      name: '朵朵 · 幼儿园大班',
      title: '创意美术《我的校园》',
      desc: '用拼贴和水彩画出心中的校园，色彩明亮，想象力满满。',
      kind: 'art',
      color: '#F2A93B'
    },
    {
      name: '乐乐 · 小学五年级',
      title: '编程小游戏',
      desc: '自己设计“接水果”小游戏，加入计分和音效，逻辑清晰、完成度高。',
      kind: 'code',
      color: '#8E6FE8'
    }
  ];

  const COPY = {
    PHONE_PLACEHOLDER: '12345678910',
    PHONE_ERROR: '请填写正确手机号',
    CODE_HINT: '请写出正确的四位数字验证码',
    CODE_ERROR: '请填写正确的验证码',
    CODE_LENGTH: 4,
    COUNTDOWN_SECONDS: 60,
    SEND_CODE_LABEL: '发送验证码',
    SUBMIT_LABEL: '立即报名',
    SUBMITTING_LABEL: '正在提交…',
    RESULT_RED_TEXT: '信息已收到\n报名结果将在24小时内通过电话或短信通知',
    DETAIL_PLACEHOLDER: '内容待更新',
    KNOWN_TEXT: '报名结束，请耐心等待通知',
    UNKNOWN_TEXT: '请添加课程微信详细了解或耐心等待电话回访',
    VIDEO_PLACEHOLDER: '往期家长或学生的课程或采访视频',
    WECHAT_LINE: '若需第一时间确定报名结果或了解详情\n请添加课程微信：12345678910',
    IMAGE_PLACEHOLDER: '图片',
    MORE_TEACHERS: '更多名师持续更新，敬请期待'
  };

  return { GRADES, COURSES, FEATURES, TEACHERS, WORKS, COPY };
});
