<script>
	import { onMount } from 'svelte';
	import { hero } from '$lib/content/index.js';

	/* The name is set enormous behind the photo, in a yellow one step down
	   from the background so it reads as texture rather than a headline.

	   The whole wordmark takes one size, so the lines keep their proportions to
	   each other — the short line is meant to read short. What that size can be
	   is decided by the longest line, which has to land flush inside the gutters
	   rather than run under them: the design's fixed 25.7cqw overshoots by about
	   3%, and the hero clips whatever crosses its edge. So the size is measured
	   rather than assumed, which also means the copy can change without the
	   wordmark silently losing a letter. */

	let offDuty = $state(false);
	let box = $state(null);

	/* The swap is the photo's own affair, not the hero's. Hovering anywhere in
	   the yellow used to flip it, which on a full-viewport section meant it was
	   flipped most of the time; the trigger now sits on the crops themselves,
	   each of which is sized to its own artwork rather than to a shared frame.

	   Only the visible crop takes the pointer, and only two of the four possible
	   handlers exist — enter on the formal crop, leave on the casual one. The
	   casual crop covers the formal one, so a swap never drops the pointer and
	   the pair can't oscillate on the boundary. A click anywhere else in the
	   hero puts the formal photo back, which is also the way out on a device
	   that reports hover but has no pointer to move away. */
	let heroEl = $state(null);
	let photoEl = $state(null);

	/* There is no hover on a phone, so the swap rides the scroll instead: the
	   casual crop fades in across the first screenful and is fully resolved by
	   the time the hero is behind you. Quantised to 1/25 so a slow drag repaints
	   at most 25 times rather than on every scroll event. */
	let mobile = $state(false);
	let progress = $state(0);

	const { formal, casual } = hero.photos;

	const eased = $derived(progress * progress * (3 - 2 * progress));
	const casualOpacity = $derived(mobile ? eased : offDuty ? 1 : 0);
	const formalOpacity = $derived(mobile ? 1 - eased : offDuty ? 0 : 1);

	const REFERENCE = 100;

	function fitLines() {
		if (!box) return;

		const style = getComputedStyle(box);
		const room = box.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
		if (room <= 0) return;

		const lines = [...box.querySelectorAll('.hero__line')];
		if (!lines.length) return;

		const widthOfLongest = () =>
			Math.max(...lines.map((line) => line.getBoundingClientRect().width));
		const setSize = (size) => lines.forEach((line) => (line.style.fontSize = `${size}px`));

		setSize(REFERENCE);
		const natural = widthOfLongest();

		// A zero here means the font hasn't arrived yet; leave the fallback size
		// in place rather than dividing by nothing.
		if (!(natural > 0)) return setSize('');

		let size = (room / natural) * REFERENCE;
		setSize(size);

		/* Glyph advances are rounded at whatever size they were measured at, so
		   scaling from one reading lands a percent or so long — which on a line
		   set to the full measure is the difference between flush and clipped.
		   Correcting against the real width closes it. */
		for (let pass = 0; pass < 2; pass++) {
			const actual = widthOfLongest();
			if (Math.abs(actual - room) < 0.5) break;
			size *= room / actual;
			setSize(size);
		}
	}

	onMount(() => {
		const narrow = window.matchMedia('(max-width: 760px)');
		const syncViewport = () => (mobile = narrow.matches);

		function onScroll() {
			if (!mobile) return;
			const span = window.innerHeight * 0.62;
			const raw = Math.min(1, Math.max(0, (window.scrollY - span * 0.12) / (span * 0.72)));
			progress = Math.round(raw * 25) / 25;
		}

		// Desktop only: on a phone the crop is driven by scroll, not by pointer.
		function onClick(event) {
			if (mobile) return;
			if (!heroEl?.contains(event.target)) return;
			if (photoEl?.contains(event.target)) return;
			offDuty = false;
		}

		syncViewport();
		onScroll();
		narrow.addEventListener('change', syncViewport);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('click', onClick);

		return () => {
			narrow.removeEventListener('change', syncViewport);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('click', onClick);
		};
	});

	$effect(() => {
		if (!box) return;

		const observer = new ResizeObserver(fitLines);
		observer.observe(box);

		// Widths measured against a fallback face are wrong, so measure again
		// once Bricolage is actually in.
		document.fonts?.ready.then(fitLines);

		return () => observer.disconnect();
	});
</script>

<header id="top" class="hero" bind:this={heroEl}>
	<div class="hero__stage">
		<div class="hero__wordmark" bind:this={box} aria-hidden="true">
			{#each hero.wordmark as line (line)}
				<span class="hero__line">{line}</span>
			{/each}
		</div>

		<div class="hero__photo" bind:this={photoEl}>
			<img
				class="hero__crop"
				class:is-live={!offDuty}
				src={formal.src}
				alt={formal.alt}
				width={formal.width}
				height={formal.height}
				style:opacity={formalOpacity}
				fetchpriority="high"
				onmouseenter={() => !mobile && (offDuty = true)}
			/>
			<img
				class="hero__crop"
				class:is-live={offDuty}
				src={casual.src}
				alt=""
				width={casual.width}
				height={casual.height}
				style:opacity={casualOpacity}
				fetchpriority="low"
				aria-hidden="true"
				onmouseleave={() => (offDuty = false)}
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

	/* The design's fixed size, standing in until the measuring pass lands. */
	.hero__line {
		font-size: 25.7cqw;
	}

	.hero__photo {
		position: relative;
		z-index: 2;
		/* The crop is allowed to run wider than the gutters, so it must not be
		   talked down to the measure by the flex line. */
		flex: none;
		width: min(92vw, 900px);
		max-height: 100%;
		/* The wider of the two crops, so the stage never resizes on hover. */
		aspect-ratio: 1200 / 935;
		/* The frame is scaffolding, not a target — see .hero__crop. */
		pointer-events: none;
	}

	/* Each crop is given its own width off its own ratio rather than being
	   contained in the shared frame, so its box stops at the edge of the artwork
	   instead of reaching across the empty half of the frame. Both are anchored
	   to the same bottom edge, so the two shapes still stand on one ground line. */
	.hero__crop {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
		height: 100%;
		max-width: 100%;
		object-fit: contain;
		transition: opacity 0.32s ease;
		pointer-events: none;
	}

	/* Only whichever crop is on screen answers the pointer. */
	.hero__crop.is-live {
		pointer-events: auto;
	}

	/* On a phone the name stops being a backdrop and becomes the headline: full
	   ink, flush left, and lifted over the photo instead of sitting behind it.
	   The photo in turn grows past the viewport so the crop still reads as a
	   figure rather than a stamp. */
	@media (max-width: 760px) {
		.hero__stage {
			min-height: calc(100vh - clamp(72px, 9vw, 104px));
		}

		.hero__wordmark {
			top: 34px;
			z-index: 3;
			align-items: flex-start;
			color: var(--ink);
		}

		.hero__line {
			font-size: 24.7cqw;
		}

		.hero__photo {
			width: min(116vw, 720px);
		}

		/* The crop swaps on scroll here, so it takes no pointer at all — a tap
		   should never latch a hover state that can't be left. */
		.hero__crop.is-live {
			pointer-events: none;
		}
	}
</style>
