<script>
	import { site, work } from '$lib/content/index.js';
</script>

<section id="work" class="work section">
	<div class="work__head">
		<div class="work__heading">
			<span class="eyebrow eyebrow--teal" data-reveal>{work.eyebrow}</span>
			<h2 class="work__title" data-reveal>{work.title}</h2>
		</div>
		<a href={site.behanceUrl} target="_blank" rel="noopener" class="link-accent" data-cursor>
			Full portfolio on Behance ↗
		</a>
	</div>

	<div class="work__grid">
		{#each work.items as card (card.name)}
			<article class="work__card" data-tilt data-cursor="View">
				<div class="work__media">
					{#if card.image}
						<img class="work__img" src={card.image} alt={card.name} />
					{:else}
						<div class="work__placeholder" data-tag={card.category}>
							<span class="work__mark">✦</span>
						</div>
					{/if}
				</div>
				<div class="work__meta">
					<h3 class="work__name">{card.name}</h3>
					<span class="work__tag" class:work__tag--accent={card.accent}>{card.meta}</span>
				</div>
				<p class="work__desc">
					{card.desc}
				</p>
			</article>
		{/each}
	</div>
</section>
