import type { ProblemAyah } from "./types";

/**
 * THE SINGLE SOURCE OF TRUTH for the personal "problem ayat" watchlist.
 *
 * Add an entry when a verse keeps tripping you up; delete it once you've fixed
 * it. Rules (enforced at build time by `assertProblemAyat` in ./index.ts):
 *   - `id`s are unique;
 *   - `surah` ∈ 1..114;
 *   - if `highlight` is set, it must be an exact substring of `text` (copy it
 *     verbatim so the highlight lands exactly on the confusing part).
 */
export const problemAyat: ProblemAyah[] = [
  {
    id: "prob-0001",
    surah: 17,
    ayah: 6,
    text: "ثُمَّ رَدَدْنَا لَكُمُ اُ۬لْكَرَّةَ عَلَيْهِمْ وَأَمْدَدْنَٰكُم بِأَمْوَٰلٖ وَبَنِينَ وَجَعَلْنَٰكُمْ أَكْثَرَ نَفِيراًۖ",
    highlight: "وَأَمْدَدْنَٰكُم",
  },
];
