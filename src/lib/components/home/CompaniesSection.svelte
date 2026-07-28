<script>
	import LogoWall from './LogoWall.svelte';
	import { companies } from '$lib/content/index.js';
</script>

<section id="work" class="section section--paper">
	<div class="section__inner">
		<div class="section__lede">
			<h2 class="section__title">{companies.heading}</h2>
			<p class="section__standfirst">{companies.standfirst}</p>
		</div>

		<LogoWall items={companies.items} />
	</div>
</section>
