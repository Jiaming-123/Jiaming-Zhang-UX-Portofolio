# 首页双渐变球 Hero：完整代码与动画参数

实现日期：2026-10-12。该版本为首页默认 Hero，不需要预览查询参数。

## 代码位置与职责

- `src/components/Hero.tsx`：两个球、姓名、城市、介绍和关键词；监听页面可见性，并判断首屏是否进入视口。
- `src/styles/hero-spheres.css`：圆形尺寸、位置、渐变、旋转、响应式和顶部透明导航。
- `src/styles.css`：项目共用字体、颜色变量及 Hero 基础文字布局。本文最后附上相关基础 CSS；不要拿这些摘录覆盖整个全站样式文件。
- `src/pages/HomePage.tsx`：通过 `<Hero />` 渲染该首屏。
- `tests/hero-spheres.test.mjs`：默认双球、渐变色标、方向、减少动态效果和导航无黑线的回归测试。

React、framer-motion 和 lucide-react 已在项目安装。动画不是图片或视频，不需要新增图片、Canvas 或逐帧 JavaScript。

## 参数

W 代表 Hero 的宽度，H 代表 Hero 实际高度，V 代表小视口高度（CSS 的 100svh）。
两个球的尺寸相同。百分比 top 相对于 Hero 高度；vw 相对于浏览器视口宽度。

| 屏幕 | 直径 D | 左球位置 | 右球位置 |
|---|---|---|---|
| 桌面，宽度 ≥ 1024px | min(V, 0.58W) | left: 0；top: 50%；margin-top: -D/2 | right: 0；top: 50%；margin-top: -D/2 |
| 平板，768–1023px | min(0.9V, 0.76W) | 同桌面 | 同桌面 |
| 手机，宽度 ≤ 767px | 1.32W | left: -0.40W；top: 36%；margin-top: -D/2 | right: -0.55W；top: 47%；margin-top: -D/2 |

因此桌面／平板圆心为：
- 左球：(D/2, H/2)
- 右球：(W-D/2, H/2)

手机圆心为：
- 左球：(0.26W, 0.36H)
- 右球：(0.89W, 0.47H)

例如 1440 × 900px 视口、Hero 高度为 900px 时：D = 835.2px，左圆心 (417.6,450)，右圆心 (1022.4,450)。
390px 宽手机：D = 514.8px；左圆心 x = 101.4px，右圆心 x = 347.1px；y 按实际 Hero 高度计算。

| 动画项目 | 当前值 |
|---|---|
| 一圈时间 | 48 秒 |
| 角速度 | 360° / 48s = 7.5°/秒 |
| 左球 | 顺时针，180° → 540° |
| 右球 | 逆时针，0° → -360° |
| 速度曲线 | linear，匀速 |
| 循环 | infinite |
| 旋转轴 | transform-origin: center |
| 圆心移动速度 | 0px/s，圆心不移动 |
| 移动轨迹 | 没有平移、绕圈、碰撞或弹跳；只有渐变随圆形绕自身中心旋转 |
| 尺寸变化 | 不缩放；仅改变视口尺寸时重新计算响应式大小 |
| 启动与暂停 | Hero ≥ 约 8% 可见时可运行；低于阈值或页面隐藏时暂停 |
| 无障碍 | 系统 prefers-reduced-motion: reduce 时停止球旋转，姓名也不做进入位移动画 |

在屏幕坐标系中 y 向下，CSS 正角度为顺时针。设 t 为累计运行秒数：
- 左球角度：θL(t) = 180° + 7.5° × t
- 右球角度：θR(t) = -7.5° × t

“向内旋转”在此表示用户指定的两个相反旋转方向，不表示球的圆心向中间靠拢。

## 渐变色标

线性渐变方向为 180deg。浏览器会在三个色标之间连续插值。

| 色标位置 | 颜色 | 透明度 |
|---|---|---|
| 0% | #FFFFFF | 30%（alpha 0.30） |
| 38% | #0066FF | 13%（alpha 0.13） |
| 72% | #0066FF | 0%（alpha 0） |

72% 之后仍保持透明。背景底色为 #050B18；圆的边界通过 border-radius: 50% 形成，不使用模糊滤镜。
顶部导航在未滚动状态为透明，避免导航底部切出黑线；滚动后的紧凑导航仍使用原来的深色背景。

## 常用调整

