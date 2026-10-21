import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { allSurahs } from "@site/src/data/mutashabihat";
import { problemAyat, problemCountBySurah } from "@site/src/data/problemAyat";

import styles from "./index.module.css";

/**
 * Index of the personal watchlist (آيات أراجعها), grouped by surah like the
 * mutashabihat index. Surahs with entries are highlighted with their count and
 * link to `/mutashabihat/problem-ayat/{slug}`; the rest are shown muted.
 * Sourced from `src/data/problemAyat`. Served at `/mutashabihat/problem-ayat`.
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
            أتقنتها ({problemAyat.length} آية في {problemCountBySurah.size} سورة).
          </p>
        </header>

        <ul className={styles.grid}>
          {allSurahs.map((surah) => {
            const count = problemCountBySurah.get(surah.number) ?? 0;
            return (
              <li
                key={surah.number}
                className={clsx(styles.cell, count > 0 && styles.cellActive)}
              >
                <Link
                  to={`/mutashabihat/problem-ayat/${surah.slug}`}
                  className={styles.cellLink}
                >
                  <span className={styles.num}>{surah.number}</span>
                  <span className={styles.name}>{surah.name}</span>
                  {count > 0 && (
                    <span className={styles.count} aria-label={`${count} آية`}>
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
}
