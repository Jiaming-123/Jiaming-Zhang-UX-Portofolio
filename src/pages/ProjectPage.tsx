import { ArrowDown, ArrowRight, GitBranch, Languages, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { BoardGameMateIteration } from '../components/BoardGameMateIteration'
import { CaseStudySection, Gallery, HorizontalDemo, LandingDemo, MediaPlaceholder, Reveal, SectionLabel, VideoPlayer } from '../components/Content'
import { Footer } from '../components/Layout'
import { projectBySlug, projects, type Project } from '../data/projects'
import { NotFoundPage } from './InfoPages'

function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="project-hero" style={{ '--project-color': project.color } as React.CSSProperties}>
      <div className="project-hero-top"><span>{project.eyebrow.toUpperCase()} / {project.year}</span><span>CASE STUDY · {project.number} / 05</span></div>
      <h1>{project.title.toUpperCase()}</h1>
      <div className="project-hero-intro"><p>{project.heroStatement}</p><ul>{project.categories.map((category) => <li key={category}>{category}</li>)}</ul></div>
      <MediaPlaceholder alt={project.heroAlt} variant={project.slug === 'crownlands' ? 'board' : project.slug === 'furniture' ? 'interface' : 'mobile'} label="PROJECT HERO MEDIA" />
      <a href="#overview" className="project-scroll" data-cursor="link">SCROLL TO EXPLORE <ArrowDown size={15} /></a>
    </header>
  )
}

function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="project-overview" id="overview">
      <Reveal>
        <SectionLabel number="01">PROJECT OVERVIEW</SectionLabel>
        <div className="overview-grid">
          <h2>{project.overview}</h2>
          <dl>
            <div><dt>PROJECT</dt><dd>{project.eyebrow}</dd></div>
            <div><dt>DISCIPLINES</dt><dd>{project.categories.join(' · ')}</dd></div>
            <div><dt>YEAR</dt><dd>{project.year}</dd></div>
            <div><dt>ROLE</dt><dd>UX / Product Designer</dd></div>
          </dl>
        </div>
      </Reveal>
    </section>
  )
}

function ResearchVisual({ project }: { project: Project }) {
  if (project.slug === 'landing-app') return (
    <div className="research-board landing-research">
      <div className="research-card quote"><span>INTERVIEW THEME</span><p>“I can find information, but I&apos;m not sure which step should come first.”</p></div>
      <div className="research-card pain"><span>PAIN POINTS</span><ul><li>Fragmented sources</li><li>Unclear sequencing</li><li>Language pressure</li><li>Low confidence</li></ul></div>
      <div className="journey-line"><span>BEFORE ARRIVAL</span><i /><span>FIRST 72 HOURS</span><i /><span>FIRST MONTH</span><i /><span>DAILY LIFE</span></div>
    </div>
  )
  if (project.slug === 'boardgamemate') return (
    <div className="research-board persona-board">
      <div className="persona-avatar">MP</div><div><span>CORE PERSONA</span><h3>The interested newcomer</h3><p>Wants to play socially, but needs context and confidence before joining an unfamiliar group.</p></div><ul><li><b>NEEDS</b>Compatible players</li><li><b>BARRIER</b>Social uncertainty</li><li><b>GOAL</b>A welcoming table</li></ul>
    </div>
  )
  if (project.slug === 'culturelens') return (
    <div className="research-board service-map">
      {['Curiosity', 'Conversation', 'Recommendation', 'Visit', 'Reflection'].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><i /></div>)}
    </div>
  )
  if (project.slug === 'furniture') return (
    <div className="research-board audit-board">
      {['DISCOVER', 'BROWSE', 'EVALUATE', 'CART'].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><p>{['Cluttered entry', 'Weak comparison', 'Hidden detail', 'Unclear review'][index]}</p></div>)}
    </div>
  )
  return (
    <div className="research-board playtest-board"><div><span>PROTOTYPE LOOP</span><b>BUILD</b><i /><b>PLAY</b><i /><b>OBSERVE</b><i /><b>REFINE</b></div><p>Rules, components, and visual hierarchy evolved together through hands-on play.</p></div>
  )
}

function DirectionVisual({ project }: { project: Project }) {
  if (project.slug === 'landing-app') return (
    <div className="solution-features">
      <div><ShieldCheck /><h3>Verified information</h3><p>Official sources remain visible and current.</p></div>
      <div><Languages /><h3>Bilingual support</h3><p>Explanation adapts without losing critical meaning.</p></div>
      <div><GitBranch /><h3>Provider connection</h3><p>Guidance moves into a practical service action.</p></div>
      <div><UserRoundCheck /><h3>Human escalation</h3><p>Complex needs have a clear route to a person.</p></div>
    </div>
  )
  return <MediaPlaceholder alt={`${project.title} design direction showing the system, key interactions and visual principles`} variant={project.slug === 'crownlands' ? 'board' : 'interface'} label="DESIGN SYSTEM / DIRECTION" />
}

