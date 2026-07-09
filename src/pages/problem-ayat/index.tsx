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
 * Splits `text` around every occurrence of `highlight` and wraps each match in a
 * <mark>. The text is NEVER mutated. If `highlight` is empty or not found, the
 * text renders unchanged.
 */
function highlightWrong(text: string, highlight?: string): ReactNode {
  if (!highlight || !text.includes(highlight)) {
    return text;
  }
  const parts = text.split(highlight);
  return parts.map((part, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <mark className={styles.highlight}>{highlight}</mark>
      )}
    </span>
  ));
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
        {highlightWrong(entry.text, entry.highlight)}
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
