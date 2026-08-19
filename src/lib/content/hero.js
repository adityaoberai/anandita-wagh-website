/* =========================================================================
   Hero.
   The name is set twice over: once as the huge backdrop wordmark, once small
   in the nav. Both read from `wordmark` so the two can never drift apart.
   ========================================================================= */

export const hero = {
	/** One line per entry, stacked and centred behind the photo. */
	wordmark: ["Hi, I'm", 'Anandita'],

	/**
	 * The photo swaps when the pointer is on it: buttoned-up by default, off
	 * duty underneath. The two crops differ (one portrait, one wider) — each is
	 * drawn at its own width and anchored to the same bottom edge, so the ground
	 * line holds and neither reaches past its own artwork.
	 */
	photos: {
		formal: {
			src: '/assets/hero/formal.webp',
			alt: 'Anandita Wagh',
			width: 1006,
			height: 1200
		},
		casual: {
			src: '/assets/hero/casual.webp',
			alt: 'Anandita Wagh off duty, holding her husky',
			width: 1200,
			height: 935
		}
	}
};
