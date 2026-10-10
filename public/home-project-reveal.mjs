// Observe once per card mount, without adding work to every scroll frame.
export function observeProjectReveal(element, show) {
  const view = element.ownerDocument.defaultView;
  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let revealed = false;
  let disposed = false;
  const cleanup = () => {
    disposed = true;
    observer?.disconnect();
    reducedMotion.removeEventListener('change', onMotionChange);
    element.removeEventListener('focusin', reveal);
  };
  const reveal = () => {
    if (revealed || disposed) return;
    revealed = true;
    cleanup();
    show();
  };
  const onMotionChange = event => {
    if (event.matches) reveal();
  };

  if (reducedMotion.matches || !view.IntersectionObserver) {
    reveal();
    return cleanup;
  }

  observer = new view.IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) reveal();
  }, { rootMargin: '0px 0px -64px 0px', threshold: 0.01 });
  reducedMotion.addEventListener('change', onMotionChange);
  // Keyboard users never have to wait for an offscreen link to appear.
  element.addEventListener('focusin', reveal);
  observer.observe(element);
  return cleanup;
}
