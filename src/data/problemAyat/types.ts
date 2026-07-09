/**
 * Type definitions for the personal "problem ayat" watchlist (آيات أراجعها) —
 * verses the memorizer struggles with or recalls incorrectly.
 *
 * This is a private review list, separate from the normalized mutashabihat
 * groups. Add a verse while you get it wrong; delete it once it's fixed.
 */

/** A single verse the memorizer wants to keep reviewing. */
export interface ProblemAyah {
  /** Stable identifier, e.g. "prob-0001". */
  id: string;
  /** Surah number, 1..114. */
  surah: number;
  /** Ayah number within the surah. */
  ayah: number;
  /**
   * Full ayah text (Uthmani script). Never mutated; `highlight` is marked
   * inside it at render time.
   */
  text: string;
  /**
   * Optional part of the ayah that is habitually recalled wrong. Must be an
   * exact substring of `text`. Highlighted at render time; when absent, the
   * text renders unmarked.
   */
  highlight?: string;
  /**
   * Optional free-text Arabic note: what you get wrong, or a reminder that
   * helps you fix it.
   */
  note?: string;
}
