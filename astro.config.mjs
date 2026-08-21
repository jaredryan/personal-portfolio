// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

// Reads the "browserslist" field in package.json — one target list shared
// by any tool that needs it, instead of duplicating browser versions here.
const cssTargets = browserslistToTargets(browserslist());

export default defineConfig({
  site: 'https://jaredryan.netlify.app',
  trailingSlash: 'always',
  integrations: [
    icon(),
    // Excludes the 404 page — it's an error response, not a page worth indexing.
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  // Lightning CSS (not postcss+autoprefixer) both adds vendor prefixes and
  // minifies, in one pass, driven by the same target list — postcss+
  // autoprefixer added prefixes correctly, but Vite's default esbuild CSS
  // minifier then stripped them back out afterward, since esbuild resolves
  // its own separate, more modern default target and treats the prefixes
  // as redundant. Lightning CSS avoids that two-tool conflict entirely.
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: cssTargets,
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
