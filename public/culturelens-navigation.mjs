// A chapter's jump offset and scroll-spy activation line must be identical.
export function chapterAtPosition(chapters, readingLine) {
  return [...chapters].reverse().find(chapter => chapter.top <= readingLine + 2)?.id ?? 'frame';
}

export function setupChapterNavigation(root, onActive) {
  if (document.body.classList.contains('case-chapters-enabled')) return () => {};
  const nav = root.querySelector('.culturelens-chapter-nav');
  const sections = [...root.querySelectorAll('[data-culturelens-chapter]')];
  if (!nav || !sections.length) return () => {};
  const links = [...nav.querySelectorAll('a')];
  const margins = sections.map(section => section.style.scrollMarginTop);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let anchoredSection = null;
  let animating = false;
  let frame = 0;

  const readingLine = () => (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight + 24;
  const update = () => {
    const line = readingLine();
    sections.forEach(section => { section.style.scrollMarginTop = `${line}px`; });
    onActive(chapterAtPosition(sections.map(section => ({ id: section.dataset.culturelensChapter, top: section.getBoundingClientRect().top })), line));
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  };
  const alignAnchor = () => {
    if (!anchoredSection || animating) return;
    const offset = anchoredSection.getBoundingClientRect().top - readingLine();
    if (Math.abs(offset) > 2) window.scrollTo({ top: window.scrollY + offset, behavior: 'instant' });
  };
  const resized = () => { update(); alignAnchor(); };
  const ended = () => { animating = false; alignAnchor(); update(); nav.dataset.chapterScroll = 'idle'; };
  const releaseAnchor = () => { anchoredSection = null; animating = false; nav.dataset.chapterScroll = 'idle'; };
  const keydown = event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) releaseAnchor();
  };
  const jump = event => {
    const target = sections.find(section => `#${section.id}` === event.currentTarget.hash);
    if (!target) return;
    event.preventDefault();
    update();
    anchoredSection = target;
    animating = !reduced.matches;
    nav.dataset.chapterScroll = animating ? 'moving' : 'idle';
    target.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
    history.replaceState(history.state, '', event.currentTarget.hash);
    if (!animating) ended();
    else if (Math.abs(target.getBoundingClientRect().top - readingLine()) <= 2) ended();
  };
  links.forEach(link => link.addEventListener('click', jump));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('scrollend', ended);
  window.addEventListener('resize', resized);
  window.addEventListener('wheel', releaseAnchor, { passive: true });
  window.addEventListener('touchstart', releaseAnchor, { passive: true });
  window.addEventListener('pointerdown', releaseAnchor, { passive: true });
  window.addEventListener('keydown', keydown);
  const observer = new ResizeObserver(resized);
  [root, nav, ...sections].forEach(element => observer.observe(element));
  update();
  nav.dataset.chapterScroll = 'idle';
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    delete nav.dataset.chapterScroll;
    links.forEach(link => link.removeEventListener('click', jump));
    sections.forEach((section, index) => { section.style.scrollMarginTop = margins[index]; });
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('scrollend', ended);
    window.removeEventListener('resize', resized);
    window.removeEventListener('wheel', releaseAnchor);
    window.removeEventListener('touchstart', releaseAnchor);
    window.removeEventListener('pointerdown', releaseAnchor);
    window.removeEventListener('keydown', keydown);
  };
}
