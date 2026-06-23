<script>
	import { hero, site } from '$lib/content/index.js';

	const eyebrow = `${site.role} · ${site.location}`;
</script>

<header id="top" class="hero">
	<div class="hero__copy">
		<p class="hero__eyebrow" data-reveal>
			<span class="hero__pulse" aria-hidden="true"></span>
			<span>{eyebrow}</span>
		</p>
		<h1 class="hero__title" data-reveal>
			{#each hero.title.lines.slice(0, -1) as line (line)}{line}<br />{/each}{hero.title.lines.at(
				-1
			)} <em class="mark">{hero.title.mark}</em>
		</h1>
		<p class="hero__lede" data-reveal>
			{hero.lede}
		</p>
		<div class="hero__actions" data-reveal>
			{#each hero.actions as action (action.href)}
				{#if action.variant === 'solid'}
					<a href={action.href} class="btn btn--solid" data-magnetic data-cursor>
						{action.label}
						<span class="btn__icon" aria-hidden="true">{action.icon}</span>
					</a>
				{:else}
					<a href={action.href} class="btn btn--text" data-cursor>{action.label}</a>
				{/if}
			{/each}
		</div>
	</div>

	<div class="hero__figure" data-reveal>
		<span class="hero__plate" aria-hidden="true"></span>
		<img
			class="hero__photo"
			src={site.portrait}
			width="600"
			height="600"
			alt="Portrait of {site.name}"
			fetchpriority="high"
		/>
	</div>
</header>
