export function moveFocusTo(selector: string): void {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  // inline: "nearest" is the spec default when omitted, but pinning it
  // explicitly rules out a horizontal scroll if the target (or an ancestor)
  // is ever wider than the viewport at the moment this runs.
  target.scrollIntoView({ block: "start", inline: "nearest" });
  target.focus({ preventScroll: true });
}

// Tracks whether the most recent user interaction was a keyboard Tab press
// vs a pointer/touch activation. Some browsers (notably mobile Safari)
// apply `:focus-visible` to a programmatically-focused, non-form element
// (a heading or container with tabindex="-1") regardless of what triggered
// the focus() call, since such elements "don't normally receive focus via
// mouse." That produces a persistent ring after a plain tap, even though
// the same code path is correct and desired for real keyboard navigation.
let lastInputWasKeyboard = false;

if (typeof document !== "undefined") {
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Tab") lastInputWasKeyboard = true;
    },
    true,
  );
  document.addEventListener(
    "pointerdown",
    () => {
      lastInputWasKeyboard = false;
    },
    true,
  );
}

/** Move focus to `el` with no scroll side effect (callers that need to
 * scroll handle it themselves). The element still receives real focus
 * either way, so screen-reader announcements are unaffected — only the
 * visual ring is conditional on input modality: pointer/touch activation
 * suppresses it, keyboard activation shows the normal localized
 * `:focus-visible` ring. */
export function moveFocus(el: HTMLElement): void {
  if (!lastInputWasKeyboard) {
    el.classList.add("focus-ring-suppressed");
    el.addEventListener("blur", () => el.classList.remove("focus-ring-suppressed"), { once: true });
  }
  el.focus({ preventScroll: true });
}
