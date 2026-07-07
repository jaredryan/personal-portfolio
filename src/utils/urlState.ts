export function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function setSectionState(options: {
  key: "project" | "role";
  value: string;
  replace?: boolean;
}): void {
  const { key, value, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}

export function clearSectionState(options: {
  key: "project" | "role";
  replace?: boolean;
}): void {
  const { key, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}
