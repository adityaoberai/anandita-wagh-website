/* =========================================================================
   Hero section.
   `title` is structured (not raw HTML) so it can be rendered both in the page
   and on the OG card: every line except the last renders on its own row, and
   the last line sits next to the highlighted `mark` word.
   The eyebrow (role · location) is derived from site.js, not stored here.
   ========================================================================= */
const behancePortfolioUrl = 'https://www.behance.net/gallery/219592683/Graphic-and-Visual-Design-Portfolio';

export const hero = {
	title: {
		lines: ['I turn', 'businesses', 'into'],
		mark: 'brands.'
	},
	lede: 'Four years shaping how brands look, feel and communicate — from logos and identity systems to the visual language that holds a brand together across every platform.',
	actions: [
		{ label: 'View portfolio on Behance', href: behancePortfolioUrl, variant: 'solid', icon: '↗' },
		{ label: 'Get in touch', href: '#contact', variant: 'text' }
	]
};
