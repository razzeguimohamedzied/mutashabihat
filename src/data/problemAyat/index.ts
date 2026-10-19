/**
 * Public API of the personal "problem ayat" watchlist.
 *
 * The list is validated once at module load so a bad edit fails the build instead of rendering broken. 
 * Surah names are derived from the shared surah table — never duplicated here.
 */
import { surahByNumber } from "../mutashabihat/surahs";
import { problemAyat as problemAyatRaw } from "./entries";
import type { ProblemAyah } from "./types";

export type { ProblemAyah } from "./types";

/**
 * The watchlist, ordered by surah then ayah (Qur'anic order) regardless of the
 * order entries are written in `entries.ts`. This is what views should render.
 */
export const problemAyat: readonly ProblemAyah[] = [...problemAyatRaw].sort(
  (a, b) => a.surah - b.surah || a.ayah - b.ayah,
);

/**
 * Validates the watchlist invariants. Throws at build time on a bad edit.
 */
function assertProblemAyat(all: readonly ProblemAyah[]): void {
  const seenIds = new Set<string>();
  for (const entry of all) {
    if (seenIds.has(entry.id)) {
      throw new Error(`[problemAyat] duplicate id: ${entry.id}`);
    }
    seenIds.add(entry.id);

    if (entry.surah < 1 || entry.surah > 114 || !surahByNumber.has(entry.surah)) {
      throw new Error(
        `[problemAyat] ${entry.id}: invalid surah ${entry.surah}`,
      );
    }
    const phrases =
      typeof entry.highlight === "string" ? [entry.highlight] : entry.highlight ?? [];
    for (const phrase of phrases) {
      if (phrase.length > 0 && !entry.text.includes(phrase)) {
        throw new Error(
          `[problemAyat] ${entry.id} (${entry.surah}:${entry.ayah}): ` +
            `highlight "${phrase}" is not a substring of text`,
        );
      }
    }
    if (entry.highlightOccurrences) {
      if (typeof entry.highlight !== "string") {
        throw new Error(
          `[problemAyat] ${entry.id} (${entry.surah}:${entry.ayah}): ` +
            `highlightOccurrences requires a single-phrase highlight`,
        );
      }
      const count = entry.highlight
        ? entry.text.split(entry.highlight).length - 1
        : 0;
      for (const n of entry.highlightOccurrences) {
        if (!Number.isInteger(n) || n < 1 || n > count) {
          throw new Error(
            `[problemAyat] ${entry.id} (${entry.surah}:${entry.ayah}): ` +
              `highlightOccurrences ${n} is out of range (highlight occurs ${count} time(s))`,
          );
        }
      }
    }
  }
}

assertProblemAyat(problemAyat);

/** Arabic name of the surah an entry belongs to, e.g. "البقرة". */
export function surahNameFor(entry: ProblemAyah): string {
  return surahByNumber.get(entry.surah)?.name ?? `سورة ${entry.surah}`;
}

/** URL slug of the surah an entry belongs to (for linking to its page). */
export function surahSlugFor(entry: ProblemAyah): string | undefined {
  return surahByNumber.get(entry.surah)?.slug;
}
