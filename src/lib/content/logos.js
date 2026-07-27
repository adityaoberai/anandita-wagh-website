/* =========================================================================
   The two logo walls.

   `height` is an optical weight, not a measurement: a wordmark and a round
   crest at the same pixel height do not read at the same size, so each mark
   is set to the height that makes it carry the same visual weight as its
   neighbours. <LogoWall> scales the whole set from these numbers, so nudge
   one to rebalance a single mark and the wall's scale to move all of them.

   The files are cropped tight to their ink by `npm run assets` — these
   heights assume no transparent padding.
   ========================================================================= */

export const companies = {
	heading: "Companies I've worked with",
	standfirst: 'In-house, on contract, and freelance.',
	items: [
		{ name: 'IKEA', href: 'https://www.ikea.com/in/en/', logo: 'ikea', height: 47 },
		{
			name: 'E2E Networks',
			href: 'https://www.e2enetworks.com/',
			logo: 'e2e-networks',
			height: 31
		},
		{ name: 'Hettich', href: 'https://www.hettich.com/en-in/home', logo: 'hettich', height: 66 },
		{ name: 'Auctor Labs', href: 'https://www.auctorlabs.in/', logo: 'auctor-labs', height: 32 },
		{ name: 'FineVision', href: 'https://www.thefinevision.com/', logo: 'finevision', height: 30 },
		{
			name: 'Rejoice Speech and Hearing Clinic',
			href: 'https://www.rejoicespeechandhearingclinic.in/',
			logo: 'rejoice',
			height: 59
		},
		{ name: 'Vucaware', href: 'https://www.vucaware.com/', logo: 'vucaware', height: 39 },
		{
			name: 'Ajeet Kumbhar Badminton Academy',
			href: 'https://www.akbaofficial.in/',
			logo: 'ajeet-kumbhar-badminton-academy',
			height: 85
		},
		{ name: 'Kyitsel-ling', href: 'https://www.kyitseling.org/', logo: 'kyitsel-ling', height: 76 },
		{
			name: 'Hirali Foundation',
			href: 'https://www.linkedin.com/company/hiralifoundation',
			logo: 'hirali-foundation',
			height: 76
		},
		{
			name: 'Pinnacle Media',
			href: 'https://www.thepinnacle.media/',
			logo: 'pinnacle-media',
			height: 24
		},
		{
			name: 'Design Directions',
			href: 'https://www.designdirections.net/',
			logo: 'design-directions',
			height: 19
		}
	]
};

export const communities = {
	heading: 'Events & communities',
	standfirst: "Rooms I've helped build, designed for, or run.",
	items: [
		{ name: 'IxDF Pune', href: 'https://ixdf.org/?r=anandita-wagh', logo: 'ixdf-pune', height: 53 },
		{ name: 'NSS', href: 'https://www.linkedin.com/company/nssupes', logo: 'nss', height: 83 },
		{ name: 'AIESEC', href: 'https://aiesec.org/', logo: 'aiesec', height: 31 },
		{
			name: "The Writers' Room, Bangalore",
			href: 'https://thewritersroom.club/',
			logo: 'the-writers-room',
			height: 63
		},
		{
			name: 'DevRelCon Bangalore 2024',
			href: 'https://blr24.devrelcon.dev/',
			logo: 'devrelcon',
			height: 90
		},
		{
			name: 'UHackathon 4.0 META',
			href: 'https://www.linkedin.com/company/upes-hackathon',
			logo: 'uhackathon-4-meta',
			height: 39
		}
	],

	// The yellow card under the community wall.
	offer: {
		heading: "I lead the IxDF Pune chapter and here's three free months for you",
		body: 'Sign up through my link and you get three months of an Interaction Design Foundation membership, free. Courses, community, the whole library.',
		cta: { label: 'Claim three free months →', href: 'https://ixdf.org/?r=anandita-wagh' }
	}
};
