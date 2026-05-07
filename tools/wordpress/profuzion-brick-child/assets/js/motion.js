/**
 * Light ScrollTrigger pass for Bricks: add [data-pz-fade] or .p-fadeup on elements.
 * Depends on gsap + ScrollTrigger (enqueued in functions.php).
 */
(function () {
	"use strict";
	if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
		return;
	}
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	var gsap = window.gsap;
	gsap.registerPlugin(window.ScrollTrigger);

	var wrap = document.querySelector(".pfz");
	if (!wrap) {
		return;
	}

	/* Exclude preview cards + web slots — layout/interaction owns height & transforms */
	var nodes = wrap.querySelectorAll(
		"[data-pz-fade]:not(.pfz-home__ind-preview-card):not(.pfz-home__web-slot)",
	);
	if (!nodes.length) {
		return;
	}

	gsap.utils.toArray(nodes).forEach(function (el) {
		gsap.from(el, {
			opacity: 0,
			y: 14,
			duration: 0.7,
			ease: "power2.out",
			scrollTrigger: {
				trigger: el,
				start: "top 88%",
				toggleActions: "play none none none",
			},
		});
	});
})();
