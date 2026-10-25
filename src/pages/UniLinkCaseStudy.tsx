import { useUniLinkCopy } from '../i18n/unilink'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TranslatedImage from '../components/unilink/TranslatedImage'
import { Footer } from '../components/Layout'
import { LanguageSwitch } from '../i18n/Language'
import CaseStudyTimeline from '../components/unilink/CaseStudyTimeline'
import ConceptExploration from '../components/unilink/ConceptExploration'
import UniLinkStory from '../components/unilink/UniLinkStory'
import UniLinkEcosystem from '../components/unilink/UniLinkEcosystem'
import { ArtifactGallery, FeatureStory, ScreenImage } from '../components/unilink/CaseStudyMedia'
import { chapters, chapterId, flows, insights, iterations, prototypeUrl, recoveryScreens, supplementaryScreens } from '../data/unilink'
import '../styles/unilink.css'
import '../styles/unilink-palette.css'

const recoveryArtifacts = recoveryScreens.map(({ path, title, why, width, height }) => ({ src: path, title, caption: why, width, height }))

function Heading({ index, title, children }: { index: number; title: string; children?: React.ReactNode }) {
  const t = useUniLinkCopy()
  return <header className="ul-heading"><span className="ul-kicker">{String(index+1).padStart(2,'0')} / {t(chapters[index])}</span><h2>{title}</h2>{children && <div className="ul-lead">{children}</div>}</header>
}
function Contribution({ label='My contribution', children }: { label?: string; children: React.ReactNode }) {
  const t = useUniLinkCopy()
  return <aside className="ul-contribution"><span>{t(label)}</span><p>{children}</p></aside>
}
function Personas() {
  const t = useUniLinkCopy()
  const [role,setRole]=useState<'student'|'mentor'>('student')
  return <div className="ul-personas">
    <div className="ul-subheading"><div><span className="ul-kicker">{t("TWO SIDES OF THE SAME SERVICE")}</span><h3>{t("A shared need. Different expectations.")}</h3></div><div className="ul-role-switch" role="group" aria-label={t("Choose research perspective")}>{(['student','mentor'] as const).map(r=><button type="button" key={r} aria-pressed={role===r} onClick={()=>setRole(r)}>{r==='student'?t("Student"):t("Mentor")}</button>)}</div></div>
    <ArtifactGallery key={role} className="ul-persona-sequence" items={[
      {src:`persona-${role}-20261025.png`,title:role==='student'?t("Lisa / First-year student"):t("Aarav Patel / Potential peer mentor"),caption:'',width:1440,height:1080},
    ]} />
  </div>
}
export default function UniLinkCaseStudy() {
  const t = useUniLinkCopy()
  const root=useRef<HTMLElement>(null)
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content') || ''
    document.title = t('UniLink — Peer Support for International Students | Jiaming Zhang')
    description?.setAttribute('content', t('A UX case study exploring how peer groups and verified mentors can help first-year international students find relevant, trusted support.'))
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(frame)
      document.title = previousTitle
      description?.setAttribute('content', previousDescription)
    }
  }, [t])
  useEffect(()=>{
    document.body.classList.add('unilink-page')
    const mm=gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)',()=>{
      root.current?.querySelectorAll('.ul-heading, .ul-contribution').forEach(el=>gsap.from(el,{y:24,opacity:.3,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}))
    },root)
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
      gsap.from('.ul-hero-screens figure',{y:100,rotation:i=>i===1?0:i===0?-5:5,stagger:.07,ease:'none',scrollTrigger:{trigger:'.ul-hero',start:'top top',end:'bottom 75%',scrub:1}})
      gsap.from('.ul-source',{x:i=>(i-1)*50,y:20,stagger:.08,ease:'none',scrollTrigger:{trigger:'.ul-source-field',start:'top 85%',end:'bottom 65%',scrub:.5}})
      gsap.from('.ul-insight',{y:i=>i%2?50:15,rotation:i=>i%2?2:-2,stagger:.1,ease:'none',scrollTrigger:{trigger:'.ul-evidence-field',start:'top 80%',end:'center center',scrub:.6}})
      gsap.from('.ul-ecosystem article',{y:20,opacity:.5,stagger:.15,scrollTrigger:{trigger:'.ul-ecosystem',start:'top 85%',once:true}})
    },root)
    const element=root.current
    let disposed=false
    const refresh=()=>{if(!disposed)ScrollTrigger.refresh()}
    document.fonts.ready.then(refresh)
    element?.addEventListener('toggle',refresh,true)
    return ()=>{disposed=true;mm.revert();element?.removeEventListener('toggle',refresh,true);document.body.classList.remove('unilink-page')}
  },[])
  return <>
    <main className="ul-case" ref={root}>
      <div className="ul-language-control"><LanguageSwitch /></div>
      <CaseStudyTimeline />
      <section className="ul-hero" id={chapterId('Overview')} tabIndex={-1}>
        <div className="ul-hero-title"><h1>UniLink<span className="ul-title-mark" aria-hidden="true">↗</span></h1><div><p>{t("Peer Support for")}<br />{t("International Students")}</p><span>{t("MELBOURNE / UNIVERSITY DESIGN PROJECT")}</span></div></div>
        <div className="ul-hero-editorial"><h2>{t("When information is everywhere,")}<br /><em>{t("knowing who to trust")}</em><br />{t("becomes the real problem.")}</h2><div><p>{t("UniLink helps first-year international students find relevant peer communities and connect with verified senior mentors for more personal guidance.")}</p><a className="ul-text-link" href="#unilink-problem">{t("Explore the case study")} <ArrowDown size={17} /></a><a className="ul-subtle-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">{t("View Full Prototype")} <ArrowUpRight size={15}/></a></div></div>
        <div className="ul-hero-screens"><span className="ul-screen-side">{t("RELEVANCE")}<br />{t("TRUST")}<br />{t("CONNECTION")}</span>{[flows[0].screens[4],flows[0].screens[0],flows[2].screens[0]].map((s,i)=><figure key={s.path}><ScreenImage screen={s} eager={i===1}/><figcaption>{[t("01 / A COMMUNITY"),t("02 / A STARTING POINT"),t("03 / A CONVERSATION")][i]}</figcaption></figure>)}</div>
        <dl className="ul-meta"><div><dt>{t("TEAM")}</dt><dd>{t("6 people")}</dd></div><div><dt>{t("DURATION")}</dt><dd>{t("12 weeks / one semester")}</dd></div><div><dt>{t("ROLE")}</dt><dd>{t("UX Designer · UX Researcher")}</dd></div><div><dt>{t("FOCUS")}</dt><dd>{t("Framing · Synthesis · Mentor experience · Evaluation")}</dd></div></dl>
        <p className="ul-hero-footnote">{t("Key contributor to problem framing, research synthesis, concept convergence and design decisions.")}</p>
      </section>
      <UniLinkStory />
      <section className="ul-section ul-problem" id={chapterId('Problem')} tabIndex={-1}>
        <Heading index={1} title={t("Information was abundant. Confidence was harder to find.")}><p>{t("New international students move between university websites, social platforms, friends and service providers. Relevance, sequence and credibility are rarely clear across all of them.")}</p></Heading>
        <div className="ul-source-field">{[[t("OFFICIAL SOURCES"),t("Reliable"),t("Fragmented and difficult to personalise")],[t("SOCIAL CONTENT"),t("Fast and relatable"),t("Inconsistent and sometimes promotional")],[t("PEERS"),t("Contextual and human"),t("Credibility and availability vary")]].map(([label,title,copy])=><article className="ul-source" key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true"/></article>)}</div>
        <div className="ul-question"><span className="ul-kicker">{t("THE DESIGN QUESTION")}</span><h3>{t("How might peer support feel relevant, credible and easy to act on?")}</h3><p>{t("Without turning every everyday question into a formal support process.")}</p></div>
      </section>
      <section className="ul-section ul-research" id={chapterId('Research')} tabIndex={-1}>
        <Heading index={2} title={t("Listening before designing.")}><p>{t("Our research followed the international-student support ecosystem: the people asking for help, the peers sharing experience and the services around them.")}</p></Heading>
        <div className="ul-research-method"><strong>12<span>{t("stakeholder interviews")}</span></strong><strong>12<span>{t("early concept interviews")}</span></strong><p>{t("Semi-structured interviews, recorded and transcribed with consent.")}</p></div>
        <div className="ul-evidence-field">{insights.map(([title,copy],i)=><article className="ul-insight" key={title}><span>{t("INSIGHT")} / 0{i+1}</span><h3>{t(title)}</h3><p>{t(copy)}</p></article>)}</div>
        <Contribution>{t("I helped shape the problem framing, conducted interviews and took a leading role in turning raw research into the synthesis that guided our concept direction.")}</Contribution>
        <Personas />
      </section>
      <ConceptExploration />
      <section className="ul-section ul-design" id={chapterId('Final Design')} tabIndex={-1}>
        <Heading index={4} title={t("From a support model to an experience.")}><p>{t("Follow the decisions through the final Figma prototype. These are authentic interface exports; the case study explains the interactions around them.")}</p></Heading>
        <div className="ul-flow-links">{flows.map(f=><a key={f.id} href={`#flow-${f.id}`}>{f.id==='service'?t("During service"):t(f.id)} <ArrowDown size={13}/></a>)}</div>
        {flows.map(flow=><FeatureStory key={flow.id} flow={flow}/>)}
        <details className="ul-evidence-disclosure ul-supplementary"><summary>{t("Explore more prototype screens")} <span>{t("16 screens · Approvals, points & rewards ↗")}</span></summary><p>{t("Additional states show group approval, mentor accounts, feedback and reward redemption. Names, balances, statistics and rewards are illustrative prototype content.")}</p><ArtifactGallery items={supplementaryScreens} preserveEnglishImages className="ul-screen-gallery" actionLabel="View screen" /></details>
        <details className="ul-evidence-disclosure ul-recovery"><summary>{t("When the ideal path breaks")} <span>{t("Continuity & recovery ↗")}</span></summary><p>{t("The final Figma also contains mentor-unavailable, backup recommendation, handover and confirmation screens. These states consider how support can continue when availability changes.")}</p><ArtifactGallery items={recoveryArtifacts} preserveEnglishImages className="ul-recovery-grid" actionLabel="View screen" /></details>
        <Contribution label={t("Design ownership")}>{t("I owned the Mentor Booking, During-Service and Mentor Handover flows, from interaction structure to high-fidelity design and iteration.")}</Contribution>
      </section>
      <section className="ul-section ul-testing" id={chapterId('Testing')} tabIndex={-1}>
        <Heading index={5} title={t("Testing both sides of the service.")}><p>{t("A peer-support platform has to make sense to the person asking and the person giving their time. Evaluation followed discovery, trust, booking, mentor control and rewards.")}</p></Heading>
        <div className="ul-test-sample"><div className="ul-test-counts"><strong>8<span>{t("first-year international students")}</span></strong><span className="ul-test-plus" aria-hidden="true">+</span><strong>3<span>{t("Current peer mentors")}</span></strong><span className="ul-test-plus" aria-hidden="true">+</span><strong>2<span>{t("Aspiring peer mentors")}</span></strong></div><div className="ul-test-summary"><TranslatedImage src="/images/unilink/sus-score-76-7-20261018.webp" width={1294} height={370} alt={t("Average SUS score for 13 participants: 76.7, in the Good range of 68 to 80.3. Scale: Poor 0–51, Below average 51–68, Good 68–80.3, Excellent 80.3–100.")} /><p>{t("13 participants in the team evaluation. The selected detail findings below are grounded in the student and mentor interviews.")}</p></div></div>
        <div className="ul-iterations">{iterations.map((iteration,i)=><article key={t(iteration.title)}><div className="ul-iteration-title"><span>0{i+1}</span><h3>{t(iteration.title)}</h3></div><div className="ul-iteration-body"><blockquote>“{t(iteration.quote)}”<cite>{t(iteration.who)} · {t("supplied Week 9 UBE responses")}</cite></blockquote><dl><div><dt>{t("EVIDENCE")}</dt><dd>{t(iteration.finding)}</dd></div><div><dt>{t("IMPLICATION")}</dt><dd>{t(iteration.implication)}</dd></div><div><dt>{t("DESIGN RESPONSE")}</dt><dd>{t(iteration.response)}</dd></div></dl><span className="ul-response-status">{t(iteration.status)}</span></div></article>)}</div>
        <Contribution>{t("I organised and conducted user testing, then used the evidence to review service status, cross-flow consistency and the expectations around mentor support.")}</Contribution>
      </section>
      <section className="ul-section ul-sustainability" id={chapterId('Sustainability')} tabIndex={-1}>
        <Heading index={6} title={t("Designing an incentive loop rather than ad feed.")}><p>{t("A proposed reward ecosystem recognises the time mentors contribute. Sponsorship and partnership fees could support rewards without turning peer advice into advertising.")}</p></Heading>
        <UniLinkEcosystem />
        <div className="ul-trust-rule"><span>{t("THE TRUST RULE")}</span><p>{t("Sponsorship must never influence mentor ranking or be disguised as peer advice.")}</p></div><p className="ul-note">{t("Hypothetical categories include cafés, study supplies and local student services. No partnerships are claimed. Mentor feedback suggests rewards should complement willingness to help; the model is not yet validated.")}</p>
      </section>
      <section className="ul-section ul-reflection" id={chapterId('Reflection')} tabIndex={-1}>
        <Heading index={7} title={t("Scope was a design decision.")} />
        <div className="ul-reflection-copy"><p>{t("The most important shift in UniLink was deciding what the product should stop trying to solve. Early concepts explored AI guidance, task support and wider university-service connections. Tutor feedback and evaluation made the final proposition more specific.")}</p><p>{t("Groups for low-pressure community support.")}<br/>{t("Mentors for focused, bookable guidance.")}</p><p>{t("This project changed how I think about leadership in collaborative design. It can mean framing the right problem, turning evidence into a shared direction, challenging ideas that drift from the research and helping the team decide what not to build.")}</p><p>{t("The final prototype is a tested proposition for making trusted peer support easier to discover, evaluate and act on. It is not a finished service. Request controls, reward clarity, privacy boundaries and mentor capacity still deserve further evaluation.")}</p></div>
        <details className="ul-future"><summary>{t("What I would measure next")} <span>{t("Future success metrics +")}</span></summary><div>{[[t("Group activation"),t("Do students join a relevant group after discovery?")],[t("Meaningful group engagement"),t("Do students ask, respond or return after joining?")],[t("Mentor booking completion"),t("Where do students abandon or complete the flow?")],[t("Mentor retention"),t("Do mentors keep contributing over time?")],[t("Reward redemption"),t("Do Link Points create meaningful motivation?")],[t("Return usage"),t("Do students come back when a new problem appears?")]].map(([t,p])=><article key={t}><h3>{t}</h3><p>{p}</p></article>)}</div><p className="ul-note">{t("Proposed measures for future development. No live performance data is claimed.")}</p></details>
        <div className="ul-ending" id="unilink-end"><span className="ul-kicker">{t("THE COMPLETE EXPERIENCE")}</span><h3>{t("Explore the complete prototype.")}</h3><p>{t("This case study focuses on the two final product pillars. The full prototype contains the detailed interaction states and flows developed during the project.")}</p><a className="ul-button" href={prototypeUrl} target="_blank" rel="noopener noreferrer">{t("View Full Prototype")} <ArrowUpRight size={18}/></a></div>
        <Link to="/projects/boardgamemate" className="ul-next"><span>{t("NEXT PROJECT")}</span><strong>BoardGameMate</strong><ArrowUpRight/></Link>
      </section>
    </main><Footer/>
  </>
}
