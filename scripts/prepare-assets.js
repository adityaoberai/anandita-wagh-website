/* =========================================================================
   Turn the raw design exports into the web assets the site ships.

   The originals are square print-resolution canvases with the artwork
   floating in a lot of transparent padding. The page positions logos by
   optical height, so each mark has to be cropped tight to its ink or the
   heights in src/lib/content/*.js mean nothing. This crops every source to
   its subject, scales it to something sane for the web, and writes WebP
   (alpha intact, a fraction of the weight of the source PNGs).

   Sources live outside the repo — they are design exports, not code. Point
   ASSET_SRC at the folder holding them:

     ASSET_SRC="$HOME/Downloads/Personal Website" npm run assets

   Re-run whenever a logo is added or replaced.
   ========================================================================= */

import { mkdirSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.env.ASSET_SRC || join(process.env.HOME, 'Downloads', 'Personal Website');
const OUT = join(ROOT, 'static', 'assets');

const PHOTOS = 'My Photos';
const ICONS = 'Social Media Icons';
const LOGOS = 'Company and Volunteering Logos PNGs';

// Logos are never drawn taller than ~110 CSS px; this leaves headroom for 2x.
const LOGO_BOX = { width: 900, height: 320 };
// The hero photo caps at 900 CSS px wide, so this covers it on a 1.33x screen
// and degrades gracefully above that. Going higher costs more than it shows.
const HERO_BOX = { width: 1200, height: 1200 };

/**
 * @typedef {object} Job
 * @property {string} from    source path, relative to ASSET_SRC unless absolute
 * @property {string} to      output path, relative to static/assets
 * @property {{ width: number, height: number }} [box]  bounds to fit within
 * @property {number} [quality]
 * @property {boolean} [clear]  knock a flat white plate out to transparency
 */

/** @type {Job[]} */
const JOBS = [
	// Hero portraits. Cropped to the subject and drawn bottom-anchored, so the
	// two crops don't need to match — the page contains them in a shared box.
	{ from: `${ICONS}/Formal Photo.png`, to: 'hero/formal.webp', box: HERO_BOX, quality: 82 },
	{ from: `${PHOTOS}/Casual Photo.png`, to: 'hero/casual.webp', box: HERO_BOX, quality: 82 },

	// Companies.
	{ from: `${LOGOS}/IKEA.png`, to: 'logos/ikea.webp' },
	{ from: `${LOGOS}/E2E Networks.png`, to: 'logos/e2e-networks.webp' },
	{ from: `${LOGOS}/Hettich.png`, to: 'logos/hettich.webp' },
	{ from: `${LOGOS}/Auctor Labs.png`, to: 'logos/auctor-labs.webp' },
	{ from: `${LOGOS}/FineVision.png`, to: 'logos/finevision.webp' },
	{ from: `${LOGOS}/Rejoice.png`, to: 'logos/rejoice.webp' },
	{ from: `${LOGOS}/Vucaware.png`, to: 'logos/vucaware.webp' },
	{
		from: join(process.env.HOME, 'Downloads', 'ajit kumbhar badminton academy logo - 46 1.png'),
		to: 'logos/ajeet-kumbhar-badminton-academy.webp'
	},
	{ from: `${LOGOS}/Kyistel-ling.png`, to: 'logos/kyitsel-ling.webp' },
	{ from: `${LOGOS}/Hirali Foundation.png`, to: 'logos/hirali-foundation.webp' },
	{ from: `${LOGOS}/Pinnacle.png`, to: 'logos/pinnacle-media.webp' },
	{ from: `${LOGOS}/Design Directions.png`, to: 'logos/design-directions.webp' },

	// Communities. IxDF and AIESEC ship on a white plate that has to come out,
	// or they sit as bright rectangles on the cream section.
	{ from: `${LOGOS}/IxDF.png`, to: 'logos/ixdf-pune.webp', clear: true },
	{ from: `${LOGOS}/NSS.png`, to: 'logos/nss.webp' },
	{ from: `${LOGOS}/AIESEC.png`, to: 'logos/aiesec.webp', clear: true },
	{ from: `${LOGOS}/The Writers' Room.png`, to: 'logos/the-writers-room.webp' },
	{ from: `${LOGOS}/DevRelCon.png`, to: 'logos/devrelcon.webp' },
	{ from: `${LOGOS}/UHackathon 4.0 META.png`, to: 'logos/uhackathon-4-meta.webp' }
];

/**
 * Replace a flat light background with transparency. Pixels at or above
 * `cutoff` on every channel go fully clear; the band just below is feathered
 * so the mark keeps a clean edge instead of a hard staircase.
 * @param {sharp.Sharp} image
 * @returns {Promise<sharp.Sharp>}
 */
async function knockOutWhite(image, cutoff = 244, feather = 26) {
	const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

	for (let i = 0; i < data.length; i += 4) {
		if (data[i + 3] === 0) continue;
		const min = Math.min(data[i], data[i + 1], data[i + 2]);
		if (min >= cutoff) data[i + 3] = 0;
		else if (min > cutoff - feather) {
			data[i + 3] = Math.round((data[i + 3] * (cutoff - min)) / feather);
		}
	}

	return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

let failures = 0;

for (const job of JOBS) {
	const from = job.from.startsWith('/') ? job.from : join(SRC, job.from);
	const to = join(OUT, job.to);
	const box = job.box ?? LOGO_BOX;

	try {
		const source = sharp(from).ensureAlpha();
		const { width, height } = await source.metadata();

		const cropped = job.clear ? await knockOutWhite(source) : source;
		mkdirSync(dirname(to), { recursive: true });

		const info = await cropped
			// threshold 10 ignores the near-invisible halo some exports carry
			.trim({ background: '#00000000', threshold: 10 })
			.resize({ ...box, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: job.quality ?? 88, alphaQuality: 100, effort: 6 })
			.toFile(to);

		const kb = Math.round(statSync(to).size / 1024);
		console.log(
			`✓ ${job.to.padEnd(44)} ${`${width}×${height}`.padStart(9)} → ` +
				`${`${info.width}×${info.height}`.padStart(9)}  ${String(kb).padStart(4)} KB`
		);
	} catch (error) {
		console.error(`✗ ${job.to}  ${basename(from)}: ${error.message}`);
		failures++;
	}
}

if (failures) {
	console.error(`\n${failures} asset(s) failed. Is ASSET_SRC right? (${SRC})`);
	process.exit(1);
}