- 改速度：只改 `--sphere-period: 48s`。24s 是 15°/秒；60s 是 6°/秒。
- 改桌面大小：改 `--sphere-size: min(100svh, 58vw)` 中的 58vw。
- 改手机大小：改手机媒体查询中的 132vw。
- 改位置：改左右球的 left/right 和 top；不要改旋转关键帧来移动圆心。
- 改亮度或蓝色强度：改 linear-gradient 里的 rgba alpha 值。
- 改起始亮部位置：同时改该球的静态 transform 和对应 keyframes 的 from/to，保持前后相差 ±360°，才能无缝循环。

## DESIGNING 关键词轮播

已恢复原来的单词轮播：PRODUCT → SERVICE → AI → INTERACTION → EXPERIENCE → PRODUCT。
每 1700ms 切换，退出和进入动画各 300ms；旧词向上淡出，新词从下方进入，一次仅显示一个词。
首屏不可见或页面隐藏时不更新；系统减少动态效果时固定显示 PRODUCT。
右侧介绍区域保留 146px 最小高度，避免轮播取代五行列表后把其他介绍文字向下挪动。

## 完整 Hero 组件

```tsx
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import '../styles/hero-spheres.css'
import { useLanguage } from '../i18n/language-context'

const keywords = ['PRODUCT', 'SERVICE', 'AI', 'INTERACTION', 'EXPERIENCE']
const chineseKeywords = ['产品', '服务', '人工智能', '交互', '体验']

export function Hero() {
  const { isChinese } = useLanguage()
  const visibleKeywords = isChinese ? chineseKeywords : keywords
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { amount: .08 })
  const reducedMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [keyword, setKeyword] = useState(0)
  const [portraitReady, setPortraitReady] = useState(false)
  const [portraitEntered, setPortraitEntered] = useState(false)

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!isInView || !pageVisible || reducedMotion) return
    const interval = window.setInterval(() => setKeyword(current => (current + 1) % keywords.length), 1700)
    return () => window.clearInterval(interval)
  }, [isInView, pageVisible, reducedMotion])

  return (
    <section ref={heroRef} className={`hero hero--rotating-spheres ${isInView ? 'is-in-view' : ''} ${pageVisible ? '' : 'hero--page-hidden'}`} id="top">
      <div className="hero-spheres" aria-hidden="true">
        <div className="hero-sphere hero-sphere--left" />
        <div className="hero-sphere hero-sphere--right" />
      </div>
      <div className="hero-content">
        <div className="hero-kicker"><span className="hero-location">{isChinese ? <>中国 · 深圳<br />澳大利亚 · 墨尔本</> : <>SHENZHEN, CN<br />MELBOURNE, AU</>}</span></div>
        <h1 aria-label="Jiaming Zhang">
          <motion.span initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .1 }}>JIAMING</motion.span>
          <motion.span className="outline-type" initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .18 }}>ZHANG</motion.span>
        </h1>
        <div className="hero-foot">
          <p>{isChinese ? '以设计连接人与产品和系统，创造有意义的互动体验。' : 'I design meaningful interactions between people, products, and systems.'}</p>
          <div className="hero-intro-wrap">
            <div className="hero-portrait">
              <div className="hero-portrait-window">
                <motion.img src="/images/hero-profile-20261013.png" alt={isChinese ? 'Jiaming Zhang 身穿毕业礼服，怀抱泰迪熊' : 'Jiaming Zhang in graduation robes holding a teddy bear'} width={1024} height={1536} fetchPriority="high" onLoad={() => setPortraitReady(true)} initial={reducedMotion ? false : { y: '100%' }} animate={{ y: reducedMotion || portraitReady ? '0%' : '100%' }} transition={{ duration: reducedMotion ? 0 : .95, delay: reducedMotion ? 0 : .35, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={definition => { if (portraitReady && typeof definition === 'object' && !Array.isArray(definition) && definition.y === '0%') setPortraitEntered(true) }} />
              </div>
              <motion.span className="hero-portrait-hi" lang="en" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: reducedMotion || portraitEntered ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : .5 }}>Hi! 👋</motion.span>
            </div>
            <p className="hero-intro">{isChinese ? 'Hi! 我是墨尔本大学用户体验设计专业的学生，热衷于通过交互、系统与游戏，打造数字与实体体验。' : 'Hi! I am a UX Design student at the University of Melbourne, interesting in creating digital and physical experiences through interaction, systems and play.'}</p>
            <div className="keyword-line">
              <span>{isChinese ? '设计领域' : 'DESIGNING'}</span>
              {reducedMotion ? <b>{visibleKeywords[0]}</b> : <AnimatePresence mode="wait" initial={false}><motion.b key={visibleKeywords[keyword]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .3 }}>{visibleKeywords[keyword]}</motion.b></AnimatePresence>}
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#featured" aria-label={isChinese ? '向下浏览精选作品' : 'Scroll to featured work'} data-cursor="link"><ArrowDown size={16} /><span>{isChinese ? '探索作品' : 'EXPLORE WORK'}</span></a>
    </section>
  )
}
```

