/* =========================================================================
   Footer. The link columns themselves live in site.js, next to the profile
   URLs they point at.
   ========================================================================= */

import { site } from './site.js';

export const footer = {
	heading: ["Let's make something", 'that feels like you.'],
	columns: site.footerColumns,
	colophon: `${site.location} · © ${site.copyrightYear} ${site.name}`
};
