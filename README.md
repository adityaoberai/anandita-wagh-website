# anandita wagh — portfolio

A one-page portfolio for Anandita Wagh, graphic and brand designer. SvelteKit,
prerendered to static files by `@sveltejs/adapter-static`.

## Running it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # → build/
npm run preview  # serve the production build
npm run lint     # prettier --check + eslint
npm run format   # prettier --write
```

## How it's put together

Copy lives apart from markup. Every section reads from a module in
[`src/lib/content/`](src/lib/content) — change the words there, not in the
components:

| Module            | Section                                                     |
| ----------------- | ----------------------------------------------------------- |
| `site.js`         | name, links, résumé, page metadata, nav + footer link lists |
| `hero.js`         | the wordmark and the two hero portraits                     |
| `now.js`          | "What I'm doing now"                                        |
| `logos.js`        | both logo walls, plus the IxDF offer card                   |
| `projects.js`     | "Selected projects"                                         |
| `blogs.js`        | "Writing" — the Substack posts                              |
| `services.js`     | "Let's work together" — process and offer                   |
| `testimonials.js` | "Kind words"                                                |
| `footer.js`       | the sign-off                                                |

Sections live in [`src/lib/components/home/`](src/lib/components/home), one file
each, with their own styles. [`src/app.css`](src/app.css) holds the tokens, the
reset and the few primitives shared across sections (`.section`, `.card`,
`.pill`, `.rule-link`, `.dot-list`).

A couple of conventions worth knowing:

- **Logo heights are optical weights, not measurements.** A round crest and a
  wide wordmark at the same pixel height do not read as the same size, so each
  mark in `logos.js` carries the height that makes it sit evenly with its
  neighbours. `LogoWall.svelte` scales the whole wall from one constant.
- **Copy with an inline link** is written as an array of parts — strings are
  text, objects are anchors — and rendered by `RichText.svelte`, so no content
  module has to contain markup.
- **Social glyphs are inlined** in `src/lib/social-icons.js` rather than fetched
  from a CDN, and take their colour from the surrounding text.

## Images

Source exports (portraits, client logos) are design files and are not in the
repo. `npm run assets` crops each one to its ink, scales it for the web and
writes WebP into `static/assets/`:

```sh
ASSET_SRC="$HOME/Downloads/Personal Website" npm run assets
```

The heights in `logos.js` assume this crop — a logo dropped in with its original
transparent padding will render far too small. Re-run after adding or replacing
one, and see [`scripts/prepare-assets.js`](scripts/prepare-assets.js) for the
file list.

## Social card

`npm run og` renders `static/og.png` (1200×630) with satori + resvg, pulling its
colours from the `:root` block in `app.css` and its copy from `site.js`. Re-run
it after changing either.
