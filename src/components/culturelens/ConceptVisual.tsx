import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import '../../styles/culturelens-concepts.css'
import '../../../public/culturelens-ai-image-label.css'

type Point = { label: string; x: number; y: number; text: string }
const xrPoints: Point[] = [
  { label: 'Physical object', x: 46, y: 43, text: 'The tangible artefact stays central. Digital context never substitutes for the object.' },
  { label: 'Private context layer', x: 34, y: 37, text: 'Later concept iteration: a wearer-only near-eye layer connects the object with place, use and memory. The visible light field is an explanatory overlay, not public projection.' },
  { label: 'Open-ear audio', x: 28, y: 46, text: 'The head-worn concept proposes optional focused audio while retaining environmental awareness; quiet viewing remains available.' },
  { label: 'Source + uncertainty', x: 14, y: 43, text: 'Interpretive content would need attributable sources and curator review. This generated scene is illustrative, not historical evidence.' },
  { label: 'Low-sensory mode', x: 88, y: 60, text: 'An open bypass and seating allow a calmer visit without requiring a device or the near-eye / audio experience.' },
]
const productPoints: Point[] = [
  { label: 'Haptic module', x: 31, y: 25, text: 'Concept: optional, adjustable tactile cues housed in a compact module.' },
  { label: 'Status light', x: 39.6, y: 21, text: 'Concept: a small state indicator, reinforced by tactile and text alternatives.' },
  { label: 'Near-eye projection', x: 62.2, y: 17.9, text: 'Concept: the recessed front projection aperture supplies a private near-eye image for the wearer, shown here as an explanatory light field. Optical performance and safety have not been validated.' },
  { label: 'Cleanable contact', x: 29, y: 29, text: 'Concept: a removable contact liner supports repeated museum loan and cleaning.' },
  { label: 'Control surface', x: 36.8, y: 21.8, text: 'Concept: a round tactile control allows the visitor to pause or adjust support.' },
]
const productModes: Record<string, { point: number; text: string; state: string }> = {
  Focus: { point: 2, text: 'A quieter attention state, with environmental awareness retained.', state: 'focus' },
  Story: { point: 0, text: 'An optional tactile cue introduces object-linked interpretation.', state: 'story' },
  Flow: { point: 1, text: 'A discreet state signal supports route suggestions, never commands.', state: 'flow' },
  Control: { point: 4, text: 'Pause or adjust. The visitor retains control over the experience.', state: 'control' },
}
const serviceStates: Point[] = [
  { label: 'Route', x: 58, y: 78, text: 'A quieter route is offered. Continuing on the original path remains a valid choice.' },
  { label: 'Focus', x: 48, y: 35, text: 'A private near-eye interpretation layer supports focus. The light field in this image is an explanatory overlay of the wearer’s view, not a publicly visible screen.' },
  { label: 'Comfort', x: 57, y: 57, text: 'Make a calmer path and seating easier to notice; support remains optional.' },
  { label: 'Control', x: 33, y: 24, text: 'A small tactile surface keeps pause and adjustment within reach.' },
]

// No perpetual animation loop. Scroll work is scheduled only while the visual is in view.
function useSceneReveal(ref: RefObject<HTMLDivElement>, enabled: boolean) {
  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (innerHeight - rect.top) / Math.min(rect.height + innerHeight * .2, innerHeight * .85)))
      element.style.setProperty('--cv-progress', String(progress))
      element.dataset.reveal = progress > .78 ? 'annotations' : progress > .3 ? 'context' : 'object'
    }
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
    }, { threshold: 0 })
    observer.observe(element)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', update)
    update()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', update)
      cancelAnimationFrame(frame)
    }
  }, [ref, enabled])
}

