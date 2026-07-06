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
    title: "فَإِذَا جَآءَ وَعْدُ — الإسراء",
    members: [
      {
        surah: 17,
        surahName: "الإسراء",
        ayah: 5,
        text: "فَإِذَا جَآءَ وَعْدُ أُولَيٰهُمَا بَعَثْنَا عَلَيْكُمْ عِبَاداٗ لَّنَا أُوْلِے بَأْسٖ شَدِيدٖ فَجَاسُواْ خِلَٰلَ اَ۬لدِّيَارِۖ وَكَانَ وَعْداٗ مَّفْعُولاٗۖ",
        similarity: "فَإِذَا جَآءَ وَعْدُ",
      },
      {
        surah: 17,
        surahName: "الإسراء",
        ayah: 7,
        text: "إِنْ أَحْسَنتُمْ أَحْسَنتُمْ لِأَنفُسِكُمْۖ وَإِنْ أَسَأْتُمْ فَلَهَاۖ فَإِذَا جَآءَ وَعْدُ اُ۬لْأٓخِرَةِ لِيَسُـُٔواْ وُجُوهَكُمْ وَلِيَدْخُلُواْ اُ۬لْمَسْجِدَ كَمَا دَخَلُوهُ أَوَّلَ مَرَّةٖ وَلِيُتَبِّرُواْ مَا عَلَوْاْ تَتْبِيراًۖ",
        similarity: "فَإِذَا جَآءَ وَعْدُ",
      },
    ],
  },
];
