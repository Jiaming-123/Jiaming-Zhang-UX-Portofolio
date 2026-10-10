// Constant-speed motion for the two existing soft colour fields.
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createOrbWorld(width, height, diameters = [width * .56, width * .34]) {
  const speed = clamp(Math.min(width, height) * .065, 20, 76) * 3.046875;
  const directions = [[.92, .39], [-.91, -.415]];
  const starts = [[.42, .43], [.82, .70]];
  return {
    width, height, speed, wallHits: 0,
    orbs: diameters.map((diameter, i) => {
      // Only the bright core touches the walls; both colour fields pass through each other.
      const radius = Math.min(diameter * .28, width * .24, height * .24);
      const length = Math.hypot(...directions[i]);
      return {
        diameter, radius,
        x: clamp(width * starts[i][0], radius, width - radius),
        y: clamp(height * starts[i][1], radius, height - radius),
        vx: directions[i][0] / length * speed,
        vy: directions[i][1] / length * speed,
      };
    }),
  };
}

function bounceAtEdges(world, orb) {
  for (const [axis, velocity, extent] of [['x', 'vx', world.width], ['y', 'vy', world.height]]) {
    if (orb[axis] < orb.radius) {
      orb[axis] = 2 * orb.radius - orb[axis];
      orb[velocity] = Math.abs(orb[velocity]);
      world.wallHits++;
    } else if (orb[axis] > extent - orb.radius) {
      orb[axis] = 2 * (extent - orb.radius) - orb[axis];
      orb[velocity] = -Math.abs(orb[velocity]);
      world.wallHits++;
    }
  }
}

export function advanceOrbWorld(world, elapsedSeconds) {
  // Small fixed maximum steps keep edge bounces stable across variable frame rates.
  const count = Math.max(1, Math.ceil(elapsedSeconds * 120));
  const dt = elapsedSeconds / count;
  for (let step = 0; step < count; step++) {
    for (const orb of world.orbs) {
      orb.x += orb.vx * dt;
      orb.y += orb.vy * dt;
      bounceAtEdges(world, orb);
    }
  }
}

function mountOrbMotion(hero) {
  const nodes = [...hero.querySelectorAll('.hero-orb')];
  if (nodes.length !== 2) return () => {};
  const originalStyles = nodes.map(node => node.getAttribute('style'));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let world, frame = 0, previousTime = 0, visible = false, disposed = false;
  hero.dataset.orbMotion = 'running';
  const paint = () => nodes.forEach((node, i) => {
    const orb = world.orbs[i];
    node.style.transform = `translate3d(${(orb.x - orb.diameter / 2).toFixed(2)}px, ${(orb.y - orb.diameter / 2).toFixed(2)}px, 0)`;
  });
  const measure = () => {
    const width = hero.clientWidth, height = hero.clientHeight;
    const next = createOrbWorld(width, height, nodes.map(node => node.offsetWidth));
    if (world) next.orbs.forEach((orb, i) => {
      const old = world.orbs[i];
      orb.x = clamp(old.x / world.width * width, orb.radius, width - orb.radius);
      orb.y = clamp(old.y / world.height * height, orb.radius, height - orb.radius);
      orb.vx = old.vx / world.speed * next.speed;
      orb.vy = old.vy / world.speed * next.speed;
    });
    world = next;
    advanceOrbWorld(world, 0);
    paint();
  };
  const tick = time => {
    frame = 0;
    if (disposed || !visible || document.hidden || reducedMotion.matches) return;
    if (previousTime) advanceOrbWorld(world, Math.min((time - previousTime) / 1000, .05));
    previousTime = time;
    paint();
    frame = requestAnimationFrame(tick);
  };
  const syncPlayback = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    if (!disposed && visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
  };
  measure();
  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(hero);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  });
  visibilityObserver.observe(hero);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', syncPlayback);
    reducedMotion.removeEventListener('change', syncPlayback);
    nodes.forEach((node, i) => originalStyles[i] === null ? node.removeAttribute('style') : node.setAttribute('style', originalStyles[i]));
    delete hero.dataset.orbMotion;
  };
}

if (typeof document !== 'undefined') {
  let currentHero, cleanup;
  const syncHero = () => {
    const hero = document.querySelector('.hero');
    if (hero === currentHero) return;
    cleanup?.();
    currentHero = hero;
    cleanup = hero ? mountOrbMotion(hero) : undefined;
  };
  new MutationObserver(syncHero).observe(document.documentElement, { childList: true, subtree: true });
  syncHero();
}
