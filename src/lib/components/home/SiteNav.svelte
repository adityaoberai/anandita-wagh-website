<script>
	import { onMount } from 'svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { site } from '$lib/content/index.js';

	/* The bar rides over the hero with no background of its own, then takes on
	   the yellow once the page scrolls under it. It also gets out of the way:
	   scrolling down tucks it away, the first scroll back up returns it. */

	let scrolled = $state(false);
	let hidden = $state(false);

	// Icon box in each state. Each glyph is scaled off this by its own optical
	// weight (see site.social) so the row reads evenly.
	const ICON_BASE = { rest: 28, scrolled: 21 };

	const iconBase = $derived(scrolled ? ICON_BASE.scrolled : ICON_BASE.rest);

	onMount(() => {
		let last = window.scrollY;

		function onScroll() {
			const y = window.scrollY;
			const past = y > 24;

			// Only commit to hiding once past the top, and only after a
			// deliberate move — small jitters shouldn't flip the bar.
			if (past && y > last + 14) hidden = true;
			else if (!past || y < last - 6) hidden = false;

			scrolled = past;
			last = y;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div class="nav" class:is-scrolled={scrolled} class:is-hidden={hidden}>
	<div class="nav__inner">
		<a class="nav__logo" href="#top">anandita wagh</a>

		<nav class="nav__links" aria-label="Social profiles">
			{#each site.social as item (item.key)}
				<a
					class="nav__icon"
					href={item.href}
					target="_blank"
					rel="noopener"
					title={item.key === 'gmail' ? 'Email' : undefined}
				>
					<SocialIcon name={item.key} size={Math.round(iconBase * item.weight)} />
					<span class="nav__label">{item.key === 'gmail' ? 'Email' : item.key}</span>
				</a>
			{/each}

			<a class="nav__resume" href={site.resume.href} download={site.resume.filename}> Resume ↓ </a>
		</nav>
	</div>
</div>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		border-bottom: 2px solid transparent;
		transition:
			background 0.28s ease,
			border-color 0.28s ease,
			transform 0.55s cubic-bezier(0.33, 0, 0.2, 1);
	}

	.nav.is-scrolled {
		background: rgba(255, 206, 31, 0.94);
		-webkit-backdrop-filter: blur(14px);
		backdrop-filter: blur(14px);
		border-bottom-color: var(--ink);
	}

	.nav.is-hidden {
		transform: translateY(-105%);
	}

	.nav__inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: clamp(10px, 2vw, 24px);
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(16px, 2vw, 24px) var(--nav-gutter);
		transition: padding 0.28s ease;
	}

	.is-scrolled .nav__inner {
		padding: 10px var(--nav-gutter);
	}

	.nav__logo {
		flex: none;
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(18px, 2.4vw, 23px);
		letter-spacing: -0.02em;
		text-decoration: none;
		transition: font-size 0.28s ease;
	}

	.is-scrolled .nav__logo {
		font-size: clamp(16px, 1.9vw, 19px);
	}

	.nav__links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(13px, 1.9vw, 26px);
		transition: gap 0.28s ease;
	}

	.is-scrolled .nav__links {
		gap: clamp(11px, 1.5vw, 20px);
	}

	.nav__icon {
		display: grid;
		place-items: center;
		flex: none;
		text-decoration: none;
		opacity: 0.86;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}

	.nav__icon:hover {
		opacity: 1;
		transform: translateY(-3px) scale(1.1);
	}

	/* The glyph carries the meaning visually; this carries it for screen readers. */
	.nav__label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		text-transform: capitalize;
	}

	.nav__resume {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		flex: none;
		margin-left: clamp(2px, 1vw, 12px);
		padding: clamp(10px, 1.1vw, 13px) clamp(15px, 1.7vw, 21px);
		border-radius: 999px;
		background: var(--ink);
		color: var(--yellow);
		font-weight: 600;
		font-size: clamp(13px, 1.2vw, 15px);
		white-space: nowrap;
		text-decoration: none;
		transition:
			padding 0.28s ease,
			font-size 0.28s ease,
			background 0.2s ease,
			color 0.2s ease;
	}

	.is-scrolled .nav__resume {
		padding: 8px 15px;
		font-size: 13px;
	}

	.nav__resume:hover {
		background: var(--cream);
		color: var(--ink);
	}
</style>
