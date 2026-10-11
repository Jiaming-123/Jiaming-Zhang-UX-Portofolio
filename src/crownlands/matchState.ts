import { chooseAiTurn, applyMove, legalMoves, usedSpecialKey, type LegalMove } from './gameRules'
import { calculateControl, createInitialPresence, NODE_BY_ID, type ActionName, type Faction } from './boardData'
import type { GameSnapshot } from './gameTypes'

export type Stage = 'setup' | 'handoff' | 'choose' | 'reveal' | 'resolve' | 'event' | 'round' | 'over'
export type Seat = { faction: Faction; human: boolean }
export type Match = { snapshot: GameSnapshot; seats: Seat[]; stage: Stage; actions: Partial<Record<Faction, ActionName>>; chooser: number; turn: number; moves: number; eventNode?: string; flight?: { faction: Faction; move: LegalMove }; status: string }
export const title = (s:string) => s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()
export const initiativeOrder = (m:Match) => m.seats.map((_,i)=>m.seats[(i+m.snapshot.round-1)%m.seats.length])
export function initialMatch(seats:Seat[]): Match {
 const presence=createInitialPresence(seats.length)
 return {seats,snapshot:{presence,control:calculateControl(presence),bases:{blue:6,red:6,yellow:6,black:6},usedSpecial:{blue:new Set(),red:new Set(),yellow:new Set(),black:new Set()},round:1},stage:'setup',actions:{},chooser:0,turn:0,moves:2,status:'Choose your kingdoms and gather around one device.'}
}
export function startRound(m:Match):Match {
 const actions:Match['actions']={}
 m.seats.filter(s=>!s.human).forEach(s=>{actions[s.faction]=chooseAiTurn(m.snapshot,s.faction).action})
 const chooser=m.seats.findIndex(s=>s.human)
 return {...m,actions,chooser,turn:0,moves:2,stage:'handoff',status:'Pass the device to '+title(m.seats[chooser].faction)+' Kingdom.'}
}
export function finishTurn(m:Match):Match {
 const snapshot={...m.snapshot,control:calculateControl(m.snapshot.presence)}
 const turn=m.turn+1
 return {...m,snapshot,turn,moves:2,stage:turn>=m.seats.length?'round':'resolve',status:turn>=m.seats.length?'Round complete. Control flags have updated.':'The highlighted kingdom may move.'}
}
export function resolveMove(m:Match,move:LegalMove):Match {
 const faction=initiativeOrder(m)[m.turn].faction
 let snapshot=applyMove(m.snapshot,faction,move)
 const key=usedSpecialKey(move.target)
 const fresh=key && !snapshot.usedSpecial[faction].has(key)
 if(fresh) {
  const usedSpecial={...snapshot.usedSpecial,[faction]:new Set(snapshot.usedSpecial[faction])}
  usedSpecial[faction].add(key)
  snapshot={...snapshot,usedSpecial}
  if(NODE_BY_ID[move.target].type==='supply') snapshot={...snapshot,bases:{...snapshot.bases,[faction]:snapshot.bases[faction]+1}}
 }
 const next={...m,snapshot,moves:m.moves-1,flight:undefined}
 if(fresh && NODE_BY_ID[move.target].type==='event') return {...next,stage:'event',eventNode:move.target,status:'Spin to resolve the event.'}
 return next.moves===0 || !legalMoves(snapshot,faction,m.actions[faction]!).length ? finishTurn(next) : next
}
