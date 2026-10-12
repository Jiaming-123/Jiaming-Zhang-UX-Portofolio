// One chapter navigation for all five case studies. Selectors follow the actual
// preserved page sections; no project content is rewritten or re-ordered.
export const chapterProjects = {
  unilink: { name: 'UniLink', hero: '.ul-hero', chapters: ['Overview', 'Problem', 'Research', 'Concepts', 'Strategy', 'Final Design', 'Testing', 'Sustainability', 'Reflection'].map(label => [label, `#unilink-${label.toLowerCase().replaceAll(' ', '-')}`]) },
  boardgamemate: { name: 'BoardGameMate', hero: '.boardgamemate-overview-hero', chapters: [['Overview', '.boardgamemate-overview-hero'], ['Discover', '.boardgamemate-discover-section'], ['Research', '.boardgamemate-persona-section'], ['Early UI', '.iteration-early'], ['Reframe', '.iteration-intro'], ['Final Design', '.iteration-showcase'], ['Outcome', '.iteration-outcome']] },
  furniture: { name: 'My Furniture Store', hero: '.project-hero', chapters: [['Overview', '.furniture-intro'], ['Audit', '.furniture-audit'], ['Strategy', '.furniture-principles'], ['Process', '.furniture-process'], ['Architecture', '.furniture-journey'], ['Experience', '.furniture-responsive'], ['Interaction', '.furniture-motion'], ['Build', '.furniture-build'], ['Testing', '.furniture-testing'], ['Outcome', '.furniture-outcome']] },
  culturelens: { name: 'CultureLens', hero: '.culturelens-hero', chapters: ['Frame', 'Explore', 'Evolve', 'Service', 'Agent', 'Reflect'].map(label => [label, `#culturelens-${label.toLowerCase()}`]) },
  crownlands: { name: 'Crownlands', hero: '.cl-hero', chapters: [['Overview', '.cl-overview'], ['How to Play', '#how-to-play'], ['Play', '#play'], ['Design Thinking', '#design-thinking'], ['Playtesting', '#playtesting'], ['Outcome', '#outcome']] },
};

export function activeChapterIndex(tops, readingLine, atPageEnd = false) {
  if (atPageEnd && tops.length) return tops.length - 1;
  let active = 0;
  tops.forEach((top, index) => { if (top <= readingLine + 2) active = index; });
  return active;
}

export function chapterRailScrollLeft(scrollLeft, viewportWidth, contentWidth, relativeLeft, itemWidth) {
  return Math.min(Math.max(0, contentWidth - viewportWidth), Math.max(0, scrollLeft + relativeLeft - (viewportWidth - itemWidth) / 2));
}

