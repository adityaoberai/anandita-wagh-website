<script>
	import { experience } from '$lib/content/index.js';
</script>

<section id="experience" class="exp section">
	<div class="exp__head">
		<div class="exp__sticky">
			<span class="eyebrow eyebrow--teal">{experience.eyebrow}</span>
			<h2 class="exp__title" data-reveal>
				{#each experience.title as line, i (i)}{line}{#if i < experience.title.length - 1}<br
						/>{/if}{/each}
			</h2>
			<p class="exp__sub">
				{experience.sub}
			</p>
		</div>
	</div>
	<div class="exp__list">
		{#each experience.items as item (`${item.period}-${item.org}`)}
			<div class="exp__item" data-reveal>
				<span class="exp__year">{item.period}</span>
				<div class="exp__detail">
					<div class="exp__role">
						<h3 class="exp__org">{item.org}</h3>
						<span class="exp__title-role">{item.role}</span>
					</div>
					<p class="exp__desc">
						{item.desc}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>
