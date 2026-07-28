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
		<h2 class="section__title words__title">{testimonials.heading}</h2>

		<!-- One control row, placed beside the heading on desktop and under the
		     dots on mobile. Moved by grid placement rather than rendered twice,
		     so the buttons stay single in the tab order either way. -->
		<div class="controls">
			<button type="button" onclick={() => go(index - 1)} aria-label="Previous testimonial"
				>←</button
			>
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
			<button type="button" onclick={() => go(index + 1)} aria-label="Next testimonial">→</button>
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
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		column-gap: 16px;
		max-width: 960px;
	}

	.words__title {
		grid-area: 1 / 1;
		align-self: center;
	}

	.controls {
		display: flex;
		grid-area: 1 / 2;
		gap: 10px;
		align-items: center;
		align-self: center;
		justify-self: end;
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
		grid-area: 2 / 1 / auto / -1;
		flex-direction: column;
		gap: 22px;
		margin-top: clamp(28px, 4vw, 44px);
		/* A floor rather than a fixed height. Every quote we carry clears it at
		   every width, so the box still holds its size as the carousel advances
		   and the page doesn't jump under the reader — but a longer one added
		   later grows the box instead of spilling out the bottom of it. */
		min-height: clamp(340px, 30vw, 360px);
		padding: clamp(24px, 4vw, 48px);
		border: 2px solid var(--cream);
		border-radius: 24px;
		background: rgba(251, 247, 239, 0.04);
	}

	.quote__text {
		flex: 1;
		min-height: 0;
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
		grid-area: 3 / 1 / auto / -1;
		gap: 10px;
		align-items: center;
		margin-top: 22px;
	}

	/* Below the design's 760px flag the heading keeps the row to itself and the
	   whole control row drops under the dots. */
	@media (max-width: 760px) {
		.words__inner {
			grid-template-columns: minmax(0, 1fr);
		}

		.quote {
			min-height: 360px;
		}

		.quote__text {
			font-size: 17px;
		}

		.controls {
			grid-area: 4 / 1;
			margin-top: 20px;
			justify-self: start;
		}
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

	/* The narrower the box the more lines a quote runs to, so the floor rises as
	   the screen narrows. Each step is set about 15% above what the longest
	   quote actually measures at that width, which is room for a longer one
	   without leaving a crater under the short ones. */
	@media (max-width: 560px) {
		.quote {
			min-height: 400px;
		}
	}

	@media (max-width: 420px) {
		.quote {
			min-height: 440px;
		}
	}
</style>
