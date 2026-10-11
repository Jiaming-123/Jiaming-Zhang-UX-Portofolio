import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, Play, ScrollText, Volume2, VolumeX, X } from 'lucide-react'
import { Footer } from '../components/Layout'
import { CrownlandsElements } from '../components/crownlands/CrownlandsElements'
import { CrownlandsGame } from '../components/crownlands/CrownlandsGame'
import { CrownlandsActionCard } from '../components/crownlands/CrownlandsActionCard'
import { useCrownlandsAudio } from '../crownlands/useCrownlandsAudio'
import '../crownlands.css'

const NAV = [
  ['overview', 'OVERVIEW'], ['how-to-play', 'HOW TO PLAY'], ['play', 'PLAY'], ['design-thinking', 'DESIGN THINKING'], ['playtesting', 'PLAYTESTING'], ['outcome', 'OUTCOME'],
]

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <header className="cl-section-head"><span>{eyebrow}</span><h2>{title}</h2>{children}</header>
}

function StickyNav() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -68%', threshold: [0, .15, .5] })
    NAV.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <nav className="cl-sticky-nav" aria-label="Crownlands sections">{NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
}

function RulesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', escape); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', escape); document.body.style.overflow = '' }
  }, [onClose])
  return <div className="cl-rules-modal" data-lenis-prevent tabIndex={0} role="dialog" aria-modal="true" aria-labelledby="rules-title"><header><div><span>OFFICIAL RULES</span><h2 id="rules-title">Crownlands Rules Sheet</h2></div><button onClick={onClose} aria-label="Close rules"><X /></button></header><div><figure className="cl-rule-page"><img src="/crownlands/rules/rules-01.jpg" alt="Crownlands official rules sheet page 1: setup, components and objective" /></figure><figure className="cl-rule-page"><img src="/crownlands/rules/rules-02.jpg" alt="Crownlands official rules sheet page 2: actions, control, special spaces and scoring" /></figure></div></div>
}

function GameplayVideo({ onPlaying }: { onPlaying: (playing: boolean) => void }) {
  const [started, setStarted] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const play = () => { setStarted(true); void video.current?.play() }
  return <div className={`cl-video ${started ? 'is-started' : ''}`}>
    <video ref={video} src="/crownlands/video/introduction.mp4" poster="/crownlands/board/crownlands-map.jpg" preload="metadata" controls={started} onPlay={() => onPlaying(true)} onPause={() => onPlaying(false)} onEnded={() => onPlaying(false)} aria-label="Complete Crownlands gameplay and presentation video" />
    {!started && <button onClick={play} aria-label="Play Crownlands introduction video"><Play fill="currentColor" /><span>PLAY FILM</span></button>}
  </div>
}

const actions = [
  ['REINFORCE', 'Strengthen your position using soldiers from your Base.'],
  ['EXPAND', 'Extend your influence into new territory using soldiers from your Base.'],
  ['REPOSITION', 'Reshape the position of soldiers already on the board.'],
  ['CONTEST', 'Move against territory held by a rival and challenge their control.'],
]

const loop = [
  ['01', 'READ THE BOARD', 'Assess your controlled territories, vulnerable borders, valuable spaces, special spaces and your opponent’s position.'],
  ['02', 'CHOOSE SECRETLY', 'Select one of four action cards while your opponent makes their choice at the same time.'],
  ['03', 'REVEAL', 'Both actions are revealed together.'],
  ['04', 'RESOLVE', 'Actions resolve according to the current rotating initiative order.'],
  ['05', 'UPDATE POWER', 'After a player’s full action is complete, territory control is recalculated and control flags update.'],
  ['06', 'REPEAT', 'After eight rounds, only the territories you still control contribute to your final score.'],
]

