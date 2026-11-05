import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const repo = new URL('../', import.meta.url)
const source = fs.readFileSync(new URL('src/crownlands/useCrownlandsAudio.ts', repo), 'utf8')

function harness() {
  const listeners = new Map()
  const state = { active: false, hidden: false }
  const music = { paused: true, volume: 1, play() { this.paused=false; return Promise.resolve() }, pause() { this.paused=true } }
  const slots = []
  let cursor=0, effects=[], controller
  const changed = (slot, deps) => !slot || deps.some((value,index) => !Object.is(value,slot.deps[index]))
  const react = {
    useRef(value) { const index=cursor++; return slots[index] ??= { current:value } },
    useState(value) { const index=cursor++; slots[index] ??= { value }; return [slots[index].value, next => { slots[index].value=typeof next==='function' ? next(slots[index].value) : next }] },
    useCallback(callback,deps) { const index=cursor++; if(changed(slots[index],deps)) slots[index]={ callback,deps }; return slots[index].callback },
    useEffect(callback,deps) { const index=cursor++; if(changed(slots[index],deps)) effects.push(() => { slots[index]?.cleanup?.(); slots[index]={deps,cleanup:callback()} }) },
  }
  const exports = {}
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{
    exports, require:name => { assert.equal(name,'react'); return react },
    document: { get hidden() { return state.hidden }, addEventListener:(name,listener)=>listeners.set(name,listener), removeEventListener:name=>listeners.delete(name) },
  })
  const render = () => { cursor=0; effects=[]; controller=exports.useCrownlandsAudio(state.active); controller.musicRef.current=music; effects.forEach(run=>run()); return controller }
  render()
  return {music,state,listeners,render,get audio() { return controller }}
}

test('music starts on the game gesture, toggles independently and pauses when the game closes', () => {
  const h = harness()
  assert.equal(h.music.paused, true)
  h.audio.startMusic()
  assert.equal(h.music.paused, false)
  h.state.active = true
  h.render()
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  h.audio.toggle()
  h.render()
  assert.equal(h.music.paused, true)
  h.audio.toggle()
  h.render()
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  h.audio.duck(true)
  assert.equal(h.music.volume, 0.035)
  h.audio.duck(false)
  assert.equal(h.music.volume, 0.5)
  h.state.hidden = true
  h.listeners.get('visibilitychange')()
  assert.equal(h.music.paused, true)
  h.state.hidden = false
  h.listeners.get('visibilitychange')()
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  h.state.active = false
  h.render()
  assert.equal(h.music.paused, true)
})

test('source build leaves game audio to React without a competing global music controller', () => {
  const root = new URL('../',import.meta.url)
  const manifest = JSON.parse(fs.readFileSync(new URL('docs/production-restoration-manifest.json',root),'utf8'))
  assert.equal(manifest.buildMode,'react-source')
  const html = fs.readFileSync(new URL('dist-production/index.html',root),'utf8')
  assert.ok(!html.includes('crownlands-audio'))
})
