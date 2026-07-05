/**
 * Public API of the Mutashabihat data layer.
 *
 * Views (per-surah pages, the index) are *derived* from `groups` here — the data
 * is normalized once and denormalized on read. Nothing downstream duplicates a
 * group's content.
 */
import { groups } from "./groups";
import { surahs, surahByNumber } from "./surahs";
import type { MutashabihGroup, SurahInfo } from "./types";

export type { MutashabihGroup, MutashabihMember, SurahInfo } from "./types";
export { groups } from "./groups";
export { surahs, surahByNumber } from "./surahs";

/**
 * Validates the group invariants. Called once at module load so a bad edit to
 * `groups.ts` fails the build instead of rendering silently-broken pages.
 */
function assertGroups(all: MutashabihGroup[]): void {
  const seenIds = new Set<string>();
  for (const group of all) {
    if (seenIds.has(group.id)) {
      throw new Error(`[mutashabihat] duplicate group id: ${group.id}`);
    }
    seenIds.add(group.id);

    if (group.members.length < 2) {
      throw new Error(
        `[mutashabihat] group ${group.id} must have >= 2 members`,
      );
    }
    for (const m of group.members) {
      if (m.surah < 1 || m.surah > 114) {
        throw new Error(
          `[mutashabihat] group ${group.id}: invalid surah ${m.surah}`,
        );
      }
      if (!surahByNumber.has(m.surah)) {
        throw new Error(
          `[mutashabihat] group ${group.id}: unknown surah ${m.surah}`,
        );
      }
      if (m.similarity.length > 0 && !m.text.includes(m.similarity)) {
        throw new Error(
          `[mutashabihat] group ${group.id}, surah ${m.surah}:${m.ayah}: ` +
            `similarity "${m.similarity}" is not a substring of text`,
        );
      }
    }
  }
}

assertGroups(groups);

/** Look up a surah descriptor by number (1..114). */
export function getSurahInfo(surah: number): SurahInfo | undefined {
  return surahByNumber.get(surah);
}

/**
 * Every group that has at least one member in `surah`. The full group is
 * returned each time (members from other surahs included), which is what makes
 * cross-surah symmetry automatic.
 */
export function getGroupsForSurah(surah: number): MutashabihGroup[] {
  return groups.filter((g) => g.members.some((m) => m.surah === surah));
}

/** Set of surah numbers that appear in at least one group. */
export const surahsWithData: ReadonlySet<number> = new Set(
  groups.flatMap((g) => g.members.map((m) => m.surah)),
);

/** Whether a surah has any recorded mutashabihat. */
export function surahHasData(surah: number): boolean {
  return surahsWithData.has(surah);
}

/** Total number of surahs that have data — handy for the index summary. */
export function countSurahsWithData(): number {
  return surahsWithData.size;
}

export type { SurahInfo as Surah };
export { surahs as allSurahs };
