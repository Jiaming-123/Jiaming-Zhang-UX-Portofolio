import { useLanguage } from '../i18n/language-context'
import { LanguageSwitch } from '../i18n/Language'
import { useCrownlandsCopy } from '../i18n/crownlands'
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
  const t = useCrownlandsCopy()
  return <header className="cl-section-head"><span>{t(eyebrow)}</span><h2>{t(title)}</h2>{children}</header>
}

function StickyNav() {
  const t = useCrownlandsCopy()
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -68%', threshold: [0, .15, .5] })
    NAV.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  return <nav className="cl-sticky-nav" aria-label={t("Crownlands sections")}>{NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{t(label)}</a>)}</nav>
}

function RulesModal({ onClose }: { onClose: () => void }) {
  const { isChinese } = useLanguage()
  const t = useCrownlandsCopy()
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', escape); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', escape); document.body.style.overflow = '' }
  }, [onClose])
  return <div className="cl-rules-modal" data-lenis-prevent tabIndex={0} role="dialog" aria-modal="true" aria-labelledby="rules-title"><header><div><span>{t("OFFICIAL RULES")}</span><h2 id="rules-title">{t("Crownlands Rules Sheet")}</h2></div><button onClick={onClose} aria-label={t("Close rules")}><X /></button></header><div><figure className="cl-rule-page"><img src={isChinese ? '/crownlands/zh/rules-01.webp' : '/crownlands/rules/rules-01.jpg'} alt={t("Crownlands official rules sheet page 1: setup, components and objective")} /></figure><figure className="cl-rule-page"><img src={isChinese ? '/crownlands/zh/rules-02.webp' : '/crownlands/rules/rules-02.jpg'} alt={t("Crownlands official rules sheet page 2: actions, control, special spaces and scoring")} /></figure></div></div>
}

function GameplayVideo() {
  const t = useCrownlandsCopy()
  const { isChinese } = useLanguage()
  const selectedSource = isChinese ? '/crownlands/video/introduction-zh-20261105.mp4' : '/crownlands/video/introduction.mp4'
  const [videoSource, setVideoSource] = useState(selectedSource)
  const [started, setStarted] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const resumePlayback = useRef<{ time: number; playing: boolean } | null>(null)
  useEffect(() => {
    if (videoSource === selectedSource) return
    const player = video.current
    resumePlayback.current = player ? { time: player.currentTime, playing: !player.paused } : null
    setVideoSource(selectedSource)
  }, [selectedSource, videoSource])
  const restorePlayback = () => {
    const player = video.current
    const resume = resumePlayback.current
    if (!player || !resume) return
    resumePlayback.current = null
    player.currentTime = Math.min(resume.time, player.duration || resume.time)
    if (resume.playing) void player.play().catch(() => { /* Native controls remain available. */ })
    else player.pause()
  }
  const play = () => { setStarted(true); void video.current?.play() }
  return <div className={`cl-video ${started ? 'is-started' : ''}`}>
    <video ref={video} src={videoSource} poster="/crownlands/board/crownlands-map.jpg" preload="metadata" playsInline controls={started} onLoadedMetadata={restorePlayback} aria-label={t("Complete Crownlands gameplay and presentation video")} />
    {!started && <button onClick={play} aria-label={t("Play Crownlands introduction video")}><Play fill="currentColor" /><span>{t("PLAY FILM")}</span></button>}
  </div>
}

const actions = [
  ['REINFORCE', 'Bring soldiers from your Base to strengthen territory you control.'],
  ['EXPAND', 'Send soldiers from your Base to claim a foothold in new territory.'],
  ['REPOSITION', 'Move soldiers already on the map to put your next plan in motion.'],
  ['CONTEST', 'March into rival territory and put their flag to the test.'],
] as const

const loop = [
  ['01', 'READ THE BOARD', 'Take a look around. Which border needs support? Which valuable space is within reach? Where might your rival be heading?', 'read-board', 'Read the Crownlands board and its territories'],
  ['02', 'CHOOSE SECRETLY', 'Pick one of your four action cards and place it face down. The other kingdoms are making their choices too.', 'choose-secretly', 'Players choose their action cards face down'],
  ['03', 'REVEAL', 'Turn the cards over together. This is where the plans around the table meet.', 'reveal', 'Players turn their chosen action cards face up'],
  ['04', 'RESOLVE', 'Carry out the actions in this round’s initiative order. The starting kingdom rotates each round.', 'resolve', 'A player moves soldiers to resolve an action'],
  ['05', 'UPDATE POWER', 'Finish the player’s full action, then check who has the largest force in each territory and update the flags. Tied territories stay neutral.', 'update-power', 'Players update the control flags after their actions'],
  ['06', 'REPEAT', 'Choose again and see how the map changes. At the end of round eight, add up the value of the territories under your flags.', 'repeat', 'The next round begins and the initiative order rotates'],
]

