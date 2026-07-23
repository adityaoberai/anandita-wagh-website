<script>
	import { contact, site } from '$lib/content/index.js';

	const copyright = `© ${site.copyrightYear} ${site.name} — ${site.location}`;
</script>

<footer id="contact" class="contact section--dark" data-dark>
	<div class="contact__inner section">
		<span class="eyebrow eyebrow--accent" data-reveal>{contact.eyebrow}</span>
		<h2 class="contact__title" data-reveal>
			{#each contact.title.lines as line, i (i)}{line}{#if i < contact.title.lines.length - 1}<br
					/>{/if}{/each}<em>{contact.title.em}</em>
		</h2>
		<div class="contact__actions">
			<a href="mailto:{site.email}" class="contact__email" data-magnetic data-cursor>
				{site.email}
				<span aria-hidden="true">↗</span>
			</a>
			<a
				href={contact.secondaryCta.href}
				class="contact__resume"
				target="_blank"
				rel="noopener noreferrer"
				data-cursor
			>
				{contact.secondaryCta.label}
				<span aria-hidden="true">↗</span>
			</a>
		</div>

		<div class="contact__bar">
			<span class="contact__copyright">{copyright}</span>
			<div class="contact__social">
				{#each site.social as link (link.href)}
					<a
						href={link.href}
						class="contact__sociallink"
						data-cursor
						target={link.external ? '_blank' : null}
						rel={link.external ? 'noopener' : null}
					>
						{link.label} ↗
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
