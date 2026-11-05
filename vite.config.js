import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { site } from './src/lib/content/site.js';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter(),

			// Static output has no request to derive a host from; without this the
			// prerendered <head> points og:image and canonical at the placeholder
			// http://sveltekit-prerender/ and social crawlers find no card.
			prerender: {
				origin: site.url,
				// The case study is a finished page served from static/, so it has no
				// route for the crawler to find behind its trailing-slash link.
				handleHttpError: ({ path, message }) => {
					if (path === '/work/hack-day-bengaluru/') return;
					throw new Error(message);
				}
			}
		})
	]
});
