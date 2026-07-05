import type { MutashabihGroup } from "./types";

/**
 * SINGLE SOURCE OF TRUTH for all similarity groups.
 *
 * To add or edit a mutashabih, change ONLY this array. Every per-surah page and
 * the index are generated from it, so a group added here automatically appears
 * — in full — on the page of every surah it touches.
 *
 * Invariants (enforced by `assertGroups` in `index.ts`):
 *   - every group has >= 2 members;
 *   - every member's `similarity` is an exact substring of its `text`.
 *
 * Ayah text is Uthmani script; references verified against the mushaf.
 */
export const groups: MutashabihGroup[] = [
  {
    id: "grp-0001",
    title: "وَإِذَا قِيلَ لَهُمۡ — تكملة الآية",
    members: [
      {
        surah: 2,
        surahName: "البقرة",
        ayah: 11,
        text: "وَإِذَا قِيلَ لَهُمۡ لَا تُفۡسِدُواْ فِي ٱلۡأَرۡضِ قَالُوٓاْ إِنَّمَا نَحۡنُ مُصۡلِحُونَ",
        similarity: "وَإِذَا قِيلَ لَهُمۡ",
      },
      {
        surah: 2,
        surahName: "البقرة",
        ayah: 13,
        text: "وَإِذَا قِيلَ لَهُمۡ ءَامِنُواْ كَمَآ ءَامَنَ ٱلنَّاسُ قَالُوٓاْ أَنُؤۡمِنُ كَمَآ ءَامَنَ ٱلسُّفَهَآءُۗ أَلَآ إِنَّهُمۡ هُمُ ٱلسُّفَهَآءُ وَلَٰكِن لَّا يَعۡلَمُونَ",
        similarity: "وَإِذَا قِيلَ لَهُمۡ",
      },
    ],
  },
];
