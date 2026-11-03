import { useCultureLensCopy } from '../../i18n/culturelens'
import { useEffect, useRef, useState } from 'react'

import { ArrowRight, ArrowUpRight, MoveRight, Play } from 'lucide-react'

import { blueprint, journey, museumLayers, proposals, transfers } from '../../data/cultureLensData'

import ConceptVisual from './ConceptVisual'

import { ProposalProcess } from './ProcessEvidence'

export function Evidence({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useCultureLensCopy()
  return <details className="culturelens-evidence"><summary>{t(title)}<span aria-hidden="true">+</span></summary><div>{children}</div></details>
}

export function MuseumSystemMap() {
  const t = useCultureLensCopy()
  const [active, setActive] = useState(0)
  return <div className="culturelens-system-map"><div className="culturelens-map-layers" aria-label={t("Museum system layers")}>{museumLayers.map((layer, i) => <button key={layer.name} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)}><span>0{i + 1}</span><strong>{t(layer.name)}</strong><div>{layer.nodes.map(node => <span key={node}>{t(node)}</span>)}</div><ArrowUpRight size={18} /></button>)}</div><aside aria-live="polite"><span className="culturelens-label">{t("HOW IT CONNECTS")}</span><h4>{t(museumLayers[active].name)}</h4><p>{t(museumLayers[active].detail)}</p><span className="culturelens-label">{t("WHAT THIS MEANS FOR THE DESIGN")}</span><p>{t(museumLayers[active].consequence)}</p></aside></div>
}

function ProposalLayer({ index }: { index: number }) {
  const t = useCultureLensCopy()
  const active = index
  const proposal = proposals[index]
  const [step, setStep] = useState(0)
  return <section id={`culturelens-proposal-${index}`} data-proposal-layer={index} className="culturelens-proposal-content" aria-label={t(proposal.short)}><span className="culturelens-label">{t("PROPOSAL 0")}{active + 1} · {t(proposal.layer)}</span><h3>{t(proposal.title)}</h3>{proposal.thesis && <p className="culturelens-deck">{t(proposal.thesis)}</p>}<ProposalProcess active={active} />{active === 0 ? <div className="culturelens-journey"><div aria-label={t("Service journey stages")}>{journey.map(([label], i) => <button key={label} aria-pressed={step === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStep(i) }} onFocus={() => setStep(i)} onClick={() => setStep(i)}><span>0{i + 1}</span>{t(label, `journey.${label}`)}</button>)}</div><article aria-live="polite"><span className="culturelens-journey-number">0{step + 1}</span><h4>{t(journey[step][0], `journey.${journey[step][0]}`)}</h4><p>{t(journey[step][1])}</p></article></div> : <div className={`culturelens-visual-pair ${active === 2 ? 'culturelens-museband-visuals' : 'culturelens-xr-visuals'}`}>{proposal.assets.map((file, i) => ['culturelens-xr-scenario.webp', 'culturelens-museband-product-projection-20260914.webp'].includes(file) ? null : <ConceptVisual filename={file} index={i} key={file} />)}</div>}</section>
}

export function ProposalExplorer() {
  const t = useCultureLensCopy()
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
  return <div ref={container} className="culturelens-proposal-explorer culturelens-sequential-proposals"><aside><span className="culturelens-label">{t("THREE WAYS IN")}</span><h3>{t("One museum.")}<br />{t("Three directions.")}</h3><p>{t("Start before the visit, look closer at an object, then explore support inside the gallery.")}</p><div className="culturelens-proposal-tabs" aria-label={t("Explore museum proposals")}>{proposals.map((proposal, index) => <button key={proposal.short} aria-pressed={active === index} aria-controls={`culturelens-proposal-${index}`} onPointerEnter={event => { if (event.pointerType === 'mouse' && active !== index) goToLayer(index) }} onClick={() => goToLayer(index)}><span>0{index + 1}</span><strong>{t(proposal.short)}</strong><ArrowRight size={17} /></button>)}</div></aside><div className="culturelens-proposal-sequence">{proposals.map((_, index) => <ProposalLayer key={index} index={index} />)}</div></div>
}

