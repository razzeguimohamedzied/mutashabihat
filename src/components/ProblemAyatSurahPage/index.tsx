import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SurahProblemAyat from "@site/src/components/SurahProblemAyat";
import { getSurahInfo } from "@site/src/data/mutashabihat";

import styles from "./styles.module.css";

/**
 * Route component rendered once per surah by the `problem-ayat-pages` plugin.
 * The plugin injects the surah number via `createData` + route `modules`, so
 * this component receives it as the `surah` prop.
 */
export default function ProblemAyatSurahPage({
  surah,
}: {
  surah: number;
}): ReactNode {
  const info = getSurahInfo(surah);
  const title = info ? `آيات أراجعها من سورة ${info.name}` : "آيات أراجعها";

  return (
    <Layout
      title={title}
      description={`الآيات التي أواجه صعوبة في حفظها من سورة ${info?.name ?? ""} — مع إبراز موضع الخطأ.`}
    >
      <main className="container margin-vert--lg">
        <nav className={styles.breadcrumb} aria-label="مسار التنقل">
          <Link to="/mutashabihat/problem-ayat">آيات أواجه صعوبة في حفظها</Link>
          <span aria-hidden="true"> ‹ </span>
          <span>{info?.name}</span>
        </nav>
        <SurahProblemAyat surah={surah} />
      </main>
    </Layout>
  );
}
