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
          <h2>A little help.<br />More room<br />to explore<br /><em>your way.</em></h2>
          <p>Finding an exhibition is just the start. CultureLens explores how an AI museum guide could help you choose what to see, plan the practical details and make changes along the way. You make the final call.</p>
        </div>
        <div className="culturelens-hero-system" aria-label="Concept diagram: culture, context, choice">
          <div className="culturelens-exhibit-label">
            <span>01 / CULTURAL EXPERIENCE</span>
            <strong>People.<br />Objects.<br />Shared<br />meaning.</strong>
          </div>
          <div className="culturelens-hero-interface">
            <span className="culturelens-label">02 / SERVICE INTERFACE</span>
            <p>“Something quiet.<br />In Chinese.<br />Somewhere to sit.”</p>
            <div className="culturelens-interface-needs"><span>A PLACE TO START</span></div>
            <div className="culturelens-interface-result">
              <h3>Everyday Objects,<br />Shared Cultures</h3>
              <Check size={16} aria-hidden="true" />
            </div>
            <small>Prototype catalogue · 45 min · Low sensory</small>
            <div className="culturelens-interface-options"><span>Compare</span><span>Change</span><span>Confirm ↗</span></div>
          </div>
          <div className="culturelens-hero-trace">
            <span>03 / YOUR NEXT STEP</span>
            <code>request → context → suggestion → your<br />choice</code>
          </div>
        </div>
      </div>
      <section className="culturelens-hero-bottom culturelens-hero-overview" aria-label="Project overview">
        <div className="culturelens-overview-heading"><span>PROJECT OVERVIEW</span></div>
        <div className="culturelens-overview-grid"><p><strong>Context</strong><br />2026 · University of Melbourne · 3-person group project</p><p><strong>Disciplines</strong><br />Futures Thinking · Service Design · Systems Thinking · Agentic AI · Conversation Design · Prototyping</p><p><strong>Evidence</strong><br />Early sketches, a paper prototype and a tabletop walkthrough, followed by a Voiceflow build with sample data and recorded conversations.</p><p><strong>Scope</strong><br />A design prototype using sample museum data. It is not connected to a museum or live booking service, and would need evaluation in a real museum.</p></div>
      </section>
    </header>
    <nav className="culturelens-chapter-nav" aria-label="CultureLens case study chapters"><span className="culturelens-nav-mark">C<span>L</span> /</span><div>{chapters.map((label, i) => <a key={label} href={`#culturelens-${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined}><small>0{i + 1}</small>{label}</a>)}</div></nav>
    <Chapter id="frame" number="01" label="FRAME / FUTURES THINKING" title="What could a museum visit feel like?">
      <div className="culturelens-signal-grid">{signals.map(([title, text, decision], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><small>{decision}</small></article>)}</div>
      <h3 className="culturelens-subheading">There’s a lot to figure out before you reach the gallery.</h3><MuseumSystemMap />
    </Chapter>
    <Chapter id="explore" number="02" label="EXPLORE / IDEA PORTFOLIO" title="Three ideas for a better day at the museum."><IdeaPortfolio /><ProposalExplorer /></Chapter>
    <Chapter id="evolve" number="03" label="EVOLVE / PRINCIPLE TRANSFER" title="From a wearable to a conversation." className="culturelens-evolve"><p className="culturelens-intro">MuseBand let us imagine support during the visit. With CultureLens, we brought the same questions into a chat: what does this person need, what would help, and how can we keep them in charge? We used agentic AI in Voiceflow to try how the guide could connect exhibition suggestions, visit planning and support.</p><ConceptTransition /><div className="culturelens-hmw"><span className="culturelens-label">THE CULTURELENS DESIGN QUESTION</span><h3>How could a simple chat help someone find an exhibition, plan their day and get support during the visit—while leaving the choices to them?</h3></div></Chapter>
    <Chapter id="service" number="04" label="SERVICE / BLUEPRINT" title="Help with the whole visit, one step at a time." className="culturelens-service"><p className="culturelens-intro">A good exhibition recommendation still leaves plenty of questions. When can I go? How do I get there? Is there somewhere quiet to sit? This service blueprint follows those questions from the first chat through the visit.</p><ServiceBlueprint /><p className="culturelens-checkpoint">FROM CHAT TO PLAN <MoveRight size={18} /> Tell us what you need → choose an exhibition → check the details → confirm your plan</p></Chapter>
    <div className="culturelens-agent-mode">
      <Chapter id="agent" number="05" label="AGENT / ORIGINAL VOICEFLOW BUILD" title="See the conversations in action."><div className="culturelens-prototype-evidence"><span className="culturelens-label">THE ORIGINAL VOICEFLOW BUILD</span><p>These recordings show the Voiceflow prototype working through an exhibition search and a more open-ended request for visit advice.</p><PrototypeEvidence /><ConversationEvidence /></div></Chapter>
    </div>
    <Chapter id="reflect" number="06" label="REFLECT / DESIGNING THE LIMITS" title="Helpful, without taking over." className="culturelens-reflect"><div className="culturelens-reflection-grid"><p className="culturelens-reflection-statement">When is a suggestion useful?<br />When does it need explaining?<br /><em>When is it time to step back?</em></p><div><p>CultureLens grew from answering museum questions into helping someone put a day together. Finding an exhibition, choosing a time and asking for a quieter route belong to the same visit, even when they happen in different conversations.</p><p>The detail I kept coming back to was the moment a suggestion becomes a plan. Before anything is confirmed, the visitor should be able to see what has been chosen, check the details and change their mind. Remembering those choices matters as much as writing a friendly reply.</p><p>The prototype gives us something concrete to try and discuss. The next step would be to put it in front of museum visitors and staff, review the exhibition content with the museum, and see how the service holds up on a busy day.</p></div></div><div className="culturelens-contribution"><span className="culturelens-label">MY CONTRIBUTION / SHARED GROUP PROJECT</span><p>We developed the project together through research, discussion and prototyping. I helped define where AI might be useful, sketched early concepts, documented the ideas and sample data, and suggested improvements as we built in Voiceflow. I also helped the team think through accessibility and where visitors should be able to question, change or decline a suggestion.</p></div></Chapter>
  </main><a className="case-next-project" data-case-theme="culturelens" href="/projects/crownlands"><span>NEXT PROJECT</span><strong>Crownlands</strong><ArrowUpRight aria-hidden="true" /></a><Footer /></>
}
