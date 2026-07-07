export function moveFocusTo(selector: string): void {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  target.scrollIntoView({ block: "start" });
  target.focus({ preventScroll: true });
}
