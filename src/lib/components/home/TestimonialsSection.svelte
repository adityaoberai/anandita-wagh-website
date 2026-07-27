<script>
	import { onMount } from 'svelte';
	import { testimonials } from '$lib/content/index.js';

	const { items, interval } = testimonials;

	let index = $state(0);
	let playing = $state(true);

	const current = $derived(items[index]);

	/* Any deliberate move stops the carousel — once someone has taken hold of
	   it, having it slide out from under them is the wrong answer. */
	function go(to) {
		index = (to + items.length) % items.length;
		playing = false;
	}

	onMount(() => {
		// Auto-advancing content is motion; leave it parked if that's the
		// stated preference. The controls still work.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) playing = false;
	});

	$effect(() => {
		if (!playing) return;
		const timer = setInterval(() => {
			index = (index + 1) % items.length;
		}, interval * 1000);
		return () => clearInterval(timer);
	});
</script>

<section id="words" class="section section--dark">
	<div class="section__inner words__inner">
		<div class="words__head">
			<h2 class="section__title">{testimonials.heading}</h2>

			<div class="controls">
				<button type="button" onclick={() => go(index - 1)} aria-label="Previous testimonial">
					←
				</button>
				<button type="button" onclick={() => go(index + 1)} aria-label="Next testimonial">
					→
				</button>
				<button
					type="button"
					class="controls__play"
					onclick={() => (playing = !playing)}
					aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}
				>
					{#if playing}
						<span>❙❙</span>
					{:else}
						<span class="controls__glyph--nudged">▶</span>
					{/if}
				</button>
			</div>
		</div>

		<blockquote class="quote">
			<p class="quote__text">“{current.quote}”</p>
			<footer class="quote__by">
				<a href={current.href} target="_blank" rel="noopener">{current.author} ↗</a>
				<span class="quote__role">{current.role}</span>
			</footer>
		</blockquote>

		<div class="dots">
			{#each items as item, i (item.author)}
				<button
					type="button"
					class="dots__dot"
					class:is-current={i === index}
					onclick={() => go(i)}
					aria-label="Go to testimonial {i + 1}"
					aria-current={i === index}
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.words__inner {
		max-width: 960px;
	}

	.words__head {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		margin-bottom: clamp(28px, 4vw, 44px);
	}

	.controls {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.controls button {
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		padding: 0;
		border: 2px solid var(--cream);
		border-radius: 50%;
		background: transparent;
		color: var(--cream);
		font-size: 18px;
		line-height: 1;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.controls button:hover {
		background: var(--yellow);
		border-color: var(--yellow);
		color: var(--ink);
	}

	.controls__play {
		border-color: var(--yellow);
		color: var(--yellow);
		font-size: 14px;
	}

	/* The triangle's own whitespace throws it left of centre. */
	.controls__glyph--nudged {
		display: block;
		transform: translateX(1.5px);
	}

	.quote {
		display: flex;
		flex-direction: column;
		gap: 22px;
		/* Held tall enough that swapping quotes doesn't shift the page, but
		   free to grow rather than clip the longest one. */
		min-height: clamp(340px, 30vw, 360px);
		padding: clamp(24px, 4vw, 48px);
		border: 2px solid var(--cream);
		border-radius: 24px;
		background: rgba(251, 247, 239, 0.04);
	}

	.quote__text {
		flex: 1;
		font-family: var(--display);
		font-weight: 400;
		font-size: clamp(18px, 2.4vw, 26px);
		line-height: 1.45;
		letter-spacing: -0.01em;
		text-wrap: pretty;
	}

	.quote__by {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.quote__by a {
		color: var(--yellow);
		font-weight: 600;
		font-size: clamp(15px, 1.7vw, 18px);
		text-decoration: none;
	}

	.quote__by a:hover {
		text-decoration: underline;
		text-decoration-color: var(--yellow);
	}

	.quote__role {
		font-size: 15px;
		color: rgba(251, 247, 239, 0.7);
	}

	.dots {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-top: 22px;
	}

	.dots__dot {
		width: 14px;
		height: 14px;
		padding: 0;
		border: 2px solid var(--cream);
		border-radius: 50%;
		background: transparent;
		transition: background 0.2s ease;
	}

	.dots__dot.is-current {
		background: var(--yellow);
	}
</style>
