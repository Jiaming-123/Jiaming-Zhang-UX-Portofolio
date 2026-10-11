import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { initialMatch as initial, startRound as begin, finishTurn as finish, resolveMove as moved, initiativeOrder as order, title, type Seat, type Match } from '../../crownlands/matchState'
import { ACTIONS } from '../../crownlands/gameTypes'
import { legalMoves, usedSpecialKey } from '../../crownlands/gameRules'
import { BOARD_NODES, NODE_BY_ID, FACTIONS, scoreFromControl, type ActionName, type Faction } from '../../crownlands/boardData'
import { CrownlandsActionCard } from './CrownlandsActionCard'

type Sound = (kind: 'commit' | 'reveal' | 'pickup' | 'place' | 'flag' | 'spinner' | 'event' | 'round' | 'result') => void
const BASES: Record<Faction,{x:number;y:number}> = {blue:{x:45,y:652},red:{x:955,y:52},yellow:{x:45,y:52},black:{x:955,y:652}}
const COLOR: Record<Faction,string> = {blue:'#45a9ef',red:'#ed5555',yellow:'#edc94c',black:'#c0b9ce'}
const asset = (name: string) => '/crownlands/elements/'+name
export function CrownlandsGame({sound}:{sound:Sound}) {
 const [config,setConfig]=useState<Seat[]>([{faction:'blue',human:true},{faction:'red',human:false}])
 const [match,setMatch]=useState(()=>initial(config))
 const [full,setFull]=useState(false)
 const [source,setSource]=useState<string|null>(null)
 const [drag,setDrag]=useState<{source:string;x:number;y:number}|null>(null)
 const [spinning,setSpinning]=useState(false)
 const [eventResult,setEventResult]=useState<'+2'|'-1'|null>(null)
 const boardRef=useRef<HTMLDivElement>(null)
 const timers=useRef<ReturnType<typeof setTimeout>[]>([])
 const cleanupDrag=useRef<(()=>void)|null>(null)
 const live=useRef(match); live.current=match
 const active=order(match)[match.turn]
 const faction=active?.faction ?? 'blue'
 const action=match.actions[faction]
 const canMove=match.stage==='resolve' && active?.human && !match.flight
 const legal=canMove && action ? legalMoves(match.snapshot,faction,action) : []
 const targets=new Set(legal.filter(m=>!source||m.source===source).map(m=>m.target))
 const sources=new Set(legal.map(m=>m.source))
 const schedule=(fn:()=>void,ms:number)=>{const t=setTimeout(fn,ms);timers.current.push(t)}
 useEffect(()=>()=>{timers.current.forEach(clearTimeout);cleanupDrag.current?.()},[])
 useEffect(()=>{
  const playing=match.stage!=='setup'
  document.body.classList.toggle('crownlands-game-active',playing)
  return()=>document.body.classList.remove('crownlands-game-active')
 },[match.stage])
 useEffect(()=>{
  if(!full)return
  const previous=document.body.style.overflow; document.body.style.overflow='hidden'
  const exit=(e:KeyboardEvent)=>{if(e.key==='Escape')setFull(false)}
  window.addEventListener('keydown',exit)
  return()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',exit)}
 },[full])
 useEffect(()=>{
  if(match.stage!=='reveal')return
  sound('reveal')
  const timer=setTimeout(()=>setMatch(m=>({...m,stage:'resolve',turn:0,status:'The highlighted kingdom may move.'})),3800)
  return()=>clearTimeout(timer)
 },[match.stage,sound])
 useEffect(()=>{
  if(match.stage!=='resolve'||match.flight)return
  const seat=order(match)[match.turn]
  const options=legalMoves(match.snapshot,seat.faction,match.actions[seat.faction]!)
  if(seat.human && options.length)return
  const timer=setTimeout(()=>{
   if(!options.length){setMatch(m=>finish(m));return}
   const move=options[0]
   setMatch(m=>({...m,flight:{faction:seat.faction,move}}))
  },750)
  return()=>clearTimeout(timer)
 },[match])
 useEffect(()=>{
  if(!match.flight)return
  const move=match.flight.move
  sound('pickup')
  const timer=setTimeout(()=>{setMatch(m=>m.flight?moved(m,move):m);setSource(null);sound('place')},680)
  return()=>clearTimeout(timer)
 },[match.flight,sound])
 const resolveEvent=()=>{
  if(spinning||eventResult)return
  setSpinning(true);setEventResult(null);sound('spinner')
  schedule(()=>{
   const result=Math.random()<.5?'+2':'-1'
   setMatch(m=>{
    if(m.stage!=='event')return m
    const f=order(m)[m.turn].faction
    const gain=result==='+2'
    const presence={...m.snapshot.presence,[m.eventNode!]:{...m.snapshot.presence[m.eventNode!]}}
    if(!gain)presence[m.eventNode!][f]=Math.max(0,presence[m.eventNode!][f]-1)
    return {...m,snapshot:{...m.snapshot,presence,bases:{...m.snapshot.bases,[f]:m.snapshot.bases[f]+(gain?2:0)}},status:gain?'Two soldiers joined the Base.':'The activating soldier returned from play.'}
   })
   setSpinning(false);setEventResult(result);sound('event')
   schedule(()=>{
    setMatch(m=>{
     if(m.stage!=='event')return m
     const f=order(m)[m.turn].faction
     const next:Match={...m,stage:'resolve',eventNode:undefined}
     return next.moves===0||!legalMoves(next.snapshot,f,next.actions[f]!).length?finish(next):next
    })
    setEventResult(null)
   },3000)
  },1400)
 }
 useEffect(()=>{
  if(match.stage!=='event'||active?.human||spinning||eventResult)return
  const timer=setTimeout(resolveEvent,500)
  return()=>clearTimeout(timer)
 })
 const choose=(a:ActionName)=>{
  sound('commit')
  setMatch(m=>{
   const actions={...m.actions,[m.seats[m.chooser].faction]:a}
   const chooser=m.seats.findIndex((s,i)=>i>m.chooser && s.human)
   return {...m,actions,chooser:chooser<0?m.chooser:chooser,stage:chooser<0?'reveal':'handoff',status:chooser<0?'All kingdoms reveal.':'Pass the device to '+title(m.seats[chooser].faction)+' Kingdom.'}
  })
 }
 const moveTo=(id:string,from=source)=>{
  const m=live.current;const seat=order(m)[m.turn]
  if(m.stage!=='resolve'||m.flight||!seat?.human)return
  const move=legalMoves(m.snapshot,seat.faction,m.actions[seat.faction]!).find(o=>o.target===id&&(o.source===from||(!from&&o.fromBase)))
  if(move)setMatch(s=>({...s,flight:{faction:seat.faction,move}}))
 }
 const startDrag=(e:ReactPointerEvent<SVGGElement>,id:string)=>{
  if(!canMove||!sources.has(id))return
  e.preventDefault();setSource(id);sound('pickup')
  const local=(x:number,y:number)=>{const r=boardRef.current!.getBoundingClientRect();return{x:(x-r.left)/r.width*1000,y:(y-r.top)/r.height*707}}
  const pos=local(e.clientX,e.clientY);setDrag({source:id,...pos})
  const onMove=(ev:PointerEvent)=>setDrag({source:id,...local(ev.clientX,ev.clientY)})
  const end=(ev:PointerEvent)=>{
   const p=local(ev.clientX,ev.clientY)
   const nearest=[...BOARD_NODES].sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0]
   if(Math.hypot(nearest.x-p.x,nearest.y-p.y)<65)moveTo(nearest.id,id)
   clean();setDrag(null)
  }
  const cancel=()=>{clean();setDrag(null)}
  const clean=()=>{window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',cancel)}
  cleanupDrag.current?.();cleanupDrag.current=clean
  window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',end);window.addEventListener('pointercancel',cancel)
 }
 const reset=()=>{timers.current.forEach(clearTimeout);cleanupDrag.current?.();setSpinning(false);setEventResult(null);setSource(null);setDrag(null);setMatch(initial(config))}
 const nextRound=()=>{sound('round');setSource(null);setMatch(m=>m.snapshot.round===8?{...m,stage:'over'}:begin({...m,snapshot:{...m.snapshot,round:m.snapshot.round+1}}))}
 const flight=match.flight
 const from=flight?(flight.move.fromBase?BASES[flight.faction]:NODE_BY_ID[flight.move.source]):null
 const to=flight?NODE_BY_ID[flight.move.target]:null
 const standings=[...match.seats].sort((a,b)=>scoreFromControl(match.snapshot.control,b.faction)-scoreFromControl(match.snapshot.control,a.faction))
 const winner=standings[0]
 const scoreboard=<div className={`cl-scoreboard seats-${match.seats.length}`}>{match.seats.map(s=><div key={s.faction} className={match.stage==='resolve'&&s.faction===faction?'is-active':''} style={{'--kingdom':COLOR[s.faction]} as CSSProperties}><img src={asset('soldier-'+s.faction+'.png')} alt="" /><div><span>{title(s.faction)} · {s.human?'Human':'AI'}</span><strong>{scoreFromControl(match.snapshot.control,s.faction)}</strong><small>{match.stage==='resolve'&&s.faction===faction?'YOUR MOVE':order(match)[0].faction===s.faction?'FIRST THIS ROUND':'CONTROL SCORE'}</small></div></div>)}</div>
 const game=<section className={`cl-game cl-game-v2 ${full?'cl-game-full':''}`} aria-label="Playable Crownlands game">
  <header className="cl-match-toolbar"><strong>CROWNLANDS</strong><span>ROUND {match.snapshot.round} / 8</span><button onClick={reset}>Match setup</button><button onClick={()=>setFull(v=>!v)}>{full?'Exit full screen':'Full screen'}</button></header>
  {match.stage==='setup'?<div className="cl-setup"><h3>Gather your kingdoms.</h3><p>Choose two or four seats. Share this device with friends and add AI opponents.</p><label>Players <select aria-label="Number of players" value={config.length} onChange={e=>setConfig(FACTIONS.slice(0,Number(e.target.value)).map((f,i)=>({faction:f,human:i===0})))}><option value={2}>2 players</option><option value={4}>4 players</option></select></label><div className="cl-seat-settings">{config.map((s,i)=><label key={s.faction} style={{'--kingdom':COLOR[s.faction]} as CSSProperties}><img src={asset('soldier-'+s.faction+'.png')} alt="" />{title(s.faction)} Kingdom<select aria-label={title(s.faction)+' player type'} value={s.human?'human':'ai'} onChange={e=>setConfig(c=>c.map((seat,j)=>j===i?{...seat,human:e.target.value==='human'}:seat))}><option value="human">Human</option><option value="ai">AI</option></select></label>)}</div><p>{config.filter(s=>s.human).length} human · {config.filter(s=>!s.human).length} AI</p><button className="cl-primary" disabled={!config.some(s=>s.human)} onClick={()=>setMatch(begin(initial(config)))}>Start match</button></div>:<>
  {scoreboard}
  <div className="cl-game-status" aria-live="polite"><span>{match.stage}</span><p>{match.status}</p></div>
  <div className="cl-battle-layout">
   <aside className="cl-hand-sidebar"><h3>{match.stage==='choose'?title(match.seats[match.chooser].faction)+' · Choose secretly':'Action cards'}</h3><div className="cl-image-hand">{ACTIONS.map(a=><button key={a} disabled={match.stage!=='choose'} onClick={()=>choose(a)} aria-label={title(a)}><CrownlandsActionCard action={a}/></button>)}</div><p>Hover to inspect each card. Each action allows up to two soldiers.</p>{canMove&&<div className="cl-turn-controls"><span>{2-match.moves} / 2 moves</span><button onClick={()=>{setSource(null);setMatch(m=>finish(m))}}>Finish action</button></div>}</aside>
   <div className="cl-board-wrap" ref={boardRef}><img src="/crownlands/board/crownlands-map.jpg" alt="Crownlands original game board" draggable={false}/><svg className="cl-board-overlay" viewBox="0 0 1000 707" aria-label="Drag soldiers across the Crownlands board">
    {BOARD_NODES.map(node=><g key={node.id} transform={`translate(${node.x} ${node.y})`} data-node-id={node.id}>
     <circle className={targets.has(node.id)?'cl-destination':'cl-hit'} r={node.id==='castle'?48:38} onClick={()=>moveTo(node.id)} />
     {targets.has(node.id)&&<circle className="cl-target-pulse" r="42"/>}
     {usedSpecialKey(node.id)&&match.snapshot.usedSpecial[faction].has(usedSpecialKey(node.id)!)&&<text y="-40" textAnchor="middle" fill="#17231d" stroke="#fff" strokeWidth="3" paintOrder="stroke" fontSize="14" fontWeight="bold">USED · {title(faction)}</text>}
     {match.snapshot.control[node.id]&&<image href={asset('flag-'+match.snapshot.control[node.id]+'.png')} x="-12" y="-49" width="36" height="48" className="cl-photo-flag"/>}
     {match.seats.map((seat,i)=>match.snapshot.presence[node.id][seat.faction]>0&&<g key={seat.faction} transform={`translate(${(i%2)*30-22} ${Math.floor(i/2)*28+4})`} role="button" tabIndex={canMove&&seat.faction===faction&&sources.has(node.id)?0:-1} aria-label={`${match.snapshot.presence[node.id][seat.faction]} ${seat.faction} soldiers at ${node.label}`} className={`cl-photo-soldier ${canMove&&seat.faction===faction&&sources.has(node.id)?'is-movable':''}`} onPointerDown={e=>seat.faction===faction&&startDrag(e,node.id)} onClick={()=>{if(canMove&&seat.faction===faction)setSource(node.id)}} onKeyDown={e=>{if(e.key==='Enter'&&canMove&&seat.faction===faction)setSource(node.id)}}><image href={asset('soldier-'+seat.faction+'.png')} x="-16" y="-32" width="34" height="48"/><text y="23">{match.snapshot.presence[node.id][seat.faction]}</text></g>)}
    </g>)}
    {match.seats.map(seat=><g key={seat.faction} transform={`translate(${BASES[seat.faction].x} ${BASES[seat.faction].y})`} className={`cl-base-token ${canMove&&seat.faction===faction&&sources.has('base')?'is-movable':''}`} onPointerDown={e=>seat.faction===faction&&startDrag(e,'base')} onClick={()=>{if(canMove&&seat.faction===faction)setSource('base')}} role="button" tabIndex={canMove&&seat.faction===faction&&sources.has('base')?0:-1} aria-label={`Drag from ${seat.faction} base, ${match.snapshot.bases[seat.faction]} soldiers in reserve`} onKeyDown={e=>{if(e.key==='Enter'&&canMove&&seat.faction===faction)setSource('base')}}><rect x="-39" y="-34" width="78" height="68" rx="9" fill="#101922" stroke={COLOR[seat.faction]} strokeWidth="2"/><image href={asset('soldier-'+seat.faction+'.png')} x="-27" y="-27" width="27" height="40"/><text x="15" y="0">{match.snapshot.bases[seat.faction]}</text><text className="cl-base-label" y="24">BASE</text></g>)}
    {drag&&<image className="cl-drag-ghost" href={asset('soldier-'+faction+'.png')} x={drag.x-23} y={drag.y-45} width="46" height="65"/>}
    {flight&&from&&to&&<g className="cl-moving-unit" style={{'--from-x':from.x+'px','--from-y':from.y+'px','--to-x':to.x+'px','--to-y':to.y+'px'} as CSSProperties}><image className="cl-running" href={asset('soldier-'+flight.faction+'.png')} x="-22" y="-45" width="44" height="62"/></g>}
   </svg>
   {canMove&&<div className="cl-keyboard-moves"><span>Choose destination</span>{[...targets].map(id=><button key={id} onClick={()=>moveTo(id)}>{NODE_BY_ID[id].label}</button>)}</div>}
   {match.stage==='handoff'&&<div className="cl-board-dialog"><img src={asset('soldier-'+match.seats[match.chooser].faction+'.png')} alt=""/><h3>{title(match.seats[match.chooser].faction)} Kingdom</h3><p>Pass the device to this player. Choose your action privately.</p><button className="cl-primary" onClick={()=>setMatch(m=>({...m,stage:'choose',status:'Select one action card.'}))}>Ready to choose</button></div>}
   {match.stage==='reveal'&&<div className="cl-card-reveal" aria-label="All action cards reveal">{match.seats.map(s=><div key={s.faction}><span style={{color:COLOR[s.faction]}}>{title(s.faction)}</span><div className="cl-flip-card"><img className="cl-card-back" src={asset('card-back.webp')} alt="Action card back"/><CrownlandsActionCard action={match.actions[s.faction]!} className="cl-card-front"/></div></div>)}</div>}
   {match.stage==='event'&&<div className="cl-board-dialog cl-event-dialog"><h3>{title(faction)} · Event</h3><div className={`cl-web-spinner ${spinning?'is-spinning':''}`} aria-label="Event spinner with twelve alternating outcomes"><i/>{Array.from({length:12},(_,i)=><span key={i} style={{'--i':i} as CSSProperties}>{i%2?'-1':'+2'}</span>)}</div><p>Gain two reserves or lose the activating soldier.</p>{eventResult?<strong className={`cl-event-result ${eventResult==='+2'?'positive':'negative'}`}>{eventResult}</strong>:<button className="cl-primary" disabled={spinning||!active?.human} onClick={resolveEvent}>{spinning?'Spinning…':'Spin'}</button>}</div>}
   {(match.stage==='round'||match.stage==='over')&&<div className={`cl-board-dialog ${match.stage==='over'?'cl-final-dialog':''}`} style={match.stage==='over'?{'--winner':COLOR[winner.faction]} as CSSProperties:undefined}>{match.stage==='over'&&<><div className="cl-confetti" aria-hidden="true">{Array.from({length:56},(_,i)=>{const direction=i%2===0?-1:1;const distance=direction*(90+(i*47)%430);return <i key={i} style={{'--x':`${distance}px`,'--end-x':`${Math.round(distance*1.2)}px`,'--peak':`${-230-(i*31)%260}px`,'--delay':`${-((i*73)%2400)}ms`,'--confetti':['#45a9ef','#ed5555','#edc94c','#c0b9ce','#f7e3a0'][i%5]} as CSSProperties}/>})}</div><div className="cl-winner-burst"><img src={asset('soldier-'+winner.faction+'.png')} alt=""/><strong>{title(winner.faction)} wins!</strong></div></>}<h3>{match.stage==='over'?'Final standings':'Round '+match.snapshot.round+' complete'}</h3><div className="cl-round-ranks">{standings.map(s=><p key={s.faction} style={{'--kingdom':COLOR[s.faction]} as CSSProperties}><img src={asset('soldier-'+s.faction+'.png')} alt=""/><strong>{title(s.faction)}</strong><span>· {scoreFromControl(match.snapshot.control,s.faction)} points</span></p>)}</div><button className="cl-primary" onClick={match.stage==='over'?reset:nextRound}>{match.stage==='over'?'Play again':match.snapshot.round===8?'Final results':'Next round'}</button></div>}
   </div>
  </div></>}
 </section>
 return <><button className="cl-mobile-launch cl-primary" onClick={()=>setFull(true)}>Play Crownlands full screen ↗</button>{full?createPortal(<div className="crownlands-page cl-fullscreen-shell">{game}</div>,document.body):<div className="cl-inline-game">{game}</div>}</>
}
