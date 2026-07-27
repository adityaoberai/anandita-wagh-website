<script>
	import { hero } from '$lib/content/index.js';

	/* The name is set enormous behind the photo, in a yellow one step down
	   from the background so it reads as texture rather than a headline. It's
	   sized in container-query units, so it keeps the same relationship to the
	   page at every width instead of being re-tuned per breakpoint. */

	let offDuty = $state(false);

	const { formal, casual } = hero.photos;
</script>

<header
	id="top"
	class="hero"
	onmouseenter={() => (offDuty = true)}
	onmouseleave={() => (offDuty = false)}
>
	<div class="hero__stage">
		<div class="hero__wordmark" aria-hidden="true">
			{#each hero.wordmark as line (line)}
				<span>{line}</span>
			{/each}
		</div>

		<div class="hero__photo">
			<img
				src={formal.src}
				alt={formal.alt}
				width={formal.width}
				height={formal.height}
				style:opacity={offDuty ? 0 : 1}
				fetchpriority="high"
			/>
			<img
				src={casual.src}
				alt=""
				width={casual.width}
				height={casual.height}
				style:opacity={offDuty ? 1 : 0}
				fetchpriority="low"
				aria-hidden="true"
			/>
		</div>
	</div>
</header>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		min-height: 100vh;
		min-height: 100svh;
		padding-top: clamp(72px, 9vw, 104px);
		background: var(--yellow);
		position: relative;
		overflow: hidden;
	}

	.hero__stage {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(12px, 3vh, 32px) var(--nav-gutter) 0;
		min-height: clamp(420px, 64vh, 720px);
	}

	.hero__wordmark {
		position: absolute;
		left: 0;
		right: 0;
		top: clamp(16px, 6vh, 72px);
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 var(--nav-gutter);
		container-type: inline-size;
		pointer-events: none;
		font-family: var(--display);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 0.84;
		color: var(--yellow-deep);
		white-space: nowrap;
	}

	.hero__wordmark span {
		font-size: 25.6cqw;
	}

	.hero__photo {
		position: relative;
		z-index: 2;
		width: min(92vw, 900px);
		max-height: 100%;
		/* Matches the wider of the two crops, so the box never resizes on hover. */
		aspect-ratio: 1991 / 1552;
	}

	.hero__photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		/* Both crops stand on the same ground line despite different shapes. */
		object-position: bottom center;
		transition: opacity 0.32s ease;
	}
</style>