function Hotspots({ points, active, onSelect, prefix }: { points: Point[]; active: number; onSelect: (index: number) => void; prefix: string }) {
  const point = points[active]
  return <>
    <svg className="culturelens-cv-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <circle cx={point.x} cy={point.y} r="7" className="culturelens-cv-region" />
      <path key={active} d={`M${point.x},${point.y} L${point.x},${Math.min(88, point.y + 12)} L${Math.min(92, point.x + 10)},${Math.min(88, point.y + 12)}`} pathLength="1" />
    </svg>
    <div className="culturelens-cv-hotspots" aria-label={`${prefix} image hotspots`}>
      {points.map((p, index) => <button key={p.label} type="button" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={`${prefix}: ${p.label}`} aria-pressed={active === index} onPointerEnter={e => { if (e.pointerType === 'mouse') onSelect(index) }} onFocus={() => onSelect(index)} onClick={() => onSelect(index)}><span>{index + 1}</span></button>)}
    </div>
  </>
}

export default function ConceptVisual({ filename, index, mode = 'Focus' }: { filename: string; index: number; mode?: string }) {
  const xr = filename.includes('-xr-')
  const system = xr && index === 1
  const product = !xr && index === 1
  const scenario = !xr && index === 0
  const [active, setActive] = useState(0)
  const [service, setService] = useState(0)
  const [annotated, setAnnotated] = useState(false)
  const [failed, setFailed] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const surface = useRef<HTMLDivElement>(null)
  const pointerFrame = useRef(0)
  useSceneReveal(frame, xr && index === 0)
  useEffect(() => () => cancelAnimationFrame(pointerFrame.current), [])
  const selectedMode = productModes[mode] || productModes.Focus
  const pointIndex = annotated ? active : selectedMode.point
  const point = system ? xrPoints[active] : productPoints[pointIndex]
  const alt = xr
    ? index === 0 ? 'Generated concept: visitors observe a physical ceramic vessel with slim forehead bands and an explanatory overlay of their private near-eye context.' : 'Generated concept: a ceramic artefact anchors a gallery with a head-worn private interpretation layer, an open bypass and quiet seating.'
    : index === 0 ? 'Generated concept: a visitor wears a slim forehead MuseBand with a conceptual near-eye light field illustrating a wearer-only interpretation layer beside a physical vessel.' : 'Generated speculative MuseBand: a continuous grey ring wraps around a head-form above the unobstructed eyes, with a round temple control, separate status light, recessed front projection aperture and a private near-eye overlay.'
  const resetTilt = () => {
    cancelAnimationFrame(pointerFrame.current)
    surface.current?.style.setProperty('--cv-rx', '0deg')
    surface.current?.style.setProperty('--cv-ry', '0deg')
  }
  const visualState = product ? selectedMode.state : scenario ? serviceStates[service].label.toLowerCase() : 'xr'
  return <figure className={`culturelens-visual-slot culturelens-concept-visual ${index === 1 ? 'culturelens-product-slot' : ''}`} data-visual={filename} data-state={visualState}>
    <div ref={frame} className={`culturelens-cv-frame ${xr && index === 0 ? 'culturelens-cv-xr-reveal' : ''} ${product ? 'culturelens-cv-product' : ''} ${system ? 'culturelens-cv-system' : ''}`} data-reveal="object"
      onPointerMove={event => {
        if (!product || event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)').matches) return
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - .5
        const y = (event.clientY - bounds.top) / bounds.height - .5
        cancelAnimationFrame(pointerFrame.current)
        pointerFrame.current = requestAnimationFrame(() => {
          surface.current?.style.setProperty('--cv-rx', `${-y * 5}deg`)
          surface.current?.style.setProperty('--cv-ry', `${x * 5}deg`)
        })
      }} onPointerLeave={resetTilt}>
      <div ref={surface} className="culturelens-cv-surface">
        <img src={`/media/culturelens/${filename}`} alt={alt} width={1440} height={index === 0 ? 901 : 1080} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        {xr && index === 0 && <>
          <div className="culturelens-cv-object-veil" aria-hidden="true" />
          <div className="culturelens-cv-projection-sweep" aria-hidden="true" />
          <div className="culturelens-cv-context-points" aria-hidden="true"><span style={{ left: '48%', top: '43%' }}>Object</span><span style={{ left: '33%', top: '26%' }}>Private context</span><span style={{ left: '24%', top: '39%' }}>Choice</span><span style={{ left: '64%', top: '68%' }}>Physical exhibit</span></div>
        </>}
        {system && <><div className="culturelens-cv-focus-mask" style={{ '--cv-x': `${point.x}%`, '--cv-y': `${point.y}%` } as CSSProperties} aria-hidden="true" /><Hotspots points={xrPoints} active={active} onSelect={setActive} prefix="XR system" /></>}
        {scenario && <div key={service} className={`culturelens-cv-service-cue culturelens-cv-cue-${visualState}`} aria-hidden="true" style={{ left: `${serviceStates[service].x}%`, top: `${serviceStates[service].y}%` }}>{service === 0 ? '↗' : service === 3 ? 'Ⅱ' : <span />}</div>}
        {product && <>
          <div key={mode} className="culturelens-cv-specular" aria-hidden="true" />
          <span key={`led-${mode}`} className="culturelens-cv-led" aria-hidden="true" />
          {annotated ? <Hotspots points={productPoints} active={active} onSelect={setActive} prefix="MuseBand concept feature" /> : <div key={`mode-${mode}`} className="culturelens-cv-mode-point" style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-hidden="true"><span /></div>}
        </>}
      </div>
      <span className="culturelens-cv-badge" lang="en">AI-generated concept image</span>
      {failed && <p role="alert" className="culturelens-cv-load-error">This concept image could not load. Please refresh to retry.</p>}
    </div>
    {xr && index === 0 && <div className="culturelens-cv-reveal-key"><span>01 / Object</span><span>02 / Context</span><span>03 / Meaning</span><small>Scroll to reveal · the object stays central</small></div>}
    {system && <div className="culturelens-cv-controls"><div className="culturelens-cv-selector" aria-label="XR system layers">{xrPoints.map((p, i) => <button type="button" key={p.label} aria-pressed={active === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(i) }} onClick={() => setActive(i)} onFocus={() => setActive(i)}>{i + 1}. {p.label}</button>)}</div><p className="culturelens-cv-annotation" aria-live="polite"><strong>{point.label}</strong>{point.text}</p></div>}
    {scenario && <div className="culturelens-cv-controls"><div className="culturelens-cv-selector" aria-label="MuseBand service states">{serviceStates.map((s, i) => <button type="button" key={s.label} aria-pressed={service === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setService(i) }} onFocus={() => setService(i)} onClick={() => setService(i)}>{s.label}</button>)}</div><p className="culturelens-cv-annotation" aria-live="polite"><strong>{serviceStates[service].label}</strong>{serviceStates[service].text}</p></div>}
    {product && <div className="culturelens-cv-controls"><div className="culturelens-cv-product-heading"><span className="culturelens-label">{mode.toUpperCase()} / {point.label.toUpperCase()}</span><button type="button" aria-expanded={annotated} aria-controls="culturelens-product-features" onClick={() => { setActive(selectedMode.point); setAnnotated(!annotated) }}>{annotated ? 'Hide concept features' : 'Explore concept features'}</button></div><p className="culturelens-cv-annotation" aria-live="polite">{annotated ? <><strong>{point.label}</strong>{point.text}</> : selectedMode.text}</p>{annotated && <div id="culturelens-product-features" className="culturelens-cv-selector" aria-label="MuseBand proposed components">{productPoints.map((p, i) => <button key={p.label} type="button" aria-pressed={active === i} onFocus={() => setActive(i)} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(i) }} onClick={() => setActive(i)}>{i + 1}. {p.label}</button>)}</div>}<small>Conceptual design features, not verified engineering internals. Select a mode below.</small></div>}
    <figcaption>{xr ? 'AI-generated later iteration · private near-eye interpretation. Original G2 wall-projection sketch is shown separately; this is not a built installation.' : 'AI-generated head-worn concept · the near-eye overlay illustrates a private wearer view, not a public projection or physical lens. Not manufactured or optically validated hardware.'}</figcaption>
  </figure>
}
