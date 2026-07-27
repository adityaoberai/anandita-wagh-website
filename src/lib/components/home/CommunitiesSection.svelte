<script>
	import LogoWall from './LogoWall.svelte';
	import { communities } from '$lib/content/index.js';
</script>

<section id="communities" class="section section--cream">
	<div class="section__inner">
		<div class="section__lede">
			<h2 class="section__title">{communities.heading}</h2>
			<p class="section__standfirst">{communities.standfirst}</p>
		</div>

		<LogoWall items={communities.items} />

		<div class="card card--yellow offer">
			<h3 class="offer__heading">{communities.offer.heading}</h3>
			<p class="offer__body">{communities.offer.body}</p>
			<a class="pill" href={communities.offer.cta.href} target="_blank" rel="noopener">
				{communities.offer.cta.label}
			</a>
		</div>
	</div>
</section>

<style>
	.offer {
		margin-top: clamp(36px, 5vw, 60px);
		padding: clamp(26px, 4vw, 48px);
	}

	.offer__heading {
		margin-bottom: 12px;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(22px, 3vw, 34px);
		letter-spacing: -0.025em;
	}

	.offer__body {
		margin-bottom: 24px;
		max-width: 78ch;
		font-size: 17px;
		line-height: 1.55;
		text-wrap: pretty;
	}
</style>
