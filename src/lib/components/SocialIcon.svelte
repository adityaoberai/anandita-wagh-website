<script>
	import { socialIcons } from '$lib/social-icons.js';

	/**
	 * One social glyph, drawn in the current text colour.
	 * @type {{ name: string, size: number }}
	 */
	let { name, size } = $props();

	const icon = $derived(socialIcons[name]);
</script>

<svg viewBox={icon.viewBox} width={size} height={size} fill="currentColor" aria-hidden="true">
	<path d={icon.path} />
</svg>
