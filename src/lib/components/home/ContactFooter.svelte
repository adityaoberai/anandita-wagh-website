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
			<p class="footer__location">{footer.location}</p>
		</div>

		{#each footer.columns as column (column.title)}
			<nav class="footer__column" aria-labelledby="footer-{column.title}">
				<h4 class="footer__column-title" id="footer-{column.title}">{column.title}</h4>
				<ul class="footer__links">
					{#each column.links as link (link.href)}
						<li>
							{#if link.download}
								<a href={link.href} download={site.resume.filename}>{link.label}</a>
							{:else}
								<a href={link.href} target="_blank" rel="noopener">{link.label}</a>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
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
		gap: clamp(28px, 3vw, 44px) clamp(32px, 6vw, 96px);
		align-items: start;
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
	}

	/* The sign-off is set to break in exactly two lines, so its column gets the
	   room to hold them rather than an equal third. */
	@media (min-width: 860px) {
		.footer__inner {
			grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	.footer__heading {
		margin-bottom: 14px;
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(28px, 4.4vw, 52px);
		line-height: 1.02;
		letter-spacing: -0.03em;
	}

	.footer__email {
		font-size: clamp(16px, 1.7vw, 18px);
		font-weight: 600;
	}

	.footer__location {
		margin-top: 10px;
		max-width: 34ch;
		font-size: 16px;
		line-height: 1.55;
		text-wrap: pretty;
	}

	.footer__column,
	.footer__links {
		display: flex;
		flex-direction: column;
		gap: 12px;
		font-size: 16px;
		font-weight: 500;
	}

	.footer__column-title {
		margin-bottom: 2px;
		font-family: var(--display);
		font-weight: 600;
		font-size: 19px;
		letter-spacing: -0.015em;
	}

	.footer__colophon {
		max-width: var(--maxw);
		margin: clamp(36px, 5vw, 56px) auto 0;
		padding-top: clamp(18px, 2.4vw, 26px);
		border-top: var(--rule);
		font-size: 14px;
	}
</style>
