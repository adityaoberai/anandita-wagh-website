<script>
	import { services } from '$lib/content/index.js';

	const { process, engagements, audience, cta } = services;
</script>

<section id="services" class="section section--cream">
	<div class="section__inner">
		<div class="pitch">
			<div>
				<h2 class="pitch__title">
					{#each services.heading as line, i (line)}{#if i > 0}<br />{/if}{line}{/each}
				</h2>
				<p class="pitch__standfirst">{services.standfirst}</p>
			</div>

			<div class="card card--yellow process">
				<p class="process__title">{process.heading}</p>

				<ol class="process__steps">
					{#each process.steps as step, i (step.no)}
						<li class="step">
							<span class="step__rail" aria-hidden="true">
								<span class="step__dot"></span>
								<!-- The rail stops at the last dot rather than trailing off. -->
								{#if i < process.steps.length - 1}
									<span class="step__line"></span>
								{/if}
							</span>
							<span class="step__label">
								<span class="step__no">{step.no}</span>
								<span class="step__name">{step.name}</span>
							</span>
						</li>
					{/each}
				</ol>

				<ul class="terms">
					{#each process.terms as term (term)}
						<li><span aria-hidden="true">→</span><span>{term}</span></li>
					{/each}
				</ul>
			</div>
		</div>

		<h3 class="subhead">{engagements.heading}</h3>
		<div class="engagements">
			{#each engagements.items as item (item.no)}
				<div class="card engagement">
					<span class="engagement__no">{item.no}</span>
					<h4 class="engagement__name">{item.name}</h4>
					<p class="prose">{item.what}</p>
					<ul class="dot-list engagement__list">
						{#each item.items as line (line)}
							<li><span>{line}</span></li>
						{/each}
					</ul>
					<p class="engagement__price">
						<span class="engagement__amount">{item.price}</span>
						<span class="engagement__unit">{item.unit}</span>
					</p>
				</div>
			{/each}
		</div>

		<div class="audience">
			<h3 class="subhead">{audience.heading}</h3>
			<div class="audience__grid">
				{#each audience.groups as group (group.name)}
					<div class="card group">
						<h4 class="group__name">{group.name}</h4>
						<ul class="dot-list">
							{#each group.items as line (line)}
								<li><span>{line}</span></li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<div class="card card--yellow enquiry">
			<div>
				<h3 class="enquiry__heading">{cta.heading}</h3>
				<p class="enquiry__body">{cta.body}</p>
			</div>
			<a class="pill enquiry__cta" href={cta.href}>{cta.label}</a>
		</div>
	</div>
</section>

<style>
	.pitch {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: clamp(24px, 4vw, 56px);
		align-items: start;
		margin-bottom: clamp(44px, 6vw, 76px);
	}

	.pitch__title {
		margin-bottom: 16px;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(32px, 5.4vw, 64px);
		line-height: 0.98;
		letter-spacing: -0.035em;
	}

	.pitch__standfirst {
		max-width: 44ch;
		font-size: clamp(16px, 1.9vw, 19px);
		line-height: 1.5;
		color: var(--muted);
		text-wrap: pretty;
	}

	/* ----- process ----- */
	.process {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.process__title {
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(18px, 2.2vw, 22px);
		letter-spacing: -0.02em;
	}

	.process__steps {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		display: flex;
		gap: 14px;
		align-items: stretch;
	}

	.step__rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 5px;
	}

	.step__dot {
		width: 12px;
		height: 12px;
		flex: none;
		border: var(--rule);
		border-radius: 50%;
		background: var(--cream);
	}

	.step__line {
		width: 2px;
		flex: 1;
		background: var(--ink);
	}

	.step__label {
		display: flex;
		align-items: baseline;
		gap: 9px;
		padding-bottom: 14px;
		font-family: var(--display);
	}

	.step__no {
		font-weight: 700;
		font-size: 14px;
	}

	.step__name {
		font-weight: 600;
		font-size: 17px;
		letter-spacing: -0.015em;
	}

	.terms {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 16px;
		border-top: var(--rule);
		font-size: 15px;
		line-height: 1.45;
	}

	.terms li {
		display: flex;
		gap: 10px;
	}

	.terms li span:first-child {
		font-weight: 700;
	}

	/* ----- what I make / who it's for ----- */
	.subhead {
		margin-bottom: clamp(22px, 3vw, 32px);
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(22px, 2.8vw, 30px);
		letter-spacing: -0.025em;
	}

	.engagements,
	.audience__grid {
		display: grid;
		gap: clamp(16px, 2.4vw, 28px);
	}

	.engagements {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.audience {
		margin-top: clamp(44px, 6vw, 76px);
	}

	.audience__grid {
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	.engagement,
	.group {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.engagement__no {
		font-family: var(--display);
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 0.1em;
	}

	.engagement__name {
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.4vw, 26px);
		letter-spacing: -0.02em;
	}

	.engagement__list {
		flex: 1;
		gap: 8px;
	}

	.engagement__price {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: baseline;
		padding-top: 12px;
		border-top: 1px solid var(--hairline);
	}

	.engagement__amount {
		font-family: var(--display);
		font-weight: 700;
		font-size: 19px;
	}

	.engagement__unit {
		font-size: 14px;
	}

	.group__name {
		font-family: var(--display);
		font-weight: 600;
		font-size: 19px;
		letter-spacing: -0.02em;
	}

	/* ----- enquiry ----- */
	.enquiry {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: center;
		justify-content: space-between;
		margin-top: clamp(44px, 6vw, 76px);
		padding: clamp(28px, 4vw, 48px);
	}

	.enquiry__heading {
		margin-bottom: 8px;
		font-family: var(--display);
		font-weight: 700;
		font-size: clamp(24px, 3.2vw, 34px);
		line-height: 1.06;
		letter-spacing: -0.03em;
	}

	.enquiry__body {
		max-width: 52ch;
		font-size: 16px;
		line-height: 1.5;
		text-wrap: pretty;
	}

	.enquiry__cta {
		padding: 16px 32px;
		font-family: var(--display);
		font-size: 17px;
	}

	.enquiry__cta:hover {
		background: var(--muted);
		color: var(--yellow);
	}

	@media (max-width: 760px) {
		.pitch {
			margin-bottom: 56px;
		}

		.audience,
		.enquiry {
			margin-top: 56px;
		}

		.subhead {
			margin-bottom: 26px;
		}

		.engagements,
		.audience__grid {
			gap: 20px;
		}

		.enquiry {
			padding: 32px 24px;
		}
	}
</style>
