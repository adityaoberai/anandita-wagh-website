/* =========================================================================
   Experience timeline.
   `title` lines render stacked (joined with line breaks). Dates are stored
   as structured start/end values with month enums so they can be formatted
   consistently in one place.
   ========================================================================= */
export const MONTHS = Object.freeze({
	JAN: 'Jan',
	FEB: 'Feb',
	MAR: 'Mar',
	APR: 'Apr',
	MAY: 'May',
	JUN: 'Jun',
	JUL: 'Jul',
	AUG: 'Aug',
	SEP: 'Sep',
	OCT: 'Oct',
	NOV: 'Nov',
	DEC: 'Dec'
});

export const formatPeriod = (start, end) => `${start.month} ${start.year} — ${end.month} ${end.year}`;

export const experience = {
	eyebrow: '(04) Experience',
	title: ["Where I've", 'worked'],
	sub: 'B.Des. Product Design + Minor in Digital Marketing, UPES · Batch Champion 2024.',
	items: [
		{
			start: { month: MONTHS.APR, year: 2025 },
			end: { month: MONTHS.APR, year: 2026 },
			org: 'E2E Networks',
			role: 'Graphic & Visual Designer',
			desc: 'Sole designer owning the function end to end — branding, event collateral, websites and on-demand work. Built a company-wide design repository for 250+ employees and introduced motion into social, lifting engagement.'
		},
		{
			start: { month: MONTHS.AUG, year: 2024 },
			end: { month: MONTHS.JAN, year: 2025 },
			org: 'IKEA',
			role: 'Visual Merchandiser & Store Designer',
			desc: 'Curated 20+ media displays and inspiration points, aligning them with stock, customer behaviour and sales goals across department layouts and store rebuilds.'
		},
		{
			start: { month: MONTHS.JAN, year: 2024 },
			end: { month: MONTHS.JUN, year: 2024 },
			org: 'Hettich India',
			role: 'Furniture & Print Design Intern',
			desc: 'Concept design for Generation-Alpha furniture (2030+) integrating Hettich fittings, and curating the Ideabooks featured on their website.'
		},
		{
			start: { month: MONTHS.JAN, year: 2022 },
			end: { month: MONTHS.DEC, year: 2023 },
			org: 'Earlier',
			role: 'Design Directions · Vucaware · Kyitsel-ling',
			desc: 'Industrial design (product form & prototyping), logo & brand identity for Vucaware and Trueselfy, and a Silver-Jubilee coffee-table book.'
		}
	]
};
