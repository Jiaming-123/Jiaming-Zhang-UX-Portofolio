import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')
const load=async file=>import('data:text/javascript;base64,'+Buffer.from(ts.transpileModule(read(file),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText).toString('base64'))
const {furnitureFrames:frames}=await load('src/components/furniture/visual-frames.ts')
const {furnitureVisualCopy:copy}=await load('src/i18n/中文版.ts')

test('all 18 Furniture case-study images have complete Chinese text bounded by their original dimensions',()=>{
 assert.equal(Object.keys(frames).length,18)
 assert.equal(Object.keys(frames).filter(name=>name.startsWith('journey/')).length,6)
 assert.equal(Object.keys(frames).filter(name=>name.startsWith('desktop-')).length,4)
 assert.equal(Object.keys(frames).filter(name=>name.startsWith('mobile-')).length,6)
 for(const [name,frame] of Object.entries(frames)){
  assert.ok(fs.existsSync(new URL('../public/images/furniture/'+name,import.meta.url)),name)
  for(const patch of frame.patches){
   assert.ok(copy[patch.key]?.trim(),`${name}: missing ${patch.key}`)
   assert.notEqual(patch.background.toLowerCase(),patch.color.toLowerCase(),`${name}: invisible ${patch.key}`)
   assert.ok(patch.x>=0&&patch.y>=0&&patch.width>0&&patch.height>0,`${name}: invalid text bounds`)
   assert.ok(patch.x+patch.width<=frame.width&&patch.y+patch.height<=frame.height,`${name}: ${patch.key} extends beyond image`)
  }
 }
})

test('English exports remain intact and every case-study image uses the shared conditional renderer',()=>{
 const renderer=read('src/components/furniture/FurnitureImage.tsx')
 assert.ok(renderer.includes('if (!isChinese || !frame) return <img {...props} />'))
 assert.ok(renderer.includes('furnitureVisualCopy[patch.key]'))
 for(const file of ['src/pages/ProjectPage.tsx','src/components/FurnitureCaseStudy.tsx'])assert.ok(read(file).includes('<FurnitureImage '))
 assert.ok(!read('src/components/FurnitureCaseStudy.tsx').includes('<img '))
 assert.ok(renderer.includes('document.fonts.ready.then(fit)'))
 assert.ok(renderer.includes('element.scrollWidth > element.clientWidth'))
})

test('photographic headlines use clean original fills and the category dropdown remains above its photograph',()=>{
 assert.ok(frames['hero-group38-20261013.png'].photos.some(photo=>photo.kind==='poster'))
 assert.ok(frames['desktop-home.png'].photos.some(photo=>photo.kind==='desktop'))
 assert.ok(frames['mobile-home.png'].photos.some(photo=>photo.kind==='mobile'))
 const category=frames['journey/category-provided-20261018.webp'].photos.find(photo=>photo.kind==='category')
 assert.ok(category.x+category.width<=624)
 for(const name of ['hero-clean.webp','living-clean.webp'])assert.ok(fs.existsSync(new URL('../public/images/furniture/localized/'+name,import.meta.url)))
 const css=read('src/components/furniture/furniture-images.css')
 assert.ok(css.includes('.journey-step-media>.furniture-localized-image { display:block;'))
 assert.ok(css.includes('height:44px'))
})
