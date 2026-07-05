import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "متشابهات",
  tagline: "مرجع المتشابهات اللفظية في القرآن الكريم",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
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

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/razzeguimohamedzied/mutashabihat/tree/main/",
        },
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
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "ابدأ الآن",
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
