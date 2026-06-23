<script>
	import { about } from '$lib/content/index.js';
</script>

<section id="about" class="about section">
	<div class="about__head">
		<span class="eyebrow eyebrow--teal" data-reveal>{about.eyebrow}</span>
	</div>
	<div class="about__body">
		<p class="about__lead" data-reveal>
			{about.lead.before}<em class="mark">{about.lead.mark}</em>{about.lead.after}
		</p>
		<p class="about__text" data-reveal>
			{about.text}
		</p>

		<dl class="stats">
			{#each about.stats as stat (stat.label)}
				<div class="stats__item" data-reveal>
					<dt class="stats__num"><span data-count={stat.count}>0</span>{stat.suffix}</dt>
					<dd class="stats__label">{stat.label}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
