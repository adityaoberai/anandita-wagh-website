<script>
	import { projects } from '$lib/content/index.js';
</script>

<section id="projects" class="section section--paper">
	<div class="section__inner">
		<h2 class="section__title section__lede">{projects.heading}</h2>

		<div class="projects">
			{#each projects.items as project (project.href)}
				<a class="project" href={project.href} target="_blank" rel="noopener">
					<div
						class="project__cover"
						style={project.coverBg ? `background:${project.coverBg}` : undefined}
					>
						{#if project.cover}
							<img src={project.cover} alt="" loading="lazy" />
						{:else}
							<!-- No cover art yet: set the title tone-on-tone, the same
							     treatment the hero gives the name. Reads as intent
							     rather than as a missing image. -->
							<span class="project__plate" aria-hidden="true">{project.name}</span>
						{/if}
					</div>

					<div class="project__body">
						<h3 class="project__name">{project.name}</h3>
						<p class="prose project__blurb">{project.blurb}</p>
						<span class="project__cta">{project.cta}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: clamp(20px, 3vw, 32px);
	}

	@media (max-width: 760px) {
		.projects {
			gap: 20px;
		}
	}

	.project {
		display: flex;
		flex-direction: column;
		border: var(--rule);
		border-radius: 24px;
		overflow: hidden;
		background: var(--cream);
		text-decoration: none;
		transition: background 0.2s ease;
	}

	.project:hover {
		background: var(--card-hover);
	}

	.project__cover {
		position: relative;
		flex: none;
		height: clamp(200px, 26vw, 300px);
		border-bottom: var(--rule);
		background: var(--yellow);
		overflow: hidden;
	}

	/* Contained, not cropped: these covers are composed artboards and losing
	   their edges loses the composition. The frame's backdrop is set per
	   project so the letterboxing reads as the artwork's own ground. */
	.project__cover img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}

	.project__plate {
		position: absolute;
		/* Enough room under the baseline for descenders to clear the rule. */
		inset: auto clamp(16px, 3vw, 28px) clamp(12px, 1.8vw, 20px);
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(38px, 6vw, 64px);
		line-height: 0.92;
		letter-spacing: -0.045em;
		color: var(--yellow-deep);
	}

	/* Blurbs run to different lengths, so the body takes the leftover height and
	   the CTA is pushed to the floor of it — titles line up at the top, links
	   line up at the bottom, however many lines sit between them. */
	.project__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: clamp(20px, 3vw, 30px);
	}

	.project__name {
		margin-bottom: 10px;
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.4vw, 26px);
		letter-spacing: -0.02em;
	}

	.project__blurb {
		margin-bottom: 14px;
	}

	.project__cta {
		margin-top: auto;
		font-size: 15px;
		font-weight: 600;
	}
</style>
