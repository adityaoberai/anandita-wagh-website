<script>
	import { onMount } from 'svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { socialIcons } from '$lib/social-icons.js';
	import { site } from '$lib/content/index.js';

	/* The bar rides over the hero with no background of its own, then takes on
	   the yellow once the page scrolls under it. It also gets out of the way:
	   scrolling down tucks it away, the first scroll back up returns it. */

	let scrolled = $state(false);
	let hidden = $state(false);
	let open = $state(false);

	/** The hamburger, so closing by Escape can hand focus back to it. */
	let burger = $state(null);

	const close = () => (open = false);

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

	/* The menu only exists below the breakpoint, so a window growing past it
	   should leave the menu closed rather than latched open behind the bar. */
	onMount(() => {
		const wide = window.matchMedia('(min-width: 761px)');
		const sync = () => wide.matches && close();

		wide.addEventListener('change', sync);
		return () => wide.removeEventListener('change', sync);
	});

	$effect(() => {
		if (!open) return;

		function onKey(event) {
			if (event.key !== 'Escape') return;
			open = false;
			burger?.focus();
		}

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<div class="nav" class:is-scrolled={scrolled} class:is-hidden={hidden} class:is-menu-open={open}>
	<div class="nav__inner">
		<a class="nav__logo" href="#top">anandita wagh</a>

		<nav class="nav__links" aria-label="Social profiles">
			{#each site.social as item (item.key)}
				<a
					class="nav__icon"
					href={item.href}
					target="_blank"
					rel="noopener"
					title={socialIcons[item.key].label}
				>
					<SocialIcon name={item.key} size={Math.round(iconBase * item.weight)} />
					<span class="nav__label">{socialIcons[item.key].label}</span>
				</a>
			{/each}

			<a class="nav__resume" href={site.resume.href} download={site.resume.filename}> Resume ↓ </a>
		</nav>

		<button
			bind:this={burger}
			class="burger"
			class:is-open={open}
			type="button"
			aria-expanded={open}
			aria-controls="nav-panel"
			aria-label={open ? 'Close menu' : 'Open menu'}
			onclick={() => (open = !open)}
		>
			<span class="burger__bar"></span>
			<span class="burger__bar"></span>
			<span class="burger__bar"></span>
		</button>
	</div>

	<!-- The menu collapses inside the bar rather than floating over the page, so
	     it travels with the bar when the bar hides itself on scroll. -->
	<div id="nav-panel" class="menu" class:is-open={open} inert={!open}>
		<div class="menu__inner">
			<nav class="menu__links" aria-label="Social profiles">
				{#each site.social as item (item.key)}
					<a class="menu__link" href={item.href} target="_blank" rel="noopener" onclick={close}>
						<span class="menu__icon" aria-hidden="true">
							<SocialIcon name={item.key} size={22} />
						</span>
						<span>{socialIcons[item.key].label}</span>
					</a>
				{/each}
			</nav>

			<a
				class="menu__resume"
				href={site.resume.href}
				download={site.resume.filename}
				onclick={close}
			>
				Resume ↓
			</a>
		</div>
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

	/* ----- mobile menu -----
	   Below the breakpoint the icon row is too much bar for the width, so it
	   collapses behind a hamburger and reopens as a sheet. */
	.burger {
		display: none;
		flex-direction: column;
		flex: none;
		gap: 5px;
		width: 44px;
		height: 44px;
		padding: 0 10px;
		border: none;
		background: transparent;
		justify-content: center;
	}

	.burger__bar {
		width: 100%;
		height: 2.5px;
		background: var(--ink);
		border-radius: 2px;
		transition:
			transform 0.24s ease,
			opacity 0.18s ease;
	}

	/* Top and bottom bars fold into an X; the middle one drops out under them. */
	.burger.is-open .burger__bar:first-child {
		transform: translateY(7.5px) rotate(45deg);
	}

	.burger.is-open .burger__bar:nth-child(2) {
		opacity: 0;
	}

	.burger.is-open .burger__bar:last-child {
		transform: translateY(-7.5px) rotate(-45deg);
	}

	/* Collapsed by height rather than swapped out, so opening and closing are
	   the same animation run in either direction. */
	.menu {
		display: none;
		overflow: hidden auto;
		max-height: 0;
		background: var(--ink);
		border-top: var(--rule);
		box-shadow: 0 22px 40px rgba(25, 21, 16, 0.28);
		opacity: 0;
		transition:
			max-height 0.38s cubic-bezier(0.33, 0, 0.2, 1),
			opacity 0.28s ease;
	}

	.menu.is-open {
		max-height: 760px;
		opacity: 1;
	}

	.menu__inner {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 18px 22px 24px;
	}

	.menu__link {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 11px 4px;
		border-bottom: 1px solid rgba(251, 247, 239, 0.16);
		color: var(--cream);
		font-weight: 600;
		font-size: 17px;
		text-decoration: none;
	}

	.menu__icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 22px;
		height: 22px;
	}

	.menu__resume {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 16px;
		padding: 15px 22px;
		border-radius: 999px;
		background: var(--yellow);
		color: var(--ink);
		font-weight: 700;
		font-size: 16px;
		text-decoration: none;
	}

	@media (max-width: 760px) {
		.nav__links {
			display: none;
		}

		.burger {
			display: flex;
		}

		.menu {
			display: block;
		}
	}
</style>
