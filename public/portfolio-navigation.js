// Cross the boundary between the preserved portfolio and the standalone UniLink page
// with a document navigation. Links within either application retain their behaviour.
(() => {
  const isUniLink = pathname => /^\/projects\/(unilink|landing-app)\/?$/.test(pathname);
  const currentAppIsUniLink = document.documentElement.dataset.app === 'unilink';
  const homeWorkUrl = '/#featured';
  const isHome = () => window.location.pathname === '/';
  if (/^\/work\/?$/.test(window.location.pathname)) {
    window.location.replace(homeWorkUrl);
    return;
  }

  let frame = 0;
  let pendingAnchor = isHome() && window.location.hash === '#featured';
  let boundaryObserver;
  let observedFeatured;
  let observedProjects;
  let observedHeight;
  const updateWorkState = () => {
    frame = 0;
    const featured = isHome() && document.getElementById('featured');
    const projects = isHome() && document.getElementById('work');
    if (featured !== observedFeatured || projects !== observedProjects || observedHeight !== window.innerHeight) {
      boundaryObserver?.disconnect();
      observedFeatured = featured;
      observedProjects = projects;
      observedHeight = window.innerHeight;
      // Observe a narrow strip just below the compact navbar. This also updates
      // the underline when the page-entry animation settles without a scroll event.
      boundaryObserver = new IntersectionObserver(scheduleUpdate, {
        rootMargin: `-64px 0px ${66 - window.innerHeight}px 0px`, threshold: 0,
      });
      if (featured) boundaryObserver.observe(featured);
      if (projects) boundaryObserver.observe(projects);
    }
    const navBottom = document.querySelector('.nav-shell')?.getBoundingClientRect().bottom || 64;
    const active = Boolean(featured && featured.getBoundingClientRect().top <= navBottom + 2 && projects && projects.getBoundingClientRect().bottom > navBottom);
    document.querySelectorAll('.desktop-nav a[href="/#featured"], .mobile-menu a[href="/#featured"]').forEach(link => {
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (pendingAnchor && featured) {
      pendingAnchor = false;
      // Wait for the router's scroll reset and the page's first layout to settle.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToWork('instant')));
    }
  };
  const scheduleUpdate = () => {
    if (!frame) frame = requestAnimationFrame(updateWorkState);
  };
  const scrollToWork = behavior => {
    const featured = isHome() && document.getElementById('featured');
    if (!featured) return;
    // Layout offsets exclude the page-entry animation's temporary translation.
    let top = 0;
    for (let element = featured; element; element = element.offsetParent) top += element.offsetTop;
    // The compact navbar is 64px high after leaving the hero.
    window.scrollTo({ top: Math.max(0, top - 64), behavior });
    scheduleUpdate();
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  const onLocationChange = () => {
    pendingAnchor = isHome() && window.location.hash === '#featured';
    scheduleUpdate();
  };
  window.addEventListener('popstate', onLocationChange);
  window.addEventListener('hashchange', onLocationChange);
  window.addEventListener('pageshow', scheduleUpdate);
  new MutationObserver(scheduleUpdate).observe(document.documentElement, { childList: true, subtree: true });
  scheduleUpdate();

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (/^\/work\/?$/.test(destination.pathname) || (destination.pathname === '/' && destination.hash === '#featured')) {
      event.preventDefault();
      event.stopPropagation();
      if (!isHome()) {
        window.location.assign(homeWorkUrl);
        return;
      }
      document.querySelector('.mobile-menu button[aria-label="Close menu"]')?.click();
      if (window.location.hash !== '#featured') window.history.pushState(window.history.state, '', homeWorkUrl);
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToWork(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth')));
      return;
    }
    if (isUniLink(destination.pathname) === currentAppIsUniLink) return;
    if (isUniLink(destination.pathname)) destination.pathname = '/projects/unilink';
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(destination.href);
  }, true);
})();
