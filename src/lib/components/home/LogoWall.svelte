<script>
	/**
	 * A row of client or community marks, each linking out.
	 * @type {{ items: Array<{ name: string, href: string, logo: string, height: number }> }}
	 */
	let { items } = $props();

	/* The heights in the content modules are optical weights tuned against each
	   other, not final sizes. This is the one number that scales the wall. */
	const SCALE = 1.2;
</script>

<div class="wall">
	{#each items as item (item.logo)}
		<a class="wall__item" href={item.href} target="_blank" rel="noopener">
			<img
				src="/assets/logos/{item.logo}.webp"
				alt={item.name}
				style:height="{Math.round(item.height * SCALE)}px"
				loading="lazy"
			/>
		</a>
	{/each}
</div>

<style>
	.wall {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(34px, 5vw, 72px) clamp(40px, 6vw, 88px);
	}

	.wall__item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		opacity: 0.9;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.wall__item:hover {
		opacity: 1;
		transform: translateY(-3px);
	}

	.wall__item img {
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}
</style>
