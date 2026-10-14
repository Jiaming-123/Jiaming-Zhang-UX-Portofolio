import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
import { createMascotFlight, FLIGHT_STYLES, MASCOT_CONFIG, mascotHome, mascotOrientation, type Point } from '../lib/mascotFlight'
import '../styles/flying-mascot.css'

const POSES = [
  { name: 'wink', copterX: '51%', copterY: '14%' },
  { name: 'hug', copterX: '51%', copterY: '12.2%' },
  { name: 'surprise', copterX: '58%', copterY: '15%' },
] as const
type Phase = 'idle' | 'flying' | 'returning'

export default function FlyingMascot() {
  const positionRef = useRef<HTMLDivElement>(null)
  const orientationRef = useRef<HTMLSpanElement>(null)
  const phaseRef = useRef<Phase>('idle')
  const homeRef = useRef<Point>({ x: 0, y: 0 })
  const animationsRef = useRef<Animation[]>([])
  const loadedRef = useRef(new Set<string>())
  const flightStyleRef = useRef(Math.floor(Math.random() * FLIGHT_STYLES.length))
  const cooldownRef = useRef(0)
  const runRef = useRef(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [pose, setPose] = useState(0)
  const [ready, setReady] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const reducedMotion = useReducedMotion()

  const geometry = useCallback(() => {
    const element = positionRef.current
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    const size = { width: element?.offsetWidth ?? 100, height: element?.offsetHeight ?? 150 }
    const chapterNav = document.querySelector('.case-chapter-nav.is-visible')
    const navBottom = chapterNav?.getBoundingClientRect().bottom ?? 0
    return { viewport, size, home: mascotHome(viewport, size, navBottom) }
  }, [])

  const stopAnimations = useCallback(() => {
    runRef.current++
    animationsRef.current.forEach(animation => animation.cancel())
    animationsRef.current = []
  }, [])

  const resetHome = useCallback(() => {
    stopAnimations()
    const { home } = geometry()
    homeRef.current = home
    if (positionRef.current) positionRef.current.style.transform = `translate3d(${home.x}px, ${home.y}px, 0)`
    if (orientationRef.current) orientationRef.current.style.transform = 'none'
    phaseRef.current = 'idle'
    setPhase('idle')
  }, [geometry, stopAnimations])

  useLayoutEffect(() => {
    resetHome()
    let scheduled = 0
    const scheduleHome = () => {
      cancelAnimationFrame(scheduled)
      scheduled = requestAnimationFrame(resetHome)
    }
    const visibility = () => {
      setPageVisible(!document.hidden)
      if (document.hidden) resetHome()
    }
    const chapterChange = () => {
      if (phaseRef.current !== 'idle') return
      const nextHome = geometry().home
      if (nextHome.x !== homeRef.current.x || nextHome.y !== homeRef.current.y) scheduleHome()
    }
    // The chapter rail is inserted outside React. Keep our home below it when
    // it becomes visible, without observing the entire site's scroll/content.
    const observer = new MutationObserver(chapterChange)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] })
    window.addEventListener('resize', scheduleHome, { passive: true })
    window.addEventListener('orientationchange', scheduleHome)
    window.addEventListener('pageshow', scheduleHome)
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('scroll', chapterChange, { passive: true })
    document.addEventListener('transitionend', chapterChange)
    return () => {
      stopAnimations()
      observer.disconnect()
      cancelAnimationFrame(scheduled)
      window.removeEventListener('resize', scheduleHome)
      window.removeEventListener('orientationchange', scheduleHome)
      window.removeEventListener('pageshow', scheduleHome)
      window.removeEventListener('scroll', chapterChange)
      document.removeEventListener('transitionend', chapterChange)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [geometry, resetHome, stopAnimations])

  useEffect(() => { if (reducedMotion) resetHome() }, [reducedMotion, resetHome])

  useEffect(() => {
    if (!ready || !pageVisible || reducedMotion) return
    const timer = window.setInterval(() => {
      setPose(previous => {
        for (let i = 1; i <= POSES.length; i++) {
          const next = (previous + i) % POSES.length
          if (loadedRef.current.has(POSES[next].name)) return next
        }
        return previous
      })
    }, phase === 'flying' ? MASCOT_CONFIG.flyingPoseMs : MASCOT_CONFIG.idlePoseMs)
    return () => window.clearInterval(timer)
  }, [pageVisible, phase, ready, reducedMotion])

  const fly = useCallback(async () => {
    if (!ready || !pageVisible || phaseRef.current !== 'idle' || performance.now() < cooldownRef.current) return
    if (reducedMotion) {
      setPose(previous => (previous + 1) % POSES.length)
      return
    }
    const position = positionRef.current
    const orientation = orientationRef.current
    if (!position || !orientation) return
    const run = ++runRef.current
    const { viewport, size, home } = geometry()
    homeRef.current = home
    phaseRef.current = 'flying'
    setPhase('flying')
    // Release only the mascot's pointer target during flight. The page remains
    // clickable; moving over the avatar again cannot queue more flight runs.
    const route = createMascotFlight(home, viewport, size)
    const style = FLIGHT_STYLES[flightStyleRef.current % FLIGHT_STYLES.length]
    flightStyleRef.current++
    const path = position.animate(route.map(point => ({ transform: `translate3d(${point.x}px, ${point.y}px, 0)`, offset: point.offset })), { duration: MASCOT_CONFIG.flightMs, fill: 'forwards', easing: 'linear' })
    const turn = orientation.animate(mascotOrientation(style, Math.random() < .5 ? -1 : 1), { duration: MASCOT_CONFIG.flightMs, fill: 'forwards', easing: 'ease-in-out' })
    animationsRef.current = [path, turn]
    try {
      await path.finished
      if (run !== runRef.current) return
      phaseRef.current = 'returning'
      setPhase('returning')
      const last = route[route.length - 1]
      const currentHome = geometry().home
      position.style.transform = `translate3d(${last.x}px, ${last.y}px, 0)`
      const lastTurn = getComputedStyle(orientation).transform
      orientation.style.transform = lastTurn
      path.cancel()
      turn.cancel()
      const back = position.animate([
        { transform: `translate3d(${last.x}px, ${last.y}px, 0)` },
        { transform: `translate3d(${currentHome.x}px, ${currentHome.y}px, 0)` },
      ], { duration: MASCOT_CONFIG.returnMs, fill: 'forwards', easing: 'cubic-bezier(.22,1,.36,1)' })
      const upright = orientation.animate([{ transform: lastTurn }, { transform: 'none' }], { duration: MASCOT_CONFIG.returnMs, fill: 'forwards', easing: 'ease-out' })
      animationsRef.current = [back, upright]
      await back.finished
      if (run !== runRef.current) return
      cooldownRef.current = performance.now() + MASCOT_CONFIG.cooldownMs
      resetHome()
    } catch {
      // Resize, page hiding, reduced-motion changes and unmount cancel the run.
      // A cancelled Web Animation rejects finished; never leak that rejection.
      if (run === runRef.current) resetHome()
    }
  }, [geometry, pageVisible, ready, reducedMotion, resetHome])

  const active = POSES[pose]
  const characterStyle = { '--copter-x': active.copterX, '--copter-y': active.copterY } as CSSProperties
  return createPortal(
    <div ref={positionRef} className={`flying-mascot ${ready ? 'is-ready' : ''}`} data-phase={phase} data-pose={active.name} data-paused={!pageVisible || Boolean(reducedMotion)}>
      <button className="mascot-trigger" type="button" aria-label="让像素小人飞行五秒，然后回到右上角" title="碰我一下，飞 5 秒！" onPointerEnter={event => { if (event.pointerType === 'mouse') void fly() }} onClick={() => void fly()}>
        <span ref={orientationRef} className="mascot-flight-orientation">
          <span className="mascot-hover">
            <span className="mascot-character" style={characterStyle}>
              {POSES.map((item, index) => <img key={item.name} className={`mascot-frame mascot-frame--${item.name} ${pose === index ? 'is-active' : ''}`} src={`/images/mascot/jiaming-${item.name}-v1.webp`} alt="" aria-hidden="true" width="256" height="384" decoding="async" fetchPriority="low" draggable={false} onLoad={() => {
                loadedRef.current.add(item.name)
                if (!ready) { setPose(index); setReady(true) }
              }} />)}
              <span className="mascot-copter" aria-hidden="true">
                <span className="mascot-copter-stem" />
                <span className="mascot-copter-blades"><span /><span /></span>
                <span className="mascot-copter-hub" />
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>, document.body,
  )
}
