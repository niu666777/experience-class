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
      title: '多学科覆盖',
      text: '语文 / 数学 / 英语 / 体育 / 乐器 / 舞蹈 / 美术 / 编程 / 书法 / 口才 / 科学实验…… 全学科覆盖，总有一门适合您的孩子'
    },
    {
      key: 'feedback',
      title: '可视化反馈',
      text: '课堂全程记录答题正确率、发言次数、专注时长；课后生成 1 页学情反馈单；老师现场与家长沟通 5 分钟，不“上完就失联”'
    },
    {
      key: 'continue',
      title: '课后延续',
      text: '赠送课程配套讲义 + 同类题型拓展练习 5 道；3 天内可微信向老师提问；免费加入“每日一题”学习群'
    }
  ];

  const TEACHERS = [
    {
      name: '尹广洋',
      school: '天津大学',
      honors: '本科生国家奖学金、国创赛国家级银奖、大学生数学竞赛国赛一等奖…',
      photo: '图片'
    },
    {
      name: '牛世科',
      school: '天津大学',
      honors: '本科生国家奖学金、节能减排国赛二等奖、“力学+X”竞赛创新作品…',
      photo: '图片'
    },
    {
      name: '待补充',
      school: '待补充',
      honors: '待补充',
      photo: '图片'
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
    IMAGE_PLACEHOLDER: '图片'
  };

  return { GRADES, COURSES, FEATURES, TEACHERS, COPY };
});
