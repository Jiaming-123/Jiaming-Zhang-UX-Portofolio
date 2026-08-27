import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const assetRoot = '/images/boardgamemate/iteration'

const coverPanels = [
  { file: 'boardgamemate-discover', label: 'DISCOVER', alt: 'BoardGameMate Discover interface showing a recommended table and compatible players' },
  { file: 'boardgamemate-nearby-map', label: 'MATCH', alt: 'BoardGameMate Nearby interface showing playable sessions on a map' },
  { file: 'boardgamemate-goal-chat', label: 'COORDINATE', alt: 'BoardGameMate coordination interface showing attendance and game preparation' },
]

export function BoardGameMateCover() {
  const coverRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const rotateX = useSpring(targetY, { stiffness: 120, damping: 22, mass: .5 })
  const rotateY = useSpring(targetX, { stiffness: 120, damping: 22, mass: .5 })

  useEffect(() => {
    const element = coverRef.current
    if (!element) return
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches)
    updateMotionPreference()
    motionQuery.addEventListener('change', updateMotionPreference)
    const observer = new IntersectionObserver(([entry]) => setIsActive(entry.isIntersecting), { threshold: .1 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    targetX.set(((event.clientX - bounds.left) / bounds.width - .5) * 5)
    targetY.set(-((event.clientY - bounds.top) / bounds.height - .5) * 5)
  }

  const resetPointer = () => {
    targetX.set(0)
    targetY.set(0)
  }

  return (
    <div
      className={`boardgamemate-cover ${isActive ? 'is-active' : ''}`}
      ref={coverRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      role="img"
      aria-label="BoardGameMate product cover showing discovery, matching and session coordination"
    >
      <div className="boardgamemate-cover-ripples" aria-hidden="true" />
      <div className="boardgamemate-cover-glow" aria-hidden="true" />
      <motion.div className="boardgamemate-cover-stage" style={{ rotateX, rotateY }}>
        {coverPanels.map((panel, index) => (
          <figure className={`boardgamemate-cover-card boardgamemate-cover-card-${index + 1}`} key={panel.file}>
            <img
              src={`${assetRoot}/${panel.file}-720.png`}
              width={1572}
              height={3408}
              loading="lazy"
              decoding="async"
              alt={panel.alt}
            />
            <figcaption><span>{panel.label}</span><i /></figcaption>
          </figure>
        ))}
        <div className="boardgamemate-cover-flow boardgamemate-cover-flow-one" aria-hidden="true"><span /></div>
        <div className="boardgamemate-cover-flow boardgamemate-cover-flow-two" aria-hidden="true"><span /></div>
      </motion.div>
      <div className="boardgamemate-cover-caption" aria-hidden="true"><span>BOARDGAMEMATE / 02</span><span>DISCOVER · MATCH · PLAY</span></div>
    </div>
  )
}
