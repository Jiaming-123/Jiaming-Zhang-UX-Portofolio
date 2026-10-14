# UniLink Story 视频嵌入：位置、加载逻辑和完整代码

实现日期：2026-10-12。

2026-10-15 已替换为新的 UniLink presentation 视频；最新参数和验证见 `unilink-presentation-20261015.md`。下方代码与处理记录为 2026-10-12 的历史快照，不代表当前页面；当前实现以 src 中的文件为准，请勿恢复历史快照中已删除的章节。

## 代码库位置

- 播放器与文字：`src/components/unilink/UniLinkStory.tsx`
- 截图风格及响应式样式：`src/styles/unilink-story.css`
- 页面接入：`src/pages/UniLinkCaseStudy.tsx`，在 Overview hero 之后、Problem 之前渲染 `<UniLinkStory />`
- 视频：`public/media/unilink/unilink-story-20261012.mp4`
- 用户提供的清晰封面（无损 WebP；播放图标独立覆盖，保留原有样式、位置与比例）：`public/media/unilink/unilink-story-poster-v2-20261012.webp`
- 回归测试：`tests/unilink-story.test.mjs`

说明文字以 **An introduction video** 开头，按用户原文保留。

## 性能策略

初始只渲染封面和可访问的播放按钮，不创建 video 元素。滚动到这里也不会提前下载视频。用户点击后才设置真实视频 src，使用浏览器原生控件、playsInline 和 preload="none"，不添加重型播放器依赖。视频离开视口或页面隐藏时暂停；保留用户手动恢复播放的控制。容器提前保留宽高比，避免播放前后布局跳动。错误时保留重试按钮和直接打开视频的链接。

页面导出同时覆盖主 React 应用和单独构建的 UniLink 文档。素材是静态文件，支持 Range 请求；MP4 的 moov 元数据放在媒体数据前面（fast start）。

## 视频处理

原始文件 `IFO30008_Group12_A2_UniLink.mp4`：282919010 bytes。

发布文件：92915504 bytes；减少 67.2%。封面：1246476 bytes。

- 分辨率：2940 × 1656，未缩小。
- 帧率：30fps，未改变，无丢帧或重复帧。
- 时长：240.10 秒，保留全部内容。
- 视频从 HEVC Main 10 转为 H.264 High / yuv420p，CRF 22、medium preset。
- AAC 立体声音频直接复制，未重新压缩。
- 这是有损压缩，不是位级无损；对比 80–85 秒的抽样画面，SSIM 为 0.995638。抽样指标不能代表所有画面的质量或所有网络条件下的流畅度。
- 原始文件保持不变，没有放进 Git；Git 跟踪的是优化后的发布版本。

## 完整源代码

### src/components/unilink/UniLinkStory.tsx

