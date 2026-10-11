import type { ActionName, ControlState, Faction, TerritoryPresence } from './boardData'
import type { LegalMove } from './gameRules'

export const ACTIONS: ActionName[] = ['REINFORCE', 'EXPAND', 'REPOSITION', 'CONTEST']

export type CandidateMove = { action: ActionName; moves: LegalMove[]; score: number }

export type GameSnapshot = {
  presence: TerritoryPresence
  control: ControlState
  bases: Record<Faction, number>
  usedSpecial: Record<Faction, Set<string>>
  round: number
}
