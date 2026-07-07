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
