import type { LoadContext, Plugin } from "@docusaurus/types";
import { surahs } from "../data/mutashabihat/surahs";

/**
 * Generates one route per surah at `/mutashabihat/problem-ayat/{slug}` for the
 * personal watchlist, mirroring `mutashabihat-pages`. Each route mounts
 * `ProblemAyatSurahPage`, which derives its content from
 * `src/data/problemAyat` at render time.
 */
export default function problemAyatPagesPlugin(
  _context: LoadContext,
): Plugin<void> {
  return {
    name: "problem-ayat-pages",

    async contentLoaded({ actions }) {
      const { addRoute, createData } = actions;

      await Promise.all(
        surahs.map(async (surah) => {
          // Persist just the surah number; the component derives everything else.
          const dataPath = await createData(
            `problem-ayat-surah-${surah.number}.json`,
            JSON.stringify(surah.number),
          );

          addRoute({
            path: `/mutashabihat/problem-ayat/${surah.slug}`,
            component: "@site/src/components/ProblemAyatSurahPage",
            modules: { surah: dataPath },
            exact: true,
          });
        }),
      );
    },
  };
}
