<script>
	import { page } from '$app/state';
	import {
		CommunitiesSection,
		CompaniesSection,
		ContactFooter,
		DaisyCursor,
		HeroSection,
		NowSection,
		ProjectsSection,
		ServicesSection,
		SiteNav,
		TestimonialsSection
	} from '$lib/components/home/index.js';
	import { site } from '$lib/content/index.js';

	const pageTitle = `${site.name} — ${site.role}`;
	const ogAlt = `${site.name}, ${site.role.toLowerCase()} in ${site.location}`;

	// Absolute URLs so social crawlers (which ignore relative paths) resolve
	// the card and canonical on whatever domain the site is deployed to.
	const ogImage = $derived(`${page.url.origin}/og.png`);
	const canonical = $derived(page.url.href);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={site.metaDescription} />
	<meta name="author" content={site.name} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={site.socialDescription} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={ogAlt} />
	<link rel="canonical" href={canonical} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={site.socialDescription} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={ogAlt} />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<DaisyCursor />
<SiteNav />

<main id="main">
	<HeroSection />
	<NowSection />
	<CompaniesSection />
	<CommunitiesSection />
	<ProjectsSection />
	<ServicesSection />
	<TestimonialsSection />
</main>

<ContactFooter />
