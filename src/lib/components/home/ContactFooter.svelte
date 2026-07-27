<script>
	import { footer, site } from '$lib/content/index.js';
</script>

<footer class="footer">
	<div class="footer__inner">
		<div>
			<h2 class="footer__heading">
				{#each footer.heading as line, i (line)}{#if i > 0}<br />{/if}{line}{/each}
			</h2>
			<a class="footer__email" href="mailto:{site.email}">{site.email}</a>
		</div>

		{#each footer.columns as column, i (i)}
			<ul class="footer__column">
				{#each column as link (link.href)}
					<li>
						{#if link.download}
							<a href={link.href} download={site.resume.filename}>{link.label}</a>
						{:else}
							<a href={link.href} target="_blank" rel="noopener">{link.label}</a>
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	</div>

	<p class="footer__colophon">{footer.colophon}</p>
</footer>

<style>
	.footer {
		padding: clamp(56px, 8vw, 96px) var(--gutter);
		background: var(--yellow);
		border-top: var(--rule);
	}

	.footer__inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(24px, 4vw, 48px);
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
	}

	/* The sign-off is set to break in exactly two lines, so its column gets the
	   room to hold them rather than an equal third. */
	@media (min-width: 860px) {
		.footer__inner {
			grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	.footer__heading {
		margin-bottom: 14px;
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(30px, 4.6vw, 52px);
		line-height: 1;
		letter-spacing: -0.035em;
	}

	.footer__email {
		font-size: clamp(16px, 2vw, 20px);
		font-weight: 600;
	}

	.footer__column {
		display: flex;
		flex-direction: column;
		gap: 12px;
		font-size: 16px;
		font-weight: 500;
	}

	.footer__colophon {
		max-width: var(--maxw);
		margin: clamp(36px, 5vw, 56px) auto 0;
		font-size: 14px;
	}
</style>
