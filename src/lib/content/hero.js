/* =========================================================================
   Hero section.
   `title` is structured (not raw HTML) so it can be rendered both in the page
   and on the OG card: every line except the last renders on its own row, and
   the last line sits next to the highlighted `mark` word.
   The eyebrow (role · location) is derived from site.js, not stored here.
   ========================================================================= */
export const hero = {
	title: {
		lines: ['I turn', 'businesses', 'into'],
		mark: 'brands.'
	},
	lede: 'Four years shaping how brands look, feel and communicate — from logos and identity systems to the visual language that holds a brand together across every platform.',
	actions: [
		{ label: 'View selected work', href: '#work', variant: 'solid', icon: '↓' },
		{ label: 'Get in touch', href: '#contact', variant: 'text' }
	]
};
