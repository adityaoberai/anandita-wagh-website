<script>
	import { blogs } from '$lib/content/index.js';
</script>

<section id="writing" class="section section--cream">
	<div class="section__inner">
		<div class="section__lede">
			<h2 class="section__title">{blogs.heading}</h2>
			<p class="section__standfirst">{blogs.standfirst}</p>
		</div>

		<div class="posts">
			{#each blogs.items as post (post.href)}
				<a class="post" href={post.href} target="_blank" rel="noopener">
					<div class="post__cover" style={post.coverBg ? `background:${post.coverBg}` : undefined}>
						<img src={post.cover} alt="" loading="lazy" />
					</div>

					<div class="post__body">
						<p class="post__meta">{post.readingTime}</p>
						<h3 class="post__title">{post.title}</h3>
						<span class="post__cta">{blogs.readCta}</span>
					</div>
				</a>
			{/each}
		</div>

		<a class="rule-link posts__cta" href={blogs.cta.href} target="_blank" rel="noopener">
			{blogs.cta.label}
		</a>
	</div>
</section>

<style>
	/* Two posts sit side by side and a third would wrap under them, the same
	   way the project cards do. */
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: clamp(20px, 3vw, 32px);
	}

	.post {
		display: flex;
		flex-direction: column;
		border: var(--rule);
		border-radius: 24px;
		overflow: hidden;
		background: var(--paper);
		text-decoration: none;
		transition: background 0.2s ease;
	}

	.post:hover {
		background: var(--card-hover);
	}

	.post__cover {
		position: relative;
		flex: none;
		height: clamp(200px, 26vw, 300px);
		border-bottom: var(--rule);
		background: var(--yellow);
		overflow: hidden;
	}

	/* Filled, not letterboxed: the covers are cut to the frame's 2:1, so on
	   desktop this is a fit rather than a crop, and the shallower mobile frame
	   takes it off the sides. `coverBg` still shows while the image loads. */
	.post__cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	/* Titles run to different lengths, so the body takes the leftover height and
	   the link is pushed to the floor of it — the CTAs line up across the row
	   however many lines the title takes. */
	.post__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: clamp(20px, 3vw, 30px);
	}

	.post__meta {
		margin-bottom: 8px;
		font-family: var(--display);
		font-weight: 700;
		font-size: 13px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.post__title {
		margin-bottom: 18px;
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(20px, 2.4vw, 26px);
		line-height: 1.14;
		letter-spacing: -0.02em;
		text-wrap: pretty;
	}

	.post__cta {
		margin-top: auto;
		font-size: 15px;
		font-weight: 600;
	}

	.posts__cta {
		margin-top: clamp(24px, 3vw, 36px);
	}

	@media (max-width: 760px) {
		.posts {
			gap: 20px;
		}
	}
</style>
