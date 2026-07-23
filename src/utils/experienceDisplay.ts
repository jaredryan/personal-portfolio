import type { ExperienceEntry } from "../data/experience";

export function dateLabel(entry: ExperienceEntry): string {
  if (entry.kind === "education") return String(entry.date ?? "");
  return `${entry.start} — ${entry.end}`;
}

export function orgName(entry: ExperienceEntry): string {
  return entry.company ?? entry.institution ?? "";
}

/** Dashboard > Experience uses a shorter company label where one is set
 * (see ExperiencePreview.astro), falling back to the full orgName()
 * everywhere else has it. */
export function orgNameShort(entry: ExperienceEntry): string {
  return entry.companyShort ?? orgName(entry);
}

/** Spine/list row title line. Education entries store the same string as
 * both `title` and `institution` (e.g. "V School"), so pairing them with
 * " · " would read as a redundant "V School · V School" — show the title
 * alone for education, and "title · company" for work as before. */
export function spineLine1(entry: ExperienceEntry): string {
  if (entry.kind === "education") return entry.title;
  return `${entry.title} · ${orgNameShort(entry)}`;
}

/** First letter of up to the first two words of the org name, for the
 * monogram tile fallback used until real logo images are supplied. */
export function monogram(entry: ExperienceEntry): string {
  const name = orgName(entry);
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
