import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, MoveRight } from 'lucide-react'
import { Footer } from '../components/Layout'
import { IdeaPortfolio, ConversationEvidence } from '../components/culturelens/ProcessEvidence'
import { ConceptTransition, MuseumSystemMap, ProposalExplorer, PrototypeEvidence, ServiceBlueprint } from '../components/culturelens/CaseStudyModules'
import { chapters, signals } from '../data/cultureLensData'
import '../styles/culturelens.css'
import '../../public/culturelens-hero-overview.css'
import { setupChapterNavigation } from '../../public/culturelens-navigation.mjs'

function Chapter({ id, number, label, title, children, className = '' }: { id: string; number: string; label: string; title: string; children: ReactNode; className?: string }) {
  return <section id={`culturelens-${id}`} className={`culturelens-chapter ${className}`} data-culturelens-chapter={id}><header className="culturelens-chapter-heading"><span className="culturelens-label">{number} / {label}</span><h2>{title}</h2></header>{children}</section>
}

export default function CultureLensCaseStudy() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState('frame')
  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('culturelens-in-view')
    }), { threshold: .12 })
    element.querySelectorAll('.culturelens-chapter, .culturelens-signal-grid').forEach(node => observer.observe(node))
    const stopNavigation = setupChapterNavigation(element, setActive)
    return () => { observer.disconnect(); stopNavigation() }
  }, [])
  return <><main ref={root} className="culturelens-page">
    <header className="culturelens-hero">
      <div className="culturelens-hero-title">
        <h1>Culture<span>Lens</span><small>— Agentic Museum Concierge</small></h1>
      </div>
      <div className="culturelens-hero-composition">
        <div className="culturelens-gallery-label">
          <h2>What should<br />an intelligent<br />museum leave<br /><em>to you?</em></h2>
          <p>A futures-led service design case study exploring how agentic AI can guide visitors from discovery to a user-confirmed visit plan while preserving agency, accessibility and cultural trust.</p>
        </div>
        <div className="culturelens-hero-system" aria-label="Concept diagram: culture, context, choice">
          <div className="culturelens-exhibit-label">
            <span>01 / CULTURAL EXPERIENCE</span>
            <strong>People.<br />Objects.<br />Shared<br />meaning.</strong>
          </div>
          <div className="culturelens-hero-interface">
            <span className="culturelens-label">02 / SERVICE INTERFACE</span>
            <p>“Something quiet.<br />In Chinese.<br />Somewhere to sit.”</p>
            <div className="culturelens-interface-needs"><span>NEEDS CAPTURED</span></div>
            <div className="culturelens-interface-result">
              <h3>Everyday Objects,<br />Shared Cultures</h3>
              <Check size={16} aria-hidden="true" />
            </div>
            <small>Prototype catalogue · 45 min · Low sensory</small>
            <div className="culturelens-interface-options"><span>Compare</span><span>Change</span><span>Confirm ↗</span></div>
          </div>
          <div className="culturelens-hero-trace">
            <span>03 / DECISION TRACE</span>
            <code>request → context → suggestion → your<br />choice</code>
          </div>
        </div>
      </div>
      <section className="culturelens-hero-bottom culturelens-hero-overview" aria-label="Project overview">
        <div className="culturelens-overview-heading"><span>PROJECT OVERVIEW</span></div>
        <div className="culturelens-overview-grid"><p><strong>Context</strong><br />2026 · University of Melbourne · 3-person group project</p><p><strong>Disciplines</strong><br />Futures Thinking · Service Design · Systems Thinking · Agentic AI · Conversation Design · Prototyping</p><p><strong>Evidence</strong><br />Concepts, physical prototype and desktop walkthrough; Voiceflow structure, conversations, dummy data and breakdown analysis.</p><p><strong>Scope</strong><br />A refined design prototype. No real museum partnership, live booking integration or measured real-world impact is claimed.</p></div>
      </section>
    </header>
    <nav className="culturelens-chapter-nav" aria-label="CultureLens case study chapters"><span className="culturelens-nav-mark">C<span>L</span> /</span><div>{chapters.map((label, i) => <a key={label} href={`#culturelens-${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined}><small>0{i + 1}</small>{label}</a>)}</div></nav>
    <Chapter id="frame" number="01" label="FRAME / FUTURES THINKING" title="From cultural futures to a museum system.">
      <div className="culturelens-signal-grid">{signals.map(([title, text, decision], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><small>{decision}</small></article>)}</div>
      <div className="culturelens-frame-question"><span className="culturelens-label">DECISION CHECKPOINT 01</span><h3>What happens when these forces enter the museum?</h3><p>Discovery, accessibility and participation should grow together with visitor agency, human creativity and public accountability.</p></div>
      <h3 className="culturelens-subheading">The museum is a decision system.</h3><MuseumSystemMap />
    </Chapter>
    <Chapter id="explore" number="02" label="EXPLORE / IDEA PORTFOLIO" title="Three ways to make the museum more responsive."><IdeaPortfolio /><ProposalExplorer /></Chapter>
    <Chapter id="evolve" number="03" label="EVOLVE / PRINCIPLE TRANSFER" title="A new medium. The same responsibility." className="culturelens-evolve"><p className="culturelens-intro">MuseBand explored a speculative smart-museum system. CultureLens translated its strongest principles into a testable conversational service in Voiceflow.</p><ConceptTransition /><div className="culturelens-hmw"><span className="culturelens-label">THE CULTURELENS DESIGN QUESTION</span><h3>How might we help visitors plan, reserve, experience and reflect through a web-chat that turns a simple request into a transparent, user-confirmed visit journey?</h3></div></Chapter>
    <Chapter id="service" number="04" label="SERVICE / BLUEPRINT" title="A conversation that carries across the visit." className="culturelens-service"><p className="culturelens-intro">Exhibition choice, tickets, language, transport and comfort span multiple touchpoints. The service connects these small decisions while keeping adjustment available.</p><ServiceBlueprint /><p className="culturelens-checkpoint">DECISION CHECKPOINT 04 <MoveRight size={18} /> Open conversation → selected exhibition → structured preparation → visitor confirmation</p></Chapter>
    <div className="culturelens-agent-mode">
      <Chapter id="agent" number="05" label="AGENT / ORIGINAL VOICEFLOW BUILD" title="From conversation logic to project evidence."><div className="culturelens-prototype-evidence"><span className="culturelens-label">THE ORIGINAL VOICEFLOW BUILD</span><p>The recordings document the original Voiceflow project.</p><PrototypeEvidence /><ConversationEvidence /></div></Chapter>
    </div>
    <Chapter id="reflect" number="06" label="REFLECT / DESIGNING THE LIMITS" title="Leave the meaningful decisions with people." className="culturelens-reflect"><div className="culturelens-reflection-grid"><p className="culturelens-reflection-statement">Where should AI reduce friction?<br />Where should it expose its logic?<br /><em>Where should it step back?</em></p><div><p>CultureLens reframed the museum chatbot as a service orchestrator: connecting discovery, planning, accessibility and in-visit support while keeping meaningful decisions reversible.</p><p>The most useful refinement was the boundary between suggestion and action. A legible summary, persistent state and a genuine option to change matter as much as a fluent response.</p><p>This refined design prototype makes those decisions testable. But it actually does not establish real-world effectiveness, possible visitor evaluation, institutional content review and operational testing remain necessary.</p></div></div><div className="culturelens-contribution"><span className="culturelens-label">MY CONTRIBUTION / SHARED GROUP PROJECT</span><p>Developed through shared research, discussion and prototyping. My involvement included framing the agentic-AI opportunity, early concept sketches, dummy-data and concept documentation, and identifying refinements during the Voiceflow build. I also contributed to discussions about visitor control, accessibility and the appropriate role of AI in the museum service.</p></div></Chapter>
  </main><a className="case-next-project" data-case-theme="culturelens" href="/projects/crownlands"><span>NEXT PROJECT</span><strong>Crownlands</strong><ArrowUpRight aria-hidden="true" /></a><Footer /></>
}
