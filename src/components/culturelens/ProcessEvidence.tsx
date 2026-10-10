import { useRef, useState } from 'react'
import { processDimensions } from '../../data/cultureLensProcessDimensions'
import '../../styles/culturelens-process.css'

const base = '/media/culturelens/process/culturelens-'
function ProcessImage({ file, alt, className = '' }: { file: string; alt: string; source: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [width, height] = processDimensions[file]
  return <figure className={`culturelens-process-image ${className}`}>
    <button type="button" className="culturelens-image-open" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge: ${alt}`}><img src={`${base}${file}.webp`} alt={alt} width={width} height={height} loading="lazy" decoding="async" /><span aria-hidden="true">View detail ↗</span></button>
    <dialog ref={dialog} className="culturelens-image-dialog" aria-label={`Enlarged image: ${alt}`} onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); event.currentTarget.querySelector('button')?.focus() } }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close enlarged image">Close ×</button>
      <img src={`${base}${file}.webp`} alt={alt} loading="lazy" /><p>{alt}</p>
    </dialog>
  </figure>
}
const directions = [
  { label: 'Service', x: 61, y: 33, text: 'Personalised Immersive Exhibition Journey — prepare, preview and tune the visit.' },
  { label: 'XR', x: 74, y: 44, text: 'Living Context Gallery — reconnect the object with its cultural context.' },
  { label: 'Smart device', x: 73, y: 20, text: 'Immersion Halo — developed into the head-worn MuseBand proposal.' },
]
export function IdeaPortfolio() {
  const [active, setActive] = useState(0)
  return <section className="culturelens-idea-evidence" aria-label="Idea portfolio process evidence">
    <div><span className="culturelens-label">PROCESS EVIDENCE · IDEA PORTFOLIO</span><h3>Before a medium,<br />a field of possibilities.</h3><p>We mapped early concepts by visitor value and innovation before developing three directions in greater depth.</p><div className="culturelens-process-selectors" aria-label="Highlight an idea direction">{directions.map((d, i) => <button key={d.label} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i) }}>{d.label}</button>)}</div><p aria-live="polite">{directions[active].text}</p></div>
    <div className="culturelens-idea-photo"><ProcessImage file="idea-portfolio" alt="Original whiteboard of ideas mapped on Value and Innovation axes" source="A2.G2 p. 30" /><span className="culturelens-idea-highlight" aria-hidden="true" style={{ left: `${directions[active].x}%`, top: `${directions[active].y}%` }} /></div>
  </section>
}
const panels = ['Arrive', 'Preview', 'Tune', 'Begin', 'Explore', 'Immerse', 'Adjust', 'Reflect']
function StoryboardEvidence() {
  return <section className="culturelens-process-block">
    <span className="culturelens-label">PROCESS EVIDENCE · EARLY EXPERIENCE FLOW</span><h4>Make room for choice before immersion.</h4><p>We first tested the journey as a rough sequence of decisions and adjustment moments.</p>
    <ProcessImage file="draft-storyboard" alt="Eight original sticky-note sketches from arrival and sensory preview through pause and reflection" source="A2.G2 p. 26" />
    <div className="culturelens-process-decision"><span className="culturelens-label">WHAT WE WERE TESTING</span><p>Can visitors preview and adjust the experience before entering?</p><span className="culturelens-label">DESIGN CONSEQUENCE</span><p>Preparation should be staged and optional: extra control must not become extra decision fatigue.</p></div>
    <span className="culturelens-label">REFINEMENT · EIGHT-PANEL SERVICE JOURNEY</span><p>The rough journey was refined into a clearer service sequence spanning preparation, immersion, adjustment and reflection.</p>
    <div className="culturelens-storyboard-rail" tabIndex={0} role="region" aria-label="Eight original storyboard panels; scroll horizontally to explore">{panels.map((label, i) => <div key={label}><ProcessImage file={`service-panel-${String(i + 1).padStart(2, '0')}`} alt={`Original storyboard panel ${i + 1}: ${label}`} source="A2.G2 p. 3" /><span className="culturelens-label">0{i + 1} / {label.toUpperCase()}</span></div>)}</div><small>Scroll through the original panels · select any panel to enlarge.</small>
  </section>
}
function XrEvidence() {
  return <section className="culturelens-process-block">
    <span className="culturelens-label">ORIGINAL DESIGN SKETCH · LIVING CONTEXT GALLERY</span><h4>The object is the anchor.</h4>
    <ProcessImage file="xr-original-sketch" alt="Original drawing of a visitor and physical vessel surrounded by a curved projection of cultural context" source="A2.G2 p. 7" className="culturelens-sketch-alpha" />
    <div className="culturelens-process-decision"><span className="culturelens-label">EVIDENCE → DECISION</span><p>The sketch centres a tangible artefact inside a reconstructed setting. XR should reveal context around the object, without replacing it.</p><span className="culturelens-label">SYSTEM CONSEQUENCE</span><p>Place, people, use, memory, sound and atmosphere become optional interpretive layers.</p><span className="culturelens-label">RISK → RESPONSE</span><p>Reconstruction can look more certain than its evidence. Keep sources visible, distinguish interpretation from fact, mark uncertainty and retain a low-sensory alternative.</p></div>
    <span className="culturelens-label">NEXT ITERATION · REFINED XR COMMUNICATION</span><p>The original G2 sketch explored room-scale projection. In this later concept iteration, that object-first principle is carried into a private, head-worn near-eye layer. The generated scenes are not evidence that this revised optical system has been built or tested.</p>
  </section>
}
const features = [
  ['Noise reduction layer', 'Reduce crowd noise and exhibition distractions to support focus on the object, story or atmosphere.'],
  ['Projection module', 'A temporary personal information layer for objects, stories, routes, crowd conditions, waiting times, sensory settings and companion prompts.'],
  ['Open-ear audio', 'Focused stories and spatial sound while retaining awareness of important environmental sounds, companions and staff.'],
  ['Haptic feedback zone', 'Gentle vibration for story moments, nearby objects, crowded areas, companion signals or available support.'],
  ['Soft LED cue', 'Gentle colour signals indicate the current mode or exhibition condition.'],
  ['Main control', 'A simple primary button gives control without adding unnecessary buttons or cognitive load.'],
  ['Touch slider', 'Adjust volume, projection detail, noise reduction or sensory intensity.'],
  ['Companion link', 'Remain lightly connected with friends, family or group members during the visit.'],
]
const stages = [
  ['Enter', 'Orient at the museum entrance.', 'Visitor enters the museum before receiving the device.', 'Support starts with orientation, not assumptions.', '2'],
  ['Equip', 'Begin the journey with the head-worn device.', 'The LEGO visitor puts the MuseBand on.', 'Keep the eyes unobstructed and the physical object accessible.', '4'],
  ['Compare', 'Consider more than one direction.', 'The visitor compares possible exhibition routes.', 'Preserve choice before suggesting a path.', '6'],
  ['Route', 'Find a route suited to the visitor’s needs.', 'The concept combines preferences and live crowd flow to recommend a path.', 'Suggest rather than command; the original route remains an option.', '7'],
  ['Immerse', 'Focus on an exhibit of personal interest.', 'The blue frame represents a more private immersive zone.', 'Support attention without replacing the museum object.', '9'],
  ['Adjust', 'Pause or lower the intensity.', 'The visitor can pause and adjust settings, including volume.', 'Make support reversible in the moment.', '10'],
  ['Support', 'Accommodate different access needs.', 'The walkthrough includes special support modes.', 'No single wearable or interaction should become the only way to visit.', '11'],
]
function MuseBandEvidence() {
  const [feature, setFeature] = useState(0)
  const [stage, setStage] = useState(0)
  return <section className="culturelens-process-block">
    <span className="culturelens-label">PHYSICAL PROTOTYPE · HEAD-WORN MUSEBAND</span><h4>A paper prototype, at human scale.</h4><p>The original prototype sits around the forehead / upper head. Its slim band leaves the eyes unobstructed.</p>
    <div className="culturelens-physical-grid"><ProcessImage file="museband-physical-prototype" alt="Real participant wearing the original paper MuseBand around the upper forehead, with eyes unobstructed" source="A2.G2 p. 11" /><div><div className="culturelens-feature-selectors" aria-label="Original MuseBand proposed features">{features.map(([label], i) => <button key={label} onPointerEnter={event => { if (event.pointerType === 'mouse') setFeature(i) }} onFocus={() => setFeature(i)} onClick={() => setFeature(i)} aria-pressed={feature === i}><span>0{i + 1}</span>{label}</button>)}</div><p className="culturelens-feature-description" aria-live="polite"><strong>{features[feature][0]}</strong>{features[feature][1]}</p></div></div>
    <span className="culturelens-label">DESKTOP WALKTHROUGH · SEVEN DECISION MOMENTS</span><h4>From wearing a device to navigating a system.</h4><p>The tabletop sequence made route, attention, adjustment and access decisions visible before committing to a working device.</p>
    <div className="culturelens-walkthrough-nav" aria-label="Desktop walkthrough stages">{stages.map(([label], i) => <button key={label} aria-pressed={stage === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStage(i) }} onFocus={() => setStage(i)} onClick={() => setStage(i)}><span>0{i + 1}</span>{label}</button>)}</div>
    <div className="culturelens-walkthrough-frame"><ProcessImage key={stage} file={`museband-walkthrough-${String(stage + 1).padStart(2, '0')}`} alt={`Original LEGO walkthrough: ${stages[stage][0]}`} source={`A2.G2 p. 11 · original frame ${stages[stage][4]}`} /><div aria-live="polite"><span className="culturelens-label">0{stage + 1} / {stages[stage][0].toUpperCase()}</span><h4>{stages[stage][1]}</h4><dl><dt>System state</dt><dd>{stages[stage][2]}</dd><dt>Design intention</dt><dd>{stages[stage][3]}</dd></dl><button onClick={() => setStage((stage + 1) % stages.length)}>Next stage →</button></div></div>
    <div className="culturelens-process-decision"><span className="culturelens-label">SYSTEM LEARNING → PROPOSAL DECISION</span><p>The combined prototype evidence supported MuseBand’s problem, systems and futures fit: connecting focus, routes, sensory comfort, access, objects, crowds, staff and operations in the live visit.</p><span className="culturelens-label">THE COST OF SMART SUPPORT</span><p>Cognitive load, wearable exclusion, surveillance, over-personalisation, hygiene and operational burden remain unresolved risks. Explainable, optional and reversible suggestions are a design requirement—not proof these risks are solved.</p></div>
    <span className="culturelens-label">NEXT ITERATION · HEAD-WORN CONCEPT VISUALISATION</span><p>The refined images retain the original forehead placement. They communicate a speculative form, not manufactured hardware or additional test evidence.</p>
  </section>
}
export function ProposalProcess({ active }: { active: number }) {
  return active === 0 ? <StoryboardEvidence /> : active === 1 ? <XrEvidence /> : <MuseBandEvidence />
}
export function ComparisonProof() {
  return <div className="culturelens-comparison-proof">{[
    ['service-storyboard', 'P1 / Service journey', 'Storyboards made preparation, adjustment and reflection visible.', 'A2.G2 pp. 3, 26'],
    ['xr-original-sketch', 'P2 / Living Context Gallery', 'The original spatial sketch anchored interpretation to the object.', 'A2.G2 p. 7'],
    ['museband-physical-prototype', 'P3 / MuseBand', 'A head-worn paper prototype plus a tabletop system walkthrough.', 'A2.G2 p. 11'],
  ].map(([file, label, text, source]) => <article key={file}><span className="culturelens-label">{label}</span><ProcessImage file={file} alt={text} source={source} className={file.includes('sketch') ? 'culturelens-sketch-alpha' : ''} /><p>{text}</p></article>)}</div>
}
const failureEvidence = [
  ['voiceflow-formatting', 'Actual conversation with exposed link formatting.', 'A2.G3 p. 25', 'The source fragment records the presentation breakdown. The native before/after view explains the refinement.'],
  ['voiceflow-routing', 'Voiceflow debug log reporting an invalid Playbook transfer.', 'A2.G3 p. 25', 'The invalid transfer is visible in the original build log; the routing explanation is a portfolio reconstruction.'],
  ['voiceflow-state', 'Original reservation handoff showing exhibition 0 instead of the selected exhibition.', 'A2.G3 p. 26', 'The selected exhibition is lost at the handoff. The refined state flow below makes the variable transfer explicit.'],
  ['voiceflow-ticket-input', 'Original Voiceflow ticket categories and visitor-count input instructions.', 'A2.G3 p. 26', 'Source evidence defines ticket categories and input examples. The structured parsing view is a native reconstruction, not a screenshot of implemented parser code.'],
]
export function VoiceflowEvidence({ active }: { active: number }) {
  const [file, alt, source, caption] = failureEvidence[active]
  return <div className="culturelens-voiceflow-source"><span className="culturelens-label">VOICEFLOW BUILD · SOURCE EVIDENCE</span><ProcessImage key={file} file={file} alt={alt} source={source} /><p>{caption}</p></div>
}
export function ConversationEvidence() {
  return <div className="culturelens-conversation-evidence"><span className="culturelens-label">ORIGINAL CONVERSATION · INTENT → RECOMMENDATION → CONFIRMATION</span><div>{[
    ['voiceflow-request', 'A visitor requests a quiet exhibition'],
    ['voiceflow-recommendation', 'The prototype presents an exhibition recommendation'],
    ['voiceflow-confirmation', 'Review details before confirm, change or cancel'],
  ].map(([file, alt]) => <ProcessImage key={file} file={file} alt={alt} source="A2.G3 p. 4" />)}</div><details className="culturelens-evidence"><summary>Earlier sketch and state wiring <span aria-hidden="true">+</span></summary><div className="culturelens-source-pair"><ProcessImage file="conversation-sketch" alt="Original hand-drawn conversation screens" source="A2.G3 p. 14" /><ProcessImage file="voiceflow-state-canvas" alt="Original Voiceflow canvas showing selected-exhibition state and response wiring" source="A2.G3 p. 26" /></div></details></div>
}
