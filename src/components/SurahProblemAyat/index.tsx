import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Explanation from "@site/src/components/Explanation";
import { getSurahInfo } from "@site/src/data/mutashabihat";
import {
  getProblemAyatForSurah,
  type ProblemAyah,
} from "@site/src/data/problemAyat";

import styles from "./styles.module.css";

/**
 * Wraps every occurrence of each `highlight` phrase in `text` in a <mark>. With
 * a single phrase, `occurrences` (1-based) restricts marking to those matches;
 * unselected matches render as plain text. The text is NEVER mutated. If no
 * phrase is found, the text renders unchanged.
 */
function highlightWrong(
  text: string,
  highlight?: string | readonly string[],
  occurrences?: readonly number[],
): ReactNode {
  const phrases = (typeof highlight === "string" ? [highlight] : highlight ?? [])
    .filter((p) => p.length > 0);
  const ranges: { start: number; end: number }[] = [];
  for (const phrase of phrases) {
    let n = 0;
    for (let at = text.indexOf(phrase); at !== -1; at = text.indexOf(phrase, at + phrase.length)) {
      n += 1;
      if (!occurrences || occurrences.includes(n)) {
        ranges.push({ start: at, end: at + phrase.length });
      }
    }
  }
  if (ranges.length === 0) {
    return text;
  }
  ranges.sort((a, b) => a.start - b.start);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const { start, end } of ranges) {
    if (start < cursor) {
      continue; // overlaps an earlier match
    }
    nodes.push(text.slice(cursor, start));
    nodes.push(
      <mark key={start} className={styles.highlight}>
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  }
  nodes.push(text.slice(cursor));
  return nodes;
}

function ProblemCard({ entry }: { entry: ProblemAyah }): ReactNode {
  return (
    <li className={styles.card}>
      <div className={styles.ref}>
        <span className={styles.ayahNo}>الآية {entry.ayah}</span>
      </div>
      <p className={styles.ayahText} lang="ar">
        {highlightWrong(entry.text, entry.highlight, entry.highlightOccurrences)}
      </p>
      {entry.note && (
        <aside className={styles.note} lang="ar">
          <span className={styles.noteLabel}>ملاحظة</span>
          <Explanation value={entry.note} />
        </aside>
      )}
    </li>
  );
}

export interface SurahProblemAyatProps {
  /** Surah number, 1..114. */
  surah: number;
}

/**
 * Renders every watchlist entry in `surah`, in ayah order, with the
 * habitually-wrong span highlighted and the personal note (if any) below it.
 */
export default function SurahProblemAyat({
  surah,
}: SurahProblemAyatProps): ReactNode {
  const info = getSurahInfo(surah);
  const entries = getProblemAyatForSurah(surah);

  if (!info) {
    return <p>رقم سورة غير صالح: {surah}</p>;
  }

  return (
    <section className={styles.root} dir="rtl">
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>آيات أراجعها من سورة {info.name}</h1>
        <p className={styles.pageSubtitle}>
          {entries.length > 0
            ? `${entries.length} آية في القائمة من هذه السورة — `
            : "لا توجد آيات في القائمة من هذه السورة حاليًا — "}
          <Link to={`/mutashabihat/${info.slug}`}>متشابهات السورة</Link>
        </p>
      </header>

      {entries.length > 0 && (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <ProblemCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </section>
  );
}
