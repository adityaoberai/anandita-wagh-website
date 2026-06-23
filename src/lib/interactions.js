/* =========================================================================
   Anandita Wagh — Portfolio interactions
   Ported verbatim from the static site's script.js, wrapped as a single
   init function that runs in onMount and returns a teardown so it stays
   clean across client-side navigation / HMR. Behaviour is identical:
   scroll reveal · count-up · nav scroll state · magnetic · card tilt ·
   rocket cursor · accessible mobile menu.
   ========================================================================= */

/**
 * Initialise all portfolio interactions against the live DOM.
 * @returns {() => void} teardown that removes every listener / observer / RAF.
 */
export function initInteractions() {
	// Guard: only runs in the browser (onMount is client-only, but be safe).
	if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

	var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var finePointer = window.matchMedia('(pointer: fine)').matches;

	/** @type {Array<() => void>} */
	var cleanups = [];
	var on = function (target, type, handler, opts) {
		target.addEventListener(type, handler, opts);
		cleanups.push(function () {
			target.removeEventListener(type, handler, opts);
		});
	};

	setupReveal();
	setupCounters();
	setupNavScroll();
	setupMobileMenu();
	if (finePointer && !prefersReduced) {
		setupMagnetic();
		setupTilt();
		setupCursor();
	}

	return function teardown() {
		cleanups.forEach(function (fn) {
			fn();
		});
		cleanups = [];
	};

	/* ---------- Scroll reveal ---------- */
	function setupReveal() {
		var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
		if (!els.length) return;

		if (prefersReduced || !('IntersectionObserver' in window)) {
			els.forEach(function (el) {
				el.classList.add('is-visible');
			});
			return;
		}

		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						io.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
		);

		els.forEach(function (el) {
			io.observe(el);
		});
		cleanups.push(function () {
			io.disconnect();
		});

		// Safety: never leave content hidden if observation misbehaves.
		var t = setTimeout(function () {
			els.forEach(function (el) {
				el.classList.add('is-visible');
			});
		}, 2500);
		cleanups.push(function () {
			clearTimeout(t);
		});
	}

	/* ---------- Count-up ---------- */
	function setupCounters() {
		var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
		if (!counters.length) return;

		function run(el) {
			if (el._counted) return;
			el._counted = true;
			var target = parseInt(el.getAttribute('data-count'), 10) || 0;
			if (prefersReduced) {
				el.textContent = target;
				return;
			}
			var dur = 1400;
			var start = null;
			function step(now) {
				if (start === null) start = now;
				var p = Math.min((now - start) / dur, 1);
				var eased = 1 - Math.pow(1 - p, 3);
				el.textContent = Math.round(target * eased);
				if (p < 1) requestAnimationFrame(step);
				else el.textContent = target;
			}
			requestAnimationFrame(step);
		}

		if (!('IntersectionObserver' in window)) {
			counters.forEach(run);
			return;
		}

		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						run(entry.target);
						io.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: '0px 0px -15% 0px', threshold: 0.01 }
		);

		counters.forEach(function (el) {
			io.observe(el);
		});
		cleanups.push(function () {
			io.disconnect();
		});

		var t = setTimeout(function () {
			counters.forEach(run);
		}, 2500);
		cleanups.push(function () {
			clearTimeout(t);
		});
	}

	/* ---------- Nav scrolled state ---------- */
	function setupNavScroll() {
		var nav = document.getElementById('nav');
		if (!nav) return;
		function onScroll() {
			nav.classList.toggle('is-scrolled', window.scrollY > 40);
		}
		on(window, 'scroll', onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Mobile menu ---------- */
	function setupMobileMenu() {
		var nav = document.getElementById('nav');
		var toggle = document.getElementById('nav-toggle');
		var menu = document.getElementById('nav-menu');
		if (!nav || !toggle || !menu) return;

		function setOpen(open) {
			nav.classList.toggle('is-open', open);
			toggle.setAttribute('aria-expanded', String(open));
			toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		}

		on(toggle, 'click', function () {
			setOpen(!nav.classList.contains('is-open'));
		});

		// Close when a menu link is chosen.
		on(menu, 'click', function (e) {
			if (e.target.closest('a')) setOpen(false);
		});

		on(document, 'keydown', function (e) {
			if (e.key === 'Escape' && nav.classList.contains('is-open')) {
				setOpen(false);
				toggle.focus();
			}
		});

		on(document, 'click', function (e) {
			if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false);
		});

		// Reset state if we cross back to the desktop layout.
		// Feature-detect: older MediaQueryList implementations (Safari <=13) lack
		// addEventListener and would throw, aborting the rest of init().
		var desktopMq = window.matchMedia('(min-width: 721px)');
		var onDesktopMq = function (ev) {
			if (ev.matches) setOpen(false);
		};
		if (desktopMq.addEventListener) {
			desktopMq.addEventListener('change', onDesktopMq);
			cleanups.push(function () {
				desktopMq.removeEventListener('change', onDesktopMq);
			});
		} else if (desktopMq.addListener) {
			desktopMq.addListener(onDesktopMq);
			cleanups.push(function () {
				desktopMq.removeListener(onDesktopMq);
			});
		}
	}

	/* ---------- Magnetic buttons ---------- */
	function setupMagnetic() {
		var strength = 0.35;
		document.querySelectorAll('[data-magnetic]').forEach(function (el) {
			el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
			on(el, 'mousemove', function (ev) {
				var r = el.getBoundingClientRect();
				var dx = ev.clientX - (r.left + r.width / 2);
				var dy = ev.clientY - (r.top + r.height / 2);
				el.style.transform = 'translate(' + dx * strength + 'px,' + dy * strength + 'px)';
			});
			on(el, 'mouseleave', function () {
				el.style.transform = 'translate(0,0)';
			});
		});
	}

	/* ---------- Card tilt ---------- */
	function setupTilt() {
		document.querySelectorAll('[data-tilt]').forEach(function (el) {
			on(el, 'mousemove', function (ev) {
				var r = el.getBoundingClientRect();
				var px = (ev.clientX - r.left) / r.width - 0.5;
				var py = (ev.clientY - r.top) / r.height - 0.5;
				el.style.transition = 'transform .1s ease';
				el.style.transform =
					'perspective(900px) rotateX(' +
					(-py * 4).toFixed(2) +
					'deg) rotateY(' +
					(px * 4).toFixed(2) +
					'deg) translateY(-4px)';
			});
			on(el, 'mouseleave', function () {
				el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
				el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
			});
		});
	}

	/* ---------- Rocket cursor ---------- */
	function setupCursor() {
		var ring = document.getElementById('cursor-ring');
		var dot = document.getElementById('cursor-dot');
		var rocket = document.getElementById('cursor-rocket');
		if (!rocket) return;

		document.body.classList.add('cursor-on');
		cleanups.push(function () {
			document.body.classList.remove('cursor-on');
		});
		if (ring) ring.style.display = 'none';
		if (dot) dot.style.display = 'none';

		var mx = window.innerWidth / 2,
			my = window.innerHeight / 2;
		var rx = mx,
			ry = my;
		var angle = -45;
		var restAngle = -45;
		var state = { hover: false, down: false };
		var raf = 0;

		function onMove(e) {
			mx = e.clientX;
			my = e.clientY;
			var t = e.target;
			state.hover = !!(t.closest && t.closest('a, button, [data-cursor], [data-magnetic], .chip'));
			rocket.style.opacity = '1';
		}
		on(window, 'mousemove', onMove);
		on(window, 'mousedown', function () {
			state.down = true;
		});
		on(window, 'mouseup', function () {
			state.down = false;
		});
		on(document, 'mouseleave', function () {
			rocket.style.opacity = '0';
		});
		on(document, 'mouseenter', function () {
			rocket.style.opacity = '1';
		});

		function loop() {
			var vx = mx - rx,
				vy = my - ry;
			rx += vx * 0.16;
			ry += vy * 0.16;
			var speed = Math.hypot(vx, vy);
			if (speed > 1.2) {
				var target = (Math.atan2(vy, vx) * 180) / Math.PI + 45;
				var diff = ((target - angle + 540) % 360) - 180;
				angle += diff * 0.22;
			} else {
				var rdiff = ((restAngle - angle + 540) % 360) - 180;
				angle += rdiff * 0.08;
			}
			var sc = (state.down ? 0.82 : 1) * (state.hover ? 1.32 : 1);
			rocket.style.transform =
				'translate(' +
				rx +
				'px,' +
				ry +
				'px) translate(-50%,-50%) rotate(' +
				angle.toFixed(1) +
				'deg) scale(' +
				sc +
				')';
			rocket.style.fontSize = state.hover ? '38px' : '30px';
			raf = requestAnimationFrame(loop);
		}
		loop();
		cleanups.push(function () {
			cancelAnimationFrame(raf);
		});
	}
}
