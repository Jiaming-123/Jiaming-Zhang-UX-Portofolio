import { LanguageSwitch } from '../i18n/Language'
import { useCultureLensCopy } from '../i18n/culturelens'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Footer } from '../components/Layout'
import { IdeaPortfolio, ConversationEvidence } from '../components/culturelens/ProcessEvidence'
import { ConceptTransition, MuseumSystemMap, ProposalExplorer, PrototypeEvidence, ServiceBlueprint } from '../components/culturelens/CaseStudyModules'
import { chapters, signals } from '../data/cultureLensData'
import '../styles/culturelens.css'
import '../../public/culturelens-hero-overview.css'
import { setupChapterNavigation } from '../../public/culturelens-navigation.mjs'

function Chapter({ id, number, label, title, children, className = '' }: { id: string; number: string; label: string; title: string; children: ReactNode; className?: string }) {
  const t = useCultureLensCopy()
  return <section id={`culturelens-${id}`} className={`culturelens-chapter ${className}`} data-culturelens-chapter={id}><header className="culturelens-chapter-heading"><span className="culturelens-label">{number} / {t(label)}</span><h2>{t(title)}</h2></header>{children}</section>
}

export default function CultureLensCaseStudy() {
  const t = useCultureLensCopy()
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
  return <><div className="culturelens-language-control"><LanguageSwitch /></div><main ref={root} className="culturelens-page">
    <header className="culturelens-hero">
      <div className="culturelens-hero-title">
        <h1>Culture<span>Lens</span><small>{t("— Agentic Museum Concierge")}</small></h1>
      </div>
      <div className="culturelens-hero-composition">
        <div className="culturelens-gallery-label">
          <h2>{t("A little help.")}<br />{t("More room")}<br />{t("to explore")}<br /><em>{t("your way.")}</em></h2>
          <p>{t("Finding an exhibition is just the start. CultureLens explores how an AI museum guide could help you choose what to see, plan the practical details and make changes along the way. You make the final call.")}</p>
        </div>
        <div className="culturelens-hero-system" aria-label={t("Concept diagram: culture, context, choice")}>
          <div className="culturelens-exhibit-label">
            <span>{t("01 / CULTURAL EXPERIENCE")}</span>
            <strong>{t("People.")}<br />{t("Objects.")}<br />{t("Shared")}<br />{t("meaning.")}</strong>
          </div>
          <div className="culturelens-hero-interface">
            <span className="culturelens-label">{t("02 / SERVICE INTERFACE")}</span>
            <p>{t("“Something quiet.")}<br />{t("In Chinese.")}<br />{t("Somewhere to sit.”")}</p>
            <div className="culturelens-interface-needs"><span>{t("A PLACE TO START")}</span></div>
            <div className="culturelens-interface-result">
              <h3>{t("Everyday Objects,")}<br />{t("Shared Cultures")}</h3>
              <Check size={16} aria-hidden="true" />
            </div>
            <small>{t("Prototype catalogue · 45 min · Low sensory")}</small>
            <div className="culturelens-interface-options"><span>{t("Compare")}</span><span>{t("Change")}</span><span>{t("Confirm ↗")}</span></div>
          </div>
          <div className="culturelens-hero-trace">
            <span>{t("03 / YOUR NEXT STEP")}</span>
            <code>{t("request → context → suggestion → your")}<br />{t("choice")}</code>
          </div>
        </div>
      </div>
      <section className="culturelens-hero-bottom culturelens-hero-overview" aria-label={t("Project overview")}>
        <div className="culturelens-overview-heading"><span>{t("PROJECT OVERVIEW")}</span></div>
        <div className="culturelens-overview-grid"><p><strong>{t("Context")}</strong><br />{t("2026 · University of Melbourne · 3-person group project")}</p><p><strong>{t("Disciplines")}</strong><br />{t("Futures Thinking · Service Design · Systems Thinking · Agentic AI · Conversation Design · Prototyping")}</p><p><strong>{t("Evidence")}</strong><br />{t("Early sketches, a paper prototype and a tabletop walkthrough, followed by a Voiceflow build with sample data and recorded conversations.")}</p><p><strong>{t("Scope")}</strong><br />{t("A design prototype using sample museum data. It is not connected to a museum or live booking service, and would need evaluation in a real museum.")}</p></div>
      </section>
    </header>
    <nav className="culturelens-chapter-nav" aria-label={t("CultureLens case study chapters")}><span className="culturelens-nav-mark">C<span>L</span> /</span><div>{chapters.map((label, i) => <a key={label} href={`#culturelens-${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined}><small>0{i + 1}</small>{t(label)}</a>)}</div></nav>
    <Chapter id="frame" number="01" label="FRAME / FUTURES THINKING" title="What could a museum visit feel like?">
      <div className="culturelens-signal-grid">{signals.map(([title, text, decision], i) => <article key={title}><span>0{i + 1}</span><h3>{t(title)}</h3><p>{t(text)}</p><small>{t(decision)}</small></article>)}</div>
      <h3 className="culturelens-subheading">{t("There’s a lot to figure out before you reach the gallery.")}</h3><MuseumSystemMap />
    </Chapter>
    <Chapter id="explore" number="02" label="EXPLORE / IDEA PORTFOLIO" title="Three ideas for a better day at the museum."><IdeaPortfolio /><ProposalExplorer /></Chapter>
    <Chapter id="evolve" number="03" label="EVOLVE / PRINCIPLE TRANSFER" title="From a wearable to a conversation." className="culturelens-evolve"><p className="culturelens-intro">{t("MuseBand let us imagine support during the visit. With CultureLens, we brought the same questions into a chat: what does this person need, what would help, and how can we keep them in charge? We used agentic AI in Voiceflow to try how the guide could connect exhibition suggestions, visit planning and support.")}</p><ConceptTransition /><div className="culturelens-hmw"><span className="culturelens-label">{t("THE CULTURELENS DESIGN QUESTION")}</span><h3>{t("How could a simple chat help someone find an exhibition, plan their day and get support during the visit—while leaving the choices to them?")}</h3></div></Chapter>
    <Chapter id="service" number="04" label="SERVICE / BLUEPRINT" title="Help with the whole visit, one step at a time." className="culturelens-service"><p className="culturelens-intro">{t("A good exhibition recommendation still leaves plenty of questions. When can I go? How do I get there? Is there somewhere quiet to sit? This service blueprint follows those questions from the first chat through the visit.")}</p><ServiceBlueprint /></Chapter>
    <div className="culturelens-agent-mode">
      <Chapter id="agent" number="05" label="AGENT / ORIGINAL VOICEFLOW BUILD" title="See the conversations in action."><div className="culturelens-prototype-evidence"><span className="culturelens-label">{t("THE ORIGINAL VOICEFLOW BUILD")}</span><p>{t("These recordings show the Voiceflow prototype working through an exhibition search and a more open-ended request for visit advice.")}</p><PrototypeEvidence /><ConversationEvidence /></div></Chapter>
    </div>
    <Chapter id="reflect" number="06" label="REFLECT / DESIGNING THE LIMITS" title="Helpful, without taking over." className="culturelens-reflect"><div className="culturelens-reflection-grid"><p className="culturelens-reflection-statement">{t("When is a suggestion useful?")}<br />{t("When does it need explaining?")}<br /><em>{t("When is it time to step back?")}</em></p><div><p>{t("CultureLens grew from answering museum questions into helping someone put a day together. Finding an exhibition, choosing a time and asking for a quieter route belong to the same visit, even when they happen in different conversations.")}</p><p>{t("The detail I kept coming back to was the moment a suggestion becomes a plan. Before anything is confirmed, the visitor should be able to see what has been chosen, check the details and change their mind. Remembering those choices matters as much as writing a friendly reply.")}</p><p>{t("The prototype gives us something concrete to try and discuss. The next step would be to put it in front of museum visitors and staff, review the exhibition content with the museum, and see how the service holds up on a busy day.")}</p></div></div><div className="culturelens-contribution"><span className="culturelens-label">{t("MY CONTRIBUTION / SHARED GROUP PROJECT")}</span><p>{t("We developed the project together through research, discussion and prototyping. I helped define where AI might be useful, sketched early concepts, documented the ideas and sample data, and suggested improvements as we built in Voiceflow. I also helped the team think through accessibility and where visitors should be able to question, change or decline a suggestion.")}</p></div></Chapter>
  </main><a className="case-next-project" data-case-theme="culturelens" href="/projects/crownlands"><span>{t("NEXT PROJECT")}</span><strong>Crownlands</strong><ArrowUpRight aria-hidden="true" /></a><Footer /></>
}
