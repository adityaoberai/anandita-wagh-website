<script>
	import { onMount } from 'svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { chessStreak, now } from '$lib/content/index.js';

	/* The site is prerendered, so a streak counted at build time would be frozen
	   at whatever it was the day of the deploy. Count it again in the browser on
	   mount, then once a minute so a tab left open past midnight IST catches up. */
	let streak = $state(chessStreak());

	onMount(() => {
		streak = chessStreak();
		const timer = setInterval(() => (streak = chessStreak()), 60000);
		return () => clearInterval(timer);
	});

	/** Fills the `{streak}` token in a copy run with the live count. */
	const fill = (parts) =>
		parts.map((part) => (typeof part === 'string' ? part.replace('{streak}', streak) : part));
</script>

<section id="now" class="section section--cream">
	<div class="section__inner">
		<h2 class="section__title section__lede">{now.heading}</h2>

		<div class="now">
			<div class="card now__work">
				<h3 class="now__heading">{now.work.heading}</h3>
				<p class="prose now__body">{now.work.body}</p>

				<div class="now__items">
					{#each now.work.points as point (point.title[0])}
						<div>
							<p class="now__aside-title"><RichText parts={point.title} /></p>
							<p class="prose"><RichText parts={point.body} /></p>
						</div>
					{/each}
				</div>

				<a class="rule-link now__cta" href={now.work.cta.href}>{now.work.cta.label}</a>
			</div>

			<div class="card now__asides">
				<h3 class="now__heading">{now.asides.heading}</h3>
				<div class="now__items">
					{#each now.asides.items as item (item.title[0])}
						<div>
							<p class="now__aside-title"><RichText parts={fill(item.title)} /></p>
							<p class="prose"><RichText parts={fill(item.body)} /></p>
						</div>
					{/each}
				</div>
			</div>

			<div class="card now__off">
				<h3 class="now__heading">{now.offTheClock.heading}</h3>
				<div class="now__items now__items--columns">
					{#each now.offTheClock.items as item (item.title[0])}
						<div>
							<p class="now__aside-title"><RichText parts={item.title} /></p>
							<p class="prose"><RichText parts={item.body} /></p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* The work card carries the section, so it keeps two thirds of the top row
	   with the asides beside it. "Off the clock" runs the full width below. */
	.now {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: clamp(16px, 2.4vw, 28px);
		align-items: stretch;
	}

	.now__work,
	.now__asides,
	.now__off {
		display: flex;
		flex-direction: column;
		border-radius: 20px;
	}

	.now__off {
		grid-column: 1 / -1;
	}

	/* Below three comfortable columns the top row stops being a row: the work
	   card and the asides each take the full width, stacked. */
	@media (max-width: 980px) {
		.now {
			grid-template-columns: 1fr;
		}
	}

	/* Stacked, each card sizes to its own text. The work card carries three
	   points the others don't, so matching their heights to it would leave the
	   short cards mostly empty. */
	@media (max-width: 760px) {
		.now {
			gap: 20px;
		}
	}

	.now__items {
		display: grid;
		gap: 22px;
	}

	.now__items--columns {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 980px) {
		.now__items--columns {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 620px) {
		.now__items--columns {
			grid-template-columns: 1fr;
		}
	}

	.now__heading {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.4vw, 26px);
		letter-spacing: -0.02em;
	}

	.now__work .now__heading {
		margin-bottom: 12px;
	}

	.now__asides .now__heading,
	.now__off .now__heading {
		margin-bottom: 22px;
	}

	.now__body {
		margin-bottom: 22px;
		max-width: 56ch;
	}

	.now__work .now__items {
		margin-bottom: 24px;
		max-width: 56ch;
	}

	.now__cta {
		align-self: flex-start;
		/* Pinned to the bottom so the link sits on the card's baseline however
		   tall the card ends up. */
		margin-top: auto;
	}

	.now__aside-title {
		margin-bottom: 6px;
		font-family: var(--display);
		font-weight: 600;
		font-size: 17px;
		letter-spacing: -0.015em;
	}
</style>