export function ConceptTransition() {
  const t = useCultureLensCopy()
  const [active, setActive] = useState(0)
  return <div className="culturelens-transfer"><div className="culturelens-transfer-head"><div><small>{t("SPECULATIVE SMART MUSEUM")}</small><h3>MuseBand</h3></div><MoveRight aria-hidden="true" /><div><small>{t("VOICEFLOW PROTOTYPE")}</small><h3>CultureLens</h3></div></div><div className="culturelens-transfer-rows">{transfers.map(([from, to], i) => <button key={from} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={active === i}><strong>{t(from)}</strong><span className="culturelens-transfer-line" aria-hidden="true" /><span>{t(to)}</span></button>)}</div><p>{t("The format changed, but the priorities stayed: useful suggestions, clear choices and room to change your mind.")}</p></div>
}

export function ServiceBlueprint() {
  const t = useCultureLensCopy()
  const [stage, setStage] = useState(0)
  const labels = ['What the visitor does', 'What they see', 'How the guide responds', 'Information it uses', 'Where people step in']
  return <div className="culturelens-blueprint"><div className="culturelens-stage-rail" aria-label={t("Service stages")}>{blueprint.map((s, i) => <button key={s.stage} aria-pressed={stage === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStage(i) }} onFocus={() => setStage(i)} onClick={() => setStage(i)}><span>0{i + 1}</span>{t(s.stage)}</button>)}</div><div className="culturelens-blueprint-body" key={stage}><div className="culturelens-blueprint-title"><span className="culturelens-label">{t("STAGE 0")}{stage + 1}</span><h3>{t(blueprint[stage].stage)}</h3><p>{t(blueprint[stage].why)}</p><button onClick={() => setStage((stage + 1) % blueprint.length)}>{t("Next stage")} <ArrowRight size={16} /></button></div><dl>{labels.map((label, i) => <div key={label}><dt>{t(label)}</dt><dd>{t(blueprint[stage].rows[i])}</dd></div>)}</dl></div></div>
}

export function PrototypeEvidence() {
  const t = useCultureLensCopy()
  return <div className="culturelens-video-grid">{[['Happy path · discover, plan, visit', '/media/CultureLens-Discover-Exhibition.mp4', '1:47 · Find an exhibition, review a reservation and change the language.'], ['Deviation path · clarify & recover', '/media/CultureLens-Plan-Museum-Visit.mp4', '0:54 · See how the guide handles a less specific request and explains what it cannot check live.']].map(([title, src, description], i) => <EvidenceVideo key={src} title={t(title)} src={src} description={t(description)} index={i} />)}</div>
}

function EvidenceVideo({ title, src, description, index }: { title: string; src: string; description: string; index: number }) {
  const t = useCultureLensCopy()
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)
  return <figure className="culturelens-evidence-video"><div className="culturelens-video-screen">{!started ? <button onClick={() => setStarted(true)} aria-label={`${t("Play")} ${t(title)}`}><Play size={28} /><strong>{t(title)}</strong><span>{t("Play Voiceflow recording")}</span></button> : error ? <div className="culturelens-video-unavailable"><h4>{t("This recording could not load.")}</h4><p>{t("Please try again, or look through the conversation screenshots below.")}</p><small>{src}</small></div> : <video src={src} controls autoPlay playsInline preload="none" aria-label={`${t("Voiceflow project evidence")}: ${t(title)}`} onError={() => setError(true)} />}</div><figcaption><span className="culturelens-label">{t("VOICEFLOW EVIDENCE 0")}{index + 1}</span><h4>{t(title)}</h4><p>{t(description)}</p></figcaption></figure>
}
