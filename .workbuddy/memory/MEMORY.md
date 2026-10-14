# 项目长期记忆 · 体验课报名页

## 项目性质
单链接、页内 hash 路由的体验课报名 H5。**零依赖、零外链、零构建**，双击 `体验课报名系统.html` 即可打开。PRD 在 `PRD.md`（v3.1，视觉章节已同步实现）。

## 文件职责
- `体验课报名系统.html`：全部视图 + 内联 SVG 图标与手绘涂鸦。
- `css/styles.css`：唯一的样式表，设计令牌都在 `:root`。
- `js/data.js` 静态数据 · `validate.js` 校验 · `countdown.js` 倒计时 · `form-state.js` 表单纯函数 · `illustrations.js` 特色图标 · `config.js` Supabase 配置 · `backend.js` 后端调用 · `app.js` DOM 渲染与事件。
- 所有逻辑文件用同一套 UMD 包装（浏览器挂 `window.App`，Node 走 `module.exports`）。
- `tests/*.test.js` 用 Node 内置 `node --test` + jsdom，`npm test` 跑全量。

## 视觉规范（v4 2D 扁平彩铅手账风）
- 纸面：米白练习本**横线内页**（`--paper #FCFAF4`，30px 一行 `--paper-line`），桌面端 `#app` 叠一层带左侧红装订线的白纸。
- 关键令牌：`--blue #4E8DE8` / `--blue-deep #1B3C74`（描边与深蓝行动条）/ `--ink-line #A8C8F0`（卡片与插画框蓝墨描边）/ `--leaf #8ECFBE`（枝叶）/ `--ink-bar #1B3C74`。整体是**马卡龙柔化**过的蓝，不要再用 #2F6BFF/#4C86FF 这种高饱和蓝。
- 字体：标题 `--font-hand = "FZShuTi","方正舒体",…`；正文 `--font-round = "YouYuan","幼圆","Yuanti SC",…`。都是系统字体，零外链。
  - **坑 1（重要）**：**不要用手写体 + `-webkit-text-stroke` 来加粗**。描边画在字形中心线上，会吃掉方正舒体本来就细的笔画内腔；一旦和白色投影重叠，还会混出一圈**脏灰**，字号越大越糊。要"白字 + 粗描边"的贴纸效果，改用 `text-shadow` 八向实心投影（4 个轴向 + 4 个对角）。
  - **坑 2**：白字 + **同色** `-webkit-text-stroke` 会把字形吃成与底色一致 → **完全看不见**（`.module-title` 踩过）。那里改用 `text-shadow: ±0.7px 0 0 #FFF`。
- **彩铅颗粒**：`body::before` 铺一层 `feTurbulence` 噪点（fixed 全屏、opacity 0.8）。**绝对不要加 `mix-blend-mode`** —— 与 fixed 全屏层叠加时会被渲染成整屏同心圆环，headless 必现。
- **首屏**：浅蓝渐变 + 三处白色径向高光（蓝天白云）；左侧 `.binding` 内联 SVG 线圈；`.hero-label` 蓝底标签框 + `.hero-clip` 回形针；`.hero-ribbon` 蓝色缎带（`clip-path` 斜角飘带，**不要 rotate —— 用户明确要求别斜着**）；8 个描边涂鸦只贴四边。
- **首屏大标题 `.site-title`（第一视觉焦点）**：两行错位的方正舒体，「XXX体验课」`.title-l1`（`rotate(-1.2deg)`）与「报名啦！」`.title-l2`（`rotate(1.4deg)`）。41px / 桌面 54px，**白字 + `--blue-dark` 八向实心描边 + `6px 7px 0 rgba(27,60,116,.28)` 硬投影**，做成手绘贴纸。加大字号后曾挤到换行成三行，靠收紧 `.page-head` 左内边距（26px）和 `.hero-art` 宽（104px、`margin: 0 -6px 0 -30px`）解决 —— **再动这两个值要重新验证不换行**。
- **模块标题**：`.module-title` 绝对定位 `top:0; translateY(-50%)` 跨骑卡片上边框；胶带 `.module-card::before` 在右上角（三卡三色斜纹：琥珀黄/浅蓝/粉）。
- **卡片错落感**：`.module-card:nth-of-type(1/2/3)` 分别 `rotate(-0.9/0.7/-0.6deg)`，像便签贴在笔记本上；卡片下沿半跨一枚 `.mod-doodle` 32px 主题贴纸（烧杯/靶心/柱状图，`bottom:-14px`），图案必须和模块主题对应。
- **图文交替**：`.feature-item`、`.teacher-card` 左右并排 + `:nth-child(even)` 镜像 → 图-文 / 文-图。**禁止"一整块图 + 一整段文字"堆叠**（用户明确否掉过）。`.teacher-top` 用 `display:contents` 让照片脱出包裹层参与 grid。**全页必须蜡笔风图文嵌套**——师资/成果模块也曾因用真实照片被用户否掉（"整个报名页是蜡笔风，不仅仅是课程特色的某个图片"），v3.5 起全站插画化。
- 插画框 `.feature-icon` 固定 `aspect-ratio: 3/2` + `object-fit:cover`；原矢量图标降级成右下角小印章（测试断言 `.feature-icon svg` 必须存在，别删）。
- ✅ 项目符号：详情页 `.feat-points li` / `.detail-teacher-section li` 用蓝色勾选方框（data-URI SVG）作 `::before`。
- 按钮：主按钮是**蓝色**渐变（用户否掉过橙色）。底部 `.cta-bar` 是**深蓝通栏（`--ink-bar #1B3C74`）**，`position: sticky; bottom: 0` 吸底，通栏内**只有一个撑满整条的「立即报名」按钮**（手写体 19px/桌面 21px）—— 用户明确要求**不要任何其他文字、不要指引箭头**，辅助文案会稀释主按钮。改回多文案 = 回退用户的评审意见。

