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
import { site } from '../src/lib/content/site.js';
import { hero } from '../src/lib/content/hero.js';

const ROOT = process.cwd();
const FONT_DIR = join(ROOT, 'node_modules/@fontsource/lexend/files');
const OUT = join(ROOT, 'static/og.png');

// ---- brand tokens (single source of truth: the CSS :root in app.css) ------
const css = readFileSync(join(ROOT, 'src/app.css'), 'utf8');
const token = (name, fallback) => {
	const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
	return m ? m[1] : fallback;
};
const PAPER = token('paper', '#FFFFFF');
const INK = token('ink', '#283F24');
const ACCENT = token('accent', '#FFBF00');
const TEAL = token('teal', '#099078');
const MUTED = token('muted', '#6B6055');

// ---- copy (shared with the page via src/lib/content) -----------------------
const EYEBROW = `${site.role} · ${site.location}`;
const HEADLINE = hero.title.lines;
const MARK = hero.title.mark;

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
						EYEBROW
					)
				]),

				// headline — every line but the last on its own row; the last
				// line sits beside the highlighted mark word.
				el('div', { display: 'flex', flexDirection: 'column' }, [
					...HEADLINE.slice(0, -1).map((line) => el('div', { ...HEAD, display: 'flex' }, line)),
					el('div', { display: 'flex', alignItems: 'center', marginTop: 4 }, [
						el('div', { ...HEAD, display: 'flex', marginRight: 16 }, HEADLINE[HEADLINE.length - 1]),
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
							MARK
						)
					])
				]),

				// wordmark
				el('div', { display: 'flex', flexDirection: 'column' }, [
					el('div', { display: 'flex', width: 56, height: 6, background: ACCENT, borderRadius: 3 }),
					el(
						'div',
						{ display: 'flex', fontSize: 34, fontWeight: 600, color: INK, marginTop: 18 },
						site.name
					),
					el(
						'div',
						{ display: 'flex', fontSize: 18, color: MUTED, marginTop: 6 },
						site.ogDisciplines
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
