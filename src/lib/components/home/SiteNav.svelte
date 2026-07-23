<script>
	import { nav, site } from '$lib/content/index.js';
</script>

<nav class="nav" id="nav" aria-label="Primary">
	<a href="#top" class="nav__brand" data-cursor>{site.name.replace(/ /g, ' ')}</a>

	<button
		class="nav__toggle"
		id="nav-toggle"
		aria-expanded="false"
		aria-controls="nav-menu"
		aria-label="Open menu"
	>
		<span></span><span></span><span></span>
	</button>

	<div class="nav__menu" id="nav-menu">
		{#each nav.links as link (link.href)}
			<a
				href={link.href}
				class="nav__link"
				target={link.external ? '_blank' : undefined}
				rel={link.external ? 'noopener noreferrer' : undefined}
				data-cursor
			>
				{link.label}
			</a>
		{/each}
		<a href={nav.cta.href} class="nav__cta" data-magnetic data-cursor>{nav.cta.label}</a>
	</div>
</nav>
