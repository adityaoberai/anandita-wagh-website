/* =========================================================================
   "Let's work together" — the offer, in four parts: the pitch, how a project
   runs, what's actually for sale, and who it suits.
   ========================================================================= */

import { site } from './site.js';

export const services = {
	heading: ["Let's work", 'together'],
	standfirst:
		'A studio of one. You get the range of an agency: identity, digital, print, packaging, events, and the attention of a single designer who stays on your project from the first call to the last file.',

	process: {
		heading: 'How working with me goes',
		steps: [
			{ no: '01', name: 'Brief and audit' },
			{ no: '02', name: 'Direction' },
			{ no: '03', name: 'Build the system' },
			{ no: '04', name: 'Rollout and handoff' }
		],
		terms: [
			'Scope, price and timeline agreed before anything starts.',
			'You talk to the person doing the work. Always.',
			'Every file and font is yours at the end.'
		]
	},

	engagements: {
		heading: 'What I make',
		items: [
			{
				no: '01',
				name: 'Brand identity',
				what: 'The whole visual world of the business, built from the positioning up.',
				items: [
					'Logo and wordmark design',
					'Type, colour and layout system',
					'Rebrands and identity refreshes',
					'Packaging and label design',
					'Brochures, flyers and stationery',
					'Merch, stickers and signage',
					'Illustration and iconography',
					'Guideline document your team can use'
				],
				price: 'On request',
				unit: 'per project'
			},
			{
				no: '02',
				name: 'Websites',
				what: 'Every screen designed and organised, handed off ready to build.',
				items: [
					'Sitemap and page structure',
					'Landing pages and full sites',
					'Desktop and mobile design',
					'Components, states and interactions',
					'Developer handoff files'
				],
				price: 'On request',
				unit: 'per project'
			},
			{
				no: '03',
				name: 'Design partner',
				what: 'A studio on call for teams that ship constantly.',
				items: [
					'A set number of requests a month',
					'Social templates and campaign creatives',
					'Pitch, investor and sales decks',
					'Event, booth and exhibition design',
					'Motion graphics and animated posts',
					'Rolling turnaround, no re-briefing'
				],
				price: 'On request',
				unit: 'per month'
			}
		]
	},

	audience: {
		heading: "Who it's for",
		groups: [
			{
				name: 'Starting from scratch',
				items: [
					'Startups naming and launching something new',
					'Founders building a personal brand',
					'Anyone with a good idea and a bad logo'
				]
			},
			{
				name: 'Ready to look the part',
				items: [
					'Family businesses stepping up',
					'Shops, cafes, studios and clinics',
					'Schools, academies and institutes',
					'NGOs, foundations and community projects'
				]
			},
			{
				name: 'Need a designer on the team',
				items: [
					'Marketing teams hiring for a season, not a headcount',
					'Agencies with overflow work',
					'Creators, writers and photographers'
				]
			}
		]
	},

	cta: {
		heading: "Tell me what you're building.",
		body: "Send a line about the project and the deadline. Let's take it ahead from there.",
		label: 'Start a project ↗',
		href: `mailto:${site.email}?subject=${encodeURIComponent('Project enquiry')}`
	}
};
