<script>
	import RichText from '$lib/components/RichText.svelte';
	import { now } from '$lib/content/index.js';
</script>

<section id="now" class="section section--cream">
	<div class="section__inner">
		<h2 class="section__title section__lede">{now.heading}</h2>

		<div class="now">
			<div class="card now__work">
				<h3 class="now__heading">{now.work.heading}</h3>
				<p class="prose now__body">{now.work.body}</p>
				<a class="rule-link now__cta" href={now.work.cta.href}>{now.work.cta.label}</a>
			</div>

			<div class="card now__asides">
				<h3 class="now__heading">{now.asides.heading}</h3>
				{#each now.asides.items as item (item.title[0])}
					<div>
						<p class="now__aside-title"><RichText parts={item.title} /></p>
						<p class="prose"><RichText parts={item.body} /></p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.now {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: clamp(16px, 2.4vw, 28px);
		align-items: stretch;
	}

	.now__work,
	.now__asides {
		display: flex;
		flex-direction: column;
		border-radius: 20px;
	}

	/* The freelance card carries the section, so it takes both columns and the
	   asides sit beside it — until the grid drops to one column and the span
	   would overflow. */
	.now__work {
		grid-column: span 2;
	}

	@media (max-width: 760px) {
		.now {
			/* Stacked, the two cards match heights rather than each sizing to its
			   own text — so the pair still reads as a set. */
			grid-auto-rows: 1fr;
			gap: 20px;
		}

		.now__work {
			grid-column: auto;
		}
	}

	.now__asides {
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

	.now__body {
		margin-bottom: 20px;
		max-width: 56ch;
	}

	.now__cta {
		align-self: flex-start;
		/* Pinned to the bottom so both cards' links line up. */
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
