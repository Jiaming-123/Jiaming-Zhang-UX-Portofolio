import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { SectionLabel } from './Content'

const FIGMA_FILE_KEY = 'n7Zgb0nVXh4GQt9G4fFqbz'
const FIGMA_PAGE_ID = '2538:2'
const imageRoot = '/images/boardgamemate/final-ui'
const guideImageRoot = `${imageRoot}/guides`

type FlowImage = {
  alt: string
  file: string
  frameName: string
  nodeId: string
}

type BoardGameMateFlow = {
  description: string
  goal: string
  id: string
  images: FlowImage[]
  steps: FlowStep[]
  label: string
  principle: string
  prototypeStartNode: string
  prototypeStartName: string
  startInstruction: string
  title: string
  visualJourney: string[]
}

type FlowStep = {
  action: string
  detail: string
  image: string
  imageHeight: number
  imageWidth: number
}

// Figma sources were read from the file's real flowStartingPoints and exported at 2x.
// Flow 04 and 05 are intentionally reordered here to match the case-study narrative:
// Figma FLOW 05 is Create; Figma FLOW 04 is Match and invite Maya.
const boardGameMateFlows: BoardGameMateFlow[] = [
  {
    id: '01',
    label: 'FIND A GAME TONIGHT',
    title: 'From intent to a confirmed seat',
    goal: 'I want to play something tonight.',
    description: 'Instead of asking users to browse profiles and message people manually, BoardGameMate surfaces playable sessions directly. Session details provide enough context to make a confident decision, while a short confirmation flow turns discovery into an actual commitment.',
    visualJourney: ['Discover', 'Recommended session', 'Session detail', 'Join confirmation', 'Joined'],
    principle: 'REDUCE TIME-TO-TABLE',
    prototypeStartNode: '2538:6',
    prototypeStartName: 'FLOW 01 — Find and join a game tonight',
    startInstruction: 'Start by selecting the recommended Stardew Valley session.',
    steps: [
      { action: 'Join game', detail: 'Select the recommended Stardew Valley session.', image: 'flow-01-card-join.png', imageWidth: 738, imageHeight: 538 },
      { action: 'Join game', detail: 'Confirm the session from its detail screen.', image: 'flow-01-detail-join.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Confirm seat', detail: 'Complete the join confirmation.', image: 'flow-01-confirm-seat.png', imageWidth: 690, imageHeight: 104 },
    ],
    images: [
      { file: 'flow-01-discover.png', nodeId: '2538:6', frameName: 'P01 / Discover / Default', alt: 'BoardGameMate Discover screen showing a recommended Stardew Valley session' },
      { file: 'flow-01-session-detail.png', nodeId: '2540:218', frameName: 'P06 / Session / Stardew Valley', alt: 'BoardGameMate Stardew Valley session detail with time, place, compatibility and attendance' },
      { file: 'flow-01-joined.png', nodeId: '2540:222', frameName: 'P08 / Session / Joined', alt: 'BoardGameMate joined session state confirming a player seat' },
    ],
  },
  {
    id: '02',
    label: 'FIND GAMES NEAR ME',
    title: 'From nearby people to nearby opportunities',
    goal: 'What can I join around me?',
    description: 'The early map answered “Who is nearby?”, but that still left users to work out whether there was actually a playable game. The revised experience organises the map around sessions rather than individual players, making time, capacity and action visible at the point of discovery.',
    visualJourney: ['Discover', 'Nearby Map', 'Filter', 'Select opportunity', 'Join'],
    principle: 'DESIGN AROUND USER GOALS, NOT SYSTEM OBJECTS',
    prototypeStartNode: '2538:96',
    prototypeStartName: 'FLOW 02 — Find a nearby playable opportunity',
    startInstruction: 'Start by opening the nearby map filters.',
    steps: [
      { action: 'Tonight', detail: 'Open the nearby-session filters.', image: 'flow-02-filter.png', imageWidth: 144, imageHeight: 60 },
      { action: 'Apply filters', detail: 'Apply the selected time, level and distance.', image: 'flow-02-apply.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Join game', detail: 'Choose the recommended playable opportunity.', image: 'flow-02-join.png', imageWidth: 738, imageHeight: 538 },
    ],
    images: [
      { file: 'flow-02-nearby-map.png', nodeId: '2538:96', frameName: 'P03 / Nearby / Map Default', alt: 'BoardGameMate Nearby Map showing playable sessions around Melbourne' },
      { file: 'flow-02-filter.png', nodeId: '2636:417', frameName: 'P04 / Nearby / Filter Sheet / Dimmed', alt: 'BoardGameMate nearby session filters for time, experience level and distance' },
    ],
  },
  {
    id: '03',
    label: 'LEARN BEFORE PLAYING',
    title: 'Learning that continues into the game',
    goal: 'I’ve never played Wingspan before.',
    description: 'Rather than presenting another library of rulebooks and videos, the final experience breaks learning into short, progressive steps. Contextual support remains available during play, allowing players to resolve specific questions without leaving the table.',
    visualJourney: ['Learn', 'Learning journey', 'Turn anatomy', 'Complete lesson', 'Game Companion', 'Quick rules'],
    principle: 'SUPPORT PLAYERS BEFORE AND DURING PLAY',
    prototypeStartNode: '2538:180',
    prototypeStartName: 'FLOW 03 — Learn Wingspan before play',
    startInstruction: 'Start by continuing the Wingspan learning journey.',
    steps: [
      { action: 'Continue learning', detail: 'Open the active Wingspan journey.', image: 'flow-03-continue.png', imageWidth: 288, imageHeight: 88 },
      { action: 'Next step', detail: 'Complete the Turn Anatomy lesson.', image: 'flow-03-next.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Continue learning', detail: 'Return to the learning journey after completing the lesson.', image: 'flow-03-continue-complete.png', imageWidth: 345, imageHeight: 52 },
      { action: 'Ask companion', detail: 'Open the game companion for contextual help.', image: 'flow-03-ask-companion.png', imageWidth: 353, imageHeight: 76 },
      { action: 'Quick rules', detail: 'Open the in-play rules and scoring reference.', image: 'flow-03-quick-rules.png', imageWidth: 706, imageHeight: 132 },
    ],
    images: [
      { file: 'flow-03-learn.png', nodeId: '2538:180', frameName: 'P09 / Learn / Overview', alt: 'BoardGameMate Learn screen showing a progressive Wingspan learning journey at 60 percent' },
      { file: 'flow-03-lesson.png', nodeId: '2540:441', frameName: 'P10 / Learn / Turn Anatomy', alt: 'BoardGameMate Turn Anatomy lesson explaining a Wingspan turn' },
      { file: 'flow-03-quick-rules.png', nodeId: '2636:452', frameName: 'P11B / Quick Rules / Overlay / Dimmed', alt: 'BoardGameMate in-play Quick Rules overlay for contextual support' },
    ],
  },
  {
    id: '04',
    label: 'CREATE A GAME',
    title: 'Making hosting feel lightweight',
    goal: 'I want to host a Wingspan game tomorrow.',
    description: 'Creating a session is divided into a short guided flow rather than one large form. Each step asks for only the information needed at that moment, preserves previous choices and provides a final review before publishing.',
    visualJourney: ['Create', 'Choose game', 'Time', 'Location', 'Player preferences', 'Review', 'Publish'],
    principle: 'PROGRESSIVE DISCLOSURE',
    prototypeStartNode: '2540:447',
    prototypeStartName: 'FLOW 05 — Host a game',
    startInstruction: 'Start by choosing Host a game.',
    steps: [
      { action: 'Start hosting', detail: 'Begin the guided hosting flow.', image: 'flow-04-start-hosting.png', imageWidth: 420, imageHeight: 104 },
      { action: 'Next · Game', detail: 'Choose Wingspan, then continue.', image: 'flow-04-next.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Next · Time', detail: 'Choose the date and time.', image: 'flow-04-next.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Next · Location', detail: 'Set the meeting place.', image: 'flow-04-next.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Next · Preferences', detail: 'Set player preferences and capacity.', image: 'flow-04-next.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Publish game', detail: 'Review and publish the session.', image: 'flow-04-publish.png', imageWidth: 690, imageHeight: 104 },
    ],
    images: [
      { file: 'flow-04-create-game.png', nodeId: '2540:447', frameName: 'P12 / Create / Start', alt: 'BoardGameMate Create screen offering a guided Host a game journey' },
      { file: 'flow-04-review.png', nodeId: '2540:457', frameName: 'P17 / Create / Review', alt: 'BoardGameMate session review screen summarising game, time, place and player preferences' },
      { file: 'flow-04-published.png', nodeId: '2540:459', frameName: 'P18 / Create / Published', alt: 'BoardGameMate confirmation showing a newly published game session' },
    ],
  },
  {
    id: '05',
    label: 'FIND THE RIGHT PLAYER',
    title: 'Matching compatibility, not popularity',
    goal: 'Who would I actually enjoy playing with?',
    description: 'Social metrics such as followers say little about whether two people will enjoy a game together. BoardGameMate instead uses signals such as shared games, skill level, play style, availability and location to explain why another player may be a strong match.',
    visualJourney: ['Discover', 'Player recommendation', 'Maya / match', 'Match explanation', 'Invite to session', 'Invite sent'],
    principle: 'MAKE RECOMMENDATIONS UNDERSTANDABLE',
    prototypeStartNode: '2540:461',
    prototypeStartName: 'FLOW 04 — Match and invite Maya',
    startInstruction: 'Start by opening Maya’s player recommendation.',
    steps: [
      { action: 'Maya · 92% fit', detail: 'Open Maya’s compatibility profile.', image: 'flow-05-maya.png', imageWidth: 690, imageHeight: 300 },
      { action: 'Invite to game', detail: 'Choose the session invitation action.', image: 'flow-05-invite.png', imageWidth: 690, imageHeight: 104 },
      { action: 'Send invite', detail: 'Confirm and send Maya the invitation.', image: 'flow-05-send-invite.png', imageWidth: 690, imageHeight: 104 },
    ],
    images: [
      { file: 'flow-05-player-match.png', nodeId: '2540:461', frameName: 'P19 / Players / Matches', alt: 'BoardGameMate player recommendations showing compatibility scores and match reasons' },
      { file: 'flow-05-match-detail.png', nodeId: '2540:463', frameName: 'P20 / Player Match / Maya', alt: 'BoardGameMate Maya match detail explaining games, play style, skill and availability compatibility' },
      { file: 'flow-05-invite.png', nodeId: '2630:439', frameName: 'P21 / Invite Confirmation / Maya / Dimmed', alt: 'BoardGameMate confirmation for inviting Maya to a game session' },
    ],
  },
  {
    id: '06',
    label: 'PREPARE FOR TONIGHT',
    title: 'From messaging to coordination',
    goal: 'We found each other. How do we actually make tonight happen?',
    description: 'Once players have matched, conversation is only a means to an end. The group experience keeps attendance, preparation and logistics visible alongside chat, turning unstructured messages into a lightweight coordination system.',
    visualJourney: ['Players', 'Active Group', 'Attendance', 'Preparation', 'Coordination', 'Table ready'],
    principle: 'CONVERSATION IS THE TOOL. PLAYING TOGETHER IS THE GOAL.',
    prototypeStartNode: '2538:436',
    prototypeStartName: 'FLOW 06 — Coordinate and prepare to play',
    startInstruction: 'Start by reviewing the active Stardew Valley group.',
    steps: [
      { action: 'Attendance', detail: 'Review who is confirmed and which seat is open.', image: 'flow-06-attendance.png', imageWidth: 690, imageHeight: 136 },
      { action: 'Preparation', detail: 'Open the shared preparation checklist.', image: 'flow-06-preparation.png', imageWidth: 690, imageHeight: 296 },
      { action: 'Message the group', detail: 'Use chat to confirm the remaining detail.', image: 'flow-06-message.png', imageWidth: 690, imageHeight: 104 },
    ],
    images: [
      { file: 'flow-06-coordination.png', nodeId: '2538:436', frameName: 'P23 / Group / Stardew Valley', alt: 'BoardGameMate active Stardew Valley group showing attendance, preparation and coordination' },
      { file: 'flow-06-table-ready.png', nodeId: '2540:487', frameName: 'P23C / Chat / Table Ready', alt: 'BoardGameMate table-ready state showing four confirmed players and completed preparation' },
    ],
  },
]

