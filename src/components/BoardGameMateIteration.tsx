import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionLabel } from './Content'
import { BoardGameMateFinalShowcase } from './BoardGameMateFinalShowcase'
import '../styles/boardgamemate-hero.css'
import { LanguageSwitch } from '../i18n/Language'
import { useLanguage } from '../i18n/language-context'
import { useBoardGameMateCopy } from '../i18n/boardgamemate'
import { BoardGameMateResearchImage } from './boardgamemate/BoardGameMateResearchImage'

const assetRoot = '/images/boardgamemate/iteration'
const researchAssetRoot = '/images/boardgamemate/research'

type IterationImageProps = {
  alt: string
  file: string
  height: number
  intermediateWidth?: number
  sizes: string
  width: number
}

function IterationReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`iteration-reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function IterationImage({ alt, file, height, intermediateWidth, sizes, width }: IterationImageProps) {
  const t = useBoardGameMateCopy()
  const source = `${assetRoot}/${file}.png`
  const intermediateSource = intermediateWidth ? `, ${assetRoot}/${file}-${intermediateWidth}.png ${intermediateWidth}w` : ''

  return (
    <BoardGameMateResearchImage
      src={source}
      srcSet={`${assetRoot}/${file}-720.png 720w${intermediateSource}, ${source} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={t(alt)}
    />
  )
}

type ResearchImageProps = {
  alt: string
  file: string
  height: number
  sizes: string
  width: number
}

