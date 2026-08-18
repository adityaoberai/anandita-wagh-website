/* =========================================================================
   Selected projects.

   `cover` is the artwork on the card. Until a real cover image exists the
   card falls back to a typographic plate built from `name` — set `cover` to
   a path under static/ to replace it.

   Covers are letterboxed rather than cropped, so `coverBg` is the colour the
   frame shows around them. Match it to the artwork's own ground and the seam
   disappears. Export 1600×800 (2:1); the frame is ~2:1 on desktop and ~1.5:1
   on mobile, so keep anything that matters in the middle 75% horizontally.
   ========================================================================= */

export const projects = {
	heading: 'Selected projects',
	items: [
		{
			name: "The Writers' Room",
			blurb:
				'A newspaper-styled case study for a Bengaluru writing meetup, covering its brand, website, and print design.',
			href: 'https://thewritersroom.club',
			cta: 'Visit the site ↗',
			cover: '/assets/projects/the-writers-room.webp',
			coverBg: '#B8B6B6'
		},
		{
			name: 'Graphic & visual design portfolio',
			blurb: 'Print, packaging, campaign and event work. The range, in one place.',
			href: 'https://www.behance.net/gallery/219592683/Graphic-and-Visual-Design-Portfolio',
			cta: 'View on Behance ↗',
			cover: '/assets/projects/graphic-visual-portfolio.webp',
			coverBg: '#FFFFFF'
		},
		{
			name: 'Sovereign Cloud Platform',
			blurb:
				'Logo, brand system, information architecture and the full website, designed and shipped in six weeks.',
			href: 'https://www.behance.net/gallery/247257791/Brand-and-Website-Design-for-SCP-Part-1?platform=direct',
			cta: 'View on Behance ↗',
			cover: '/assets/projects/sovereign-cloud-platform.webp',
			coverBg: '#05070D'
		}
	]
};
