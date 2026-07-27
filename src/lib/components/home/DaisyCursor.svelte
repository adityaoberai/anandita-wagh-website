<script>
	import { onMount } from 'svelte';

	/* A daisy stands in for the pointer. It's big while the hero owns the
	   screen and shrinks to a modest marker once the page proper takes over,
	   so it never fights the copy for attention.

	   Only on real pointers: touch devices have nothing to follow, and the
	   native cursor is left alone until JS confirms the daisy is running, so a
	   failed script can't leave the page without a pointer. */

	const BIG = 1;
	const SMALL = 0.42;

	/** @type {HTMLDivElement} */
	let el;

	onMount(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return;

		document.body.classList.add('daisy-on');
		el.style.display = 'block';

		let x = window.innerWidth / 2;
		let y = window.innerHeight / 2;

		/** Full size over the hero, easing down to SMALL as the next section arrives. */
		function scale() {
			const hero = document.getElementById('top');
			if (!hero) return SMALL;
			const { bottom } = hero.getBoundingClientRect();
			const travel = window.innerHeight * 0.6;
			const t = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - bottom) / travel));
			const eased = t * t * (3 - 2 * t); // smoothstep
			return BIG + (SMALL - BIG) * eased;
		}

		function paint() {
			el.style.transform = `translate(${x}px, ${y}px) scale(${scale().toFixed(3)})`;
		}

		function onMove(event) {
			x = event.clientX;
			y = event.clientY;
			paint();
		}

		window.addEventListener('mousemove', onMove, { passive: true });
		window.addEventListener('scroll', paint, { passive: true });
		window.addEventListener('resize', paint, { passive: true });
		paint();

		return () => {
			document.body.classList.remove('daisy-on');
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('scroll', paint);
			window.removeEventListener('resize', paint);
		};
	});
</script>

<div class="daisy" bind:this={el} aria-hidden="true">
	<svg viewBox="0 0 100 100" width="100%" height="100%">
		<g fill="#ffffff" stroke="var(--ink)" stroke-width="2.5">
			{#each [0, 45, 90, 135, 180, 225, 270, 315] as angle (angle)}
				<ellipse cx="50" cy="24" rx="11" ry="21" transform="rotate({angle} 50 50)" />
			{/each}
		</g>
		<circle cx="50" cy="50" r="13" fill="#f5a623" stroke="var(--ink)" stroke-width="2.5" />
	</svg>
</div>

<style>
	.daisy {
		position: fixed;
		top: 0;
		left: 0;
		width: 96px;
		height: 96px;
		margin: -48px 0 0 -48px;
		pointer-events: none;
		z-index: 9999;
		will-change: transform;
		display: none;
	}

	.daisy svg {
		overflow: visible;
		animation: daisy-spin 9s linear infinite;
	}

	@keyframes daisy-spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Hiding the native cursor is scoped to the class the script adds, so the
	   pointer survives if JS never runs. */
	:global(body.daisy-on),
	:global(body.daisy-on *) {
		cursor: none !important;
	}
</style>
