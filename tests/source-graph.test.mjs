import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const repo = fileURLToPath(new URL('../', import.meta.url))
test('src contains no disconnected alternative page or component implementations', () => {
  const reached = new Set()
  function visit(file) {
    if (reached.has(file) || !fs.existsSync(file)) return
    reached.add(file)
    if (!/\.[cm]?[jt]sx?$/.test(file)) return
    const { importedFiles } = ts.preProcessFile(fs.readFileSync(file, 'utf8'), true, true)
    for (const imported of importedFiles) {
      if (!imported.fileName.startsWith('.')) continue
      const base = path.resolve(path.dirname(file), imported.fileName)
      const candidates = [base, ...['.tsx', '.ts', '.css', '.json', '.mjs', '.js'].map(extension => base + extension), path.join(base, 'index.tsx'), path.join(base, 'index.ts')]
      const target = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      if (target) visit(target)
    }
  }
  function files(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
      ? files(path.join(directory, entry.name)) : path.join(directory, entry.name))
  }
  visit(path.join(repo, 'src/main.tsx'))
  visit(path.join(repo, 'src/unilink-entry.tsx'))
  const disconnected = files(path.join(repo, 'src')).filter(file => !reached.has(file) && !file.endsWith('.d.ts'))
  assert.deepEqual(disconnected.map(file => path.relative(repo, file)), [])
})
