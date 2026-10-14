import { useEffect, useRef, useState } from 'react'

import { ArrowRight, ArrowUpRight, MoveRight, Play } from 'lucide-react'

import { blueprint, journey, museumLayers, proposals, transfers } from '../../data/cultureLensData'

import ConceptVisual from './ConceptVisual'

import { ProposalProcess } from './ProcessEvidence'

export function Evidence({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="culturelens-evidence"><summary>{title}<span aria-hidden="true">+</span></summary><div>{children}</div></details>
}

export function MuseumSystemMap() {
  const [active, setActive] = useState(0)
  return <div className="culturelens-system-map"><div className="culturelens-map-layers" aria-label="Museum system layers">{museumLayers.map((layer, i) => <button key={layer.name} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)}><span>0{i + 1}</span><strong>{layer.name}</strong><div>{layer.nodes.map(node => <span key={node}>{node}</span>)}</div><ArrowUpRight size={18} /></button>)}</div><aside aria-live="polite"><span className="culturelens-label">RELATIONSHIP IN FOCUS</span><h4>{museumLayers[active].name}</h4><p>{museumLayers[active].detail}</p><span className="culturelens-label">SYSTEM CONSEQUENCE</span><p>{museumLayers[active].consequence}</p></aside></div>
}

function ProposalLayer({ index }: { index: number }) {
  const active = index
  const proposal = proposals[index]
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('Focus')
  return <section id={`culturelens-proposal-${index}`} data-proposal-layer={index} className="culturelens-proposal-content" aria-label={proposal.short}><span className="culturelens-label">PROPOSAL 0{active + 1} · {proposal.layer}</span><h3>{proposal.title}</h3><p className="culturelens-deck">{proposal.thesis}</p><ProposalProcess active={active} />{active === 0 ? <div className="culturelens-journey"><div aria-label="Service journey stages">{journey.map(([label], i) => <button key={label} aria-pressed={step === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStep(i) }} onFocus={() => setStep(i)} onClick={() => setStep(i)}><span>0{i + 1}</span>{label}</button>)}</div><article aria-live="polite"><span className="culturelens-journey-number">0{step + 1}</span><h4>{journey[step][0]}</h4><p>{journey[step][1]}</p></article></div> : <div className={`culturelens-visual-pair ${active === 2 ? 'culturelens-museband-visuals' : 'culturelens-xr-visuals'}`}>{proposal.assets.map((file, i) => <ConceptVisual filename={file} index={i} mode={mode} key={`${file}-${i === 1 ? mode : 'scenario'}`} />)}</div>}{active === 2 && <><div className="culturelens-mode-rail" aria-label="MuseBand modes">{['Focus', 'Story', 'Flow', 'Control'].map(item => <button key={item} aria-pressed={mode === item} onPointerEnter={event => { if (event.pointerType === 'mouse') setMode(item) }} onFocus={() => setMode(item)} onClick={() => setMode(item)}><span className={mode === item ? 'culturelens-status-dot' : ''} />{item}</button>)}</div><p aria-live="polite">{{ Focus: 'Reduce distracting noise while keeping environmental safety cues available.', Story: 'Explore object-linked stories through open-ear audio, captions or haptics.', Flow: 'Compare routes and crowd suggestions; visitors may continue their original route.', Control: 'Pause, skip, reduce intensity or stop suggestions at any time.' }[mode]}</p></>}<p>{proposal.value}</p><Evidence title="Design tension → response"><p><strong>Risk:</strong> {proposal.risk}</p><p><strong>Decision:</strong> {proposal.response}</p>{active === 2 && <p>The refined images retain the forehead placement of the physical prototype and are explicitly labelled concept visualisations.</p>}</Evidence><div className="culturelens-layer-end"><span className="culturelens-label">END OF LAYER 0{index + 1}</span><p>{index === 0 ? 'Continue scrolling → The context' : index === 1 ? 'Continue scrolling → The live moment' : 'Three layers explored → From MuseBand to CultureLens'}</p></div></section>
}

