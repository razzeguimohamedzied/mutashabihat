import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {
  allSurahs,
  countSurahsWithData,
  surahHasData,
} from "@site/src/data/mutashabihat";

import styles from "./index.module.css";

/**
 * Index of all 114 surahs. Surahs that have recorded mutashabihat are
 * highlighted and link to their page; the rest are shown muted (their pages
 * exist but are currently empty).
 */
export default function MutashabihatIndex(): ReactNode {
  const withData = countSurahsWithData();

  return (
    <Layout
      title="فهرس متشابهات السور"
      description="فهرس السور الـ114 مع المتشابهات اللفظية المسجّلة لكل سورة."
    >
      <main className="container margin-vert--lg" dir="rtl">
        <header className={styles.header}>
          <h1 className={styles.title}>فهرس المتشابهات</h1>
          <p className={styles.subtitle}>
            كل سور القرآن الكريم الـ114. السور المميّزة تحتوي على متشابهات لفظية
            مسجّلة ({withData} سورة حتى الآن).
          </p>
        </header>

        <ul className={styles.grid}>
          {allSurahs.map((surah) => {
            const has = surahHasData(surah.number);
            return (
              <li
                key={surah.number}
                className={clsx(styles.cell, has && styles.cellActive)}
              >
                <Link
                  to={`/mutashabihat/${surah.slug}`}
                  className={styles.cellLink}
                >
                  <span className={styles.num}>{surah.number}</span>
                  <span className={styles.name}>{surah.name}</span>
                  {has && (
                    <span className={styles.dot} aria-label="تحتوي على متشابهات">
                      ●
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