## 结构性约束（改动前必看）
`app.js` 生成的 class 名与数量是测试断言的一部分：`.feature-item`×3、`.teacher-card`×2、`.work-card`×3、`.module-card .link-more`×3、`.detail-block`×3、`.detail-teacher`×2、`.work-item`×4、`.teacher-photo/.teacher-name/.teacher-school`、`#feature-list .feature-icon svg`、`.detail-block .detail-art svg`×3。**改视觉可以，别改这些钩子。**

## 插画素材（AI 生成，v3.5 全页插画化）
- **全站 10 张插画统一彩铅蜡笔质感**（对齐素材一/素材二画风）：以 `素材一.jpg`/`素材二.jpg` 为 ImageGen 风格参考（`input_fidelity: high`）image-to-image 生成。包括 `hero-kids.png`（350×457 竖版）、`feature-subjects/feedback/continue.png`（480×320）、**v3.5 新换**：`teacher-yinguangyang.jpg`/`teacher-niushike.jpg`（Q版彩铅老师头像，208×260，覆盖原真实证件照）+ `work-math/english/science/art.jpg`（彩铅场景插画，480×320，覆盖原真实活动照）。**改画风必须以素材原图为参考重新生成，不要凭文字描述猜风格**——v3.2 之前踩过这个坑，生成的扁平矢量图被用户否掉。
- **`.jpg` 文件里装的是 PNG 数据（调色板 PNG8）**：测试断言锁死了 `src=images/teacher-yinguangyang.jpg` 后缀，而纯 Python 写不了 JPEG，故直接把 PNG 字节写入 .jpg 文件——浏览器（Blink）按魔数解码，file:// 与 GitHub Pages 均正常，已验证。
- **老师/成果卡样式**：头像贴纸化（ink-line 描边 + rotate(±2.2deg) 交替）；荣誉 `honor-tag` 逐枚小贴纸标签（奇卡琥珀黄/偶卡浅绿）；`work-card::before` 右上斜纹胶带 + `.work-label` 手写体。
- **hero 是米白不透明底** → `.hero-art` 用贴纸样式（ink-line 描边圆角 + rotate(2.5deg)），**不能再用负 margin 叠压标题**（不透明底会盖字）；移动端 `width: 76px` 是标题不换行的临界值，桌面 178px。
- 风格提示词模板：「完全模仿参考图的彩色铅笔手绘插画质感：蜡笔与彩铅混合涂抹笔触，颜色深浅不均匀、带明显的纸张颗粒感和手绘抖动轮廓线，2D平面卡通儿童教育插画，浅蓝米白底色，深蓝色描边，暖橙色和浅绿色点缀……画面中绝对不要出现任何文字。」
- **生成时的坑**：
  - ImageGen 传 `background: transparent` 不会真给透明通道（会把棋盘格画进像素），一律 `opaque`；
  - **同一秒并发多个 ImageGen 会返回同名文件互相覆盖**（v3.5 一次发 6 个丢了 2 张）——批量生成要么串行、要么生成完立即核对文件清单；
  - **水印检测阈值**：浅灰水印亮度可达 210+，`mx<206` 抓不到（teacher-niushike 残留过）——输出后必须放大右下角复查，抓不到就固定区域背景主色+噪声填充（老师竖版头像用 x≥0.80w, y≥0.895h）；
  - 提示词禁了字母仍可能出字母卡，用干净云区克隆覆盖，**克隆源要先确认没主体内容**。
- **本机没有 PIL 且 PyPI 不通**：纯手写 PNG 编解码（struct + zlib）。**PNG 编码只用 Sub 滤波（水平依赖）**——逐行最优滤波（Up/Avg/Paeth 依赖上一行）在这套手写编码器里出现过编码端 prev 链分叉 → 个别行整行花屏（噪线），排查极耗时；Sub 只依赖本行左侧，稳定。5-bit 桶键公式：8 位通道用 `>>3`（曾错写成 `>>10` 导致红通道被忽略、全图变暗）。后处理脚本必须加 `__main__` 保护，否则 import 即执行覆盖正式图片。量化流程：5-bit 直方图 → 中位切分 256 色 → PNG8（约 25–90KB/张）。

## 部署
远端 `origin = https://github.com/niu666777/experience-class.git`，用 `gh-pages` 发布：把 `体验课报名系统.html` 复制成 `index.html`，连同 `css/ js/ images/` 一起提交（不含 tests/PRD/素材）。可用 `git worktree add "$TEMP/ghp" gh-pages` 做同步。

## 环境注意
- 沙箱设置了 `HTTP_PROXY=http://127.0.0.1:56236`，只放行只读请求，**git push 会被 502 拦掉**；用户自建代理 `127.0.0.1:10808` 需处于开启状态。
- Edge 无头截图 `--window-size` 最小宽度被钳制在 459px，测 375px 需注入宽度约束的临时副本（`html,body{width:375px!important;overflow-x:hidden}#app{max-width:375px!important}`）。
- **截图必须带 `--virtual-time-budget`**：`.view.active` 有 0.28s 的 `fadeIn`（opacity 0→1），无头 Edge 默认在动画中途就抓图，整页被均匀蒙白 —— 表现为「色值全被冲淡、最暗像素只剩 (171,184,197)、强蓝像素 0」，极像样式被压白的假阳性，实际页面没问题。**移动端 2500 够，桌面端要 6000**（3000 仍会踩中）。排查手法：先用只有色块的 `_probe.html` 隔离（色块出正确色值 = 问题在页面渲染时机而非样式），再统计「强蓝像素数 / 最暗像素」量化比对。
