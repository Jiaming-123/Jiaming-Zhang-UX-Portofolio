import fs from 'node:fs'
export const read = file => fs.readFileSync(new URL('../../' + file, import.meta.url), 'utf8')
const manifest = JSON.parse(read('dist-production/.vite/manifest.json'))
export const builtJS = (entry = 'index.html') => read('dist-production/' + manifest[entry].file)
export const builtCSS = (entry = 'index.html') => (manifest[entry].css || []).map(file => read('dist-production/' + file)).join('\n')
