import type { LoadContext, Plugin } from "@docusaurus/types";
import { surahs } from "../data/mutashabihat/surahs";

/**
 * Generates one route per surah at `/mutashabihat/{slug}` from the surah list —
 * no hand-authored MDX, no duplicated data. Each route mounts
 * `MutashabihatSurahPage`, which derives its content from the normalized
 * `groups` data at render time.
 *
 * Because routes are added via `addRoute`, Docusaurus renders them to static
 * HTML during `build` (SSG), so the generated pages are indexable by a local
 * search plugin.
 */
export default function mutashabihatPagesPlugin(
  _context: LoadContext,
): Plugin<void> {
  return {
    name: "mutashabihat-pages",

    async contentLoaded({ actions }) {
      const { addRoute, createData } = actions;

      await Promise.all(
        surahs.map(async (surah) => {
          // Persist just the surah number; the component derives everything else.
          const dataPath = await createData(
            `mutashabihat-surah-${surah.number}.json`,
            JSON.stringify(surah.number),
          );

          addRoute({
            path: `/mutashabihat/${surah.slug}`,
            component: "@site/src/components/MutashabihatSurahPage",
            modules: { surah: dataPath },
            exact: true,
          });
        }),
      );
    },
  };
}
