/**
 * Core type definitions for the Mutashabihat (متشابهات) feature.
 *
 * Design principle: **normalize the data, denormalize the view.**
 * A similarity *group* is stored exactly once here (the single source of
 * truth). Every per-surah page is generated from these groups at build time,
 * so a group is never duplicated across surah files.
 */

/** A single ayah that belongs to a similarity group. */
export interface MutashabihMember {
  /** Surah number, 1..114. */
  surah: number;
  /** Arabic surah name, e.g. "البقرة". */
  surahName: string;
  /** Ayah number within the surah. */
  ayah: number;
  /**
   * Full ayah text (Uthmani script). This is never mutated; the shared
   * span (`similarity`) is highlighted at render time by locating it inside `text`.
   */
  text: string;
  /**
   * The shared word/phrase in THIS member — the part it has in common with the
   * look-alike members. Must be an exact substring of `text`.
   */
  similarity: string;
}

/**
 * A set of 2+ ayahs (from different places) that resemble each other.
 * The relationship is n-ary (many-to-many), not just pairwise.
 */
export interface MutashabihGroup {
  /** Stable identifier, e.g. "grp-0001". */
  id: string;
  /** Short Arabic label describing the shared wording (for headings). */
  title: string;
  /**
   * Optional الضابط — a memorization aid (Arabic) explaining how to tell the
   * look-alike ayahs apart (the rule/hook the memorizer keys the difference on).
   * When absent, no ضابط is shown for the group.
   */
  memorizationRule?: string;
  /** The look-alike ayahs. Always length >= 2. */
  members: MutashabihMember[];
}

/** Lightweight surah descriptor used to generate routes and the index page. */
export interface SurahInfo {
  /** Surah number, 1..114. */
  number: number;
  /** Arabic name, e.g. "البقرة". */
  name: string;
  /** URL slug, e.g. "al-baqarah". Route is `/mutashabihat/{slug}`. */
  slug: string;
}
