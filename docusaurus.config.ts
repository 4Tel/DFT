import type * as Preset from '@docusaurus/preset-classic';
import type { Config, PresetConfig, ThemeConfig } from '@docusaurus/types';
//
import type { Navbar } from '@docusaurus/theme-common'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { codeTheme, gtag, redirects } from './config.config';

const site_url = 'https://4tel.github.io/';
const author = '4Tel';
const repo_from = 'https://github.com/'
const repo_name = 'DFT'
const repo_url = repo_from + author + '/' + repo_name

/** Blog Information. */
const meta: Config = {
  // site
  url: site_url,
  baseUrl: '/' + repo_name,
  trailingSlash: false,
  // home
  title: author,
  favicon: 'img/favicon.ico',
  deploymentBranch: 'main',
  // locale  
  i18n: {
    defaultLocale: 'kr',
    locales: ['kr'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
}

/* Top Navigation bar information */
const navigation: Navbar = {
  title: author + '/ ' + repo_name,
  logo: {
    src: 'img/favicon.ico',
    href: site_url
  },
  hideOnScroll: true,
  items: [
    {
      label: "Theory",
      position: "left",
      items: [{label: 'DFT', to: '/DFT'}],
    }, {
      label: "Software",
      position: "left",
      items: [
          { label: 'Quantum ESPRESSO', to: '/Software/QE' },
          { label: 'QE-Dev', to: '/Software/QE-Dev' },
      ]
    }, {
      href: repo_url,
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub repository',
    },

  ]
};

/** theme setting */
const theme: ThemeConfig = {
  image: 'img/favicon.ico', // tab
  colorMode: {
    defaultMode: 'dark',
    disableSwitch: false,
  }, prism: codeTheme,
  docs: {
    sidebar: {
      hideable: true,
      autoCollapseCategories: true,
    }
  },
  navbar: navigation,
  footer: {
    style: 'dark',
    copyright: `Copyright © ${new Date().getFullYear()}. Made by ${author}.`,
  },
};

const doc_settings = {
  editUrl: repo_url + '/blob/main/',
  remarkPlugins: [remarkMath],
  rehypePlugins: [[rehypeKatex, { strict: false }]],
  showLastUpdateTime: true,
}
const latex_setting = [
  {
    href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
    type: 'text/css',
  },
]

/* first page */
const page1: PresetConfig = [
  'classic',
  {
    docs: {
      sidebarPath: './sidebars.ts',
      routeBasePath: '/',
      ...doc_settings,
      onInlineTags: 'warn',
    },
    theme: {
      customCss: './src/css/custom.css',
    },
  } satisfies Preset.Options,
]

const config: Config = {
  ...meta,
  presets: [page1],
  plugins: [gtag, redirects],
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid',
  ],
  themeConfig: theme,
  stylesheets: latex_setting,
};

export default config;
