import type { ExperienceEntry } from "../data/experience";

export function dateLabel(entry: ExperienceEntry): string {
  if (entry.kind === "education") return String(entry.date ?? "");
  return `${entry.start} — ${entry.end}`;
}

export function orgName(entry: ExperienceEntry): string {
  return entry.company ?? entry.institution ?? "";
}

/** First letter of up to the first two words of the org name, for the
 * monogram tile fallback used until real logo images are supplied. */
export function monogram(entry: ExperienceEntry): string {
  const name = orgName(entry);
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
