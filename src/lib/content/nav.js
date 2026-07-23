/* Primary navigation — section links plus the highlighted CTA. */
const behancePortfolioUrl = 'https://www.behance.net/gallery/219592683/Graphic-and-Visual-Design-Portfolio';

export const nav = {
	links: [
		{ label: 'Work', href: behancePortfolioUrl, external: true },
		{ label: 'About', href: '#about' },
		{ label: 'Experience', href: '#experience' }
	],
	cta: { label: "Let's talk", href: '#contact' }
};
