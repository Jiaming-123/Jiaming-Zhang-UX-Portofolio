import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionLabel } from './Content'

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
  const source = `${assetRoot}/${file}.png`
  const intermediateSource = intermediateWidth ? `, ${assetRoot}/${file}-${intermediateWidth}.png ${intermediateWidth}w` : ''

  return (
    <img
      src={source}
      srcSet={`${assetRoot}/${file}-720.png 720w${intermediateSource}, ${source} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt}
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
  const source = `${researchAssetRoot}/${file}.png`

  return (
    <img
      src={source}
      srcSet={`${researchAssetRoot}/${file}-960.png 960w, ${source} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  )
}

type FeatureScreen = {
  alt: string
  file: string
  heading: string
  label: string
  paragraphs: ReactNode[]
  principle: string
}

const featureScreens: FeatureScreen[] = [
  {
    file: 'boardgamemate-discover',
    alt: 'Final BoardGameMate Discover screen showing recommended nearby sessions, player compatibility and upcoming opportunities',
    label: '01 / DISCOVER',
    heading: 'From browsing content to finding a table',
    paragraphs: [
      <>The original home screen prioritised posts and general exploration. In the redesign, the first screen focuses on the user&apos;s most likely intent: finding something they can actually play. Recommended sessions surface the game, place, time, available seats and a clear <strong>Join game</strong> action immediately.</>,
      <>I also introduced compatibility cues such as <strong>“Great fit for relaxed co-op play”</strong> and <strong>Players you&apos;ll click with</strong>. This creates the foundation for recommendations based on game preference, skill level, play style, availability and location rather than proximity alone.</>,
    ],
    principle: 'Reduce time-to-table',
  },
  {
    file: 'boardgamemate-nearby-map',
    alt: 'Final BoardGameMate Nearby screen showing joinable game sessions on a map with time, distance and experience filters',
    label: '02 / NEARBY',
    heading: 'Designing around opportunities, not objects',
    paragraphs: [
      <>The early map displayed nearby player avatars, but knowing that someone was close did not answer the more useful question: <strong>is there a game I can join?</strong> The revised map therefore changes the main object from a person to a playable session.</>,
      <>Each opportunity communicates the game, time, player capacity and a direct Join action. Filters for time, experience level and distance further support fast decision-making. The map becomes an action surface rather than a passive location view.</>,
    ],
    principle: 'User goal: “What can I join nearby?”',
  },
  {
    file: 'boardgamemate-learn',
    alt: 'Final BoardGameMate Learn screen showing a progressive Wingspan learning journey, game companion and quick in-play rules',
    label: '03 / LEARN',
    heading: 'Turning tutorials into a learning journey',
    paragraphs: [
      <>The previous Tutorial screen worked more like a catalogue of games. Research showed that the harder problem was learning efficiently: dense rulebooks and long videos can interrupt the flow of play. I redesigned learning as a progressive journey with short, manageable steps and visible progress.</>,
      <><strong>Quick tutorial, Turn anatomy, Scoring and First-game strategy</strong> break the learning curve into smaller decisions. The game companion and quick in-play rules extend support into the actual session, allowing users to get contextual help without leaving the experience.</>,
    ],
    principle: 'Support players before and during play',
  },
  {
    file: 'boardgamemate-community',
    alt: 'Final BoardGameMate Community screen organised by finding players, reviews, strategy discussions and meetups',
    label: '04 / COMMUNITY',
    heading: 'Organising community around purpose',
    paragraphs: [
      <>The early Community experience resembled a conventional social feed. In the revised design, content is organised around what players are trying to achieve: <strong>find players, read reviews, discuss strategy or join meetups</strong>.</>,
      <>Clear content types and contextual actions such as <strong>Join table</strong>, <strong>Read review</strong> and <strong>Open thread</strong> reduce the effort required to understand why a post matters. Community becomes a space for participation and coordination rather than passive scrolling.</>,
    ],
    principle: 'Turn content into action',
  },
  {
    file: 'boardgamemate-player-profile',
    alt: 'Final BoardGameMate Player Profile screen showing favourite games, skill level, play style, table vibe and availability',
    label: '05 / PLAYER PROFILE',
    heading: 'From social identity to player compatibility',
    paragraphs: [
      <>Followers and post counts are useful social metrics, but they reveal very little about whether two people will enjoy playing together. The redesigned profile therefore focuses on data that can directly support matchmaking.</>,
      <>Favourite games, skill level, play style, table vibe, availability and <strong>Looking for players</strong> give both the system and other players more meaningful signals. The profile is no longer only a place for self-presentation; it becomes part of the recommendation system.</>,
    ],
    principle: 'Match by compatibility, not popularity',
  },
  {
    file: 'boardgamemate-goal-chat',
    alt: 'Final BoardGameMate goal-oriented chat showing game details, attendance, preparation tasks and group coordination',
    label: '06 / COORDINATION',
    heading: 'From messaging to session coordination',
    paragraphs: [
      <>The original chat supported conversation, but users still had to manually organise the practical details of a session. In the revised experience, game information, attendance and preparation remain visible alongside the conversation.</>,
      <>Players can see who is confirmed, whether a seat is still open, what needs to be prepared and who is responsible for each task. This turns chat from a generic communication channel into a lightweight coordination workspace built around the shared goal of getting the game started.</>,
    ],
    principle: 'Conversation is the tool; playing together is the goal',
  },
]

