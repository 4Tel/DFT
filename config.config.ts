import { themes } from 'prism-react-renderer';

const codeTheme = {
  theme: themes.oneLight,
  darkTheme: themes.oneDark,
  magicComments: [
    // Remember to extend the default highlight class name as well!
    {
      className: "theme-code-block-highlighted-line",
      line: "highlight-next-line",
      block: { start: "highlight-start", end: "highlight-end" },
    },
    {
      className: "error-line",
      line: "error-line",
      block: { start: "error-start", end: "error-end" },
    },
    {
      className: "warn-line",
      line: "warn-line",
      block: { start: "warn-start", end: "warn-end" },
    },
  ],
}

import { PluginConfig } from "@docusaurus/types";
export const gtag: PluginConfig = [
  '@docusaurus/plugin-google-gtag',
  {
    trackingID: 'G-KJQBWD08DH',
  }
];

export const redirects: PluginConfig = [
  '@docusaurus/plugin-client-redirects',
  {
    redirects: [],
  },
];