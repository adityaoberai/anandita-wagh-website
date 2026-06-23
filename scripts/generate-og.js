/* =========================================================================
   Generate the social/OG card → static/og.png (1200×630).

   Uses satori (HTML/CSS → SVG with embedded fonts, the engine behind
   @vercel/og) + @resvg/resvg-js (SVG → PNG). The Lexend font is embedded
   from @fontsource/lexend so text renders identically without relying on
   any system-installed font.

   Regenerate after changing the design:  npm run og
   ========================================================================= */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const ROOT = process.cwd();
const FONT_DIR = join(ROOT, 'node_modules/@fontsource/lexend/files');
const OUT = join(ROOT, 'static/og.png');

// ---- brand tokens (from the site) -----------------------------------------
const PAPER = '#FFFFFF';
const INK = '#283F24';
const ACCENT = '#FFBF00';
const TEAL = '#099078';
const MUTED = '#6B6055';

// ---- assets ----------------------------------------------------------------
const font = (w) => readFileSync(join(FONT_DIR, `lexend-latin-${w}-normal.woff`));
const photo =
	'data:image/png;base64,' +
	readFileSync(join(ROOT, 'static/assets/anandita.png')).toString('base64');

// ---- tiny hyperscript helper (satori wants React-element-like nodes) -------
const el = (type, style, children) => ({ type, props: { style, children } });
const img = (src, style) => ({ type: 'img', props: { src, style } });

// ---- layout ----------------------------------------------------------------
const HEAD = {
	fontSize: 70,
	fontWeight: 400,
	lineHeight: 1.02,
	letterSpacing: '-0.02em',
	color: INK
};

const tree = el(
	'div',
	{
		width: 1200,
		height: 630,
		display: 'flex',
		fontFamily: 'Lexend',
		background: PAPER,
		color: INK
	},
	[
		// ---------- left: type ----------
		el(
			'div',
			{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: 730,
				height: 630,
				padding: '66px 64px',
				boxSizing: 'border-box'
			},
			[
				// eyebrow
				el('div', { display: 'flex', alignItems: 'center', gap: 12 }, [
					el('div', { width: 14, height: 14, borderRadius: 7, background: ACCENT }),
					el(
						'div',
						{
							display: 'flex',
							fontSize: 16,
							fontWeight: 500,
							letterSpacing: '0.1em',
							textTransform: 'uppercase',
							color: MUTED,
							whiteSpace: 'nowrap'
						},
						'Brand & Graphic Designer · Bengaluru / Pune'
					)
				]),

				// headline
				el('div', { display: 'flex', flexDirection: 'column' }, [
					el('div', { ...HEAD, display: 'flex' }, 'I turn'),
					el('div', { ...HEAD, display: 'flex' }, 'businesses'),
					el('div', { display: 'flex', alignItems: 'center', marginTop: 4 }, [
						el('div', { ...HEAD, display: 'flex', marginRight: 16 }, 'into'),
						el(
							'div',
							{
								...HEAD,
								display: 'flex',
								background: ACCENT,
								color: INK,
								borderRadius: 12,
								padding: '0 16px 8px'
							},
							'brands.'
						)
					])
				]),

				// wordmark
				el('div', { display: 'flex', flexDirection: 'column' }, [
					el('div', { display: 'flex', width: 56, height: 6, background: ACCENT, borderRadius: 3 }),
					el(
						'div',
						{ display: 'flex', fontSize: 34, fontWeight: 600, color: INK, marginTop: 18 },
						'Anandita Wagh'
					),
					el(
						'div',
						{ display: 'flex', fontSize: 18, color: MUTED, marginTop: 6 },
						'Identity systems · Logos · Packaging · Web'
					)
				])
			]
		),

		// ---------- right: portrait on teal ----------
		el(
			'div',
			{
				display: 'flex',
				width: 470,
				height: 630,
				background: TEAL,
				alignItems: 'center',
				justifyContent: 'center'
			},
			[
				// portrait (no frame, no shadow)
				img(photo, {
					width: 350,
					height: 430,
					objectFit: 'cover',
					borderRadius: 14
				})
			]
		)
	]
);

// ---- render ----------------------------------------------------------------
const svg = await satori(tree, {
	width: 1200,
	height: 630,
	fonts: [
		{ name: 'Lexend', data: font(400), weight: 400, style: 'normal' },
		{ name: 'Lexend', data: font(500), weight: 500, style: 'normal' },
		{ name: 'Lexend', data: font(600), weight: 600, style: 'normal' },
		{ name: 'Lexend', data: font(700), weight: 700, style: 'normal' }
	]
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
mkdirSync(join(ROOT, 'static'), { recursive: true });
writeFileSync(OUT, png);
console.log(`✓ wrote static/og.png (${(png.length / 1024).toFixed(0)} KB, 1200×630)`);