export default function CrownlandsPage() {
  const [rulesOpen, setRulesOpen] = useState(false)
  const audio = useCrownlandsAudio()
  useEffect(() => { document.body.classList.add('crownlands-theme'); return () => document.body.classList.remove('crownlands-theme') }, [])
  return <>
    <main className="crownlands-page">
      <button className="cl-sound" onClick={audio.toggle} aria-label={`Turn Crownlands sound ${audio.enabled ? 'off' : 'on'}`}>{audio.enabled ? <Volume2 /> : <VolumeX />}<span>SOUND {audio.enabled ? 'ON' : 'OFF'}</span></button>
      <section className="cl-hero" id="overview">
        <div className="cl-hero-bg"><img src="/crownlands/elements/crownlands-logo-cutout.png" alt="Crownlands shield, crowns and four kingdom flags" /></div>
        <div className="cl-hero-copy"><span>TABLETOP GAME DESIGN · GAME UX · SYSTEMS DESIGN</span><h1>CROWNLANDS</h1><p className="cl-hero-statement">Every flag is temporary. Every border is contested.</p><p>A territory-control strategy game where players read the map, predict rival intentions, and fight to hold power until the eighth round.</p><div><a href="#play">PLAY CROWNLANDS <ArrowRight /></a><a href="#how-to-play">SEE HOW IT WORKS <ArrowDown /></a></div></div>
      </section>
      <StickyNav />

      <section className="cl-overview cl-section">
        <article className="cl-about"><span>ABOUT THE GAME</span><h2>A fractured kingdom. A crown to claim.</h2><p>Gather your soldiers, raise your flags and read the ambitions across the table. Over eight rounds, two or four kingdoms compete for villages, barracks and the central castle. Hold the most valuable lands when the final round ends.</p></article><div className="cl-meta">{[
          ['YEAR', '2026'], ['PROJECT TYPE', 'Tabletop Game Design · Game UX · Systems Design'], ['TEAM', '3 Designers'], ['MY ROLE', 'Rules & Systems Design, Visual Direction, Map Illustration, Playtesting, 3D-Printed Game Piece Production'], ['TOOLS & METHODS', 'Figma, Illustrator, 3D Printing, Physical Prototyping, Playtesting, ChatGPT, Codex'],
        ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</div>
        <div className="cl-contribution"><article><span>MY CONTRIBUTION</span><p>This was a three-person team project. My contribution focused on shaping the game as both a system and a physical experience. I proposed and developed parts of the core rule structure, established the visual style direction, participated in drawing and refining the board, recruited players and conducted playtesting, and used 3D-printing techniques to produce physical game pieces for the final prototype.</p></article></div>
        <figure className="cl-sellsheet" tabIndex={0}><img src="/crownlands/artifacts/crownlands-sellsheet.jpg" alt="Crownlands final sell sheet presenting the map, components, gameplay and key features" loading="lazy" /></figure>
        <SectionHead eyebrow="FINAL PHYSICAL PROTOTYPE" title="See Crownlands in Action"><p>The final physical prototype turns territorial power into something players can read, move and physically contest across the table.</p></SectionHead>
        <GameplayVideo onPlaying={audio.duck} />
      </section>

      <section className="cl-section cl-system" id="how-to-play">
        <SectionHead eyebrow="THE SYSTEM" title="Simple actions. Constantly changing consequences."><p>Every round begins with four actions and a fresh set of decisions. Position, timing, territory value and rival intent continuously change what each action means.</p></SectionHead>
        <div className="cl-loop"><h3>The Core Loop</h3>{loop.map(([n, title, text]) => <article key={n}><span>{n}</span><h4>{title}</h4><p>{text}</p></article>)}</div>
        <div className="cl-actions"><header><h3>Four Actions</h3><button onClick={() => setRulesOpen(true)}><ScrollText /> VIEW FULL RULES</button></header>{actions.map(([title, copy], index) => <article key={title} className={index < 2 ? 'red' : 'blue'}><span>0{index + 1}</span><h4>{title}</h4><p>{copy}</p></article>)}</div>
        <blockquote><strong>More soldiers means control.</strong><p>A tie leaves the territory neutral. Control only updates after the current player’s full action has resolved.</p></blockquote>
        <div className="cl-risk"><article><span>RISK BEYOND THE SCORE</span><h3>Gather strength beyond your borders.</h3><p>Supply Spaces create opportunities to rebuild your military strength. Event Spaces introduce optional uncertainty through the Event Spinner. Because players choose whether to enter these spaces, each event becomes a deliberate tactical risk.</p></article><article><span>BUILT TO BE TOUCHED</span><h3>A physical interface for strategic state.</h3><p>Crownlands was designed as a physical interface. Soldiers communicate presence. Flags communicate authority. Cards communicate intent. The spinner makes uncertainty tangible.</p></article></div>
        <CrownlandsElements />
      </section>

      <section className="cl-section cl-play" id="play">
        <SectionHead eyebrow="PLAYABLE WEB ADAPTATION" title="Can you hold the Crown?"><p>Play a full eight-round match on the original Crownlands board. Choose two or four kingdoms, with any combination of friends and AI opponents. Share one device and take turns choosing your action.</p><p>The web version keeps the final physical rules while translating flags, tracking, legal movement and feedback into a digital interaction layer.</p></SectionHead>
        <div className="cl-game-meta">{[['PLAYERS', '2 or 4 kingdoms'], ['MODES', 'Friends & AI'], ['ROUNDS', '8'], ['BOARD', 'Original Crownlands Map']].map(([a, b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>
        <CrownlandsGame sound={audio.play} />
        <button className="cl-rules-button" onClick={() => setRulesOpen(true)}><ScrollText /> VIEW FULL RULES</button>
      </section>

      <section className="cl-section cl-thinking" id="design-thinking">
        <SectionHead eyebrow="BEHIND THE GAME" title="Designing the feeling before designing the rules."><p>Once the rules are understood, the more interesting question is why they feel the way they do.</p><p>We explored how a small system could repeatedly produce tension, prediction and meaningful spatial decisions.</p></SectionHead>
        <blockquote>How might four simple actions create enough uncertainty, conflict and strategic expression to remain meaningful across eight rounds?</blockquote>
        <div className="cl-north-star"><h3>What We Wanted Players to Feel</h3>{[
          ['PREDICTION', '“What will they do next?”', 'Players read the board and anticipate each other’s intentions.'],
          ['TENSION', '“Can I afford to leave this territory?”', 'Valuable territories keep borders under pressure.'],
          ['AGENCY', '“This happened because of my decision.”', 'Positioning and player choice shape the strategy.'],
          ['READABILITY', '“I understand what just changed.”', 'Visible flags and trackers help players follow every change in power.'],
        ].map(([a, b, c]) => <article key={a}><span>{a}</span><h4>{b}</h4><p>{c}</p></article>)}</div>
        <div className="cl-frameworks">
          <article><span>FRAMEWORK 01</span><h3>01 — Playcentric Design</h3><p>We worked backwards from the intended player experience. Before adding complexity, we asked what players should feel during play: pressure when a border becomes vulnerable, satisfaction when control becomes visible, and uncertainty when another player’s action is revealed.</p><p>Playtesting examined how players experienced tension, control and uncertainty.</p><div className="cl-flow">{['INTENDED EXPERIENCE', 'PROTOTYPE', 'PLAYER BEHAVIOUR', 'OBSERVATION', 'ITERATION'].map((item, i) => <span key={item}>{item}{i < 4 && <ArrowRight />}</span>)}</div></article>
          <article><span>FRAMEWORK 02</span><h3>02 — Mechanics → Gameplay → Experience</h3><p>We evaluated each mechanic through the behaviour it produced and the player experience it supported.</p><div className="cl-mapping">{[
            ['SECRET ACTION SELECTION', 'Players predict rival intentions', 'PREDICTION + TENSION'], ['MAJORITY CONTROL', 'Borders remain vulnerable', 'STRATEGIC PRESSURE'], ['CENTRAL 4-POINT TERRITORY', 'Players converge on a high-value space', 'CONFLICT'], ['OPTIONAL EVENT SPACES', 'Players choose whether to accept uncertainty', 'RISK + AGENCY'], ['CONTROL FLAGS', 'Authority becomes immediately visible', 'CLARITY'],
          ].map((row) => <div key={row[0]}>{row.map((text, i) => <span key={text}>{text}{i < 2 && <ArrowRight />}</span>)}</div>)}</div></article>
          <article><span>FRAMEWORK 03</span><h3>03 — Make the System Visible</h3><p>Our key iterations improved how the system communicated its state.</p><p>If players spend their attention remembering system state or interpreting an ambiguous action, they have less attention available for strategy.</p><p>Colour, flags and trackers made the information visible.</p><div className="cl-visible-system">{[['SOLDIERS', 'Presence'], ['FLAGS', 'Authority'], ['RED / BLUE ACTION CARD GROUPING', 'Where the soldiers come from'], ['SPECIAL SPACE TRACKING', 'What has already been used']].map(([a, b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div><blockquote>The physical interface makes important state visible at the moment it matters.</blockquote></article>
        </div>
      </section>

      <section className="cl-section cl-playtesting" id="playtesting">
        <SectionHead eyebrow="ITERATING THROUGH PLAY" title="Learning from every round."><p>Each playtest focused on a specific assumption: whether players could understand the system, read the board, make meaningful decisions, track state and compete fairly.</p></SectionHead>
        <div className="cl-process-strip">{[
          ['PHASE 01', 'Early Paper Prototype', 'Core territory-control concept\nEarly map structure\nPlayer-count setup', '/crownlands/process/early-brainstorm.jpg'],
          ['PHASE 02', 'Expanded System', 'Map pacing\nScoring choices\nSpecial spaces\nAction clarity', '/crownlands/process/playtest-grid.jpg'],
          ['PHASE 03', 'Final Physical Prototype', 'Rule clarity\nControl visibility\nTracking\nFull game flow', '/crownlands/elements/final-playtest.webp'],
        ].map(([phase, title, focus, image],index) => <article key={phase} className={index===0?'cl-early-paper-phase':''}><div className="cl-phase-images"><img src={image} alt={`${title} Crownlands design and playtesting documentation`} loading="lazy" />{index===0&&<img src="/crownlands/process/early-board-prototype.jpg" alt="Orange paper Crownlands board from the first prototype" loading="lazy" />}</div><span>{phase}</span><h3>{title}</h3><p>{focus}</p></article>)}</div>
        <div className="cl-iterations">
          <article><div><span>ITERATION 01 · MORE ROUTES, RICHER DECISIONS</span><h3>Give every route a strategic purpose.</h3><dl><dt>OBSERVATION</dt><dd>Players understood the scoring goal quickly. Testing revealed opportunities for more routes, scoring choices and conflict areas.</dd><dt>INSIGHT</dt><dd>Strategic depth grows through meaningful choices and competing routes.</dd><dt>DESIGN RESPONSE</dt><dd>We expanded the map, added more connected territories and created clearer points of strategic pressure. The final board gives players more meaningful choices between expansion, defence, centre control and alternative routes.</dd></dl><blockquote>Make every route matter.</blockquote></div><div className="cl-before-after"><img src="/crownlands/board/crownlands-map.jpg" alt="Final Crownlands map with expanded routes and strategic pressure points" loading="lazy" /></div></article>
          <article><div><span>ITERATION 02 · CLEARER ACTIONS</span><h3>Show where each action begins.</h3><dl><dt>OBSERVATION</dt><dd>Players confused actions that deployed soldiers from the Base with actions that moved soldiers already on the board.</dd><dt>INSIGHT</dt><dd>Each action needed a clearer indication of its soldier source.</dd><dt>DESIGN RESPONSE</dt><dd>The action cards were divided into two functional colour groups:<br /><b>RED</b> Base deployment<br /><b>BLUE</b> Board movement<br />This allowed players to identify the action type before reading every instruction again.</dd></dl><blockquote>Make the action source visible.</blockquote></div><div className="cl-original-cards">{(['EXPAND', 'REINFORCE', 'CONTEST', 'REPOSITION'] as const).map(action => <CrownlandsActionCard key={action} action={action} />)}</div></article>
          <article><div><span>ITERATION 03 · MOVE STATE OUT OF MEMORY</span><h3>The game was asking players to remember too much.</h3><dl><dt>OBSERVATION</dt><dd>Players sometimes forgot which numbered Supply or Event Spaces they had already activated.</dd><dt>INSIGHT</dt><dd>Players needed a visible record of activated spaces.</dd><dt>DESIGN RESPONSE</dt><dd>The physical prototype introduced the Special Space Tracker so the game state became visible.</dd><dd>In the web adaptation, that same principle is translated digitally: once a special space has been used by the player, it is marked as used for that player.</dd></dl><blockquote>Move state from memory into the environment.</blockquote></div><div className="cl-iteration-playtests"><figure tabIndex={0}><img src="/crownlands/process/playtest-grid.jpg" alt="Crownlands playtest with a visible grid and special-space tracking cards" loading="lazy" /></figure><figure tabIndex={0}><img src="/crownlands/process/playtest-map.jpg" alt="Crownlands map playtest with cards, counters and player notes" loading="lazy" /></figure></div></article>
        </div>
      </section>

      <section className="cl-section cl-outcome" id="outcome">
        <SectionHead eyebrow="FINAL EXPERIENCE" title="Designing play means designing consequences."><p>The final Crownlands system kept its core intentionally small: four actions, visible territory control, a limited number of soldiers and eight rounds.</p><p>The depth came from how those elements interacted.</p><p>A simple action could protect a border, expose another territory, deny an opponent, create a new route or completely change the value of the next decision.</p><p>The final prototype paired a compact rule set with clearer feedback.</p></SectionHead>
        <figure className="cl-final-photo"><img src="/crownlands/elements/overview.png" alt="Complete Crownlands physical prototype with board, spinner, soldiers, flags and action cards" loading="lazy" /><figcaption>The complete physical game brings the board, soldiers, flags and action cards together.</figcaption></figure>
        <div className="cl-learnings"><h3>What I Learned About Designing Play</h3>{[
          ['01', 'MECHANICS SHAPE EXPERIENCE', 'A rule only becomes meaningful through the behaviour and decisions it produces.'],
          ['02', 'CLARITY CREATES STRATEGIC DEPTH', 'Clear interfaces and visible state give players more attention for meaningful decisions.'],
          ['03', 'GOOD UNCERTAINTY PRESERVES AGENCY', 'The strongest tension came from predicting another player’s intention. Players chose when to take a chance on an event.'],
        ].map(([n, title, text]) => <article key={n}><span>{n}</span><h4>{title}</h4><p>{text}</p></article>)}</div>
        <blockquote>Crownlands taught me to design games as systems that shape decisions.</blockquote>
      </section>
    </main>
    {rulesOpen && <RulesModal onClose={() => setRulesOpen(false)} />}
    <Footer />
  </>
}
