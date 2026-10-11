import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

// Execute the real rule source, including its real imports, without a browser.
const urls = new Map()
async function load(name) {
  if (urls.has(name)) return urls.get(name)
  const source = fs.readFileSync(new URL('../src/crownlands/' + name + '.ts',import.meta.url),'utf8')
  let code = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText
  const imports = [...code.matchAll(/from ['"]\.\/([^'"]+)['"]/g)]
  for (const match of imports) {
    const url = await load(match[1])
    code = code.replace(match[0], 'from ' + JSON.stringify(url))
  }
  const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
  urls.set(name,url)
  return url
}
const board = await import(await load('boardData'))
const rules = await import(await load('gameRules'))
const match = await import(await load('matchState'))
const seats = [{faction:'blue',human:true},{faction:'red',human:false}]

test('two and four players start on the original corners, with independent reserves and trackers', () => {
  for (const count of [2,4]) {
    const state = match.initialMatch(board.FACTIONS.slice(0,count).map(faction=>({faction,human:true})))
    assert.equal(state.snapshot.round,1)
    assert.equal(state.stage,'setup')
    for (const faction of board.FACTIONS.slice(0,count)) assert.equal(board.scoreFromControl(state.snapshot.control,faction),1)
    assert.equal(state.snapshot.bases.blue,6)
    assert.notEqual(state.snapshot.usedSpecial.blue,state.snapshot.usedSpecial.red)
  }
})

test('reinforce uses controlled territory; expand only reaches legal adjacent spaces', () => {
  const state = match.initialMatch(seats).snapshot
  assert.deepEqual(rules.legalMoves(state,'blue','REINFORCE'),[{source:'base',target:'sw',fromBase:true}])
  const targets = rules.legalMoves(state,'blue','EXPAND').map(move=>move.target)
  assert.deepEqual(new Set(targets),new Set(['w','s','supply-2','event-2']))
  state.bases.blue=0
  assert.deepEqual(rules.legalMoves(state,'blue','EXPAND'),[])
})

test('moves preserve their input; majority and tied-control scoring remain correct', () => {
  const state = match.initialMatch(seats).snapshot
  const next = rules.applyMove(state,'blue',{source:'base',target:'sw',fromBase:true})
  assert.equal(state.bases.blue,6)
  assert.equal(state.presence.sw.blue,1)
  assert.equal(next.bases.blue,5)
  assert.equal(next.presence.sw.blue,2)
  next.presence.sw.red=2
  assert.equal(board.controller(next.presence,'sw'),null)
  next.presence.castle.blue=1
  assert.equal(board.projectedScore(next.presence,'blue'),4)
})

test('used supply/event spaces cannot be entered again by the same kingdom', () => {
  const state = match.initialMatch(seats).snapshot
  state.usedSpecial.blue.add('supply-2')
  state.usedSpecial.blue.add('event-2')
  assert.ok(rules.legalMoves(state,'blue','EXPAND').every(move=>!['supply-2','event-2'].includes(move.target)))
})

test('AI turns always consist of legal moves and do not mutate the live snapshot', () => {
  const state = match.initialMatch(seats).snapshot
  for (let i=0;i<30;i++) {
    const candidate = rules.chooseAiTurn(state,'red')
    let simulated = state
    for (const move of candidate.moves) {
      assert.ok(rules.legalMoves(simulated,'red',candidate.action).some(legal=>JSON.stringify(legal)===JSON.stringify(move)))
      simulated = rules.applyMove(simulated,'red',move)
    }
  }
  assert.equal(state.bases.red,6)
})

test('round initialization, initiative rotation and full-action control updates are retained', () => {
  let game = match.startRound(match.initialMatch(seats))
  assert.equal(game.stage,'handoff')
  assert.equal(game.chooser,0)
  assert.ok(game.actions.red)
  game = {...game,stage:'resolve',actions:{blue:'EXPAND',red:'REINFORCE'}}
  game = match.resolveMove(game,{source:'base',target:'s',fromBase:true})
  assert.equal(game.snapshot.control.s,null)
  game = match.resolveMove(game,{source:'base',target:'w',fromBase:true})
  assert.equal(game.snapshot.control.s,'blue')
  assert.equal(game.snapshot.control.w,'blue')
  assert.equal(game.turn,1)
  game = match.finishTurn(game)
  assert.equal(game.stage,'round')
  game.snapshot.round=2
  assert.equal(match.initiativeOrder(game)[0].faction,'red')
})
