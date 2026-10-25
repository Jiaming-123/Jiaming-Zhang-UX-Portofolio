import { setupProjectChapters } from './project-chapters.mjs';
// Use the same hero boundary for all five case studies.
export function setupProjectNavbar(pathname, onHidden, chapterCopy) {
  const selector = {
    '/projects/unilink': '.ul-hero',
    '/projects/landing-app': '.ul-hero',
    '/projects/culturelens': '.culturelens-hero',
    '/projects/crownlands': '.cl-hero, .project-hero',
    '/projects/furniture': '.project-hero',
    '/projects/boardgamemate': '.boardgamemate-overview-hero',
  }[pathname.replace(/\/$/, '')];
  onHidden(false);
  if (!selector) return () => {};
  const stopChapters = setupProjectChapters(pathname, chapterCopy);
  let frame = 0;
  let hero = null;
  const resized = new ResizeObserver(() => schedule());
  const update = () => {
    frame = 0;
    const nextHero = document.querySelector(selector);
    if (nextHero !== hero) {
      resized.disconnect();
      hero = nextHero;
      if (hero) resized.observe(hero);
    }
    onHidden(Boolean(hero && hero.getBoundingClientRect().bottom <= 160));
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  // The preserved projects load lazily: start observing when their hero mounts.
  const mounted = new MutationObserver(schedule);
  mounted.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  update();
  return () => {
    stopChapters();
    cancelAnimationFrame(frame);
    resized.disconnect();
    mounted.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('pageshow', schedule);
  };
}
