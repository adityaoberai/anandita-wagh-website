/* =========================================================================
   Site-wide identity, contact and metadata.
   Cross-cutting content used by the page <head>, the footer and the OG card
   generator (scripts/generate-og.js). Keep this free of Svelte/SvelteKit
   imports so the Node OG script can import it directly.
   ========================================================================= */

const email = 'ananditawagh@gmail.com';
const behanceUrl = 'https://www.behance.net/gallery/219592683/Graphic-and-Visual-Design-Portfolio';
const linkedinUrl = 'https://linkedin.com/in/ananditawagh';

export const site = {
	name: 'Anandita Wagh',
	role: 'Brand & Graphic Designer',
	location: 'Bengaluru',

	email,
	behanceUrl,
	linkedinUrl,

	// Long description for search engines (<meta name="description">).
	metaDescription:
		'Anandita Wagh — Brand & Graphic Designer based in Bengaluru / Pune. Four years shaping how brands look, feel and communicate, from identity systems to the screens that hold them together.',

	// Shorter description for social cards (Open Graph / Twitter).
	socialDescription:
		'I turn businesses into brands. Identity systems, logos and the visual language that holds a brand together across every platform.',

	// Subtitle under the wordmark on the OG card.
	ogDisciplines: 'Identity systems · Logos · Packaging · Web',

	// Year shown in the footer copyright line.
	copyrightYear: 2026,

	// Portrait used in the hero and on the OG card.
	portrait: '/assets/anandita.png',

	// Footer social row (order preserved). `external` adds target/rel for
	// links that open off-site.
	social: [
		{ label: 'LinkedIn', href: linkedinUrl, external: true },
		{ label: 'Behance', href: behanceUrl, external: true },
		{ label: 'Email', href: `mailto:${email}` }
	]
};
