import { ACTIONS, type CandidateMove, type GameSnapshot } from './gameTypes'
import { BOARD_NODES, NODE_BY_ID, controller, type ActionName, type Faction, type TerritoryPresence } from './boardData'

export type LegalMove = { source: string; target: string; fromBase: boolean }

export function usedSpecialKey(nodeId: string) {
  const node = NODE_BY_ID[nodeId]
  return node.type === 'territory' ? null : `${node.type}-${node.specialNumber}`
}

function controlledNodes(snapshot: GameSnapshot, faction: Faction) {
  return BOARD_NODES.filter((node) => node.type === 'territory' && snapshot.control[node.id] === faction)
}

function occupiedNodes(snapshot: GameSnapshot, faction: Faction) {
  return BOARD_NODES.filter((node) => snapshot.presence[node.id][faction] > 0)
}

export function legalMoves(snapshot: GameSnapshot, faction: Faction, action: ActionName): LegalMove[] {
  const { presence, bases, usedSpecial } = snapshot
  const controlled = controlledNodes(snapshot, faction)
  const used = usedSpecial[faction]
  const canEnter = (id: string) => {
    const node = NODE_BY_ID[id]
    const key = usedSpecialKey(id)
    if (key && used.has(key)) return false
    if (node.type === 'territory') return snapshot.control[id] === null
    return presence[id][faction] === 0
  }

  if (action === 'REINFORCE') {
    if (bases[faction] <= 0) return []
    return controlled.map((node) => ({ source: 'base', target: node.id, fromBase: true }))
  }
  if (action === 'EXPAND') {
    if (bases[faction] <= 0) return []
    const targets = new Set<string>()
    controlled.forEach((source) => source.adjacent.forEach((id) => { if (canEnter(id)) targets.add(id) }))
    return [...targets].map((target) => ({ source: 'base', target, fromBase: true }))
  }

  const results: LegalMove[] = []
  occupiedNodes(snapshot, faction).forEach((source) => {
    if (presence[source.id][faction] <= 0) return
    source.adjacent.forEach((target) => {
      const targetNode = NODE_BY_ID[target]
      if (action === 'REPOSITION' && canEnter(target)) results.push({ source: source.id, target, fromBase: false })
      if (action === 'CONTEST' && targetNode.type === 'territory' && snapshot.control[target] !== null && snapshot.control[target] !== faction) {
        results.push({ source: source.id, target, fromBase: false })
      }
    })
  })
  return results
}

export function applyMove(snapshot: GameSnapshot, faction: Faction, move: LegalMove): GameSnapshot {
  const presence = Object.fromEntries(Object.entries(snapshot.presence).map(([id, value]) => [id, { ...value }])) as TerritoryPresence
  const bases = { ...snapshot.bases }
  if (move.fromBase) bases[faction] = Math.max(0, bases[faction] - 1)
  else presence[move.source][faction] = Math.max(0, presence[move.source][faction] - 1)
  presence[move.target][faction] += 1
  return { ...snapshot, presence, bases }
}

function simulateAction(snapshot: GameSnapshot, faction: Faction, action: ActionName): CandidateMove {
  let state = snapshot
  const moves: LegalMove[] = []
  for (let step = 0; step < 2; step += 1) {
    const options = legalMoves(state, faction, action)
    if (!options.length) break
    const scored = options.map((move) => {
      const next = applyMove(state, faction, move)
      const target = NODE_BY_ID[move.target]
      const before = controller(state.presence, move.target)
      const after = controller(next.presence, move.target)
      let value = target.points * (after === faction && before !== faction ? 4 : 1)
      if (before && before !== faction) value += target.points * 2.5
      if (target.id === 'castle') value += snapshot.round > 5 ? 7 : 3
      if (target.type === 'supply' && state.bases[faction] < 3) value += 4
      if (target.type === 'event') value += snapshot.round < 7 ? 1.4 : .3
      if (!move.fromBase && state.presence[move.source][faction] <= 1) value -= NODE_BY_ID[move.source].points * 1.3
      return { move, value: value + Math.random() * .6 }
    }).sort((a, b) => b.value - a.value)
    const chosen = scored[0]
    if (!chosen) break
    moves.push(chosen.move)
    state = applyMove(state, faction, chosen.move)
  }
  const phaseBias = snapshot.round <= 3 ? (action === 'EXPAND' ? 3 : 0) : snapshot.round >= 7 ? (action === 'CONTEST' ? 4 : 0) : 0
  const score = moves.reduce((total, move) => total + NODE_BY_ID[move.target].points, 0) * 2 + moves.length + phaseBias + Math.random()
  return { action, moves, score }
}

export function chooseAiTurn(snapshot: GameSnapshot, faction: Faction = 'red'): CandidateMove {
  const candidates = ACTIONS.map((action) => simulateAction(snapshot, faction, action)).sort((a, b) => b.score - a.score)
  const pool = candidates.slice(0, Math.min(2, candidates.length))
  return pool[Math.random() < .8 ? 0 : Math.min(1, pool.length - 1)]
}
