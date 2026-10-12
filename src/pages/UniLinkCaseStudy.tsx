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
