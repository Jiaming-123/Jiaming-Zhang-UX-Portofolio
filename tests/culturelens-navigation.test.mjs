import test from 'node:test';
import assert from 'node:assert/strict';
import { chapterAtPosition } from '../public/culturelens-navigation.mjs';

test('exact navigation landing activates the destination, not the previous chapter', () => {
  const line = 150;
  assert.equal(chapterAtPosition([{ id: 'frame', top: -1500 }, { id: 'explore', top: line }], line), 'explore');
  assert.equal(chapterAtPosition([{ id: 'explore', top: -3000 }, { id: 'evolve', top: line + 1 }], line), 'evolve');
});
test('manual scroll switches at the same line in both directions', () => {
  const before = [{ id: 'explore', top: -600 }, { id: 'evolve', top: 153 }];
  assert.equal(chapterAtPosition(before, 150), 'explore');
  assert.equal(chapterAtPosition(before.map(item => ({ ...item, top: item.top - 4 })), 150), 'evolve');
  assert.equal(chapterAtPosition(before, 150), 'explore');
});
test('activation uses the actual responsive navigation height', () => {
  const chapters = [{ id: 'agent', top: -1000 }, { id: 'reflect', top: 140 }];
  assert.equal(chapterAtPosition(chapters, 136), 'agent');
  assert.equal(chapterAtPosition(chapters, 148), 'reflect');
});
test('long chapters retain their highlight until the next chapter begins', () => {
  assert.equal(chapterAtPosition([{ id: 'explore', top: -6000 }, { id: 'evolve', top: 400 }], 150), 'explore');
});
