import { useState } from 'react'
const items = [
  ['Soldiers', 'soldiers.png', 'Build your presence', 'Each soldier is a commitment to a place. Gather your forces to secure a border, or send them forward to challenge a rival.'],
  ['Control Flags', 'flags.png', 'Mark your authority', 'Flags show who controls each territory. After an action, the kingdom with the largest force raises its flag.'],
  ['Special Spaces', 'spaces.png', 'Choose your moment', 'Supply spaces add a soldier to your Base. Event spaces offer a spin for reinforcements or a loss. Each numbered space activates once per player.'],
  ['Event Spinner', 'spinner.png', 'Take a calculated risk', 'Turn the spinner after entering an Event Space. Gain two soldiers in your Base or lose the activating soldier.'],
  ['Base Boxes', 'bases.png', 'Keep a force in reserve', 'Your Base holds soldiers ready for deployment. Reinforce and Expand bring them into play.'],
  ['Space Tracker', 'tracker.webp', 'Read the state at a glance', 'The tracker records which Supply and Event Spaces you have activated, keeping the next decision clear.'],
]
export function CrownlandsElements() {
  const [index, setIndex] = useState(0)
  const selected = items[index]
  return <div className="cl-element-gallery">
    <div role="tablist" aria-label="Explore game components">{items.map((item,i) => <button key={item[0]} role="tab" id={`element-tab-${i}`} aria-selected={i===index} aria-controls="element-panel" onPointerEnter={()=>setIndex(i)} onFocus={()=>setIndex(i)} onClick={()=>setIndex(i)}><small>0{i+1}</small>{item[0]}</button>)}</div>
    <div className="cl-element-panel" id="element-panel" role="tabpanel" aria-labelledby={`element-tab-${index}`}><figure><img key={selected[1]} src={`/crownlands/elements/${selected[1]}`} alt={`Original Crownlands ${selected[0]}`} /></figure><article><span>{selected[2]}</span><h3>{selected[0]}</h3><p>{selected[3]}</p></article></div>
  </div>
}
