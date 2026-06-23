<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { initInteractions } from '$lib/interactions.js';

	// Run all DOM interactions on the client; onMount returns the teardown.
	onMount(() => initInteractions());

	// Absolute URLs so social crawlers (which ignore relative paths) resolve
	// the card and canonical on whatever domain the site is deployed to.
	const ogImage = $derived(`${page.url.origin}/og.png`);
	const canonical = $derived(page.url.href);
	const ogAlt = 'Anandita Wagh — I turn businesses into brands.';
</script>

<svelte:head>
	<title>Anandita Wagh — Brand &amp; Graphic Designer</title>
	<meta
		name="description"
		content="Anandita Wagh — Brand & Graphic Designer based in Bengaluru / Pune. Four years shaping how brands look, feel and communicate, from identity systems to the screens that hold them together."
	/>
	<meta name="author" content="Anandita Wagh" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Anandita Wagh — Brand & Graphic Designer" />
	<meta
		property="og:description"
		content="I turn businesses into brands. Identity systems, logos and the visual language that holds a brand together across every platform."
	/>
	<meta property="og:site_name" content="Anandita Wagh" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={ogAlt} />
	<link rel="canonical" href={canonical} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Anandita Wagh — Brand &amp; Graphic Designer" />
	<meta
		name="twitter:description"
		content="I turn businesses into brands. Identity systems, logos and the visual language that holds a brand together across every platform."
	/>
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={ogAlt} />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<!-- ===== CUSTOM CURSOR (decorative; pointer:fine only) ===== -->
<div class="cursor" aria-hidden="true">
	<span class="cursor__ring" id="cursor-ring"
		><span class="cursor__label" id="cursor-label"></span></span
	>
	<span class="cursor__dot" id="cursor-dot"></span>
	<span class="cursor__rocket" id="cursor-rocket">🚀</span>
</div>

<!-- ===== NAV ===== -->
<nav class="nav" id="nav" aria-label="Primary">
	<a href="#top" class="nav__brand" data-cursor>Anandita&nbsp;Wagh</a>

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
		<a href="#work" class="nav__link" data-cursor>Work</a>
		<a href="#about" class="nav__link" data-cursor>About</a>
		<a href="#experience" class="nav__link" data-cursor>Experience</a>
		<a href="#contact" class="nav__cta" data-magnetic data-cursor>Let's talk</a>
	</div>
</nav>

