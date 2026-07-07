/** (re)plays the shared `.motion-fade-up` entrance animation on an element
 * that just became the visible content after a JS-driven swap. Removing the
 * class and forcing a reflow before re-adding it is what lets this fire
 * again on repeated swaps — simply re-adding an already-present class does
 * not restart a CSS animation. */
export function playEnterAnimation(el: Element | null | undefined): void {
  if (!el) return;
  el.classList.remove("motion-fade-up");
  void (el as HTMLElement).offsetWidth;
  el.classList.add("motion-fade-up");
}
