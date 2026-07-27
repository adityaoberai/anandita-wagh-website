/* =========================================================================
   Site-wide identity, links and metadata.
   Cross-cutting content used by the nav, the page <head>, the footer and the
   OG card generator (scripts/generate-og.js). Keep this free of Svelte/
   SvelteKit imports so the Node OG script can import it directly.
   ========================================================================= */

const email = 'ananditawagh@gmail.com';

/** Every profile, keyed by its glyph in $lib/social-icons.js where it has one. */
export const links = {
	linkedin: 'https://www.linkedin.com/in/ananditawagh/',
	behance: 'https://www.behance.net/ananditawagh',
	instagram: 'https://www.instagram.com/happydita.life',
	x: 'https://x.com/ananditawagh',
	substack: 'https://substack.com/@ananditawagh',
	pexels: 'https://www.pexels.com/@ananditawagh/gallery/',
	github: 'https://github.com/ananditawagh',
	spotify: 'https://open.spotify.com/user/d5sx1wo9hn2mo485anij19mhv?si=acfba678a66940ac',
	gmail: `mailto:${email}`,
	ixdf: 'https://ixdf.org/?r=anandita-wagh',
	writersRoom: 'https://thewritersroom.club/'
};

export const site = {
	name: 'Anandita Wagh',
	role: 'Graphic & Brand Designer',
	location: 'Bangalore, India',

	email,
	links,

	resume: {
		href: '/assets/anandita-wagh-resume.pdf',
		filename: 'Anandita-Wagh-Resume.pdf'
	},

	// Long description for search engines (<meta name="description">).
	metaDescription:
		'Anandita Wagh, graphic and brand designer in Bangalore. Four years building identity systems, websites, packaging and campaign work for founders and teams who need their brand to look like it means business.',

	// Shorter description for social cards (Open Graph / Twitter).
	socialDescription:
		'A studio of one. Identity, digital, print, packaging and events, with the attention of a single designer from the first call to the last file.',

	// Subtitle under the wordmark on the OG card.
	ogDisciplines: 'Brand identity · Websites · Packaging · Events',

	// Year shown in the footer colophon.
	copyrightYear: 2026,

	/**
	 * The nav's icon row. `weight` is a per-glyph optical correction: the marks
	 * carry very different amounts of ink at the same box size, so each is
	 * nudged so the row reads as one even rhythm rather than nine equal squares.
	 */
	social: [
		{ key: 'linkedin', href: links.linkedin, weight: 0.94 },
		{ key: 'behance', href: links.behance, weight: 1.02 },
		{ key: 'instagram', href: links.instagram, weight: 1 },
		{ key: 'x', href: links.x, weight: 0.9 },
		{ key: 'substack', href: links.substack, weight: 0.9 },
		{ key: 'pexels', href: links.pexels, weight: 1 },
		{ key: 'github', href: links.github, weight: 1.04 },
		{ key: 'spotify', href: links.spotify, weight: 1.06 },
		{ key: 'gmail', href: links.gmail, weight: 1 }
	],

	/** Footer link columns, in the order they're laid out. */
	footerColumns: [
		[
			{ label: 'LinkedIn', href: links.linkedin },
			{ label: 'Behance', href: links.behance },
			{ label: 'Instagram', href: links.instagram },
			{ label: 'X (Twitter)', href: links.x },
			{ label: 'Substack', href: links.substack }
		],
		[
			{ label: 'GitHub', href: links.github },
			{ label: 'Pexels', href: links.pexels },
			{ label: 'Spotify', href: links.spotify },
			{ label: '3 free months of IxDF', href: links.ixdf },
			{ label: 'Resume (PDF)', href: '/assets/anandita-wagh-resume.pdf', download: true }
		]
	]
};
