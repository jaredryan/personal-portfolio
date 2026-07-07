export function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function setSectionState(options: {
  key: "project" | "role";
  value: string;
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void {
  const { key, value, hash, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  url.hash = hash;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}

export function clearSectionState(options: {
  key: "project" | "role";
  hash: "#projects" | "#experience";
  replace?: boolean;
}): void {
  const { key, hash, replace = false } = options;
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  url.hash = hash;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}
