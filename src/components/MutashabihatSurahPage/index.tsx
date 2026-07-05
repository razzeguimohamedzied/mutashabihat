import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SurahMutashabihat from "@site/src/components/SurahMutashabihat";
import { getSurahInfo } from "@site/src/data/mutashabihat";

import styles from "./styles.module.css";

/**
 * Route component rendered once per surah by the `mutashabihat-pages` plugin.
 * The plugin injects the surah number via `createData` + route `modules`, so
 * this component receives it as the `surah` prop.
 */
export default function MutashabihatSurahPage({
  surah,
}: {
  surah: number;
}): ReactNode {
  const info = getSurahInfo(surah);
  const title = info ? `متشابهات سورة ${info.name}` : "متشابهات";

  return (
    <Layout
      title={title}
      description={`الآيات المتشابهة لفظاً التي تخص سورة ${info?.name ?? ""} — مقارنة مع نظائرها في السور الأخرى مع إبراز موضع الفرق.`}
    >
      <main className="container margin-vert--lg">
        <nav className={styles.breadcrumb} aria-label="مسار التنقل">
          <Link to="/mutashabihat/mutashabihat-summary">فهرس السور</Link>
          <span aria-hidden="true"> ‹ </span>
          <span>{info?.name}</span>
        </nav>
        <SurahMutashabihat surah={surah} />
      </main>
    </Layout>
  );
}
