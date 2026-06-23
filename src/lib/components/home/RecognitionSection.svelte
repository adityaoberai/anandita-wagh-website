<script>
	import { recognition, toolkit } from '$lib/content/index.js';
</script>

<section class="recog section" aria-label="Recognition and toolkit">
	<div class="recog__col">
		<span class="eyebrow eyebrow--teal">{recognition.eyebrow}</span>
		<ul class="recog__list">
			{#each recognition.items as item (item.text)}
				<li class="recog__item" data-reveal>
					<span>{item.text}</span>
					{#if item.link}
						<a class="recog__link" href={item.link.href} target="_blank" rel="noopener" data-cursor>
							{item.link.label} ↗
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	<div class="recog__col">
		<span class="eyebrow eyebrow--teal">{toolkit.eyebrow}</span>
		<div class="chips">
			{#each toolkit.tools as tool (tool)}
				<span class="chip" data-cursor>{tool}</span>
			{/each}
		</div>
	</div>
</section>
