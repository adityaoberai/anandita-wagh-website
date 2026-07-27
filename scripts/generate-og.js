/* =========================================================================
   Generate the social/OG card → static/og.png (1200×630).

   Uses satori (HTML/CSS → SVG with embedded fonts, the engine behind
   @vercel/og) + @resvg/resvg-js (SVG → PNG). Fonts are embedded from the
   @fontsource packages so the card renders identically wherever it's built,
   with no dependency on an installed system font.

   Regenerate after changing the design:  npm run og
   ========================================================================= */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../src/lib/content/site.js';
import { hero } from '../src/lib/content/hero.js';

const ROOT = process.cwd();
const OUT = join(ROOT, 'static/og.png');

// ---- brand tokens (single source of truth: the CSS :root in app.css) ------
const css = readFileSync(join(ROOT, 'src/app.css'), 'utf8');
const token = (name, fallback) => {
	const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
	return match ? match[1] : fallback;
};
const YELLOW = token('yellow', '#ffce1f');
const YELLOW_DEEP = token('yellow-deep', '#f2b705');
const INK = token('ink', '#191510');
const MUTED = token('muted', '#3b342a');

// ---- assets ----------------------------------------------------------------
const font = (family, weight) =>
	readFileSync(
		join(ROOT, `node_modules/@fontsource/${family}/files/${family}-latin-${weight}-normal.woff`)
	);

// resvg rasterises PNG and JPEG inside an SVG, not WebP — so the shipped
// portrait is decoded back to PNG for the card.
const portrait =
	'data:image/png;base64,' +
	(
		await sharp(join(ROOT, 'static', hero.photos.formal.src.replace(/^\//, '')))
			.resize({ height: 620, fit: 'inside' })
			.png()
			.toBuffer()
	).toString('base64');

// ---- tiny hyperscript helper (satori wants React-element-like nodes) -------
const el = (type, style, children) => ({ type, props: { style, children } });

// ---- layout ----------------------------------------------------------------
const tree = el(
	'div',
	{
		width: 1200,
		height: 630,
		display: 'flex',
		position: 'relative',
		overflow: 'hidden',
		background: YELLOW,
		color: INK,
		fontFamily: 'Instrument Sans'
	},
	[
		// The name set huge and tone-on-tone, as it is on the page itself.
		el(
			'div',
			{
				position: 'absolute',
				top: 96,
				left: -18,
				display: 'flex',
				flexDirection: 'column',
				fontFamily: 'Bricolage Grotesque',
				fontWeight: 800,
				fontSize: 178,
				lineHeight: 0.84,
				letterSpacing: '-0.05em',
				color: YELLOW_DEEP
			},
			hero.wordmark.map((line) => el('div', { display: 'flex' }, line))
		),

		// Portrait, bottom-anchored on the right.
		el(
			'div',
			{
				position: 'absolute',
				right: 40,
				bottom: 0,
				display: 'flex',
				alignItems: 'flex-end'
			},
			[{ type: 'img', props: { src: portrait, style: { height: 620 } } }]
		),

		// Name and disciplines, over the top on the left.
		el(
			'div',
			{
				position: 'absolute',
				left: 64,
				bottom: 56,
				display: 'flex',
				flexDirection: 'column'
			},
			[
				el('div', { display: 'flex', width: 64, height: 7, background: INK, borderRadius: 4 }),
				el(
					'div',
					{
						display: 'flex',
						marginTop: 20,
						fontFamily: 'Bricolage Grotesque',
						fontWeight: 800,
						fontSize: 52,
						letterSpacing: '-0.03em'
					},
					site.name
				),
				el('div', { display: 'flex', marginTop: 10, fontSize: 25, fontWeight: 500 }, site.role),
				el('div', { display: 'flex', marginTop: 6, fontSize: 19, color: MUTED }, site.ogDisciplines)
			]
		)
	]
);

// ---- render ----------------------------------------------------------------
const svg = await satori(tree, {
	width: 1200,
	height: 630,
	fonts: [
		{ name: 'Bricolage Grotesque', data: font('bricolage-grotesque', 600), weight: 600 },
		{ name: 'Bricolage Grotesque', data: font('bricolage-grotesque', 800), weight: 800 },
		{ name: 'Instrument Sans', data: font('instrument-sans', 400), weight: 400 },
		{ name: 'Instrument Sans', data: font('instrument-sans', 500), weight: 500 }
	]
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
mkdirSync(join(ROOT, 'static'), { recursive: true });
writeFileSync(OUT, png);
console.log(`✓ wrote static/og.png (${(png.length / 1024).toFixed(0)} KB, 1200×630)`);
