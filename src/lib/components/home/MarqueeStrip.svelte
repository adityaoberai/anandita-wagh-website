<script>
	import { marqueeItems } from '$lib/content/index.js';
</script>

{#snippet marqueeGroup()}
	<div class="marquee__group">
		{#each marqueeItems as item (item)}
			<span class="marquee__item">{item}</span><span class="marquee__star">✦</span>
		{/each}
	</div>
{/snippet}

<div class="marquee" aria-hidden="true">
	<div class="marquee__track">
		{@render marqueeGroup()}
		{@render marqueeGroup()}
	</div>
</div>
