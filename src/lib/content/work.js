/* =========================================================================
   Selected work cards.
   - `category` is the tag shown over the placeholder tile.
   - `meta` is the small label next to the title; `accent` highlights it.
   - `image` is optional: set it to a path under /static (e.g. '/assets/foo.jpg')
     to show a real image instead of the placeholder tile.
   The "Full portfolio" link uses site.behanceUrl.
   ========================================================================= */
export const work = {
	eyebrow: '(03) Work',
	title: 'Selected work',
	items: [
		{
			category: 'Brand & Web',
			name: 'Sovereign Cloud Platform',
			meta: 'E2E · 2025',
			accent: false,
			desc: 'End-to-end website, logo, branding, information architecture, Figma design and launch in 1.5 months.'
		},
		{
			category: 'Identity',
			name: 'E2E Networks Brand System',
			meta: 'Identity · 2025',
			accent: false,
			desc: 'Logos, brand guides and press kits for the core brand plus 4 product sub-brands, consistent across every touchpoint.'
		},
		{
			category: 'Product',
			name: 'Rhythm, Breathing Device',
			meta: 'Patent',
			accent: true,
			desc: "A breathing-guidance device. Patent awaited, copyrighted 2024, Viewer's Choice runner-up at India HCI 2023."
		},
		{
			category: 'Event',
			name: 'DevRelCon Bengaluru',
			meta: 'Event · 2024',
			accent: false,
			desc: 'Full visual and print identity for the conference — signage, collateral and on-site materials.'
		}
	]
};