export function setupProjectChapters(pathname) {
  const slug = pathname.replace(/\/$/, '').split('/').pop();
  const project = chapterProjects[slug === 'landing-app' ? 'unilink' : slug];
  if (!project || !pathname.startsWith('/projects/')) return () => {};
  document.body.classList.add('case-chapters-enabled');
  let nav, hero, sections = [], links = [], items = [];
  let frame = 0, active = -1, anchor = null, moving = false, disposed = false;
  let railWidth = 0, wasVisible = false;
  const previousChapterHeight = document.body.style.getPropertyValue('--case-chapter-height');
  const originals = [];
  const legacy = [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const resize = new ResizeObserver(() => schedule());
  const readingLine = () => (nav?.offsetHeight || 86) + 24;
  const setTop = (top, immediate, onComplete) => {
    const request = new CustomEvent('portfolio:chapter-scroll', { cancelable: true, detail: { top: Math.max(0, top), immediate, onComplete } });
    if (window.dispatchEvent(request)) {
      window.scrollTo({ top: Math.max(0, top), behavior: immediate ? 'instant' : 'smooth' });
      if (immediate) onComplete?.();
    }
  };
  const align = () => {
    if (!anchor || moving) return;
    const difference = anchor.getBoundingClientRect().top - readingLine();
    if (Math.abs(difference) > 2) setTop(window.scrollY + difference, true);
  };
  const complete = () => { moving = false; align(); schedule(); };
  const release = () => { anchor = null; moving = false; };
  const key = event => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) release(); };
  const jump = event => {
    const index = links.indexOf(event.currentTarget);
    const section = sections[index];
    if (!section) return;
    event.preventDefault();
    anchor = section;
    moving = !reduced.matches;
    section.focus({ preventScroll: true });
    setTop(window.scrollY + section.getBoundingClientRect().top - readingLine(), reduced.matches, complete);
    history.replaceState(history.state, '', `#${section.id}`);
  };
  const mount = () => {
    const nextHero = document.querySelector(project.hero);
    const nextSections = project.chapters.map(([, selector]) => document.querySelector(selector));
    if (!nextHero || nextSections.some(section => !section)) return;
    hero = nextHero;
    sections = nextSections;
    nav = document.createElement('nav');
    nav.className = 'case-chapter-nav';
    nav.dataset.project = slug;
    nav.setAttribute('aria-label', `${project.name} chapters`);
    const heading = document.createElement('div');
    heading.className = 'case-chapter-heading';
    const mark = document.createElement('a');
    mark.className = 'case-chapter-mark monogram';
    mark.href = '/';
    mark.setAttribute('aria-label', 'Jiaming Zhang, home');
    mark.dataset.cursor = 'link';
    mark.textContent = 'JZ';
    const dot = document.createElement('span');
    dot.textContent = '.';
    mark.append(dot);
    const current = document.createElement('span');
    current.className = 'case-chapter-current';
    heading.append(mark, current);
    const list = document.createElement('ol');
    sections.forEach((section, index) => {
      originals.push({ section, id: section.getAttribute('id'), tabindex: section.getAttribute('tabindex'), margin: section.style.scrollMarginTop });
      if (!section.id) section.id = `${slug}-${project.chapters[index][0].toLowerCase().replaceAll(' ', '-')}`;
      if (!section.hasAttribute('tabindex')) section.tabIndex = -1;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      const number = document.createElement('span');
      number.className = 'case-chapter-dot';
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.className = 'case-chapter-name';
      label.textContent = project.chapters[index][0];
      link.append(number, label);
      link.addEventListener('click', jump);
      item.append(link); list.append(item); links.push(link); items.push(item);
    });
    nav.append(heading, list);
    document.querySelectorAll('.ul-timeline, .culturelens-chapter-nav, .cl-sticky-nav').forEach(old => {
      legacy.push({ old, hidden: old.getAttribute('aria-hidden'), inert: old.inert });
      old.setAttribute('aria-hidden', 'true'); old.inert = true;
    });
    document.body.append(nav);
    [hero, nav, ...sections].forEach(element => resize.observe(element));
  };
  const update = () => {
    frame = 0;
    if (disposed) return;
    if (!nav) mount();
    if (!nav) return;
    const visible = hero.getBoundingClientRect().bottom <= 160;
    const becameVisible = visible && !wasVisible;
    wasVisible = visible;
    nav.classList.toggle('is-visible', visible);
    nav.inert = !visible;
    nav.setAttribute('aria-hidden', String(!visible));
    document.body.style.setProperty('--case-chapter-height', `${nav.offsetHeight}px`);
    sections.forEach(section => { section.style.scrollMarginTop = `${readingLine()}px`; });
    const tops = sections.map(section => section.getBoundingClientRect().top);
    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2 && tops.at(-1) < window.innerHeight;
    const next = activeChapterIndex(tops, readingLine(), atPageEnd);
    const changed = next !== active;
    if (changed) {
      active = next;
      links.forEach((link, index) => {
        items[index].classList.toggle('is-complete', index <= active);
        if (index === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      nav.querySelector('.case-chapter-current').textContent = `${String(active + 1).padStart(2, '0')} / ${project.chapters[active][0]}`;
    }
    const list = nav.querySelector('ol'), link = links[active];
    if (changed || becameVisible || railWidth !== list.clientWidth) {
      railWidth = list.clientWidth;
      if (list.scrollWidth > list.clientWidth && link) {
        // A link is positioned inside its li: offsetLeft is not its rail position.
        const listBox = list.getBoundingClientRect(), linkBox = link.getBoundingClientRect();
        const left = chapterRailScrollLeft(list.scrollLeft, list.clientWidth, list.scrollWidth, linkBox.left - listBox.left, linkBox.width);
        list.scrollTo({ left, behavior: 'auto' });
      }
    }
    align();
  };
  const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(update); };
  const mounted = new MutationObserver(schedule);
  mounted.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('scrollend', complete);
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('touchstart', release, { passive: true });
  window.addEventListener('pointerdown', release, { passive: true });
  window.addEventListener('keydown', key);
  document.addEventListener('transitionend', schedule);
  update();
  return () => {
    disposed = true; cancelAnimationFrame(frame); mounted.disconnect(); resize.disconnect();
    links.forEach(link => link.removeEventListener('click', jump)); nav?.remove();
    originals.forEach(({ section, id, tabindex, margin }) => {
      if (id === null) section.removeAttribute('id'); else section.id = id;
      if (tabindex === null) section.removeAttribute('tabindex'); else section.setAttribute('tabindex', tabindex);
      section.style.scrollMarginTop = margin;
    });
    legacy.forEach(({ old, hidden, inert }) => { if (hidden === null) old.removeAttribute('aria-hidden'); else old.setAttribute('aria-hidden', hidden); old.inert = inert; });
    document.body.classList.remove('case-chapters-enabled');
    if (previousChapterHeight) document.body.style.setProperty('--case-chapter-height', previousChapterHeight);
    else document.body.style.removeProperty('--case-chapter-height');
    window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); window.removeEventListener('scrollend', complete);
    window.removeEventListener('wheel', release); window.removeEventListener('touchstart', release); window.removeEventListener('pointerdown', release); window.removeEventListener('keydown', key);
    document.removeEventListener('transitionend', schedule);
  };
}