const researchPersonas = [
  { file: 'boardgamemate-persona-alice', alt: 'Persona profile for Alice, a 19-year-old design student in Melbourne who plays tabletop games socially', caption: 'Alice · The social organiser', width: 1372, height: 1384 },
  { file: 'boardgamemate-persona-leo', alt: 'Persona profile for Leo, a 20-year-old commerce student in Melbourne who uses tabletop games to connect with others', caption: 'Leo · The thoughtful newcomer', width: 1374, height: 1386 },
]

const earlySketches = [
  { file: 'boardgamemate-sketch-01', alt: 'Early BoardGameMate sketches for the splash page, home page and nearby player discovery', width: 1380, height: 838 },
  { file: 'boardgamemate-sketch-02', alt: 'Early BoardGameMate sketches for tutorials, communities and a player profile', width: 1380, height: 838 },
  { file: 'boardgamemate-sketch-03', alt: 'Early BoardGameMate sketches for publishing a post and a board game tutorial', width: 920, height: 842 },
  { file: 'boardgamemate-sketch-04', alt: 'Early BoardGameMate sketches for search and a community post detail page', width: 920, height: 840 },
  { file: 'boardgamemate-sketch-05', alt: 'Early BoardGameMate sketches for messages and goal-oriented chat', width: 922, height: 842 },
]