```tsx
import { useEffect, useRef, useState } from 'react'
import '../../styles/unilink-story.css'

const videoSource = '/media/unilink/unilink-story-20261012.mp4'
const posterSource = '/media/unilink/unilink-story-poster-v2-20261012.webp'

export default function UniLinkStory() {
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!started || failed || !video) return

    video.focus({ preventScroll: true })
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    }, { threshold: 0 })

    observer.observe(video)
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      video.pause()
    }
  }, [started, failed])

  return (
    <section className="ul-section ul-story" id="unilink-introduction" aria-labelledby="unilink-story-title" tabIndex={-1}>
      <header className="ul-heading ul-story-heading">
        <span className="ul-kicker">01 / INTRODUCTION</span>
        <h2 id="unilink-story-title">The UniLink Story</h2>
        <div className="ul-lead">
          <p id="unilink-story-description">An introduction video to our Background &amp; Motivation, Main Design Concept, Prototype Demonstration and User Based Evaluation evidence.</p>
        </div>
      </header>

      <figure className="ul-story-player" data-lenis-prevent>
        {started && !failed ? (
          <video
            ref={videoRef}
            src={videoSource}
            poster={posterSource}
            width={2940}
            height={1656}
            controls
            playsInline
            autoPlay
            preload="none"
            tabIndex={0}
            aria-label="UniLink Group 12 introduction video"
            aria-describedby="unilink-story-description"
            onError={() => setFailed(true)}
          >
            Your browser does not support embedded video. <a href={videoSource}>Open the UniLink video</a>.
          </video>
        ) : (
          <button
            className="ul-story-play"
            type="button"
            aria-label={failed ? 'Retry the UniLink introduction video' : 'Play the UniLink introduction video'}
            onClick={() => { setFailed(false); setStarted(true) }}
          >
            <img src={posterSource} alt="INFO 30008 Interactive Technology Project — A2 Group 12 Presentation, UniLink" width={3428} height={1926} loading="lazy" decoding="async" />
            <svg className="ul-story-play-icon" viewBox="0 0 104 104" aria-hidden="true" focusable="false">
              <circle cx="52" cy="52" r="51.5" fill="#172b4c" fillOpacity=".4" stroke="#739fed" />
              <path d="M42 35 L70 52 L42 69 Z" fill="#74a3ef" stroke="#183552" strokeWidth=".7" />
            </svg>
          </button>
        )}
      </figure>
      {failed && <p className="ul-story-error" role="status">The video could not load. Try again, or <a href={videoSource}>open the video directly</a>.</p>}
    </section>
  )
}
```

### src/styles/unilink-story.css

```css
.ul-case .ul-story {
  padding-top: 48px;
  padding-bottom: 240px;
  background: var(--ul-paper);
}

.ul-story .ul-story-heading {
  max-width: none;
  margin-bottom: 72px;
}

.ul-story-heading .ul-lead {
  max-width: 670px;
  margin-left: 21%;
  margin-top: 46px;
}

.ul-story-player {
  width: min(100%, 1104px);
  aspect-ratio: 2940 / 1656;
  margin: 0 auto;
  background: #fff;
}

.ul-story-player video,
.ul-story-play,
.ul-story-play img {
  display: block;
  width: 100%;
  height: 100%;
}

.ul-story-player video,
.ul-story-play img {
  object-fit: contain;
}

.ul-story-play {
  position: relative;
  border: 0;
  border-radius: 0;
  padding: 0;
  background: #fff;
  cursor: pointer;
}

.ul-story-play:focus-visible {
  outline: 3px solid var(--ul-accent);
  outline-offset: 5px;
}

/* Preserve the original cover's grey circle and blue play icon independently. */
.ul-story-play-icon {
  position: absolute;
  left: 48.35%;
  top: 54.25%;
  width: 10.05%;
  height: auto;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.ul-story-error {
  max-width: 1104px;
  margin: 18px auto 0;
  color: var(--ul-muted);
  font-size: 14px;
}

.ul-story-error a {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .ul-case .ul-story { padding-bottom: 100px; }
  .ul-story-heading .ul-lead { margin-left: 12%; }
}

@media (max-width: 600px) {
  .ul-case .ul-story { padding: 48px 22px 64px; }
  .ul-story .ul-story-heading { margin-bottom: 32px; }
  .ul-story-heading .ul-lead { margin: 24px 0 0; }
}
```

### src/pages/UniLinkCaseStudy.tsx

```tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Users, UserRoundCheck } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Footer } from '../components/Layout'
import CaseStudyTimeline from '../components/unilink/CaseStudyTimeline'
import ConceptExploration from '../components/unilink/ConceptExploration'
import UniLinkStory from '../components/unilink/UniLinkStory'
import { ArtifactGallery, FeatureStory, ScreenImage } from '../components/unilink/CaseStudyMedia'
import { chapters, chapterId, flows, insights, iterations, prototypeUrl, recoveryScreens, researchArtifacts, supplementaryScreens, testingArtifacts } from '../data/unilink'
import '../styles/unilink.css'
import '../styles/unilink-palette.css'

const recoveryArtifacts = recoveryScreens.map(({ path, title, why, width, height }) => ({ src: path, title, caption: why, width, height }))

function Heading({ index, title, children }: { index: number; title: string; children?: React.ReactNode }) {
  return <header className="ul-heading"><span className="ul-kicker">{String(index+1).padStart(2,'0')} / {chapters[index]}</span><h2>{title}</h2>{children && <div className="ul-lead">{children}</div>}</header>
}
function Contribution({ label='My contribution', children }: { label?: string; children: React.ReactNode }) { return <aside className="ul-contribution"><span>{label}</span><p>{children}</p></aside> }
function Personas() {
  const [role,setRole]=useState<'student'|'mentor'>('student')
  return <div className="ul-personas">
    <div className="ul-subheading"><div><span className="ul-kicker">TWO SIDES OF THE SAME SERVICE</span><h3>A shared need. Different expectations.</h3></div><div className="ul-role-switch" role="group" aria-label="Choose research perspective">{(['student','mentor'] as const).map(r=><button type="button" key={r} aria-pressed={role===r} onClick={()=>setRole(r)}>{r==='student'?'Student':'Mentor'}</button>)}</div></div>
    <ArtifactGallery key={role} className="ul-persona-sequence" items={[
      {src:`persona-${role}.svg?v=20261004-clean-footer`,title:role==='student'?'Lina Chen / First-year student':'Aarav Patel / Potential peer mentor',caption:''},
      {src:`journey-${role}.svg?v=20261004-clean-footer`,title:role==='student'?'From uncertainty to focused support':'From willingness to sustainable contribution',caption:'',wide:true},
    ]} />
  </div>
}
export default function UniLinkCaseStudy() {
  const root=useRef<HTMLElement>(null)
  useEffect(()=>{
    const previousTitle=document.title
    const description=document.querySelector('meta[name="description"]')
    const previousDescription=description?.getAttribute('content') || ''
    document.title='UniLink — Peer Support for International Students | Jiaming Zhang'
    description?.setAttribute('content','A UX case study exploring how peer groups and verified mentors can help first-year international students find relevant, trusted support.')
    document.body.classList.add('unilink-page')
    const mm=gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      root.current?.querySelectorAll('.ul-heading, .ul-contribution').forEach(el=>gsap.from(el,{y:24,opacity:.3,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}))
    },root)
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
      gsap.from('.ul-hero-screens figure',{y:100,rotation:i=>i===1?0:i===0?-5:5,stagger:.07,ease:'none',scrollTrigger:{trigger:'.ul-hero',start:'top top',end:'bottom 75%',scrub:1}})
      gsap.from('.ul-source',{x:i=>(i-1)*50,y:20,stagger:.08,ease:'none',scrollTrigger:{trigger:'.ul-source-field',start:'top 85%',end:'bottom 65%',scrub:.5}})
      gsap.from('.ul-insight',{y:i=>i%2?50:15,rotation:i=>i%2?2:-2,stagger:.1,ease:'none',scrollTrigger:{trigger:'.ul-evidence-field',start:'top 80%',end:'center center',scrub:.6}})
      gsap.from('.ul-value-loop article',{y:20,opacity:.5,stagger:.15,scrollTrigger:{trigger:'.ul-value-loop',start:'top 85%',once:true}})
    },root)
    const element=root.current
    let disposed=false
    const refresh=()=>{if(!disposed)ScrollTrigger.refresh()}
    document.fonts.ready.then(refresh)
    element?.addEventListener('toggle',refresh,true)
    return ()=>{disposed=true;mm.revert();element?.removeEventListener('toggle',refresh,true);document.body.classList.remove('unilink-page');document.title=previousTitle;description?.setAttribute('content',previousDescription)}
  },[])
  return <>
    <main className="ul-case" ref={root}>
      <CaseStudyTimeline />
      <section className="ul-hero" id={chapterId('Overview')} tabIndex={-1}>
        <div className="ul-hero-top"><span className="ul-kicker">UX RESEARCH · PRODUCT DESIGN · 12-WEEK TEAM PROJECT</span><span className="ul-reading-time">CASE STUDY / 6–8 MIN READ</span></div>
        <div className="ul-hero-title"><h1>UniLink<span className="ul-title-mark" aria-hidden="true">↗</span></h1><div><p>Peer Support for<br />International Students</p><span>MELBOURNE / UNIVERSITY DESIGN PROJECT</span></div></div>
        <p className="ul-project-status">UniLink is a work in progress, not a finished product.</p>
        <div className="ul-hero-editorial"><h2>When information is everywhere,<br /><em>knowing who to trust</em><br />becomes the real problem.</h2><div><p>UniLink helps first-year international students find relevant peer communities and connect with verified senior mentors for more personal guidance.</p><a className="ul-text-link" href="#unilink-problem">Explore the case study <ArrowDown size={17} /></a><a className="ul-subtle-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">View Full Prototype <ArrowUpRight size={15}/></a></div></div>
        <div className="ul-hero-screens"><span className="ul-screen-side">RELEVANCE<br />TRUST<br />CONNECTION</span>{[flows[0].screens[4],flows[0].screens[0],flows[2].screens[0]].map((s,i)=><figure key={s.path}><ScreenImage screen={s} eager={i===1}/><figcaption>{['01 / A COMMUNITY','02 / A STARTING POINT','03 / A CONVERSATION'][i]}</figcaption></figure>)}</div>
        <dl className="ul-meta"><div><dt>TEAM</dt><dd>6 people</dd></div><div><dt>DURATION</dt><dd>12 weeks / one semester</dd></div><div><dt>ROLE</dt><dd>UX Designer · UX Researcher</dd></div><div><dt>FOCUS</dt><dd>Framing · Synthesis · Mentor experience · Evaluation</dd></div></dl>
        <p className="ul-hero-footnote">Key contributor to problem framing, research synthesis, concept convergence and design decisions.</p>
      </section>
      <UniLinkStory />
      <section className="ul-section ul-problem" id={chapterId('Problem')} tabIndex={-1}>
        <Heading index={1} title="Information was abundant. Confidence was harder to find."><p>New international students move between university websites, social platforms, friends and service providers. Relevance, sequence and credibility are rarely clear across all of them.</p></Heading>
        <div className="ul-source-field">{[['OFFICIAL SOURCES','Reliable','Fragmented and difficult to personalise'],['SOCIAL CONTENT','Fast and relatable','Inconsistent and sometimes promotional'],['PEERS','Contextual and human','Credibility and availability vary']].map(([label,title,copy])=><article className="ul-source" key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true"/></article>)}</div>
        <div className="ul-question"><span className="ul-kicker">THE DESIGN QUESTION</span><h3>How might peer support feel relevant, credible and easy to act on?</h3><p>Without turning every everyday question into a formal support process.</p></div>
      </section>
      <section className="ul-section ul-research" id={chapterId('Research')} tabIndex={-1}>
        <Heading index={2} title="Listening before designing."><p>Our research followed the international-student support ecosystem: the people asking for help, the peers sharing experience and the services around them.</p></Heading>
        <div className="ul-research-method"><strong>12<span>stakeholder interviews</span></strong><strong>12<span>early concept interviews</span></strong><p>Semi-structured interviews, recorded and transcribed with consent.</p></div>
        <div className="ul-evidence-field">{insights.map(([title,copy],i)=><article className="ul-insight" key={title}><span>INSIGHT / 0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <details className="ul-evidence-disclosure"><summary>Explore the original research evidence <span>4 artefacts ↗</span></summary><ArtifactGallery items={researchArtifacts}/></details>
        <Contribution>I helped shape the problem framing, conducted interviews and took a leading role in turning raw research into the synthesis that guided our concept direction.</Contribution>
        <Personas />
      </section>
      <ConceptExploration />
      <section className="ul-section ul-strategy" id={chapterId('Strategy')} tabIndex={-1}>
        <Heading index={4} title="One product. Two levels of peer support." />
        <div className="ul-two-lanes"><article><Users size={30}/><span>01 / BROAD OR RECURRING QUESTIONS</span><h3>Groups</h3><p>Topic-based communities lower the barrier to asking. Students can observe, contribute and return to shared knowledge.</p><ul><li>Low-pressure participation</li><li>Practical, contextual topics</li><li>Community knowledge</li></ul></article><div className="ul-lane-connector" aria-hidden="true"><ArrowRight/></div><article><UserRoundCheck size={30}/><span>02 / SPECIFIC PERSONAL GUIDANCE</span><h3>Mentors</h3><p>Relevant senior peers provide depth when a student needs a focused conversation about their own situation.</p><ul><li>Visible verification and background</li><li>Defined time and availability</li><li>Context before the conversation</li></ul></article></div>
        <p className="ul-strategy-footer"><Check size={18}/> Visible identity and contextual information reinforce trust across both experiences.</p>
      </section>
      <section className="ul-section ul-design" id={chapterId('Final Design')} tabIndex={-1}>
        <Heading index={5} title="From a support model to an experience."><p>Follow the decisions through the final Figma prototype. These are authentic interface exports; the case study explains the interactions around them.</p></Heading>
        <div className="ul-flow-links">{flows.map(f=><a key={f.id} href={`#flow-${f.id}`}>{f.id==='service'?'During service':f.id} <ArrowDown size={13}/></a>)}</div>
        {flows.map(flow=><FeatureStory key={flow.id} flow={flow}/>)}
        <details className="ul-evidence-disclosure ul-supplementary"><summary>Explore more prototype screens <span>16 screens · Approvals, points & rewards ↗</span></summary><p>Additional states show group approval, mentor accounts, feedback and reward redemption. Names, balances, statistics and rewards are illustrative prototype content.</p><ArtifactGallery items={supplementaryScreens} className="ul-screen-gallery" actionLabel="View screen" /></details>
        <details className="ul-evidence-disclosure ul-recovery"><summary>When the ideal path breaks <span>Continuity & recovery ↗</span></summary><p>The final Figma also contains mentor-unavailable, backup recommendation, handover and confirmation screens. These states consider how support can continue when availability changes.</p><ArtifactGallery items={recoveryArtifacts} className="ul-recovery-grid" actionLabel="View screen" /></details>
        <Contribution label="Design ownership">I owned the Mentor Booking, During-Service and Mentor Handover flows, from interaction structure to high-fidelity design and iteration.</Contribution>
        <div className="ul-consistency"><span className="ul-kicker">A SHARED DESIGN LANGUAGE</span><h3>Consistency across a six-person design team.</h3><p>Recurring navigation, verification, status labels, booking patterns and Link Points helped separate flows feel like one product. I reviewed cross-flow consistency and contributed to the high-fidelity system.</p><div className="ul-system-strip"><span>Navigation</span><span>Verification</span><span>Booking states</span><span>Link Points</span></div><small>Patterns visible across the authentic screens above. A standalone component-library export is pending.</small></div>
      </section>
      <section className="ul-section ul-testing" id={chapterId('Testing')} tabIndex={-1}>
        <Heading index={6} title="Testing both sides of the service."><p>A peer-support platform has to make sense to the person asking and the person giving their time. Evaluation followed discovery, trust, booking, mentor control and rewards.</p></Heading>
        <div className="ul-test-sample"><div className="ul-test-counts"><strong>8<span>first-year international students</span></strong><span className="ul-test-plus" aria-hidden="true">+</span><strong>3<span>Current peer mentors</span></strong><span className="ul-test-plus" aria-hidden="true">+</span><strong>2<span>Aspiring peer mentors</span></strong></div><p>13 participants in the team evaluation. The selected detail findings below are grounded in the student and mentor interviews.</p></div>
        <div className="ul-iterations">{iterations.map((t,i)=><article key={t.title}><div className="ul-iteration-title"><span>0{i+1}</span><h3>{t.title}</h3></div><div className="ul-iteration-body"><blockquote>“{t.quote}”<cite>{t.who} · supplied Week 9 UBE responses</cite></blockquote><dl><div><dt>EVIDENCE</dt><dd>{t.finding}</dd></div><div><dt>IMPLICATION</dt><dd>{t.implication}</dd></div><div><dt>DESIGN RESPONSE</dt><dd>{t.response}</dd></div></dl><span className="ul-response-status">{t.status}</span></div></article>)}</div>
        <details className="ul-evidence-disclosure"><summary>Inspect testing and iteration evidence <span>4 artefacts ↗</span></summary><ArtifactGallery items={testingArtifacts}/><div className="ul-evidence-pending"><strong>Full evaluation overview</strong><span>Testing evidence — image pending</span><p>The supplied notes document two individual perspectives. A consolidated record of all 13 participants has not yet been supplied.</p></div></details>
        <Contribution>I organised and conducted user testing, then used the evidence to review service status, cross-flow consistency and the expectations around mentor support.</Contribution>
      </section>
      <section className="ul-section ul-sustainability" id={chapterId('Sustainability')} tabIndex={-1}>
        <Heading index={7} title="Designing an incentive loop, not an ad feed."><p>A proposed reward ecosystem recognises the time mentors contribute. Sponsorship and partnership fees could support rewards without turning peer advice into advertising.</p></Heading>
        <div className="ul-value-loop">{[['01','Students','Receive relevant peer support and bookable mentor guidance.'],['02','Mentors','Contribute lived experience, earn Link Points and redeem rewards.'],['03','Sponsors','Fund rewards and gain clearly labelled exposure around the Rewards experience.']].map(([n,t,p])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p><ArrowRight aria-hidden="true"/></article>)}</div>
        <p className="ul-loop-return">↳ Recognition supports continued contribution to the UniLink ecosystem.</p>
        <div className="ul-trust-rule"><span>THE TRUST RULE</span><p>Sponsorship must never influence mentor ranking or be disguised as peer advice.</p></div><p className="ul-note">Hypothetical categories include cafés, study supplies and local student services. No partnerships are claimed. Mentor feedback suggests rewards should complement willingness to help; the model is not yet validated.</p>
      </section>
      <section className="ul-section ul-reflection" id={chapterId('Reflection')} tabIndex={-1}>
        <Heading index={8} title="Scope was a design decision." />
        <div className="ul-reflection-copy"><p>The most important shift in UniLink was deciding what the product should stop trying to solve. Early concepts explored AI guidance, task support and wider university-service connections. Tutor feedback and evaluation made the final proposition more specific.</p><p>Groups for low-pressure community support.<br/>Mentors for focused, bookable guidance.</p><p>This project changed how I think about leadership in collaborative design. It can mean framing the right problem, turning evidence into a shared direction, challenging ideas that drift from the research and helping the team decide what not to build.</p><p>The final prototype is a tested proposition for making trusted peer support easier to discover, evaluate and act on. It is not a finished service. Request controls, reward clarity, privacy boundaries and mentor capacity still deserve further evaluation.</p></div>
        <details className="ul-future"><summary>What I would measure next <span>Future success metrics +</span></summary><div>{[['Group activation','Do students join a relevant group after discovery?'],['Meaningful group engagement','Do students ask, respond or return after joining?'],['Mentor booking completion','Where do students abandon or complete the flow?'],['Mentor retention','Do mentors keep contributing over time?'],['Reward redemption','Do Link Points create meaningful motivation?'],['Return usage','Do students come back when a new problem appears?']].map(([t,p])=><article key={t}><h3>{t}</h3><p>{p}</p></article>)}</div><p className="ul-note">Proposed measures for future development. No live performance data is claimed.</p></details>
        <div className="ul-ending" id="unilink-end"><span className="ul-kicker">THE COMPLETE EXPERIENCE</span><h3>Explore the complete prototype.</h3><p>This case study focuses on the two final product pillars. The full prototype contains the detailed interaction states and flows developed during the project.</p><a className="ul-button" href={prototypeUrl} target="_blank" rel="noopener noreferrer">View Full Prototype <ArrowUpRight size={18}/></a></div>
        <Link to="/projects/boardgamemate" className="ul-next"><span>NEXT PROJECT</span><strong>BoardGameMate</strong><ArrowUpRight/></Link>
      </section>
    </main><Footer/>
  </>
}
```

### tests/unilink-story.test.mjs

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

const component = read('src/components/unilink/UniLinkStory.tsx')
const page = read('src/pages/UniLinkCaseStudy.tsx')
const videoPath = 'media/unilink/unilink-story-20261012.mp4'
const posterPath = 'media/unilink/unilink-story-poster-v2-20261012.webp'

test('UniLink story matches the requested introduction and precedes Problem', () => {
  assert.ok(component.includes('01 / INTRODUCTION'))
  assert.ok(component.includes('The UniLink Story'))
  assert.ok(component.includes('An introduction video to our Background &amp; Motivation, Main Design Concept, Prototype Demonstration and User Based Evaluation evidence.'))
  assert.ok(page.indexOf('<UniLinkStory />') < page.indexOf('className="ul-section ul-problem"'))
})

test('UniLink video mounts only after play, with native controls and offscreen cleanup', () => {
  for (const required of ['useState(false)', 'started && !failed', 'preload="none"', 'controls', 'playsInline', 'IntersectionObserver', 'visibilitychange', 'observer.disconnect()', 'video.pause()', 'loading="lazy"', 'role="status"']) {
    assert.ok(component.includes(required), required)
  }
  assert.ok(!component.includes('onTimeUpdate'))
})

test('UniLink clean cover keeps the existing play overlay and click behaviour', () => {
  assert.ok(component.includes('width={3428} height={1926}'))
  assert.ok(component.includes('className="ul-story-play-icon"'))
  assert.ok(component.includes('setFailed(false); setStarted(true)'))
  const css = read('src/styles/unilink-story.css')
  assert.ok(css.includes('left: 48.35%'))
  assert.ok(css.includes('top: 54.25%'))
  assert.ok(css.includes('pointer-events: none'))
})

test('UniLink video and poster are included unchanged in both release outputs', () => {
  const root = new URL('../', import.meta.url)
  for (const asset of [videoPath, posterPath]) {
    const source = fs.readFileSync(new URL('public/' + asset, root))
    for (const output of ['dist-production', '.vercel/output/static']) {
      assert.deepEqual(fs.readFileSync(new URL(output + '/' + asset, root)), source)
    }
  }
  const size = fs.statSync(new URL('public/' + videoPath, root)).size
  assert.ok(size < 95_000_000, 'video stays under the GitHub single-file limit with headroom')
  const html = read('dist-production/projects/unilink/index.html')
  const bundlePath = html.match(/src="\/(unilink-assets\/[^" ]+\.js)"/)?.[1]
  assert.ok(bundlePath)
  for (const bundle of [builtJS('src/pages/UniLinkCaseStudy.tsx'), read('dist-production/' + bundlePath)]) {
    assert.ok(bundle.includes('/' + videoPath))
    assert.ok(bundle.includes('The UniLink Story'))
  }
})

test('UniLink MP4 metadata is ahead of media data for progressive playback', () => {
  const video = fs.readFileSync(new URL('../public/' + videoPath, import.meta.url))
  const boxes = []
  for (let offset = 0; offset + 8 <= video.length;) {
    const size = video.readUInt32BE(offset)
    boxes.push(video.toString('ascii', offset + 4, offset + 8))
    const length = size === 1 ? Number(video.readBigUInt64BE(offset + 8)) : size || video.length - offset
    assert.ok(length >= 8)
    offset += length
  }
  assert.ok(boxes.includes('moov') && boxes.includes('mdat'))
  assert.ok(boxes.indexOf('moov') < boxes.indexOf('mdat'))
})
```

