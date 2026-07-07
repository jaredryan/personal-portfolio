import { clearSectionState, setSectionState } from "./urlState";
import { moveFocusTo } from "./focus";

export const SELECT_ROLE_EVENT = "portfolio:select-role";
export const SELECT_PROJECT_EVENT = "portfolio:select-project";
export const CLEAR_ROLE_EVENT = "portfolio:clear-role";
export const CLEAR_PROJECT_EVENT = "portfolio:clear-project";
export const SYNC_FROM_URL_EVENT = "portfolio:sync-from-url";

function dispatch(name: string, detail?: { slug: string }): void {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

let initialized = false;

export function initSectionNav(): void {
  if (initialized) return;
  initialized = true;

  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-role-link], [data-project-link], [data-clear-role], [data-clear-project], [data-dashboard-link]"
    );
    if (!target) return;

    event.preventDefault();

    if (target.dataset.roleLink) {
      const slug = target.dataset.roleLink;
      setSectionState({ key: "role", value: slug, hash: "#experience" });
      dispatch(SELECT_ROLE_EVENT, { slug });
      // Every role panel has its own heading id (`experience-detail-heading-<slug>`,
      // Task 14) — there is no single shared id, since duplicate IDs across the
      // 7 pre-rendered panels would be invalid HTML and unreliable to query.
      moveFocusTo(`#experience-detail-heading-${slug}`);
    } else if (target.dataset.projectLink) {
      const slug = target.dataset.projectLink;
      setSectionState({ key: "project", value: slug, hash: "#projects" });
      dispatch(SELECT_PROJECT_EVENT, { slug });
      // Same reasoning as above: each of the 5 project panels has its own
      // heading id (`project-detail-heading-<slug>`, Task 13).
      moveFocusTo(`#project-detail-heading-${slug}`);
    } else if (target.hasAttribute("data-clear-role")) {
      clearSectionState({ key: "role", hash: "#experience" });
      dispatch(CLEAR_ROLE_EVENT);
      moveFocusTo("#experience-heading");
    } else if (target.hasAttribute("data-clear-project")) {
      clearSectionState({ key: "project", hash: "#projects" });
      dispatch(CLEAR_PROJECT_EVENT);
      moveFocusTo("#projects-heading");
    } else if (target.hasAttribute("data-dashboard-link")) {
      // Returning to the dashboard must drop BOTH `?role=` and `?project=` in
      // one navigation — using clearSectionState() twice would push two
      // separate history entries and only clear one key per call. Neither
      // urlState.ts helper covers "clear everything and go to a third hash,"
      // so this one case is handled directly with the URL API.
      const url = new URL(window.location.href);
      url.searchParams.delete("role");
      url.searchParams.delete("project");
      url.hash = "#dashboard";
      window.history.pushState(null, "", url);
      dispatch(CLEAR_ROLE_EVENT);
      dispatch(CLEAR_PROJECT_EVENT);
      moveFocusTo("#dashboard");
    }
  });

  window.addEventListener("popstate", () => {
    dispatch(SYNC_FROM_URL_EVENT);
  });
}
