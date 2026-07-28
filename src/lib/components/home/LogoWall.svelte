<script>
	/**
	 * A row of client or community marks, each linking out.
	 * @type {{ items: Array<{ name: string, href: string, logo: string, height: number }> }}
	 */
	let { items } = $props();
</script>

<div class="wall">
	{#each items as item (item.logo)}
		<a class="wall__item" href={item.href} target="_blank" rel="noopener">
			<img
				src="/assets/logos/{item.logo}.webp"
				alt={item.name}
				style:--logo-weight={item.height}
				loading="lazy"
			/>
		</a>
	{/each}
</div>

<style>
	/* The heights in the content modules are optical weights tuned against each
	   other, not final sizes. This is the one number that scales the wall — and
	   the whole wall has to move together, or the balance between the marks is
	   lost. Both figures come from the design. */
	.wall {
		--wall-scale: 0.96;

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(34px, 5vw, 72px) clamp(40px, 6vw, 88px);
	}

	@media (max-width: 760px) {
		.wall {
			--wall-scale: 0.8;

			gap: 26px 20px;
		}
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
		height: calc(var(--logo-weight) * var(--wall-scale) * 1px);
		object-fit: contain;
	}
</style>
