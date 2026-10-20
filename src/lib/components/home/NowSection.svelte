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
			<div class="card card--yellow now__work">
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
				<div class="now__items">
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
	/* The work card runs the full width on top, where it stays the first thing
	   read. "Away from the desk" and "Off the clock" split the row under it,
	   half each, and match heights so the pair reads as one band. */
	.now {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(16px, 2.4vw, 28px);
	}

	.now__work {
		grid-column: 1 / -1;
	}

	.now__work,
	.now__asides,
	.now__off {
		display: flex;
		flex-direction: column;
		border-radius: 20px;
	}

	/* Half a narrow screen is too little to read in, so the pair stacks at the
	   same width the section's padding tightens. */
	@media (max-width: 760px) {
		.now {
			grid-template-columns: 1fr;
			gap: 20px;
		}
	}

	/* Every card runs its items in one column, so the three read the same way
	   down the page. */
	.now__items {
		display: grid;
		gap: 22px;
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
	}

	.now__work .now__items {
		margin-bottom: 24px;
	}

	.now__cta {
		align-self: flex-start;
		/* Pinned to the bottom so the link sits on the card's baseline however
		   tall the card ends up. */
		margin-top: auto;

		/* The accent rule under a link is yellow, which is invisible on the
		   yellow card, so it inverts to ink: faint at rest, full on hover, the
		   same quiet-to-strong move the rule makes everywhere else. */
		border-color: color-mix(in srgb, var(--ink) 35%, transparent);
	}

	.now__cta:hover {
		border-color: var(--ink);
	}

	.now__aside-title {
		margin-bottom: 6px;
		font-family: var(--display);
		font-weight: 600;
		font-size: 17px;
		letter-spacing: -0.015em;
	}
</style>
