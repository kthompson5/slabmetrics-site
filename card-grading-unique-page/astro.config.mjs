import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',       // full static export
  site: 'https://slabmetrics.com', // for absolute OG URLs
  build: { format: 'directory' }
});