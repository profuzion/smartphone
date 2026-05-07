/**
 * Profuzion v6 — GSAP + ScrollTrigger patterns aligned with v2 preview sections.
 * Requires gsap + ScrollTrigger (enqueued before this file).
 * Markup hooks (add in Bricks via HTML attributes):
 *   Hero (#top): [data-word], [data-hero-meta], [data-hero-cta]
 *   Industries (#industries): [data-ind-meta], [data-ind-row]
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

	var hero = document.getElementById("top");
	if (hero) {
		var words = hero.querySelectorAll("[data-word]");
		if (words.length) {
			gsap.from(words, {
				opacity: 0,
				y: 28,
				filter: "blur(10px)",
				duration: 1.0,
				ease: "expo.out",
				stagger: 0.06,
				delay: 0.15,
			});
		}
		var meta = hero.querySelectorAll("[data-hero-meta]");
		if (meta.length) {
			gsap.from(meta, {
				opacity: 0,
				y: 14,
				duration: 0.7,
				ease: "expo.out",
				stagger: 0.08,
				delay: 0.3,
			});
		}
		var cta = hero.querySelectorAll("[data-hero-cta]");
		if (cta.length) {
			gsap.from(cta, {
				opacity: 0,
				y: 14,
				duration: 0.65,
				ease: "expo.out",
				stagger: 0.08,
				delay: 0.5,
			});
		}
	}

	var ind = document.getElementById("industries");
	if (ind) {
		var indMeta = ind.querySelectorAll("[data-ind-meta]");
		if (indMeta.length) {
			gsap.from(indMeta, {
				opacity: 0,
				y: 18,
				duration: 0.7,
				ease: "expo.out",
				scrollTrigger: { trigger: ind, start: "top 75%" },
			});
		}
		var rows = ind.querySelectorAll("[data-ind-row]");
		if (rows.length) {
			gsap.from(rows, {
				opacity: 0,
				x: -16,
				duration: 0.55,
				ease: "expo.out",
				stagger: 0.07,
				scrollTrigger: { trigger: ind, start: "top 70%" },
			});
		}
	}
})();
