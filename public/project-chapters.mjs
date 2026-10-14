// One chapter navigation for all five case studies. Selectors follow the actual
// preserved page sections; no project content is rewritten or re-ordered.
export const chapterProjects = {
  unilink: { name: 'UniLink', hero: '.ul-hero', chapters: ['Overview', 'Problem', 'Research', 'Concepts', 'Final Design', 'Testing', 'Sustainability', 'Reflection'].map(label => [label, `#unilink-${label.toLowerCase().replaceAll(' ', '-')}`]) },
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

export function chapterReadingProgress(tops, readingLine, atPageEnd = false) {
  if (tops.length < 2) return 0;
  const index = activeChapterIndex(tops, readingLine, atPageEnd);
  if (index >= tops.length - 1 || atPageEnd) return 1;
  const span = tops[index + 1] - tops[index];
  const fraction = span > 0 ? Math.min(1, Math.max(0, (readingLine - tops[index]) / span)) : 0;
  return (index + fraction) / (tops.length - 1);
}

export function chapterWalkerOffset(progress, centers, viewportWidth, spriteWidth) {
  if (!centers.length) return 0;
  const step = Math.min(1, Math.max(0, progress)) * (centers.length - 1);
  const index = Math.floor(step);
  const center = centers[index] + ((centers[Math.min(index + 1, centers.length - 1)] ?? centers[index]) - centers[index]) * (step - index);
  const half = Math.min(spriteWidth / 2, viewportWidth / 2);
  return Math.min(Math.max(half, viewportWidth - half), Math.max(half, center)) - spriteWidth / 2;
}

export function setupProjectChapters(pathname) {
  const slug = pathname.replace(/\/$/, '').split('/').pop();
  const project = chapterProjects[slug === 'landing-app' ? 'unilink' : slug];
  if (!project || !pathname.startsWith('/projects/')) return () => {};
  document.body.classList.add('case-chapters-enabled');
  let nav, hero, rail, list, walker, sections = [], links = [], items = [], markers = [];
  let frame = 0, active = -1, anchor = null, moving = false, disposed = false;
  let railWidth = 0, wasVisible = false;
  let lastScrollY = window.scrollY, idleTimer = 0;
  const previousChapterHeight = document.body.style.getPropertyValue('--case-chapter-height');
  const originals = [];
  const legacy = [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const resize = new ResizeObserver(() => schedule());
  const readingLine = () => (nav?.offsetHeight || 86) + 24;
  const stopWalking = () => {
    clearTimeout(idleTimer); idleTimer = 0;
    if (walker) walker.dataset.state = 'idle';
  };
  const visibility = () => {
    nav?.classList.toggle('is-paused', document.hidden);
    if (document.hidden) stopWalking();
    else schedule();
  };
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
    rail = document.createElement('div');
    rail.className = 'case-chapter-rail';
    list = document.createElement('ol');
    sections.forEach((section, index) => {
      originals.push({ section, id: section.getAttribute('id'), tabindex: section.getAttribute('tabindex'), margin: section.style.scrollMarginTop });
      if (!section.id) section.id = `${slug}-${project.chapters[index][0].toLowerCase().replaceAll(' ', '-')}`;
      if (!section.hasAttribute('tabindex')) section.tabIndex = -1;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      const marker = document.createElement('span');
      marker.className = 'case-chapter-dot';
      marker.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'case-chapter-name';
      label.textContent = project.chapters[index][0];
      link.append(marker, label);
      link.addEventListener('click', jump);
      item.append(link); list.append(item); links.push(link); items.push(item); markers.push(marker);
    });
    walker = document.createElement('span');
    walker.className = 'case-chapter-walker';
    walker.setAttribute('aria-hidden', 'true');
    walker.dataset.state = 'idle';
    walker.dataset.facing = 'right';
    const sprite = document.createElement('span');
    sprite.className = 'case-chapter-walker-sprite';
    for (const pose of ['walk-a', 'walk-b', 'wave-a', 'wave-b']) {
      const image = document.createElement('img');
      image.className = `case-chapter-walker-frame frame-${pose}`;
      // Walking is a side profile; the two v2 wave frames face the viewer.
      const version = pose.startsWith('wave') ? 2 : 1;
      image.src = `/images/mascot/chapter-${pose}-v${version}.webp`;
      image.alt = ''; image.width = 128; image.height = 192;
      image.decoding = 'async'; image.fetchPriority = 'low'; image.draggable = false;
      sprite.append(image);
    }
    walker.append(sprite);
    rail.append(list, walker);
    list.addEventListener('scroll', schedule, { passive: true });
    nav.append(heading, rail);
    document.querySelectorAll('.ul-timeline, .culturelens-chapter-nav, .cl-sticky-nav').forEach(old => {
      legacy.push({ old, hidden: old.getAttribute('aria-hidden'), inert: old.inert });
      old.setAttribute('aria-hidden', 'true'); old.inert = true;
    });
    document.body.append(nav);
    nav.classList.toggle('is-paused', document.hidden);
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
      nav.querySelector('.case-chapter-current').textContent = project.chapters[active][0];
    }
    const link = links[active];
    if (changed || becameVisible || railWidth !== list.clientWidth) {
      railWidth = list.clientWidth;
      if (list.scrollWidth > list.clientWidth && link) {
        // A link is positioned inside its li: offsetLeft is not its rail position.
        const listBox = list.getBoundingClientRect(), linkBox = link.getBoundingClientRect();
        const left = chapterRailScrollLeft(list.scrollLeft, list.clientWidth, list.scrollWidth, linkBox.left - listBox.left, linkBox.width);
        list.scrollTo({ left, behavior: 'auto' });
      }
    }
    const delta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    if (visible && !document.hidden && Math.abs(delta) > .5) {
      walker.dataset.state = 'walking';
      walker.dataset.facing = delta < 0 ? 'left' : 'right';
      clearTimeout(idleTimer);
      idleTimer = setTimeout(stopWalking, 280);
    } else if (!visible) stopWalking();
    const progress = chapterReadingProgress(tops, readingLine(), atPageEnd);
    const railBox = rail.getBoundingClientRect();
    let centers = markers.map(marker => { const box = marker.getBoundingClientRect(); return box.left + box.width / 2 - railBox.left; });
    // The track scrolls with its labels; the avatar stays in the visible lane.
    const first = centers[0] + list.scrollLeft;
    list.style.setProperty('--chapter-track-left', `${first}px`);
    list.style.setProperty('--chapter-track-width', `${centers.at(-1) - centers[0]}px`);
    if (Math.abs(delta) > .5 && list.scrollWidth > list.clientWidth) {
      const step = progress * (centers.length - 1), index = Math.floor(step);
      const center = centers[index] + (centers[Math.min(index + 1, centers.length - 1)] - centers[index]) * (step - index);
      const margin = walker.offsetWidth / 2 + 8;
      const clamped = Math.min(rail.clientWidth - margin, Math.max(margin, center));
      if (Math.abs(center - clamped) > 1) {
        list.scrollLeft = Math.min(list.scrollWidth - list.clientWidth, Math.max(0, list.scrollLeft + center - clamped));
        centers = markers.map(marker => { const box = marker.getBoundingClientRect(); return box.left + box.width / 2 - railBox.left; });
      }
    }
    const x = chapterWalkerOffset(progress, centers, rail.clientWidth, walker.offsetWidth);
    walker.style.transform = `translate3d(${x}px, 0, 0)`;
    walker.dataset.progress = progress.toFixed(4);
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
  document.addEventListener('visibilitychange', visibility);
  update();
  return () => {
    disposed = true; cancelAnimationFrame(frame); mounted.disconnect(); resize.disconnect(); stopWalking();
    list?.removeEventListener('scroll', schedule);
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
    document.removeEventListener('visibilitychange', visibility);
  };
}
