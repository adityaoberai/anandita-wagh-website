/* =========================================================================
   "What I'm doing now" — the current state of things, work and otherwise.
   The work card is the wide one; `asides` fills the narrow column beside it
   and `offTheClock` runs the full width underneath.

   Runs of text that carry an inline link are written as arrays: a plain
   string is text, an object is an anchor. <RichText> renders either.
   ========================================================================= */

import { links } from './site.js';

/* The chess streak is one game a day from a fixed anchor, so the whole count
   is two numbers: where it stood on a known day, and which day that was.
   Reset both if the streak ever breaks. */
const BASE_STREAK = 523;
const BASE_DAY = Date.UTC(2026, 9, 20); // 20 Oct 2026

const DAY = 86400000;
const IST_OFFSET = 5.5 * 60 * 60 * 1000;

/**
 * The streak as of right now, counted in IST so that every visitor sees the
 * same number and it ticks over at 12:00 am India time rather than at
 * midnight wherever they happen to be.
 * @returns {number}
 */
export function chessStreak() {
	const ist = new Date(Date.now() + IST_OFFSET);
	const today = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
	return BASE_STREAK + Math.max(Math.round((today - BASE_DAY) / DAY), 0);
}

export const now = {
	heading: "What I'm doing now",

	work: {
		heading: 'Contracting as a brand and visual designer',
		body: 'Four years in, working with founders and teams who need their brand to look like it means business. Some want the whole system built from nothing. Others have a logo and no idea what to do next. Both are welcome.',
		points: [
			{
				title: ['Agency, tech, retail and fintech'],
				body: [
					"I've designed across all four, so I'm as comfortable with a product launch deck as I am with a shelf-ready package."
				]
			},
			{
				title: ['The whole design function, end to end'],
				body: [
					"At more than one company, I've been the person who owns design. Brand, marketing, product and everything in between, from first brief to final file."
				]
			},
			{
				title: ['Building with AI'],
				body: [
					"Right now I'm using AI to build things that actually ship, not just concepts that look good in a deck."
				]
			}
		],
		cta: { label: 'See everything I could make for you', href: '#services' }
	},

	asides: {
		heading: 'Away from the desk',
		items: [
			{
				title: ['Co-organising the ', { label: "Writers' Room", href: links.writersRoom }, ', BLR'],
				body: [
					'A room full of people writing together. No workshops, no critique circle, just a table and a couple of quiet hours.'
				]
			},
			{
				title: ['Learning photography'],
				body: [
					'One small camera, learning to see. A few frames live on ',
					{ label: 'Pexels', href: links.pexels },
					'.'
				]
			},
			{
				/* `{streak}` is filled in by <NowSection> on mount: the page is
				   prerendered, so a number baked in at build time would be stale. */
				title: ['A {streak}-day chess streak'],
				body: [
					'At least one game every single day, and counting. ',
					{ label: 'Challenge me on Chess.com', href: links.chess },
					'.'
				]
			}
		]
	},

	offTheClock: {
		heading: 'Off the clock',
		items: [
			{
				title: ['A Ganpati idol, every year'],
				body: ["I've sculpted one by hand for the festival every year since I was 9."]
			},
			{
				title: ['Lego, minus the instructions'],
				body: [
					'I love building Lego, but never the sets. I invent my own, mostly houses and bungalows.'
				]
			},
			{
				title: ['I paint, too'],
				body: ['A few of my paintings live on ', { label: 'Behance', href: links.artGallery }, '.']
			},
			{
				title: ['On repeat'],
				body: [
					{ label: 'Music', href: links.spotify },
					' is always on, and ',
					{ label: 'Jhol', href: links.jhol },
					' is my current favourite. Currently watching ',
					{ label: 'Ted Lasso', href: links.tedLasso },
					', and always up for a military film or documentary, especially Indian ones.'
				]
			}
		]
	}
};
