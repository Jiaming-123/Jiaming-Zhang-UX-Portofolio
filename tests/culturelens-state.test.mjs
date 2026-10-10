import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

const source = readFileSync(new URL('../src/components/culturelens/simulationState.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } })
const { initialState, simulationReducer: reduce, parseTickets } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

test('under-5 visitors are free-entry but still counted', () => {
  for (const text of ['2 adults and 1 child under 5', '2 adults + 1 under 5', '2 ADULTS, 1 kid under 5']) {
    assert.deepEqual(parseTickets(text), { adultCount: 2, childCount: 0, freeChildCount: 1, visitorCount: 3 })
  }
  assert.deepEqual(parseTickets('2 adults and 2 children and 1 under 5'), { adultCount: 2, childCount: 2, freeChildCount: 1, visitorCount: 5 })
})
test('unsupported or unsafe ticket inputs require repair', () => {
  for (const text of ['', 'two people', '1 child', '0 adults', '21 adults', '-1 adult', '2 adults and a baby', '1.5 adults']) assert.equal(parseTickets(text), null, text)
})
test('a reservation cannot start before an exhibition is saved', () => {
  assert.equal(reduce(initialState, { type: 'RESERVE' }).phase, 'repair')
  assert.equal(reduce(initialState, { type: 'REVIEW' }).phase, 'repair')
  assert.equal(reduce(initialState, { type: 'CONFIRM' }).confirmed, false)
})
function reviewState() {
  return [{type:'SCENARIO',value:'quiet'},{type:'SELECT',value:1},{type:'RESERVE'},{type:'TICKETS',value:'2 adults and 1 under 5'},{type:'REVIEW'}].reduce(reduce,initialState)
}
test('selection persists through review; only explicit confirmation creates plan', () => {
  const review=reviewState()
  assert.equal(review.selected,1)
  assert.equal(review.phase,'review')
  assert.equal(review.confirmed,false)
  assert.equal(review.visitorCount,3)
  const plan=reduce(review,{type:'CONFIRM'})
  assert.equal(plan.phase,'visitPlan')
  assert.equal(plan.confirmed,true)
})
test('edits invalidate confirmation and cancellation clears all visit data', () => {
  const plan=reduce(reviewState(),{type:'CONFIRM'})
  const edit=reduce(plan,{type:'EDIT'})
  assert.equal(edit.phase,'collectingReservation')
  assert.equal(edit.confirmed,false)
  const cancelled=reduce(plan,{type:'CANCEL'})
  assert.equal(cancelled.selected,null)
  assert.equal(cancelled.visitorCount,0)
  assert.deepEqual(cancelled.needs,[])
})
test('comfort needs are adjustable and scenario boundaries reset state', () => {
  let state=reduce(initialState,{type:'SCENARIO',value:'easy'})
  state=reduce(state,{type:'TOGGLE_NEED',value:'Seating'})
  assert.deepEqual(state.needs,['Seating'])
  state=reduce(state,{type:'TOGGLE_NEED',value:'Seating'})
  assert.deepEqual(state.needs,[])
  state=reduce(reviewState(),{type:'SCENARIO',value:'camera'})
  assert.equal(state.phase,'boundary')
  assert.equal(state.selected,null)
  assert.equal(state.confirmed,false)
})
