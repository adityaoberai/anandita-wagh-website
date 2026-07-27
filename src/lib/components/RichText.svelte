<script>
	/**
	 * Renders a run of copy that carries inline links. Each part is either a
	 * plain string (text) or `{ label, href }` (an anchor). Content modules use
	 * this instead of embedding markup in the copy.
	 * @type {{ parts: Array<string | { label: string, href: string }> }}
	 */
	let { parts } = $props();
</script>

<!-- prettier-ignore -->
{#each parts as part, i (i)}{#if typeof part === 'string'}{part}{:else}<a href={part.href} target="_blank" rel="noopener">{part.label}</a>{/if}{/each}
