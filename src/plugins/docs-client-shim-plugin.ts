import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";

/**
 * Aliases `@docusaurus/plugin-content-docs/client` to a local fail-safe shim so
 * the offline search theme's <SearchBar> works on this docs-disabled site.
 *
 * The exact-match (`$`) alias only intercepts the bare `client` specifier used
 * by the search theme; the shim itself imports the real module via its
 * `./lib/*` path, so there is no resolution loop. See docs-client-shim.js for
 * the rationale.
 */
export default function docsClientShimPlugin(
  _context: LoadContext,
): Plugin<void> {
  return {
    name: "docs-client-shim",

    configureWebpack() {
      return {
        resolve: {
          alias: {
            "@docusaurus/plugin-content-docs/client$": path.resolve(
              __dirname,
              "docs-client-shim.js",
            ),
          },
        },
      };
    },
  };
}