export function BoardGameMateIteration() {
  return (
    <section className="boardgame-iteration" aria-labelledby="boardgamemate-project-title">
      <IterationReveal className="boardgamemate-overview-hero">
        <div className="boardgamemate-overview-grid">
          <div className="boardgamemate-overview-copy">
            <SectionLabel>BOARDGAMEMATE / PROJECT OVERVIEW</SectionLabel>
            <h1 id="boardgamemate-project-title">BoardGameMate is a tabletop companion designed to make playing together easier.</h1>
            <div>
              <p>It helps players discover nearby game sessions, find compatible people, learn unfamiliar games, and coordinate everything from joining a table to getting ready to play.</p>
              <p>Instead of another board game social feed, BoardGameMate focuses on one simple goal: getting people around the same table faster.</p>
            </div>
          </div>
          <dl className="boardgamemate-meta">
            <div><dt>PROJECT</dt><dd>BoardGameMate</dd></div>
            <div><dt>DISCIPLINES</dt><dd>UX Design · Product Design · Interaction Design</dd></div>
            <div><dt>YEAR</dt><dd>2024</dd></div>
            <div><dt>MY CONTRIBUTION</dt><dd>Product strategy<br />User research<br />Product design</dd></div>
            <div><dt>RESEARCH METHODS</dt><dd>Double Diamond framework and EDIPT five-step design thinking process.<ul><li>User interviews</li><li>Focus groups</li><li>Cognitive walkthrough</li><li>Heuristic evaluation</li></ul></dd></div>
          </dl>
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-discover-section">
        <SectionLabel number="01">DISCOVER PHASE</SectionLabel>
        <div className="boardgamemate-discover-grid">
          <div>
            <h2>Discover phase</h2>
            <p>I began by looking beyond the interface to understand what makes tabletop play feel inviting, difficult or socially uncertain. The research focused on the moments before a game starts: finding people, choosing a suitable game and feeling prepared enough to join.</p>
          </div>
          <div className="boardgamemate-discover-note"><span>RESEARCH FOCUS</span><p>From finding a game to feeling ready to play with other people.</p><i /></div>
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-research-section boardgamemate-persona-section">
        <div className="boardgamemate-research-heading"><span>RESEARCH / 01</span><div><h3>Persona</h3><p>Two research personas helped frame the different kinds of confidence, compatibility and preparation a tabletop companion needs to support.</p></div></div>
        <div className="boardgamemate-persona-row">
          {researchPersonas.map((persona) => (
            <figure className="boardgamemate-research-figure" tabIndex={0} key={persona.file}>
              <ResearchImage file={persona.file} width={persona.width} height={persona.height} sizes="(max-width: 767px) calc(50vw - 28px), (max-width: 1439px) 38vw, 540px" alt={persona.alt} />
              <figcaption>{persona.caption}</figcaption>
            </figure>
          ))}
        </div>
      </IterationReveal>

      <IterationReveal className="boardgamemate-research-section boardgamemate-sketch-section">
        <div className="boardgamemate-research-heading"><span>RESEARCH / 02</span><div><h3>Early sketches</h3><p>Early flows mapped the breadth of the experience, from discovery and tutorials to community posts, profiles and conversation.</p></div></div>
        <div className="boardgamemate-sketch-row" aria-label="Early BoardGameMate sketches">
          {earlySketches.map((sketch, index) => (
            <figure className="boardgamemate-research-figure" tabIndex={0} key={sketch.file}>
              <ResearchImage file={sketch.file} width={sketch.width} height={sketch.height} sizes="(max-width: 767px) 180px, (max-width: 1439px) 18vw, 270px" alt={sketch.alt} />
              <figcaption>Sketch 0{index + 1}</figcaption>
            </figure>
          ))}
        </div>
      </IterationReveal>

      <IterationReveal className="iteration-early">
        <div className="iteration-subhead">
          <span>PREVIOUS SYSTEM / 03</span>
          <div>
            <h3>Early interface</h3>
            <p>The first high-fidelity version leaned heavily on familiar social-media patterns. The home screen centred on posts, the nearby map focused on individual players, profiles prioritised followers and posts, and chat worked mainly as generic messaging. While this created a friendly community experience, it did not fully reflect the strongest needs identified in the research: finding suitable people to play with, learning unfamiliar games efficiently and coordinating real-world sessions.</p>
          </div>
        </div>
        <figure className="iteration-early-figure">
          <IterationImage
            file="boardgamemate-early-design"
            width={2156}
            height={1172}
            intermediateWidth={1200}
            sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1439px) calc(100vw - 9.4vw), 1640px"
            alt="Early BoardGameMate high-fidelity interface overview showing social feed, nearby players, tutorials, communities, profiles and messaging"
          />
          <figcaption>Early BoardGameMate high-fidelity interface</figcaption>
        </figure>
      </IterationReveal>

      <IterationReveal className="iteration-intro">
        <SectionLabel>DESIGN ITERATION</SectionLabel>
        <div className="iteration-intro-grid">
          <h2 id="boardgame-iteration-title">From a social feed to a task-first companion</h2>
          <div>
            <p>The early BoardGameMate prototype already included discovery, tutorials, communities, profiles and messaging, but testing the overall experience revealed a more fundamental problem: there were many features, yet the main user goal was not clear enough. A player who simply wanted to find a game for tonight still had to move between feeds, profiles and messages before knowing whether there was actually a table they could join.</p>
            <p>I therefore reframed the product around the complete journey of getting people to the same table. Instead of treating each feature as an isolated destination, the revised experience follows a clearer flow — <strong>Discover, Match, Learn, Coordinate and Play</strong>. The iteration focused on turning information into action, reducing unnecessary steps and making each screen support a specific user decision.</p>
          </div>
        </div>
      </IterationReveal>

      <IterationReveal className="iteration-turning-point">
        <div className="iteration-subhead">
          <span>TESTING REFLECTION / 02</span>
          <div>
            <h3>What changed after testing</h3>
            <p>Reviewing the prototype suggested that the main issue was not a lack of functionality, but a lack of hierarchy. Showing nearby players did not automatically help someone find a playable session, a tutorial library did not necessarily make a game easier to learn, and a normal chat still left users organising attendance and preparation manually. The redesign therefore shifted from <strong>feature thinking</strong> toward <strong>task and system thinking</strong>: what does a player actually need to do before they can successfully join and enjoy a table?</p>
          </div>
        </div>
        <div className="iteration-principles" aria-label="Three reframing principles">
          <article><span>01</span><h4>Find a playable opportunity</h4><p>not simply nearby people</p></article>
          <article><span>02</span><h4>Understand compatibility</h4><p>not simply social popularity</p></article>
          <article><span>03</span><h4>Coordinate the session</h4><p>not simply send messages</p></article>
        </div>
      </IterationReveal>

      <div className="iteration-showcase">
        <IterationReveal className="iteration-showcase-heading">
          <SectionLabel>FINAL UI SHOWCASE</SectionLabel>
          <div><h3>Six decisions. One continuous journey.</h3><p>Each interface was reframed around a specific decision a player needs to make before a game can happen.</p></div>
        </IterationReveal>

        <div className="iteration-feature-list">
          {featureScreens.map((screen) => (
            <IterationReveal className="iteration-feature" key={screen.label}>
              <figure className="iteration-feature-media">
                <IterationImage
                  file={screen.file}
                  width={1572}
                  height={3408}
                  sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1023px) 44vw, 620px"
                  alt={screen.alt}
                />
              </figure>
              <div className="iteration-feature-copy">
                <span>{screen.label}</span>
                <h4>{screen.heading}</h4>
                {screen.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <small>{screen.principle}</small>
              </div>
            </IterationReveal>
          ))}
        </div>
      </div>

      <IterationReveal className="iteration-outcome">
        <SectionLabel>ITERATION OUTCOME</SectionLabel>
        <div className="iteration-outcome-grid">
          <div>
            <h3>Designing the system, not just the screens</h3>
            <p>The most important outcome of this iteration was a shift in how I approached the product. Instead of asking <strong>“What features should a board-game app have?”</strong>, I started asking <strong>“What needs to happen for someone to successfully join and enjoy a game?”</strong> That changed the relationship between every major feature.</p>
          </div>
          <ol className="iteration-journey" aria-label="BoardGameMate product journey">
            {['Discover', 'Match', 'Learn', 'Coordinate', 'Play'].map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="iteration-outcome-copy">
            <p>Discover surfaces playable opportunities. Profiles and player matching help users evaluate compatibility. Learn reduces the barrier to unfamiliar games. Community supports participation around clear purposes, and goal-oriented chat helps the group turn an online match into a real-world table.</p>
            <p>The redesigned BoardGameMate is therefore less about creating another social feed for board-game content and more about reducing the friction between <strong>wanting to play</strong> and <strong>actually getting people around the same table</strong>.</p>
          </div>
        </div>
      </IterationReveal>
    </section>
  )
}
