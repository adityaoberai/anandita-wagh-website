/* =========================================================================
   Writing.

   Posts live on Substack; this is the shop window. Same card as
   projects.js — `cover` is the artwork, `coverBg` the colour the frame
   shows while it loads and behind any letterboxing, so match it to the
   image's own ground.

   Covers are cropped to 1600×800 (2:1) by `npm run assets`; the frame is
   ~2:1 on desktop and shallower on mobile, so keep anything that matters
   in the middle 75% horizontally.
   ========================================================================= */

import { links } from './site.js';

export const blogs = {
	heading: 'Writing',
	standfirst: 'Notes on design, research and the work, published on Substack.',

	/** Every post lands on Substack, so the card link reads the same on each. */
	readCta: 'Read on Substack ↗',

	items: [
		{
			title: "The answer they didn't write down",
			readingTime: '4-minute read',
			href: 'https://ananditawagh.substack.com/p/the-answer-they-didnt-write-down',
			cover: '/assets/blogs/the-answer-they-didnt-write-down.webp',
			coverBg: '#8B7579'
		},
		{
			title: 'Two fields, one purpose: Understanding UX and HCI',
			readingTime: '4-minute read',
			href: 'https://ananditawagh.substack.com/p/two-fields-one-purpose-understanding',
			cover: '/assets/blogs/two-fields-one-purpose.webp',
			coverBg: '#41648B'
		}
	],

	cta: { label: 'Read everything on Substack ↗', href: links.substack }
};
