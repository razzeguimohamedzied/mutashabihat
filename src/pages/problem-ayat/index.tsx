import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {
  problemAyat,
  surahNameFor,
  surahSlugFor,
  type ProblemAyah,
} from "@site/src/data/problemAyat";

import styles from "./index.module.css";

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
  const slug = surahSlugFor(entry);
  return (
    <li className={styles.card}>
      <div className={styles.ref}>
        {slug ? (
          <Link className={styles.surahLink} to={`/mutashabihat/${slug}`}>
            {surahNameFor(entry)}
          </Link>
        ) : (
          <span className={styles.surahName}>{surahNameFor(entry)}</span>
        )}
        <span className={styles.ayahNo}>الآية {entry.ayah}</span>
      </div>
      <p className={styles.ayahText} lang="ar">
        {highlightWrong(entry.text, entry.highlight, entry.highlightOccurrences)}
      </p>
      {entry.note && (
        <aside className={styles.note} lang="ar">
          <span className={styles.noteLabel}>ملاحظة</span>
          <p className={styles.noteText}>{entry.note}</p>
        </aside>
      )}
    </li>
  );
}

/**
 * The personal watchlist page (آيات أراجعها): verses the memorizer struggles
 * with. Sourced from `src/data/problemAyat` — add an entry while you get a verse
 * wrong, delete it once it's fixed. Served at `/mutashabihat/problem-ayat`.
 */
export default function ProblemAyatPage(): ReactNode {
  return (
    <Layout
      title="آيات أواجه صعوبة في حفظها"
      description="قائمة شخصية بالآيات التي أواجه صعوبة في حفظها أو أحفظها خطأً — أراجعها حتى أتقنها."
    >
      <main className="container margin-vert--lg" dir="rtl">
        <header className={styles.header}>
          <h1 className={styles.title}>آيات أواجه صعوبة في حفظها</h1>
          <p className={styles.subtitle}>
            آيات أواجه صعوبة في حفظها أو أحفظها خطأً. أراجعها هنا، وأحذفها متى
            أتقنتها ({problemAyat.length}).
          </p>
        </header>

        {problemAyat.length > 0 ? (
          <ul className={styles.list}>
            {problemAyat.map((entry) => (
              <ProblemCard key={entry.id} entry={entry} />
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            لا توجد آيات في القائمة حاليًا — ما شاء الله. 🎉
          </p>
        )}
      </main>
    </Layout>
  );
}
