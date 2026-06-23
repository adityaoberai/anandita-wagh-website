<script>
	import { capabilities } from '$lib/content/index.js';
</script>

<section id="services" class="caps section--dark" data-dark>
	<div class="caps__inner section">
		<div class="caps__head">
			<div class="caps__heading">
				<span class="eyebrow eyebrow--accent" data-reveal>{capabilities.eyebrow}</span>
				<h2 class="caps__title" data-reveal>{capabilities.title}</h2>
			</div>
			<p class="caps__note" data-reveal>
				{capabilities.note}
			</p>
		</div>
		<ul class="caps__list">
			{#each capabilities.items as cap, i (cap.title)}
				<li class="cap" data-cap-row>
					<span class="cap__no">{String(i + 1).padStart(2, '0')}</span>
					<span class="cap__title">{cap.title}</span>
					<span class="cap__note">{cap.note}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>