export function ProposalExplorer() {
  const [active, setActive] = useState(0)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = container.current
    const proposalBar = element?.querySelector<HTMLElement>(':scope > aside')
    const sections = Array.from(container.current?.querySelectorAll<HTMLElement>('[data-proposal-layer]') || [])
    let frame = 0
    let barHeight = -1
    const update = () => {
      frame = 0
      // Mobile labels can wrap; keep click landings below the actual sticky bar.
      const nextHeight = proposalBar?.offsetHeight || 70
      if (nextHeight !== barHeight) {
        barHeight = nextHeight
        element?.style.setProperty('--culturelens-proposal-bar-height', `${barHeight}px`)
      }
      const readingLine = Math.min(innerHeight * .32, 260)
      let current = 0
      sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= readingLine) current = index })
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    sections.forEach(section => observer.observe(section))
    if (proposalBar) observer.observe(proposalBar)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => { observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame) }
  }, [])
  const goToLayer = (index: number) => {
    container.current?.querySelector<HTMLElement>(`[data-proposal-layer="${index}"]`)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    setActive(index)
  }
  return <div ref={container} className="culturelens-proposal-explorer culturelens-sequential-proposals"><aside><span className="culturelens-label">THREE SYSTEM LAYERS</span><h3>One museum.<br />Three directions.</h3><p>Scroll through the journey, the context and the live moment.</p><div className="culturelens-proposal-tabs" aria-label="Explore museum proposals">{proposals.map((proposal, index) => <button key={proposal.short} aria-pressed={active === index} aria-controls={`culturelens-proposal-${index}`} onPointerEnter={event => { if (event.pointerType === 'mouse' && active !== index) goToLayer(index) }} onClick={() => goToLayer(index)}><span>0{index + 1}</span><strong>{proposal.short}</strong><ArrowRight size={17} /></button>)}</div></aside><div className="culturelens-proposal-sequence">{proposals.map((_, index) => <ProposalLayer key={index} index={index} />)}</div></div>
}

export function ConceptTransition() {
  const [active, setActive] = useState(0)
  return <div className="culturelens-transfer"><div className="culturelens-transfer-head"><div><small>SPECULATIVE SMART MUSEUM</small><h3>MuseBand</h3></div><MoveRight aria-hidden="true" /><div><small>VOICEFLOW PROTOTYPE</small><h3>CultureLens</h3></div></div><div className="culturelens-transfer-rows">{transfers.map(([from, to], i) => <button key={from} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={active === i}><strong>{from}</strong><span className="culturelens-transfer-line" aria-hidden="true" /><span>{to}</span></button>)}</div><p>DECISION CHECKPOINT 03 · Keep the principles. Make their consequences testable through conversation.</p></div>
}

export function ServiceBlueprint() {
  const [stage, setStage] = useState(0)
  const labels = ['User action', 'Frontstage service', 'Agent / decision logic', 'Backstage data', 'Human / governance']
  return <div className="culturelens-blueprint"><div className="culturelens-stage-rail" aria-label="Service stages">{blueprint.map((s, i) => <button key={s.stage} aria-pressed={stage === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStage(i) }} onFocus={() => setStage(i)} onClick={() => setStage(i)}><span>0{i + 1}</span>{s.stage}</button>)}</div><div className="culturelens-blueprint-body" key={stage}><div className="culturelens-blueprint-title"><span className="culturelens-label">STAGE 0{stage + 1}</span><h3>{blueprint[stage].stage}</h3><p>{blueprint[stage].why}</p><button onClick={() => setStage((stage + 1) % blueprint.length)}>Next stage <ArrowRight size={16} /></button></div><dl>{labels.map((label, i) => <div key={label}><dt>{label}</dt><dd>{blueprint[stage].rows[i]}</dd></div>)}</dl></div></div>
}

export function PrototypeEvidence() {
  return <div className="culturelens-video-grid">{[['Happy path · discover, plan, visit', '/media/CultureLens-Discover-Exhibition.mp4', 'Original Happy path recording · 1:47. Exhibition discovery, reservation review and language adjustment.'], ['Deviation path · clarify & recover', '/media/CultureLens-Plan-Museum-Visit.mp4', 'Original Deviation path recording · 0:54. Ambiguous comfort needs and honest limits on live information.']].map(([title, src, description], i) => <EvidenceVideo key={src} title={title} src={src} description={description} index={i} />)}</div>
}

function EvidenceVideo({ title, src, description, index }: { title: string; src: string; description: string; index: number }) {
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)
  return <figure className="culturelens-evidence-video"><div className="culturelens-video-screen">{!started ? <button onClick={() => setStarted(true)} aria-label={`Play ${title}`}><Play size={28} /><strong>{title}</strong><span>Play Voiceflow recording</span></button> : error ? <div className="culturelens-video-unavailable"><h4>Recording unavailable in this checkout.</h4><p>The original video slot is preserved. Explore the source artefacts below or use the interactive simulation.</p><small>{src}</small></div> : <video src={src} controls autoPlay playsInline preload="none" aria-label={`Voiceflow project evidence: ${title}`} onError={() => setError(true)} />}</div><figcaption><span className="culturelens-label">VOICEFLOW EVIDENCE 0{index + 1}</span><h4>{title}</h4><p>{description}</p></figcaption></figure>
}
