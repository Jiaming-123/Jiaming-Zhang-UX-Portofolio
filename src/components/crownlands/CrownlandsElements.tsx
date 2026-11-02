import { useState } from 'react'
const items = [
  ['Soldiers', 'soldiers.png', 'Choose where to stand', 'A soldier can hold a border, support a push towards the castle or join a challenge across the map. Where you place each one shapes the next round.'],
  ['Control Flags', 'flags.png', 'Raise your colours', 'Finish an action, count the soldiers and raise the flag of the kingdom with the largest force. Tied territories stay neutral. Follow the flags to see how the map is changing.'],
  ['Special Spaces', 'spaces.png', 'Choose your moment', 'Visit a Supply Space to add a soldier to your Base, or try an Event Space for a spin that could bring reinforcements or cost a soldier. Each numbered space activates once per player.'],
  ['Event Spinner', 'spinner.png', 'Give the spinner a turn', 'Step onto an Event Space and give it a spin. The result brings two soldiers to your Base or removes the soldier who stepped onto the space.'],
  ['Base Boxes', 'bases.png', 'Keep a force in reserve', 'Your next reinforcements are waiting here. Choose Reinforce or Expand to bring them onto the map.'],
  ['Space Tracker', 'tracker.webp', 'Keep your travels in view', 'Mark the Supply and Event Spaces you have used, then look ahead to the next opportunity.'],
]
export function CrownlandsElements() {
  const [index, setIndex] = useState(0)
  const selected = items[index]
  return <div className="cl-element-gallery">
    <div role="tablist" aria-label="Explore game components">{items.map((item,i) => <button key={item[0]} role="tab" id={`element-tab-${i}`} aria-selected={i===index} aria-controls="element-panel" onPointerEnter={()=>setIndex(i)} onFocus={()=>setIndex(i)} onClick={()=>setIndex(i)}><small>0{i+1}</small>{item[0]}</button>)}</div>
    <div className="cl-element-panel" id="element-panel" role="tabpanel" aria-labelledby={`element-tab-${index}`}><figure><img key={selected[1]} src={`/crownlands/elements/${selected[1]}`} alt={`Original Crownlands ${selected[0]}`} /></figure><article><span>{selected[2]}</span><h3>{selected[0]}</h3><p>{selected[3]}</p></article></div>
  </div>
}
