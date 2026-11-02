import { useState } from 'react'
import { processDimensions } from '../../data/cultureLensProcessDimensions'
import '../../styles/culturelens-process.css'

const base = '/media/culturelens/process/culturelens-'
function ProcessImage({ file, alt, className = '' }: { file: string; alt: string; source: string; className?: string }) {
  const [width, height] = processDimensions[file]
  return <figure className={`culturelens-process-image ${className}`}>
    <div className="culturelens-image-frame"><img src={`${base}${file}.webp`} alt={alt} width={width} height={height} loading="lazy" decoding="async" /></div>
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
    <div><span className="culturelens-label">PROCESS EVIDENCE · IDEA PORTFOLIO</span><h3>First, a whiteboard.<br />Then, three directions.</h3><p>We started with a whiteboard full of ideas. Mapping them by visitor value and innovation helped us choose three directions to explore further.</p><div className="culturelens-process-selectors" aria-label="Highlight an idea direction">{directions.map((d, i) => <button key={d.label} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i) }}>{d.label}</button>)}</div><p aria-live="polite">{directions[active].text}</p></div>
    <div className="culturelens-idea-photo"><ProcessImage file="idea-portfolio" alt="Original whiteboard of ideas mapped on Value and Innovation axes" source="A2.G2 p. 30" /><span className="culturelens-idea-highlight" aria-hidden="true" style={{ left: `${directions[active].x}%`, top: `${directions[active].y}%` }} /></div>
  </section>
}
const panels = ['Arrive', 'Preview', 'Tune', 'Begin', 'Explore', 'Immerse', 'Adjust', 'Reflect']
function StoryboardEvidence() {
  return <section className="culturelens-process-block">
    <span className="culturelens-label">PROCESS EVIDENCE · EARLY EXPERIENCE FLOW</span><h4>Let people get a feel for the visit first.</h4><p>Our first storyboard followed a visitor from arrival to reflection, looking for the moments when they might want more information, a pause or a change of plan.</p>
    <ProcessImage file="draft-storyboard" alt="Eight original sticky-note sketches from arrival and sensory preview through pause and reflection" source="A2.G2 p. 26" />
    <div className="culturelens-process-decision"><span className="culturelens-label">THE QUESTION WE EXPLORED</span><p>Can visitors preview and adjust the experience before entering?</p><span className="culturelens-label">WHAT WE TOOK FROM IT</span><p>Offer a few useful choices up front, then let people adjust as they go. Preparing for a visit should not feel like filling out a long form.</p></div>
    <span className="culturelens-label">REFINEMENT · EIGHT-PANEL SERVICE JOURNEY</span><p>We developed the rough sketches into eight panels, following what a visitor might need before, during and after the experience.</p>
    <div className="culturelens-storyboard-rail" tabIndex={0} role="region" aria-label="Eight original storyboard panels; scroll horizontally to explore">{panels.map((label, i) => <div key={label}><ProcessImage file={`service-panel-${String(i + 1).padStart(2, '0')}`} alt={`Original storyboard panel ${i + 1}: ${label}`} source="A2.G2 p. 3" /><span className="culturelens-label">0{i + 1} / {label.toUpperCase()}</span></div>)}</div><small>Scroll through the original panels.</small>
  </section>
}
function XrEvidence() {
  return <section className="culturelens-process-block">
    <span className="culturelens-label">ORIGINAL DESIGN SKETCH · LIVING CONTEXT GALLERY</span><h4>Start with the object and the stories around it.</h4>
    <ProcessImage file="xr-original-sketch" alt="Original drawing of a visitor and physical vessel surrounded by a curved projection of cultural context" source="A2.G2 p. 7" className="culturelens-sketch-alpha" />
    <div className="culturelens-process-decision"><span className="culturelens-label">WHAT THE SKETCH HELPED US SEE</span><p>The vessel stays at the centre of the sketch. The surrounding scene adds a sense of where it came from, how it was used and whose lives it was part of.</p><span className="culturelens-label">WHAT VISITORS COULD EXPLORE</span><p>Visitors could explore the people, places and sounds around an object, choosing how much of the story to take in.</p><span className="culturelens-label">KEEPING THE STORY HONEST</span><p>A convincing reconstruction can make a guess look like a fact. We would need to show the sources, explain what is uncertain and offer a quieter way to explore the same story.</p></div>
  </section>
}
const features = [
  ['Noise reduction layer', 'Soften crowd noise so it is easier to focus on an object or listen to its story.'],
  ['Projection module', 'Show useful information when it is needed: an object story, a route, a wait time or a note from a companion.'],
  ['Open-ear audio', 'Listen to a story while still hearing companions, staff and important sounds around you.'],
  ['Haptic feedback zone', 'A gentle vibration could draw attention to a story moment, a nearby object or a message from a companion.'],
  ['Soft LED cue', 'A soft light gives a quick hint about the current mode or conditions in the gallery.'],
  ['Main control', 'One main button keeps pausing and adjusting easy to find.'],
  ['Touch slider', 'Adjust volume, projection detail, noise reduction or sensory intensity.'],
  ['Companion link', 'Stay in touch with the people you came with, even when you explore at different speeds.'],
]
const stages = [
  ['Enter', 'Get your bearings at the entrance.', 'Visitor enters the museum before receiving the device.', 'Help people find their feet before asking them to make choices.', '2'],
  ['Equip', 'Begin the journey with the head-worn device.', 'The LEGO visitor puts the MuseBand on.', 'The band should leave the visitor free to look directly at the exhibits.', '4'],
  ['Compare', 'Consider more than one direction.', 'The visitor compares possible exhibition routes.', 'Let visitors compare routes before choosing one.', '6'],
  ['Route', 'Find a route suited to the visitor’s needs.', 'The concept combines preferences and live crowd flow to recommend a path.', 'Offer another route, and make it easy to keep the original one.', '7'],
  ['Immerse', 'Focus on an exhibit of personal interest.', 'The blue frame represents a more private immersive zone.', 'Keep the exhibit itself at the heart of the experience.', '9'],
  ['Adjust', 'Pause or lower the intensity.', 'The visitor can pause and adjust settings, including volume.', 'Make it easy to pause or turn the support down.', '10'],
  ['Support', 'Accommodate different access needs.', 'The walkthrough includes special support modes.', 'Visitors should still be able to enjoy the museum without wearing the device.', '11'],
]
function MuseBandEvidence() {
  const [feature, setFeature] = useState(0)
  const [stage, setStage] = useState(0)
  return <section className="culturelens-process-block">
    <span className="culturelens-label">PHYSICAL PROTOTYPE · HEAD-WORN MUSEBAND</span><h4>What would it feel like to wear?</h4><p>We made a paper version to try the shape on a person. The band sits around the forehead, leaving the eyes clear.</p>
    <div className="culturelens-physical-grid"><ProcessImage file="museband-physical-prototype" alt="Real participant wearing the original paper MuseBand around the upper forehead, with eyes unobstructed" source="A2.G2 p. 11" /><div><div className="culturelens-feature-selectors" aria-label="Original MuseBand proposed features">{features.map(([label], i) => <button key={label} onPointerEnter={event => { if (event.pointerType === 'mouse') setFeature(i) }} onFocus={() => setFeature(i)} onClick={() => setFeature(i)} aria-pressed={feature === i}><span>0{i + 1}</span>{label}</button>)}</div><p className="culturelens-feature-description" aria-live="polite"><strong>{features[feature][0]}</strong>{features[feature][1]}</p></div></div>
    <span className="culturelens-label">DESKTOP WALKTHROUGH · SEVEN DECISION MOMENTS</span><h4>A small model of a day at the museum.</h4><p>Using LEGO, we walked through arriving, picking a route, stopping at an exhibit and asking for help. It let us explore the experience before building a working device.</p>
    <div className="culturelens-walkthrough-nav" aria-label="Desktop walkthrough stages">{stages.map(([label], i) => <button key={label} aria-pressed={stage === i} onPointerEnter={event => { if (event.pointerType === 'mouse') setStage(i) }} onFocus={() => setStage(i)} onClick={() => setStage(i)}><span>0{i + 1}</span>{label}</button>)}</div>
    <div className="culturelens-walkthrough-frame"><ProcessImage key={stage} file={`museband-walkthrough-${String(stage + 1).padStart(2, '0')}`} alt={`Original LEGO walkthrough: ${stages[stage][0]}`} source={`A2.G2 p. 11 · original frame ${stages[stage][4]}`} /><div aria-live="polite"><span className="culturelens-label">0{stage + 1} / {stages[stage][0].toUpperCase()}</span><h4>{stages[stage][1]}</h4><dl><dt>What is happening</dt><dd>{stages[stage][2]}</dd><dt>Why it matters</dt><dd>{stages[stage][3]}</dd></dl><button onClick={() => setStage((stage + 1) % stages.length)}>Next stage →</button></div></div>
  </section>
}
export function ProposalProcess({ active }: { active: number }) {
  return active === 0 ? <StoryboardEvidence /> : active === 1 ? <XrEvidence /> : <MuseBandEvidence />
}
export function ConversationEvidence() {
  return <div className="culturelens-conversation-evidence"><span className="culturelens-label">ORIGINAL CONVERSATION · INTENT → RECOMMENDATION → CONFIRMATION</span><div>{[
    ['voiceflow-request', 'A visitor requests a quiet exhibition'],
    ['voiceflow-recommendation', 'The prototype presents an exhibition recommendation'],
    ['voiceflow-confirmation', 'Review details before confirm, change or cancel'],
  ].map(([file, alt]) => <ProcessImage key={file} file={file} alt={alt} source="A2.G3 p. 4" />)}</div></div>
}