## 完整双球与布局专用 CSS

```css
/* Homepage rotating-gradient spheres. Size and speed are configured below. */
.hero.hero--rotating-spheres {
  --sphere-size: min(100svh, 58vw);
  --sphere-period: 48s;
  overflow: clip;
  background: #050b18;
}

.hero--rotating-spheres::after { display: none; }
/* Keep the sphere continuous behind the top navigation; scrolled nav stays solid. */
body:has(.hero--rotating-spheres) .nav-shell:not(.is-compact) {
  background: transparent;
  border-bottom-color: transparent;
  box-shadow: none;
}
.hero-spheres { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.hero-sphere {
  position: absolute;
  top: 50%;
  margin-top: calc(var(--sphere-size) / -2);
  width: var(--sphere-size);
  height: var(--sphere-size);
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,.3) 0%, rgba(0,102,255,.13) 38%, rgba(0,102,255,0) 72%);
  transform-origin: center;
  will-change: transform;
}
.hero-sphere--left { left: 0; transform: rotate(180deg); animation: hero-sphere-clockwise var(--sphere-period) linear infinite; }
.hero-sphere--right { right: 0; animation: hero-sphere-counterclockwise var(--sphere-period) linear infinite; }
.hero--rotating-spheres:not(.is-in-view) .hero-sphere,
.hero--rotating-spheres.hero--page-hidden .hero-sphere { animation-play-state: paused; }

.hero.hero--rotating-spheres .hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100svh;
  min-height: 760px;
  padding: 35.8svh var(--side) 5svh;
  gap: 52px;
}
.hero--rotating-spheres .hero-kicker { position: absolute; top: 28.5svh; right: var(--side); }
.hero.hero--rotating-spheres h1 { margin: 0; flex-shrink: 0; overflow: visible; font-size: clamp(5rem, 13vw, 14rem); line-height: .77; }
.hero.hero--rotating-spheres .hero-foot { flex-shrink: 0; margin-top: auto; align-items: start; }
.hero--rotating-spheres .hero-intro-wrap { position: relative; grid-column: 2; max-width: 420px; min-height: 146px; }
.hero-portrait { position: absolute; bottom: 100%; left: 0; width: min(270px, 21vw, 43svh); margin: 0; }
.hero-portrait-window { overflow: hidden; aspect-ratio: 2 / 3; }
.hero-portrait-window img { display: block; width: 100%; height: 100%; object-fit: contain; }
.hero-portrait-hi { position: absolute; top: 3%; right: 8%; color: #fff; font-size: .85rem; transform: rotate(-12deg); }
.hero--rotating-spheres .hero-foot .hero-intro { font-size: .8rem; }

@keyframes hero-sphere-clockwise { from { transform: rotate(180deg); } to { transform: rotate(540deg); } }
@keyframes hero-sphere-counterclockwise { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

@media (max-width: 1023px) and (min-width: 768px) {
  .hero.hero--rotating-spheres { --sphere-size: min(90svh, 76vw); }
  .hero.hero--rotating-spheres .hero-content { padding-top: 34svh; }
  .hero--rotating-spheres .hero-kicker { top: 24svh; }
}
@media (max-width: 767px) {
  .hero.hero--rotating-spheres { --sphere-size: 74vw; min-height: 211vw; }
  .hero-sphere--left { left: -1vw; top: 50vw; margin-top: 0; }
  .hero-sphere--right { right: -1vw; top: 31vw; margin-top: 0; }
  .hero.hero--rotating-spheres .hero-content { height: auto; min-height: 211vw; padding: 41.5vw 5.6vw 22vw; gap: 0; }
  .hero.hero--rotating-spheres h1 { font-size: 22.5vw; padding-bottom: 0; }
  .hero.hero--rotating-spheres h1 > span:first-child { margin-left: -1.6vw; }
  .hero.hero--rotating-spheres h1 > .outline-type { margin-top: 9vw; margin-left: 25vw; }
  .hero.hero--rotating-spheres .hero-foot { display: flex; flex-direction: column; margin-top: -14.6vw; gap: 0; }
  .hero--rotating-spheres .hero-intro-wrap { display: contents; }
  .hero-portrait { position: relative; bottom: auto; left: -3vw; width: 34vw; order: 0; }
  .hero-portrait-hi { top: 6%; right: auto; left: 0; transform: rotate(12deg); font-size: .7rem; }
  .hero.hero--rotating-spheres .hero-foot > p { order: 1; font-size: 5.2vw; line-height: 1.3; letter-spacing: -.045em; }
  .hero--rotating-spheres .hero-foot .hero-intro { order: 2; margin-top: 7.2vw; font-size: 3.3vw; line-height: 1.65; }
  .hero--rotating-spheres .keyword-line { order: 3; margin-top: 7.5vw; font-size: 2.3vw; }
  .hero--rotating-spheres .hero-kicker { display: none; }
  .hero--rotating-spheres .scroll-cue { left: 5.6vw; right: auto; bottom: 7.5vw; font-size: 2.3vw; }
}
@media (prefers-reduced-motion: reduce) {
  .hero--rotating-spheres .hero-sphere { animation: none; will-change: auto; }
}
```

