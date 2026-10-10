export type Phase = 'idle' | 'clarifying' | 'recommended' | 'comparing' | 'selected' | 'collectingReservation' | 'review' | 'visitPlan' | 'boundary' | 'repair' | 'support'
export type State = { phase: Phase; needs: string[]; language: string; selected: number | null; slot: number; ticketInput: string; adultCount: number; childCount: number; freeChildCount: number; visitorCount: number; error: string; confirmed: boolean; intent: string }
export const initialState: State = { phase: 'idle', needs: [], language: 'English', selected: null, slot: 0, ticketInput: '2 adults and 1 child under 5', adultCount: 0, childCount: 0, freeChildCount: 0, visitorCount: 0, error: '', confirmed: false, intent: 'Awaiting request' }
export function parseTickets(input: string) {
  let remaining = input.toLowerCase().trim()
  const take = (pattern: RegExp) => { let total = 0; remaining = remaining.replace(pattern, (_, count: string) => { total += Number(count); return ' ' }); return total }
  const freeChildCount = take(/\b(\d+)\s*(?:(?:children|child|kids?)\s*)?under\s*5\b/g)
  const adultCount = take(/\b(\d+)\s*adults?\b/g)
  const childCount = take(/\b(\d+)\s*(?:children|child|kids?)\b/g)
  const visitorCount = adultCount + childCount + freeChildCount
  remaining = remaining.replace(/\band\b|[+,.;]/g, '').trim()
  if (remaining || visitorCount < 1 || visitorCount > 20 || adultCount < 1) return null
  return { adultCount, childCount, freeChildCount, visitorCount }
}
export type Action = { type: 'RESET' | 'COMPARE' | 'NEEDS' | 'RECOMMEND' | 'RESERVE' | 'REVIEW' | 'CONFIRM' | 'EDIT' | 'CANCEL' | 'SUPPORT' } | { type: 'SCENARIO'; value: 'quiet' | 'booking' | 'easy' | 'camera' } | { type: 'TOGGLE_NEED' | 'LANGUAGE' | 'TICKETS'; value: string } | { type: 'SELECT' | 'SLOT'; value: number }
export function simulationReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET': return { ...initialState }
    case 'SCENARIO': return { ...initialState, phase: action.value === 'quiet' ? 'recommended' : action.value === 'camera' ? 'boundary' : action.value === 'booking' ? 'repair' : 'clarifying', needs: action.value === 'quiet' ? ['Quieter gallery', 'Fewer people', 'Lower sensory intensity', 'Seating'] : [], language: action.value === 'quiet' ? 'Chinese' : 'English', intent: { quiet: 'Discover a quiet exhibition', booking: 'Reserve visit', easy: 'Clarify comfort', camera: 'Scan artwork' }[action.value] }
    case 'TOGGLE_NEED': return { ...state, needs: state.needs.includes(action.value) ? state.needs.filter(n => n !== action.value) : [...state.needs, action.value], confirmed: false }
    case 'LANGUAGE': return { ...state, language: action.value, confirmed: false }
    case 'NEEDS': return { ...state, phase: 'clarifying', selected: null, confirmed: false }
    case 'RECOMMEND': return { ...state, phase: 'recommended', selected: null, confirmed: false, intent: 'Recommend exhibitions' }
    case 'COMPARE': return { ...state, phase: state.phase === 'comparing' ? 'recommended' : 'comparing' }
    case 'SELECT': return { ...state, selected: action.value, slot: 0, phase: 'selected', confirmed: false }
    case 'RESERVE': return { ...state, phase: state.selected === null ? 'repair' : 'collectingReservation', intent: 'Reserve visit' }
    case 'SLOT': return { ...state, slot: action.value, confirmed: false }
    case 'TICKETS': return { ...state, ticketInput: action.value, error: '', confirmed: false }
    case 'REVIEW': {
      if (state.selected === null) return { ...state, phase: 'repair' }
      const parsed = parseTickets(state.ticketInput)
      return parsed ? { ...state, ...parsed, phase: 'review', error: '' } : { ...state, error: 'Use a supported format such as “2 adults and 1 child under 5”. Include an accompanying adult; this demo supports up to 20 visitors.' }
    }
    case 'CONFIRM': return state.phase === 'review' && state.selected !== null && state.visitorCount > 0 ? { ...state, phase: 'visitPlan', confirmed: true } : state
    case 'EDIT': return { ...state, phase: state.selected === null ? 'repair' : 'collectingReservation', confirmed: false }
    case 'CANCEL': return { ...initialState, intent: 'Cancelled · nothing reserved' }
    case 'SUPPORT': return { ...state, phase: 'support', intent: 'Human / official support', confirmed: false }
  }
}