function CoreLoop() {
  const t = useCrownlandsCopy()
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setMotionAllowed(!preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' })
    if (container.current) observer.observe(container.current)
    return () => { observer.disconnect(); preference.removeEventListener('change', updatePreference) }
  }, [])
  const animate = visible && motionAllowed && !paused
  return <div className="cl-loop" ref={container}>
    <header className="cl-loop-heading"><h3>{t("Around the Table")}</h3>{motionAllowed && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{t(paused ? 'PLAY GIFS' : 'PAUSE GIFS')}</button>}</header>
    {loop.map(([n, title, text, clip, description]) => <article key={n}>
      <span>{n}</span>
      <img className="cl-loop-clip" src={`/crownlands/loop/${clip}-20261015.${animate ? 'gif' : 'webp'}`} width={480} height={234} loading="lazy" decoding="async" alt={t(description)} />
      <h4>{t(title)}</h4><p>{t(text)}</p>
    </article>)}
  </div>
}

export default function CrownlandsPage() {
  const { isChinese } = useLanguage()
  const t = useCrownlandsCopy()
  const [rulesOpen, setRulesOpen] = useState(false)
  const [enlargedAction, setEnlargedAction] = useState<string | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const audio = useCrownlandsAudio(gameActive)
  useEffect(() => { document.body.classList.add('crownlands-theme'); return () => document.body.classList.remove('crownlands-theme') }, [])
  return <>
    <div className="crownlands-language-control"><LanguageSwitch /></div>
    <main className="crownlands-page">
      {gameActive && <button className="cl-sound" onClick={audio.toggle} aria-pressed={audio.enabled} aria-label={t(audio.enabled ? "Turn Crownlands music off" : "Turn Crownlands music on")}>{audio.enabled ? <Volume2 /> : <VolumeX />}<span>{t("MUSIC")} {t(audio.enabled ? 'ON' : 'OFF')}</span></button>}
      <section className="cl-hero" id="overview">
        <div className="cl-hero-bg"><img src="/crownlands/elements/crownlands-logo-cutout.png" alt={t("Crownlands shield, crowns and four kingdom flags")} /></div>
        <div className="cl-hero-copy"><span>{t("TABLETOP GAME DESIGN · GAME UX · SYSTEMS DESIGN")}</span><h1>CROWNLANDS</h1><p className="cl-hero-statement">{t("Eight rounds. Four actions. A crown to claim.")}</p><p>{t("Gather your soldiers, watch your rivals and make your move. Each round brings a fresh chance to claim a village, defend a border or make a play for the castle.")}</p><div><a href="#play">{t("PLAY CROWNLANDS")} <ArrowRight /></a><a href="#how-to-play">{t("SEE HOW IT WORKS")} <ArrowDown /></a></div></div>
      </section>
      <StickyNav />

      <section className="cl-overview cl-section">
        <article className="cl-about"><span>{t("ABOUT THE GAME")}</span><h2>{t("A fractured kingdom. A crown to claim.")}</h2><p>{t("Two or four kingdoms share a map full of tempting places to claim. The castle draws everyone towards the centre, while villages and barracks offer their own routes to victory. Choose your actions in secret, reveal them together, and see whose plans meet at the border. After eight rounds, the lands under your flags decide who takes the crown.")}</p></article><div className="cl-meta">{[
          ['YEAR', '2026'], ['PROJECT TYPE', 'Tabletop Game Design · Game UX · Systems Design'], ['TEAM', '3 Designers'], ['MY ROLE', 'Rules & Systems Design, Visual Direction, Map Illustration, Playtesting, 3D-Printed Game Piece Production'], ['TOOLS & METHODS', 'Figma, Illustrator, 3D Printing, Physical Prototyping, Playtesting, ChatGPT, Codex'],
        ].map(([term, value]) => <div key={term}><dt>{t(term)}</dt><dd>{t(value)}</dd></div>)}</div>
        <div className="cl-contribution"><article><span>{t("MY CONTRIBUTION")}</span><p>{t("We made Crownlands as a team of three. I helped develop the core rules, set the visual direction and draw and refine the board. I also brought players to the table for playtests and produced the final game pieces through 3D printing. Moving between rules, artwork and physical pieces helped me see how each part shaped the experience of playing.")}</p></article></div>
        <figure className="cl-sellsheet" tabIndex={0}><img src={isChinese ? '/crownlands/zh/sellsheet.webp' : '/crownlands/artifacts/crownlands-sellsheet.jpg'} alt={t("Crownlands final sell sheet presenting the map, components, gameplay and key features")} loading="lazy" /></figure>
        <SectionHead eyebrow="FINAL PHYSICAL PROTOTYPE" title="See Crownlands in Action"></SectionHead>
        <GameplayVideo />
      </section>

      <section className="cl-section cl-system" id="how-to-play">
        <SectionHead eyebrow="YOUR FIRST ROUND" title="Pick a card. Read the room. Make your move."><p>{t("A rival has their eye on the castle. Your border could use another soldier. A village is within reach. Choose one of four actions, then watch everyone reveal their plans together. The same card can feel very different from one round to the next.")}</p></SectionHead>
        <CoreLoop />
        <div className="cl-actions"><header><h3>{t("Four Actions")}</h3><button onClick={() => setRulesOpen(true)}><ScrollText /> {t("VIEW FULL RULES")}</button></header>{actions.map(([title, copy], index) => <article key={title} className={index < 2 ? 'red' : 'blue'}><span>0{index + 1}</span><button type="button" className="cl-action-preview" aria-label={t("Enlarge {action} action card", { action: t(title.toLowerCase()) })} aria-pressed={enlargedAction === title} onClick={() => setEnlargedAction(current => current === title ? null : title)}><CrownlandsActionCard action={title} /></button><h4>{t(title)}</h4><p>{t(copy)}</p></article>)}</div>
        <CrownlandsElements />
      </section>

      <section className="cl-section cl-play" id="play">
        <SectionHead eyebrow="TAKE YOUR SEAT" title="Can you hold the Crown?"><p>{t("Your kingdom is ready. Play eight rounds on the original board with two or four kingdoms. Bring friends, add AI rivals, and pass the device around as each player chooses an action in secret.")}</p><p>{t("The browser version follows the physical game’s rules. It keeps track of flags and special spaces, highlights available moves and shows each change as the round unfolds.")}</p></SectionHead>
        <div className="cl-game-meta">{[['PLAYERS', '2 or 4 kingdoms'], ['MODES', 'Friends & AI'], ['ROUNDS', '8'], ['BOARD', 'Original Crownlands Map']].map(([a, b]) => <div key={a}><span>{t(a)}</span><strong>{t(b)}</strong></div>)}</div>
        <CrownlandsGame sound={audio.play} onActiveChange={setGameActive} />
        <button className="cl-rules-button" onClick={() => setRulesOpen(true)}><ScrollText /> {t("VIEW FULL RULES")}</button>
      </section>

      <section className="cl-section cl-thinking" id="design-thinking">
        <SectionHead eyebrow="BEHIND THE GAME" title="It starts with a look across the table."><p>{t("A player reaches for a card. Someone glances at the castle. Everyone has a plan, and the reveal is coming. Those little moments were the starting point for our design.")}</p><p>{t("We wanted each round to give players something to read, a choice to weigh up and a reason to lean forward when the cards turned over.")}</p></SectionHead>
        <blockquote>{t("How could four actions keep a table of players guessing, planning and surprising each other for eight rounds?")}</blockquote>
        <div className="cl-north-star"><h3>{t("What We Wanted Players to Feel")}</h3>{[
          ['PREDICTION', '“What will they do next?”', 'A glance at a rival’s soldiers can change the card you choose.'],
          ['TENSION', '“Can I afford to leave this territory?”', 'The castle is tempting, and that border still needs someone to hold it.'],
          ['AGENCY', '“This happened because of my decision.”', 'Each soldier you move helps shape the next opportunity on the map.'],
          ['READABILITY', '“I understand what just changed.”', 'A flag changes hands, and everyone can follow the new balance of power.'],
        ].map(([a, b, c]) => <article key={a}><span>{t(a)}</span><h4>{t(b)}</h4><p>{t(c)}</p></article>)}</div>
        <div className="cl-frameworks">
          <article><span>{t("FRAMEWORK 01")}</span><h3>{t("01 — Start with the feeling")}</h3><p>{t("We took a playcentric approach: start with the moments we hoped players would enjoy, then build rules around them. A border worth defending. The satisfaction of raising a flag. The surprise of seeing what everyone chose.")}</p><p>{t("At playtests, we watched how those moments landed around the table.")}</p><div className="cl-flow">{['INTENDED EXPERIENCE', 'PROTOTYPE', 'PLAYER BEHAVIOUR', 'OBSERVATION', 'ITERATION'].map((item, i) => <span key={item}>{t(item)}{i < 4 && <ArrowRight />}</span>)}</div></article>
          <article><span>{t("FRAMEWORK 02")}</span><h3>{t("02 — Follow a rule around the table")}</h3><p>{t("For each rule, we asked: what does it invite players to do, and how does that feel when everyone is playing?")}</p><div className="cl-mapping">{[
            ['SECRET ACTION SELECTION', 'Read a rival’s next move', 'PREDICTION + TENSION'], ['MAJORITY CONTROL', 'Weigh up which border to defend', 'STRATEGIC PRESSURE'], ['CENTRAL 4-POINT TERRITORY', 'Meet in the race for the castle', 'CONFLICT'], ['OPTIONAL EVENT SPACES', 'Choose a moment to try the spinner', 'RISK + AGENCY'], ['CONTROL FLAGS', 'See whose flag is flying', 'CLARITY'],
          ].map((row) => <div key={row[0]}>{row.map((text, i) => <span key={text}>{t(text)}{i < 2 && <ArrowRight />}</span>)}</div>)}</div></article>
          <article><span>{t("FRAMEWORK 03")}</span><h3>{t("03 — Let the pieces do the talking")}</h3><p>{t("We gave the board, cards and trackers clear jobs to do.")}</p><p>{t("When players can see who holds a territory and where an action begins, they have more room to plan their next move.")}</p><p>{t("Card colours point to the source of the soldiers. Flags mark control. Trackers keep a record of the special spaces each kingdom has visited.")}</p><div className="cl-visible-system">{[['SOLDIERS', 'Your forces on the map'], ['FLAGS', 'The lands you hold'], ['RED / BLUE ACTION CARD GROUPING', 'Where the soldiers come from'], ['SPECIAL SPACE TRACKING', 'What has already been used']].map(([a, b]) => <div key={a}><strong>{t(a)}</strong><span>{t(b)}</span></div>)}</div><blockquote>{t("A quick look at the table should help you choose your next move.")}</blockquote></article>
        </div>
      </section>

      <section className="cl-section cl-playtesting" id="playtesting">
        <SectionHead eyebrow="ITERATING THROUGH PLAY" title="Learning from every round."><p>{t("Every playtest gave us a new question to follow. How quickly could players get started? Which routes caught their attention? How did they keep track as flags and soldiers moved around the map?")}</p></SectionHead>
        <div className="cl-process-strip">{[
          ['PHASE 01', 'Early Paper Prototype', 'Core territory-control concept\nEarly map structure\nPlayer-count setup', '/crownlands/process/early-brainstorm.jpg'],
          ['PHASE 02', 'Expanded System', 'Map pacing\nScoring choices\nSpecial spaces\nAction clarity', '/crownlands/process/playtest-grid.jpg'],
          ['PHASE 03', 'Final Physical Prototype', 'Rule clarity\nControl visibility\nTracking\nFull game flow', '/crownlands/elements/final-playtest.webp'],
        ].map(([phase, title, focus, image],index) => <article key={phase} className={index===0?'cl-early-paper-phase':''}><div className="cl-phase-images"><img src={image} alt={t("{phase} Crownlands design and playtesting documentation", { phase: t(title) })} loading="lazy" />{index===0&&<img src="/crownlands/process/early-board-prototype.jpg" alt={t("Orange paper Crownlands board from the first prototype")} loading="lazy" />}</div><span>{t(phase)}</span><h3>{t(title)}</h3><p>{t(focus)}</p></article>)}</div>
        <div className="cl-iterations">
          <article><div><span>{t("ITERATION 01 · MORE ROUTES, RICHER DECISIONS")}</span><h3>{t("Give players another tempting route.")}</h3><dl><dt>{t("OBSERVATION")}</dt><dd>{t("Players picked up the scoring goal quickly. As we watched them explore the board, we saw room for more routes, places to score and borders worth competing over.")}</dd><dt>{t("INSIGHT")}</dt><dd>{t("Several appealing paths give players a reason to weigh up their next move.")}</dd><dt>{t("DESIGN RESPONSE")}</dt><dd>{t("We expanded the map and connected more territories. Players could push towards the castle, build a foothold elsewhere or bring soldiers back to defend a valuable border.")}</dd></dl><blockquote>{t("Make every route matter.")}</blockquote></div><div className="cl-before-after"><img src="/crownlands/board/crownlands-map.jpg" alt={t("Final Crownlands map with expanded routes and strategic pressure points")} loading="lazy" /></div></article>
          <article><div><span>{t("ITERATION 02 · CLEARER ACTIONS")}</span><h3>{t("Let colour give players a head start.")}</h3><dl><dt>{t("OBSERVATION")}</dt><dd>{t("Players paused to work out whether an action used soldiers from the Base or soldiers already on the map.")}</dd><dt>{t("INSIGHT")}</dt><dd>{t("The first thing an action card should tell you is where your soldiers come from.")}</dd><dt>{t("DESIGN RESPONSE")}</dt><dd>{t("We grouped the cards by colour:")}<br /><b>{t("RED")}</b> {t("Base deployment")}<br /><b>{t("BLUE")}</b> {t("Board movement")}<br />{t("A glance at the colour gave players a starting point for their move.")}</dd></dl><blockquote>{t("Make the action source visible.")}</blockquote></div><div className="cl-original-cards">{(['EXPAND', 'REINFORCE', 'CONTEST', 'REPOSITION'] as const).map(action => <CrownlandsActionCard key={action} action={action} />)}</div></article>
          <article><div><span>{t("ITERATION 03 · KEEP A RECORD ON THE TABLE")}</span><h3>{t("Give each kingdom a record of its travels.")}</h3><dl><dt>{t("OBSERVATION")}</dt><dd>{t("As the match went on, keeping track of visited Supply and Event Spaces took more attention.")}</dd><dt>{t("INSIGHT")}</dt><dd>{t("A shared view of each kingdom’s used spaces would make the next choice easier to follow.")}</dd><dt>{t("DESIGN RESPONSE")}</dt><dd>{t("We added Flags to make your controls visible and a Special Space Tracker to record the numbered spaces each kingdom had activated.")}</dd><dd>{t("The browser version keeps that record too, marking each special space as used for the player who activated it.")}</dd></dl><blockquote>{t("Keep the record on the table and the next move in mind.")}</blockquote></div><div className="cl-iteration-playtests"><figure tabIndex={0}><img src="/crownlands/process/playtest-grid.jpg" alt={t("Crownlands playtest with a visible grid and special-space tracking cards")} loading="lazy" /></figure><figure tabIndex={0}><img src="/crownlands/process/playtest-map.jpg" alt={t("Crownlands map playtest with cards, counters and player notes")} loading="lazy" /></figure></div></article>
        </div>
      </section>

      <section className="cl-section cl-outcome" id="outcome">
        <SectionHead eyebrow="FINAL EXPERIENCE" title="One move can give the whole table a new plan."><p>{t("Crownlands comes together through four actions, a supply of soldiers, flags to mark the lands you hold and eight rounds to make your play.")}</p><p>{t("The fun is in how those pieces meet on the map.")}</p><p>{t("A pair of soldiers can secure a border, open a route towards the castle or draw a rival into a different corner of the board. Each move gives everyone something new to think about.")}</p><p>{t("The final prototype brings those choices to the table through clear cards, visible flags and pieces made to be moved.")}</p></SectionHead>
        <figure className="cl-final-photo"><img src="/crownlands/elements/overview.png" alt={t("Complete Crownlands physical prototype with board, spinner, soldiers, flags and action cards")} loading="lazy" /><figcaption>{t("The complete physical game brings the board, soldiers, flags and action cards together.")}</figcaption></figure>
        <div className="cl-learnings"><h3>{t("What I Learned About Designing Play")}</h3>{[
          ['01', 'A RULE COMES ALIVE AT THE TABLE', 'I learned to follow a rule all the way through to the choices, reactions and conversations it creates.'],
          ['02', 'CLEAR PIECES MAKE ROOM FOR PLANS', 'A readable board gives players room to watch each other, weigh up a risk and try something clever.'],
          ['03', 'LET PLAYERS CHOOSE THEIR CHANCES', 'Much of the excitement came from guessing what another player had chosen. Event Spaces added another chance for players to back their luck.'],
        ].map(([n, title, text]) => <article key={n}><span>{n}</span><h4>{t(title)}</h4><p>{t(text)}</p></article>)}</div>

      </section>
    </main>
    {rulesOpen && <RulesModal onClose={() => setRulesOpen(false)} />}
    <Footer />
  </>
}