function PrototypeSection({ project }: { project: Project }) {
  if (project.slug === 'landing-app') return (
    <div>
      <div className="prototype-heading"><span>INTERACTIVE DEMO</span><p>Choose a settlement task, read the guidance, and complete the action to move the timeline forward.</p></div>
      <LandingDemo />
    </div>
  )
  if (project.slug === 'boardgamemate') return (
    <div><div className="prototype-heading"><span>KEY FLOW</span><p>Drag, swipe, or use the arrows to move from player discovery to conversation.</p></div><HorizontalDemo type="boardgame" /></div>
  )
  if (project.slug === 'culturelens') return (
    <div className="culture-paths">
      <div><div className="path-heading"><span>PATH 01</span><h3>Discover Exhibition</h3></div><VideoPlayer src="/media/CultureLens-Discover-Exhibition.mp4" poster="/media/CultureLens-Discover-Exhibition-poster.jpg" title="Path 01 — Discover Exhibition" alt="CultureLens prototype video showing an AI concierge helping a visitor discover an exhibition" /></div>
      <div><div className="path-heading"><span>PATH 02</span><h3>Plan Museum Visit</h3></div><VideoPlayer src="/media/CultureLens-Plan-Museum-Visit.mp4" poster="/media/CultureLens-Plan-Museum-Visit-poster.jpg" title="Path 02 — Plan Museum Visit" alt="CultureLens prototype video showing an AI concierge planning a personalised museum visit" /></div>
      <div className="conversation-map"><span>CONVERSATION DESIGN</span><div><i>USER INTENT</i><ArrowRight /><i>CONTEXT</i><ArrowRight /><i>AI REASONING</i><ArrowRight /><i>RECOMMENDATION</i><ArrowRight /><i>SERVICE ACTION</i></div><p>[ALT: Voiceflow AI agent workflow showing conversation logic, recommendation paths and user interaction flows]</p></div>
    </div>
  )
  if (project.slug === 'furniture') return (
    <div><div className="prototype-heading"><span>INTERNAL PRODUCT DEMO</span><p>Drag, swipe, or use the arrows to explore the responsive shopping journey.</p></div><HorizontalDemo type="furniture" /></div>
  )
  return (
    <div className="crownlands-video"><div className="prototype-heading"><span>INTRODUCTION VIDEO</span><p>The existing introduction film explains the concept, components, and core play loop.</p></div><VideoPlayer src="/media/Crownlands Introduction.mp4" poster="/media/Crownlands-Introduction-poster.jpg" title="Crownlands — Introduction" alt="Introduction to the Crownlands medieval strategy board game, its territory map, pieces and core rules" /></div>
  )
}

function FinalVisual({ project }: { project: Project }) {
  if (project.slug === 'landing-app') return (
    <div className="final-flow">{['ASK', 'UNDERSTAND', 'ACT', 'COMPLETE', 'ADAPT'].map((step, index) => <div key={step}><span>0{index + 1}</span><b>{step}</b>{index < 4 && <ArrowRight />}</div>)}</div>
  )
  if (project.slug === 'crownlands') return (
    <Gallery items={[
      { title: 'Territory Control', year: '2024', category: 'Board', alt: 'Crownlands board showing territory control map', size: 'wide' },
      { title: 'Action System', year: '2024', category: 'Components', alt: 'Action cards and game components', size: 'standard' },
      { title: 'Play Prototype', year: '2024', category: 'Prototype', alt: 'Physical prototype setup with players and pieces', size: 'tall' },
    ]} />
  )
  return (
    <div className="final-media-grid">
      <MediaPlaceholder alt={`${project.title} final experience overview showing the primary user journey`} variant={project.slug === 'furniture' ? 'interface' : 'mobile'} label="FINAL EXPERIENCE / 01" />
      <MediaPlaceholder alt={`${project.title} detailed interface and interaction states`} variant={project.slug === 'furniture' ? 'interface' : 'mobile'} label="FINAL EXPERIENCE / 02" />
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projectBySlug(slug)
  if (!project) return <NotFoundPage />
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const isBoardGameMate = project.slug === 'boardgamemate'
  return (
    <>
      {!isBoardGameMate && <ProjectHero project={project} />}
      <main className="case-study">
        {isBoardGameMate ? <BoardGameMateIteration /> : <>
        <ProjectOverview project={project} />
        <CaseStudySection number="02" label="PROBLEM / CONTEXT" title="The experience behind the problem."><p>{project.problem}</p><div className="context-note"><span>DESIGN QUESTION</span><p>How might the experience reduce uncertainty while giving people enough context to make their own next decision?</p></div></CaseStudySection>
        <CaseStudySection number="03" label="RESEARCH / DISCOVERY" title="Looking for the moments that shape confidence."><p>{project.research}</p></CaseStudySection>
        <Reveal className="full-bleed-visual"><ResearchVisual project={project} /></Reveal>
        <section className="insights-section"><Reveal><SectionLabel number="04">KEY INSIGHTS</SectionLabel><h2>What the experience needed to do.</h2><div className="insights-grid">{project.insights.map((insight, index) => <article key={insight.title}><span>0{index + 1}</span><h3>{insight.title}</h3><p>{insight.text}</p></article>)}</div></Reveal></section>
        <CaseStudySection number="05" label="DESIGN DIRECTION" title="A system organised around the next meaningful action."><p>{project.direction}</p></CaseStudySection>
        <Reveal className="full-bleed-visual"><DirectionVisual project={project} /></Reveal>
        <section className="prototype-section"><Reveal><SectionLabel number="06">PROTOTYPE / DEMO</SectionLabel><PrototypeSection project={project} /></Reveal></section>
        <CaseStudySection number="07" label="FINAL EXPERIENCE" title="From an interface to a coherent journey."><p>{project.finalExperience}</p></CaseStudySection>
        <Reveal className="full-bleed-visual final-visual"><FinalVisual project={project} /></Reveal>
        <section className="reflection-section"><Reveal><SectionLabel number="08">REFLECTION</SectionLabel><div><h2>What I&apos;m taking forward.</h2><p>{project.reflection}</p></div></Reveal></section>
        <Link className="next-project" to={`/projects/${nextProject.slug}`} data-cursor="media"><span>NEXT CASE STUDY · {nextProject.number}</span><h2>{nextProject.title}</h2><ArrowRight /></Link>
        </>}
      </main>
      <Footer />
    </>
  )
}