function prototypeUrl(nodeId: string) {
  const node = nodeId.replace(':', '-')
  return `https://www.figma.com/proto/${FIGMA_FILE_KEY}/BoardGameMate?page-id=${encodeURIComponent(FIGMA_PAGE_ID)}&node-id=${node}&starting-point-node-id=${encodeURIComponent(nodeId)}&scaling=scale-down&content-scaling=fixed&hide-ui=1`
}

function embedUrl(nodeId: string) {
  const node = nodeId.replace(':', '-')
  return `https://embed.figma.com/proto/${FIGMA_FILE_KEY}/BoardGameMate?page-id=${encodeURIComponent(FIGMA_PAGE_ID)}&node-id=${node}&starting-point-node-id=${encodeURIComponent(nodeId)}&scaling=scale-down&content-scaling=fixed&hide-ui=1&embed-host=share`
}

function PrototypeModal({ flow, onClose }: { flow: BoardGameMateFlow; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], iframe, [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="bgm-prototype-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className="bgm-prototype-modal" role="dialog" aria-modal="true" aria-labelledby="bgm-prototype-title" aria-describedby="bgm-prototype-instructions">
        <header className="bgm-prototype-topbar">
          <div><span>INTERACTIVE PROTOTYPE / {flow.id}</span><h2 id="bgm-prototype-title">{flow.title}</h2></div>
          <div><small>ESC TO CLOSE</small><button ref={closeRef} type="button" onClick={onClose} aria-label="Close interactive prototype"><X /></button></div>
        </header>
        <div className="bgm-prototype-body">
          <div className="bgm-prototype-frame">
            {loading && <div className="bgm-prototype-loading" role="status">Loading interactive prototype…</div>}
            <iframe
              src={embedUrl(flow.prototypeStartNode)}
              title={`BoardGameMate prototype: ${flow.label.toLowerCase()}`}
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </div>
          <aside id="bgm-prototype-instructions">
            <div><span>GOAL</span><p>{flow.goal}</p></div>
            <div><span>START HERE</span><p>{flow.startInstruction}</p></div>
            <div className="bgm-prototype-steps">
              <span>BUTTON ORDER</span>
              <ol>
                {flow.steps.map((step, index) => (
                  <li key={`${flow.id}-${step.action}-${index}`}>
                    <div className="bgm-prototype-step-image">
                      <img src={`${guideImageRoot}/${step.image}`} width={step.imageWidth} height={step.imageHeight} loading="lazy" decoding="async" alt={`Button ${index + 1}: ${step.action}`} />
                    </div>
                    <div><b>{String(index + 1).padStart(2, '0')} · {step.action}</b><p>{step.detail}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <a href={prototypeUrl(flow.prototypeStartNode)} target="_blank" rel="noreferrer">OPEN FULL PROTOTYPE <ArrowUpRight /></a>
          </aside>
        </div>
      </div>
    </div>
  )
}

function FlowMediaCarousel({ flow }: { flow: BoardGameMateFlow }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const reduceMotion = useReducedMotion()
  const imageCount = flow.images.length

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + imageCount) % imageCount)
  }

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 48 && Math.abs(info.velocity.x) < 320) return
    move(info.offset.x < 0 ? 1 : -1)
  }

  return (
    <div className="bgm-flow-media" data-count={imageCount} aria-label={`${flow.label} interface sequence`}>
      {flow.images.map((image, index) => {
        const stackPosition = (index - activeIndex + imageCount) % imageCount
        const stackStates = [
          { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
          { x: 26, y: 12, scale: 0.94, rotate: 2.4, opacity: 0.88 },
          { x: 48, y: 24, scale: 0.88, rotate: 4.8, opacity: 0.7 },
        ]
        const mobileState = stackStates[Math.min(stackPosition, stackStates.length - 1)]
        const isActive = stackPosition === 0

        return (
          <motion.figure
            key={image.nodeId}
            className={`bgm-flow-screen bgm-flow-screen-${index + 1}`}
            data-stack-position={stackPosition}
            style={{ zIndex: isMobile ? imageCount - stackPosition : undefined }}
            animate={isMobile ? mobileState : undefined}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 28 }}
            drag={isMobile && isActive && imageCount > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragEnd={onDragEnd}
            aria-hidden={isMobile && !isActive}
          >
            <img src={`${imageRoot}/${image.file}`} width={786} height={1704} loading="lazy" decoding="async" alt={image.alt} draggable={false} />
          </motion.figure>
        )
      })}
      {imageCount > 1 && (
        <div className="bgm-flow-mobile-controls" aria-label={`${flow.label} image carousel controls`}>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous interface">←</button>
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(imageCount).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label="Show next interface">→</button>
        </div>
      )}
    </div>
  )
}

