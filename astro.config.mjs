// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jaredryan.netlify.app',
  integrations: [
    icon(),
    // Excludes the 404 page — it's an error response, not a page worth indexing.
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
