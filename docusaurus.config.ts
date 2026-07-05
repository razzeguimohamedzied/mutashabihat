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
  plugins: ["./src/plugins/mutashabihat-pages.ts"],

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
