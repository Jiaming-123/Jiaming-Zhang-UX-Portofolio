export type Faction = 'blue' | 'red' | 'yellow' | 'black'
export const FACTIONS: Faction[] = ['blue', 'red', 'yellow', 'black']
export type ActionName = 'REINFORCE' | 'EXPAND' | 'REPOSITION' | 'CONTEST'
export type NodeType = 'territory' | 'supply' | 'event'

export type BoardNode = {
  id: string
  label: string
  type: NodeType
  points: number
  x: number
  y: number
  specialNumber?: number
  adjacent: string[]
}

export type TerritoryPresence = Record<string, Record<Faction, number>>
export type ControlState = Record<string, Faction | null>

export const BOARD_VIEWBOX = { width: 1000, height: 707 }

export const BOARD_NODES: BoardNode[] = [
  { id: 'nw', label: 'Northwest Village', type: 'territory', points: 1, x: 115, y: 95, adjacent: ['n', 'w', 'supply-1', 'event-1'] },
  { id: 'n', label: 'Northern Village', type: 'territory', points: 1, x: 500, y: 45, adjacent: ['nw', 'ne', 'north-barracks'] },
  { id: 'ne', label: 'Northeast Village', type: 'territory', points: 1, x: 885, y: 95, adjacent: ['n', 'e', 'supply-4', 'event-4'] },
  { id: 'w', label: 'Western Village', type: 'territory', points: 1, x: 45, y: 354, adjacent: ['nw', 'sw', 'west-barracks'] },
  { id: 'e', label: 'Eastern Village', type: 'territory', points: 1, x: 955, y: 354, adjacent: ['ne', 'se', 'east-barracks'] },
  { id: 'sw', label: 'Southwest Village', type: 'territory', points: 1, x: 115, y: 615, adjacent: ['w', 's', 'supply-2', 'event-2'] },
  { id: 's', label: 'Southern Village', type: 'territory', points: 1, x: 500, y: 666, adjacent: ['sw', 'se', 'south-barracks'] },
  { id: 'se', label: 'Southeast Village', type: 'territory', points: 1, x: 885, y: 615, adjacent: ['e', 's', 'supply-3', 'event-3'] },
  { id: 'north-barracks', label: 'Northern Barracks', type: 'territory', points: 2, x: 500, y: 177, adjacent: ['n', 'castle', 'nw', 'ne', 'event-1', 'supply-4'] },
  { id: 'west-barracks', label: 'Western Barracks', type: 'territory', points: 2, x: 248, y: 354, adjacent: ['w', 'castle', 'nw', 'sw', 'supply-1', 'event-2'] },
  { id: 'east-barracks', label: 'Eastern Barracks', type: 'territory', points: 2, x: 752, y: 354, adjacent: ['e', 'castle', 'ne', 'se', 'event-4', 'supply-3'] },
  { id: 'south-barracks', label: 'Southern Barracks', type: 'territory', points: 2, x: 500, y: 532, adjacent: ['s', 'castle', 'sw', 'se', 'supply-2', 'event-3'] },
  { id: 'castle', label: 'Crown Castle', type: 'territory', points: 4, x: 500, y: 354, adjacent: ['north-barracks', 'west-barracks', 'east-barracks', 'south-barracks'] },
  { id: 'supply-1', label: 'Supply Space I', type: 'supply', points: 0, x: 203, y: 228, specialNumber: 1, adjacent: ['nw', 'west-barracks'] },
  { id: 'event-1', label: 'Event Space I', type: 'event', points: 0, x: 320, y: 160, specialNumber: 1, adjacent: ['nw', 'north-barracks'] },
  { id: 'supply-2', label: 'Supply Space II', type: 'supply', points: 0, x: 248, y: 525, specialNumber: 2, adjacent: ['sw', 'south-barracks'] },
  { id: 'event-2', label: 'Event Space II', type: 'event', points: 0, x: 185, y: 478, specialNumber: 2, adjacent: ['sw', 'west-barracks'] },
  { id: 'supply-3', label: 'Supply Space III', type: 'supply', points: 0, x: 780, y: 494, specialNumber: 3, adjacent: ['se', 'south-barracks'] },
  { id: 'event-3', label: 'Event Space III', type: 'event', points: 0, x: 675, y: 546, specialNumber: 3, adjacent: ['se', 'east-barracks'] },
  { id: 'supply-4', label: 'Supply Space IV', type: 'supply', points: 0, x: 706, y: 162, specialNumber: 4, adjacent: ['ne', 'north-barracks'] },
  { id: 'event-4', label: 'Event Space IV', type: 'event', points: 0, x: 790, y: 228, specialNumber: 4, adjacent: ['ne', 'east-barracks'] },
]

export const NODE_BY_ID = Object.fromEntries(BOARD_NODES.map((node) => [node.id, node])) as Record<string, BoardNode>

export const createInitialPresence = (players = 2): TerritoryPresence => Object.fromEntries(
  BOARD_NODES.map((node) => [node.id, { blue: node.id === 'sw' ? 1 : 0, red: node.id === 'ne' ? 1 : 0, yellow: players === 4 && node.id === 'nw' ? 1 : 0, black: players === 4 && node.id === 'se' ? 1 : 0 }]),
) as TerritoryPresence

export function controller(presence: TerritoryPresence, nodeId: string): Faction | null {
  const node = NODE_BY_ID[nodeId]
  const troops = presence[nodeId]
  if (!node || node.type !== 'territory' || !troops) return null
  const ranked = [...FACTIONS].sort((a,b) => troops[b]-troops[a])
  return troops[ranked[0]] > troops[ranked[1]] ? ranked[0] : null
}

export function projectedScore(presence: TerritoryPresence, faction: Faction) {
  return BOARD_NODES.reduce((score, node) => score + (node.type === 'territory' && controller(presence, node.id) === faction ? node.points : 0), 0)
}

export function calculateControl(presence: TerritoryPresence): ControlState {
  return Object.fromEntries(BOARD_NODES.map((node) => [node.id, controller(presence, node.id)])) as ControlState
}

export function scoreFromControl(control: ControlState, faction: Faction) {
  return BOARD_NODES.reduce((score, node) => score + (node.type === 'territory' && control[node.id] === faction ? node.points : 0), 0)
}