<main id="main">
	<!-- ===== HERO ===== -->
	<header id="top" class="hero">
		<div class="hero__copy">
			<p class="hero__eyebrow" data-reveal>
				<span class="hero__pulse" aria-hidden="true"></span>
				<span>Brand &amp; Graphic Designer · Bengaluru / Pune</span>
			</p>
			<h1 class="hero__title" data-reveal>
				I turn<br />businesses<br />into <em class="mark">brands.</em>
			</h1>
			<p class="hero__lede" data-reveal>
				Four years shaping how brands look, feel and communicate — from logos and identity systems
				to the visual language that holds a brand together across every platform.
			</p>
			<div class="hero__actions" data-reveal>
				<a href="#work" class="btn btn--solid" data-magnetic data-cursor>
					View selected work
					<span class="btn__icon" aria-hidden="true">↓</span>
				</a>
				<a href="#contact" class="btn btn--text" data-cursor>Get in touch</a>
			</div>
		</div>

		<div class="hero__figure" data-reveal>
			<span class="hero__plate" aria-hidden="true"></span>
			<span class="hero__badge">Open to work</span>
			<img
				class="hero__photo"
				src="/assets/anandita.png"
				width="600"
				height="600"
				alt="Portrait of Anandita Wagh"
				fetchpriority="high"
			/>
		</div>
	</header>

	<!-- ===== MARQUEE ===== -->
	<div class="marquee" aria-hidden="true">
		<div class="marquee__track">
			<div class="marquee__group">
				<span class="marquee__item">Brand Strategy</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Identity Systems</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Logo Design</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Packaging &amp; Print</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Web &amp; Landing Pages</span><span class="marquee__star"
					>✦</span
				>
				<span class="marquee__item">Motion Graphics</span><span class="marquee__star">✦</span>
			</div>
			<div class="marquee__group">
				<span class="marquee__item">Brand Strategy</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Identity Systems</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Logo Design</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Packaging &amp; Print</span><span class="marquee__star">✦</span>
				<span class="marquee__item">Web &amp; Landing Pages</span><span class="marquee__star"
					>✦</span
				>
				<span class="marquee__item">Motion Graphics</span><span class="marquee__star">✦</span>
			</div>
		</div>
	</div>

	<!-- ===== ABOUT ===== -->
	<section id="about" class="about section">
		<div class="about__head">
			<span class="eyebrow eyebrow--teal" data-reveal>(01) About</span>
		</div>
		<div class="about__body">
			<p class="about__lead" data-reveal>
				A designer who thinks like a <em class="mark">strategist</em> — building brands from the ground
				up, not just decorating them.
			</p>
			<p class="about__text" data-reveal>
				I've worked across design, tech and retail — independently with startups and local
				businesses, and in-house owning the design function end to end. Branding has been close to
				my heart since childhood, and I help businesses build a strong, cohesive identity so they
				can focus on their work while I take care of how they look and feel.
			</p>

			<dl class="stats">
				<div class="stats__item" data-reveal>
					<dt class="stats__num"><span data-count="4">0</span></dt>
					<dd class="stats__label">years shaping brands</dd>
				</div>
				<div class="stats__item" data-reveal>
					<dt class="stats__num"><span data-count="250">0</span>+</dt>
					<dd class="stats__label">employees enabled with a design system</dd>
				</div>
				<div class="stats__item" data-reveal>
					<dt class="stats__num"><span data-count="10">0</span>+</dt>
					<dd class="stats__label">events incl. NVIDIA GTC 2026</dd>
				</div>
				<div class="stats__item" data-reveal>
					<dt class="stats__num"><span data-count="100">0</span>%</dt>
					<dd class="stats__label">fewer recurring design requests</dd>
				</div>
			</dl>
		</div>
	</section>

	<!-- ===== CAPABILITIES ===== -->
	<section id="services" class="caps section--dark" data-dark>
		<div class="caps__inner section">
			<div class="caps__head">
				<h2 class="caps__title" data-reveal>What I do</h2>
				<p class="caps__note" data-reveal>
					A full toolkit — from the strategy to the systems to the screens.
				</p>
			</div>
			<ul class="caps__list">
				<li class="cap" data-cap-row>
					<span class="cap__no">01</span><span class="cap__title"
						>Brand Strategy &amp; Positioning</span
					><span class="cap__note">From business to brand</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">02</span><span class="cap__title"
						>Brand Identity &amp; Logo Design</span
					><span class="cap__note">Logos, marks &amp; press kits</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">03</span><span class="cap__title"
						>Design Systems, Docs &amp; Playbooks</span
					><span class="cap__note">Reusable, guideline-backed</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">04</span><span class="cap__title"
						>Web &amp; Landing Page Design</span
					><span class="cap__note">IA, Figma, build &amp; ship</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">05</span><span class="cap__title">Packaging &amp; Print Design</span
					><span class="cap__note">Tactile, production-ready</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">06</span><span class="cap__title">Social &amp; Digital Design</span
					><span class="cap__note">Static, motion &amp; video</span>
				</li>
				<li class="cap" data-cap-row>
					<span class="cap__no">07</span><span class="cap__title"
						>Event Collateral &amp; Motion</span
					><span class="cap__note">Local to global scale</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- ===== SELECTED WORK ===== -->
	<section id="work" class="work section">
		<div class="work__head">
			<h2 class="work__title" data-reveal>Selected work</h2>
			<a
				href="https://behance.net/ananditawagh"
				target="_blank"
				rel="noopener"
				class="link-accent"
				data-cursor>Full portfolio on Behance ↗</a
			>
		</div>

		<div class="work__grid">
			<!-- To use a real image, replace the .work__placeholder block with:
			     <img class="work__img" src="/assets/your-image.jpg" alt="…" /> -->
			<article class="work__card" data-tilt data-cursor="View">
				<div class="work__media">
					<div class="work__placeholder" data-tag="Brand &amp; Web">
						<span class="work__mark">✦</span>
					</div>
				</div>
				<div class="work__meta">
					<h3 class="work__name">Sovereign Cloud Platform</h3>
					<span class="work__tag">E2E · 2025</span>
				</div>
				<p class="work__desc">
					End-to-end website — logo, branding, information architecture, Figma design and launch in
					1.5 months.
				</p>
			</article>

			<article class="work__card" data-tilt data-cursor="View">
				<div class="work__media">
					<div class="work__placeholder" data-tag="Identity">
						<span class="work__mark">✦</span>
					</div>
				</div>
				<div class="work__meta">
					<h3 class="work__name">E2E Networks Brand System</h3>
					<span class="work__tag">Identity · 2025</span>
				</div>
				<p class="work__desc">
					Logos, brand guides and press kits for the core brand plus 4 product sub-brands —
					consistent across every touchpoint.
				</p>
			</article>

			<article class="work__card" data-tilt data-cursor="View">
				<div class="work__media">
					<div class="work__placeholder" data-tag="Product">
						<span class="work__mark">✦</span>
					</div>
				</div>
				<div class="work__meta">
					<h3 class="work__name">Rhythm — Breathing Device</h3>
					<span class="work__tag work__tag--accent">Patent</span>
				</div>
				<p class="work__desc">
					A breathing-guidance device. Patent awaited, copyrighted 2024, Viewer's Choice runner-up
					at India HCI 2023.
				</p>
			</article>

			<article class="work__card" data-tilt data-cursor="View">
				<div class="work__media">
					<div class="work__placeholder" data-tag="Event">
						<span class="work__mark">✦</span>
					</div>
				</div>
				<div class="work__meta">
					<h3 class="work__name">DevRelCon Bengaluru</h3>
					<span class="work__tag">Event · 2024</span>
				</div>
				<p class="work__desc">
					Full visual and print identity for the conference — signage, collateral and on-site
					materials.
				</p>
			</article>
		</div>
	</section>

	<!-- ===== EXPERIENCE ===== -->
	<section id="experience" class="exp section">
		<div class="exp__head">
			<div class="exp__sticky">
				<span class="eyebrow eyebrow--teal">(02) Experience</span>
				<h2 class="exp__title" data-reveal>Where I've<br />worked</h2>
				<p class="exp__sub">
					B.Des. Product Design + Minor in Digital Marketing, UPES · Batch Champion 2024.
				</p>
			</div>
		</div>
		<div class="exp__list">
			<div class="exp__item" data-reveal>
				<span class="exp__year">2025—26</span>
				<div class="exp__detail">
					<div class="exp__role">
						<h3 class="exp__org">E2E Networks</h3>
						<span class="exp__title-role">Graphic &amp; Visual Designer</span>
					</div>
					<p class="exp__desc">
						Sole designer owning the function end to end — branding, event collateral, websites and
						on-demand work. Built a company-wide design repository for 250+ employees and introduced
						motion into social, lifting engagement.
					</p>
				</div>
			</div>
			<div class="exp__item" data-reveal>
				<span class="exp__year">2024—25</span>
				<div class="exp__detail">
					<div class="exp__role">
						<h3 class="exp__org">IKEA</h3>
						<span class="exp__title-role">Visual Merchandiser &amp; Store Designer</span>
					</div>
					<p class="exp__desc">
						Curated 20+ media displays and inspiration points, aligning them with stock, customer
						behaviour and sales goals across department layouts and store rebuilds.
					</p>
				</div>
			</div>
			<div class="exp__item" data-reveal>
				<span class="exp__year">2024</span>
				<div class="exp__detail">
					<div class="exp__role">
						<h3 class="exp__org">Hettich India</h3>
						<span class="exp__title-role">Furniture &amp; Print Design Intern</span>
					</div>
					<p class="exp__desc">
						Concept design for Generation-Alpha furniture (2030+) integrating Hettich fittings, and
						curating the Ideabooks featured on their website.
					</p>
				</div>
			</div>
			<div class="exp__item" data-reveal>
				<span class="exp__year">2022—23</span>
				<div class="exp__detail">
					<div class="exp__role">
						<h3 class="exp__org">Earlier</h3>
						<span class="exp__title-role">Design Directions · Vucaware · Kyitsel-ling</span>
					</div>
					<p class="exp__desc">
						Industrial design (product form &amp; prototyping), logo &amp; brand identity for
						Vucaware and Trueselfy, and a Silver-Jubilee coffee-table book.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ===== RECOGNITION + TOOLKIT ===== -->
	<section class="recog section" aria-label="Recognition and toolkit">
		<div class="recog__col">
			<span class="eyebrow eyebrow--teal">(03) Recognition</span>
			<ul class="recog__list">
				<li class="recog__item" data-reveal>UPES Batch Champion — Graduating batch of 2024</li>
				<li class="recog__item" data-reveal>
					Viewer's Choice (runner-up) — India HCI 2023, Project Rhythm
				</li>
				<li class="recog__item" data-reveal>
					Patents &amp; copyrights — Rhythm, TASC, Metamorphosis
				</li>
				<li class="recog__item" data-reveal>Co-convener, UHackathon 4.0 META — led 100+ members</li>
			</ul>
		</div>
		<div class="recog__col">
			<span class="eyebrow eyebrow--teal">(04) Toolkit</span>
			<div class="chips">
				<span class="chip" data-cursor>Illustrator</span>
				<span class="chip" data-cursor>Photoshop</span>
				<span class="chip" data-cursor>InDesign</span>
				<span class="chip" data-cursor>Premiere Pro</span>
				<span class="chip" data-cursor>After Effects</span>
				<span class="chip" data-cursor>Figma</span>
				<span class="chip" data-cursor>Framer</span>
				<span class="chip" data-cursor>Adobe Firefly</span>
				<span class="chip" data-cursor>Midjourney</span>
				<span class="chip" data-cursor>Claude</span>
			</div>
			<div class="langs">
				<span class="langs__label">Languages</span>
				<span class="langs__value">English · Hindi · Marathi · Sanskrit</span>
			</div>
		</div>
	</section>
</main>

<!-- ===== CONTACT / FOOTER ===== -->
<footer id="contact" class="contact section--dark" data-dark>
	<div class="contact__inner section">
		<span class="eyebrow eyebrow--accent" data-reveal>Let's work together</span>
		<h2 class="contact__title" data-reveal>From a business<br />to a <em>brand.</em></h2>
		<a href="mailto:ananditawagh@gmail.com" class="contact__email" data-magnetic data-cursor>
			ananditawagh@gmail.com
			<span aria-hidden="true">↗</span>
		</a>

		<div class="contact__bar">
			<span class="contact__copyright">© 2026 Anandita Wagh — Bengaluru / Pune</span>
			<div class="contact__social">
				<a
					href="https://linkedin.com/in/ananditawagh"
					target="_blank"
					rel="noopener"
					class="contact__sociallink"
					data-cursor>LinkedIn ↗</a
				>
				<a
					href="https://behance.net/ananditawagh"
					target="_blank"
					rel="noopener"
					class="contact__sociallink"
					data-cursor>Behance ↗</a
				>
				<a href="mailto:ananditawagh@gmail.com" class="contact__sociallink" data-cursor>Email ↗</a>
			</div>
		</div>
	</div>
</footer>