function ResearchImage({ alt, file, height, sizes, width }: ResearchImageProps) {
  const t = useBoardGameMateCopy()
  const source = `${researchAssetRoot}/${file}.png`

  return (
    <BoardGameMateResearchImage
      src={source}
      srcSet={`${researchAssetRoot}/${file}-960.png 960w, ${source} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={t(alt)}
    />
  )
}

const researchPersonas = [
  { file: 'boardgamemate-persona-alice', alt: 'Persona profile for Alice, a 19-year-old design student in Melbourne who plays tabletop games socially', width: 1372, height: 1384 },
  { file: 'boardgamemate-persona-leo', alt: 'Persona profile for Leo, a 20-year-old commerce student in Melbourne who uses tabletop games to connect with others', width: 1374, height: 1386 },
]

const earlySketches = [
  { file: 'boardgamemate-sketch-01', alt: 'Early BoardGameMate sketches for the splash page, home page and nearby player discovery', width: 1380, height: 838 },
  { file: 'boardgamemate-sketch-02', alt: 'Early BoardGameMate sketches for tutorials, communities and a player profile', width: 1380, height: 838 },
  { file: 'boardgamemate-sketch-03', alt: 'Early BoardGameMate sketches for publishing a post and a board game tutorial', width: 920, height: 842 },
  { file: 'boardgamemate-sketch-04', alt: 'Early BoardGameMate sketches for search and a community post detail page', width: 920, height: 840 },
  { file: 'boardgamemate-sketch-05', alt: 'Early BoardGameMate sketches for messages and goal-oriented chat', width: 922, height: 842 },
]

export function BoardGameMateIteration() {
  const t = useBoardGameMateCopy()
  const { isChinese } = useLanguage()

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    document.title = t('BoardGameMate — A Tabletop Companion | Jiaming Zhang')
    description?.setAttribute('content', t('A UX case study about helping tabletop players discover sessions, meet compatible people, learn games and coordinate play.'))
    return () => { document.title = previousTitle; if (previousDescription != null) description?.setAttribute('content', previousDescription) }
  }, [t])
  return (
    <section className="boardgame-iteration" aria-labelledby="boardgamemate-project-title">
      <div className="bgm-language-control"><LanguageSwitch /></div>
      <IterationReveal className="boardgamemate-overview-hero">
        <div className="boardgamemate-overview-grid">
          <div className="boardgamemate-overview-copy">
            <figure className="boardgamemate-overview-media">
              <img src="/images/boardgamemate/hero-overview-20261014.png" alt={t("Three people playing a tabletop game together, with the BoardGameMate companion on a phone")} width={716} height={400} fetchPriority="high" decoding="async" />
            </figure>
            <h1 id="boardgamemate-project-title">{isChinese ? t('BoardGameMate is a tabletop companion designed to make playing together easier.') : <><span>BoardGameMate is a</span>{' '}<span>tabletop companion</span>{' '}<span>designed to make</span>{' '}<span>playing together easier.</span></>}</h1>
            <div className="boardgamemate-overview-description">
              <p>{t("BoardGameMate focuses on one simple goal: getting people around the same table faster.")}</p>
              <p>{t("It helps players discover nearby game sessions, find compatible people, learn unfamiliar games, and coordinate everything from joining a table to getting ready to play.")}</p>
            </div>
          </div>
          <dl className="boardgamemate-meta">
            <div><dt>{t("DISCIPLINES")}</dt><dd>{t("UX Design · Product Design · Interaction Design")}</dd></div>
            <div><dt>{t("YEAR")}</dt><dd>2024</dd></div>
            <div><dt>{t("TEAM")}</dt><dd>{t("3-person group project")}</dd></div>
            <div><dt>{t("MY CONTRIBUTION")}</dt><dd>{t("Product strategy")}<br />{t("User research")}<br />{t("Product design")}</dd></div>
            <div><dt>{t("RESEARCH METHODS")}</dt><dd>{t("Double Diamond framework and EDIPT five-step design thinking process.")}<ul><li>{t("User interviews")}</li><li>{t("Focus groups")}</li><li>{t("Cognitive walkthrough")}</li><li>{t("Heuristic evaluation")}</li></ul></dd></div>
          </dl>
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-discover-section">
        <SectionLabel number="01">{t("DISCOVER PHASE")}</SectionLabel>
        <div className="boardgamemate-discover-grid">
          <div>
            <h2>{t("Discover phase")}</h2>
            <p>{t("We began by looking beyond the interface to understand what makes tabletop play feel inviting, difficult or socially uncertain. The research focused on the moments before a game starts: finding people, choosing a suitable game and feeling prepared enough to join.")}</p>
          </div>
          <div className="boardgamemate-discover-note"><span>{t("RESEARCH FOCUS")}</span><p>{t("From finding a game to feeling ready to play with other people.")}</p><i /></div>
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-research-section boardgamemate-persona-section">
        <div className="boardgamemate-research-heading"><span>{t("RESEARCH / 01")}</span><div><h3>{t("Persona")}</h3><p>{t("Two research personas helped frame the different kinds of confidence, compatibility and preparation a tabletop companion needs to support.")}</p></div></div>
        <div className="boardgamemate-persona-row">
          {researchPersonas.map((persona) => (
            <figure className="boardgamemate-research-figure" tabIndex={0} key={persona.file}>
              <ResearchImage file={persona.file} width={persona.width} height={persona.height} sizes="(max-width: 767px) calc(50vw - 28px), (max-width: 1439px) 38vw, 540px" alt={persona.alt} />
            </figure>
          ))}
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-research-section boardgamemate-sketch-section">
        <div className="boardgamemate-research-heading"><span>{t("RESEARCH / 02")}</span><div><h3>{t("Early sketches")}</h3><p>{t("Early flows mapped the breadth of the experience, from discovery and tutorials to community posts, profiles and conversation.")}</p></div></div>
        <div className="boardgamemate-sketch-row" aria-label={t("Early BoardGameMate sketches")}>
          {earlySketches.map((sketch, index) => (
            <figure className="boardgamemate-research-figure" tabIndex={0} key={sketch.file}>
              <ResearchImage file={sketch.file} width={sketch.width} height={sketch.height} sizes="(max-width: 767px) 180px, (max-width: 1439px) 18vw, 270px" alt={sketch.alt} />
              <figcaption>{t("Sketch 0")}{index + 1}</figcaption>
            </figure>
          ))}
        </div>
      </IterationReveal>

      <IterationReveal className="iteration-early">
        <div className="iteration-subhead">
          <span>{t("PREVIOUS SYSTEM / 03")}</span>
          <div>
            <h3>{t("Early interface")}</h3>
            <p>{t("The first high-fidelity version leaned heavily on familiar social-media patterns. The home screen centred on posts, the nearby map focused on individual players, profiles prioritised followers and posts, and chat worked mainly as generic messaging. Research highlighted three priorities for the next iteration: finding suitable people to play with, learning unfamiliar games efficiently and coordinating real-world sessions.")}</p>
          </div>
        </div>
        <figure className="iteration-early-figure">
          <IterationImage
            file="boardgamemate-early-design"
            width={2156}
            height={1172}
            intermediateWidth={1200}
            sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1439px) calc(100vw - 9.4vw), 1640px"
            alt={t("Early BoardGameMate high-fidelity interface overview showing social feed, nearby players, tutorials, communities, profiles and messaging")}
          />
          <figcaption>{t("Early BoardGameMate high-fidelity interface")}</figcaption>
        </figure>
      </IterationReveal>

      <IterationReveal className="iteration-intro">
        <SectionLabel>{t("DESIGN ITERATION")}</SectionLabel>
        <div className="iteration-intro-grid">
          <h2 id="boardgame-iteration-title">{t("From a social feed to a task-first companion")}</h2>
          <div>
            <p>{t("The early BoardGameMate prototype already included discovery, tutorials, communities, profiles and messaging, and testing highlighted an opportunity to organise these features around a clearer user goal. A player who simply wanted to find a game for tonight still had to move between feeds, profiles and messages before knowing whether there was actually a table they could join.")}</p>
            <p>{t("We therefore reframed the product around the complete journey of getting people to the same table. The revised experience follows a clear flow —")} <strong>{t("Discover, Match, Learn, Coordinate and Play")}</strong>{t(". The iteration focused on turning information into action, reducing unnecessary steps and making each screen support a specific user decision.")}</p>
          </div>
        </div>
      </IterationReveal>

      <IterationReveal className="iteration-turning-point">
        <div className="iteration-subhead">
          <span>{t("TESTING REFLECTION / 02")}</span>
          <div>
            <h3>{t("What changed after testing")}</h3>
            <p>{t("Reviewing the prototype highlighted the value of a stronger hierarchy: surface playable sessions, guide learning in context, and organise attendance and preparation together. The redesign therefore shifted from")} <strong>{t("feature thinking")}</strong> {t("toward")} <strong>{t("task and system thinking")}</strong>{t(": what does a player actually need to do before they can successfully join and enjoy a table?")}</p>
          </div>
        </div>
        <div className="iteration-principles" aria-label={t("Three reframing principles")}>
          <article><span>01</span><h4>{t("Find a playable opportunity")}</h4><p>{t("See sessions with available seats")}</p></article>
          <article><span>02</span><h4>{t("Understand compatibility")}</h4><p>{t("Compare play styles and shared games")}</p></article>
          <article><span>03</span><h4>{t("Coordinate the session")}</h4><p>{t("Confirm attendance and preparation")}</p></article>
        </div>
      </IterationReveal>

      <BoardGameMateFinalShowcase />

      <IterationReveal className="iteration-outcome">
        <SectionLabel>{t("ITERATION OUTCOME")}</SectionLabel>
        <div className="iteration-outcome-grid">
          <div>
            <h3>{t("Designing a connected system")}</h3>
            <p>{t("The most important outcome of this iteration was a shift in how we approached the product. We centred the work on one question:")} <strong>{t("“What needs to happen for someone to successfully join and enjoy a game?”")}</strong> {t("That changed the relationship between every major feature.")}</p>
          </div>
          <ol className="iteration-journey" aria-label={t("BoardGameMate product journey")}>
            {['Discover', 'Match', 'Learn', 'Coordinate', 'Play'].map((step) => <li key={step}>{t(step)}</li>)}
          </ol>
          <div className="iteration-outcome-copy">
            <p>{t("Discover surfaces playable opportunities. Profiles and player matching help users evaluate compatibility. Learn reduces the barrier to unfamiliar games. Community supports participation around clear purposes, and goal-oriented chat helps the group turn an online match into a real-world table.")}</p>
            <p>{t("The redesigned BoardGameMate is therefore less about creating another social feed for board-game content and more about reducing the friction between")} <strong>{t("wanting to play")}</strong> {t("and")} <strong>{t("actually getting people around the same table")}</strong>{t(".")}</p>
          </div>
        </div>
      </IterationReveal>
    </section>
  )
}