function FinalUIFlow({ flow, onOpen }: { flow: BoardGameMateFlow; onOpen: (flow: BoardGameMateFlow) => void }) {
  return (
    <article className="bgm-flow">
      <FlowMediaCarousel flow={flow} />
      <div className="bgm-flow-copy">
        <span>{flow.id} / {flow.label}</span>
        <h3>{flow.title}</h3>
        <blockquote>“{flow.goal}”</blockquote>
        <p>{flow.description}</p>
        <ol className="bgm-flow-journey" aria-label={`${flow.label} journey`}>
          {flow.visualJourney.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <small>{flow.principle}</small>
        <button type="button" onClick={() => onOpen(flow)} aria-label={`Try BoardGameMate flow: ${flow.label.toLowerCase()}`}>Try This Flow <ArrowUpRight /></button>
      </div>
    </article>
  )
}

export function BoardGameMateFinalShowcase() {
  const [activeFlow, setActiveFlow] = useState<BoardGameMateFlow | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openFlow = (flow: BoardGameMateFlow) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setActiveFlow(flow)
  }

  const closeFlow = () => {
    setActiveFlow(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <div className="iteration-showcase" id="final-ui-showcase">
      <div className="iteration-showcase-heading iteration-reveal is-visible">
        <SectionLabel>FINAL UI SHOWCASE</SectionLabel>
        <div>
          <h3>Six flows.<br />One journey to the table.</h3>
          <p>The final experience was designed around six connected user flows, covering the journey from discovering a game to actually sitting down and playing together.</p>
          <ol className="bgm-product-journey" aria-label="Complete BoardGameMate product journey">
            {['Discover', 'Match', 'Join', 'Learn', 'Coordinate', 'Play'].map((step) => <li key={step}>{step}</li>)}
          </ol>
          <button type="button" className="bgm-complete-prototype" onClick={() => openFlow(boardGameMateFlows[0])}>
            <span>INTERACTIVE PROTOTYPE</span>
            <strong>Explore BoardGameMate Interactive Prototype</strong>
            <ArrowUpRight />
          </button>
        </div>
      </div>
      <div className="bgm-flow-list">
        {boardGameMateFlows.map((flow) => <FinalUIFlow key={flow.id} flow={flow} onOpen={openFlow} />)}
      </div>
      {activeFlow && <PrototypeModal flow={activeFlow} onClose={closeFlow} />}
    </div>
  )
}
