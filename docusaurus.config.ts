import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "متشابهات",
  tagline: "مرجع المتشابهات اللفظية في القرآن الكريم",
  favicon: "img/favicon.svg",

  future: {
    v4: true,
    // Opt out of the Rspack-based "faster" bundler. Its persistent module-graph
    // cache panics intermittently in this OneDrive-synced working folder
    // ("ModuleGraphModule ... not found"). Webpack is slower but reliable here.
    faster: false,
  },

  url: "https://razzeguimohamedzied.github.io",
  baseUrl: "/mutashabihat/",

  organizationName: "razzeguimohamedzied",
  projectName: "mutashabihat",
  trailingSlash: false,

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "ar",
    locales: ["ar"],
  },

  // Generates one static page per surah at /mutashabihat/{slug} from the
  // normalized data in src/data/mutashabihat (single source of truth).
  plugins: [
    "./src/plugins/mutashabihat-pages.ts",
    // Makes the offline search <SearchBar> work despite `docs: false` (see the
    // plugin for details). Must be present for the production build to succeed.
    "./src/plugins/docs-client-shim-plugin.ts",
  ],

  themes: [
    // Fully offline local search over the built (SSG) HTML. Docs and blog are
    // disabled, and every surah page is an `addRoute`'d route (neither docs nor
    // blog nor a src/pages page), so we index "pages" and disable docs/blog.
    // Only active for the production build served by `npm run serve` — the
    // plugin reads the emitted HTML, so search does not run under `npm start`.
    [
      "@easyops-cn/docusaurus-search-local",
      {
        // Stable content-hashed index filenames for cache busting.
        hashed: true,
        // Arabic content (with English fallback for any Latin text/UI).
        language: ["ar", "en"],
        // Docs/blog are disabled in this site; the generated /mutashabihat/*
        // routes and the summary page are "pages" as far as the indexer sees.
        indexDocs: false,
        indexBlog: false,
        indexPages: true,
        // Keep Arabic keywords (short words, particles) in the index — the
        // default English stop-word filter must not strip Arabic terms.
        removeDefaultStopWordFilter: true,
        // Highlight matched terms on the destination page after navigating from
        // a result; works with the site-wide RTL direction.
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 12,
        searchResultContextMaxLength: 80,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "متشابهات",
      logo: {
        alt: "شعار متشابهات",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/mutashabihat/mutashabihat-summary",
          label: "فهرس المتشابهات",
          position: "left",
        },
        {
          to: "/mutashabihat/problem-ayat",
          label: "آيات أواجه صعوبة في حفظها",
          position: "left",
        },
        {
          href: "https://github.com/razzeguimohamedzied/mutashabihat",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `حقوق النشر © ${new Date().getFullYear()} متشابهات. مبني بـ Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
