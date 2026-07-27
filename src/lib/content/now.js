/* =========================================================================
   "What I'm doing now" — the current state of things, work and otherwise.
   The freelance card is the wide one; `asides` fills the narrow column.

   Runs of text that carry an inline link are written as arrays: a plain
   string is text, an object is an anchor. <RichText> renders either.
   ========================================================================= */

import { links } from './site.js';

export const now = {
	heading: "What I'm doing now",

	work: {
		heading: 'Freelancing as a graphic and brand designer',
		body: 'Four years in, working with founders and teams who need their brand to look like it means business. Some want the whole system built from nothing. Others have a logo and no idea what to do next. Both are welcome.',
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
			}
		]
	}
};
