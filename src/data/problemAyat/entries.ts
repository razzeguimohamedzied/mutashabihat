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
  {
    id: "prob-0002",
    surah: 17,
    ayah: 35,
    text: "وَأَوْفُواْ اُ۬لْكَيْلَ إِذَا كِلْتُمْ وَزِنُواْ بِالْقُسْطَاسِ اِ۬لْمُسْتَقِيمِۖ ذَٰلِكَ خَيْرٞ وَأَحْسَنُ تَأْوِيلاٗۖ",
    highlight: "بِالْقُسْطَاسِ",
    note: "اختلاف بين حفص وقالون",
  },
  {
    id: "prob-0003",
    surah: 17,
    ayah: 38,
    text: "كُلُّ ذَٰلِكَ كَانَ سَيِّئَةً عِندَ رَبِّكَ مَكْرُوهاٗۖ",
    highlight: "سَيِّئَةً",
    note: "اختلاف بين حفص وقالون",
  },
];