## 已有共享 Hero 基础 CSS

下列为项目已有共享样式中与 Hero 相关的部分。字体为 Inter 和 Space Grotesk。
全站变量包括 `--side: clamp(22px,4.7vw,76px)`、`--muted: #94a3b8`、`--cyan: #00d4ff`。
1023px 以下 --side = clamp(26px,5vw,52px)，767px 以下 --side = 22px。
专用 CSS 使用更高的选择器优先级覆盖尺寸和排版；共享样式不再包含旧网格、粒子和漂浮光晕。

```css
.hero { position: relative; min-height: 100svh; display: flex; align-items: flex-end; isolation: isolate; }
.hero-content { width: 100%; padding: 140px var(--side) 110px; }
.hero-kicker { display: flex; justify-content: flex-end; color: var(--muted); font-size: .64rem; letter-spacing: .2em; }
.hero-location { line-height: 1.7; text-align: right; }
.hero h1 { margin: clamp(42px, 7vh, 82px) 0 0; overflow: hidden; font: 500 clamp(5rem, 13.9vw, 13.8rem)/.73 'Space Grotesk'; letter-spacing: -.085em; }
.hero h1 > span { display: block; }
.outline-type { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.72); margin-left: 12.8vw; }
.hero-foot { margin-top: clamp(50px, 7vh, 82px); display: grid; grid-template-columns: 7fr 5fr; gap: 24px; align-items: end; }
.hero-foot > p { margin: 0; max-width: 780px; font: 400 clamp(1.45rem, 2.35vw, 2.5rem)/1.14 'Space Grotesk'; letter-spacing: -.045em; }
.hero-intro-wrap { display: grid; gap: 26px; max-width: 450px; justify-self: end; }
.hero-foot .hero-intro { margin: 0; color: var(--muted); font: 400 .9rem/1.65 Inter; letter-spacing: 0; }
.keyword-line { display: flex; align-items: center; gap: 12px; height: 21px; color: var(--muted); font-size: .58rem; letter-spacing: .18em; overflow: hidden; }
.keyword-line b { color: var(--cyan); font-weight: 500; }
.scroll-cue { position: absolute; right: var(--side); bottom: 26px; display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: .58rem; letter-spacing: .18em; }
@media (min-width: 1440px) {
  .hero h1 { font-size: min(13.9vw, 14.2rem); }
}
@media (max-width: 1023px) {
  .hero h1 { font-size: clamp(5.4rem, 14.5vw, 9.2rem); }
}
@media (max-width: 767px) {
  .hero { min-height: 820px; }
  .hero-content { padding-top: 110px; padding-bottom: 130px; }
  .hero-kicker span:last-child { display: none; }
  .hero h1 { margin-top: 70px; font-size: clamp(4.1rem, 22.5vw, 7.2rem); line-height: .78; }
  .outline-type { margin-left: 0; }
  .hero-foot { grid-template-columns: 1fr; margin-top: 65px; }
  .hero-foot > p { font-size: 1.5rem; }
  .hero-intro-wrap { justify-self: start; max-width: 100%; }
  .hero-foot .hero-intro { font-size: .82rem; }
  .scroll-cue { left: var(--side); right: auto; }
}
```
