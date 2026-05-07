/**
 * Homepage behaviours (Bricks-safe — never rely on inline <script> in HTML blocks).
 * - Industries: each slot `[data-ind-slot]` (list item wrapper + row button) — `click` toggles `.is-active` on matching preview cards.
 * - Websites: IntersectionObserver on slots → sticky mockup / URL / dots.
 * - Nav: section scroll-spy — mirrors src/app/v2/_components/nav.tsx (IO band + pill/sheet `.is-active`).
 */
(function () {
	"use strict";

	function init() {
		setTimeout(function () {
			var first = document.querySelector("[data-word]");
			if (!first) return;
			var op = parseFloat(window.getComputedStyle(first).opacity);
			if (op > 0.05) return;
			var sels =
				"[data-word],[data-hero-meta],[data-hero-cta],[data-ind-meta],[data-brand-meta],[data-brand-spread],[data-web-meta],[data-pr-meta],[data-pr-row],[data-eng-meta],[data-eng-card],[data-cta-el],[data-quote-word],[data-pz-fade]";
			if (window.gsap) {
				try {
					window.gsap.killTweensOf(sels);
				} catch (e) {}
				try {
					window.gsap.set(sels, { clearProps: "all" });
				} catch (e) {}
			}
			document.querySelectorAll(sels).forEach(function (el) {
				el.style.opacity = "";
				el.style.transform = "";
				el.style.filter = "";
				el.style.translate = "";
				el.style.rotate = "";
				el.style.scale = "";
			});
		}, 200);

		function industriesResolveContainer(el) {
			if (!el || !el.closest) return null;
			return (
				el.closest("[data-ind-root]") ||
				el.closest(".pfz-home__ind-body") ||
				el.closest(".pfz-home__shell") ||
				el.closest("#industries")
			);
		}

		function industriesSetActiveById(id, container) {
			if (!id || !container) return;
			var stack = container.querySelector(".pfz-home__ind-preview-stack");
			var cards = stack ? stack.querySelectorAll("[data-ind-preview-card]") : [];
			var rows = container.querySelectorAll("[data-ind-row]");
			if (!rows.length || !cards.length) return;

			rows.forEach(function (r) {
				var on = r.getAttribute("data-ind-row") === id;
				r.classList.toggle("is-active", on);
				var meta = r.querySelector("[data-ind-row-meta]");
				if (meta) meta.textContent = on ? "viewing" : "view";
			});
			cards.forEach(function (c) {
				var on = c.getAttribute("data-ind-preview-card") === id;
				c.classList.toggle("is-active", on);
				c.setAttribute("aria-hidden", on ? "false" : "true");
			});
		}

		function industriesEnsureSlotNodes() {
			var slots = document.querySelectorAll("[data-ind-slot]");
			if (slots.length) return slots;
			document
				.querySelectorAll(".pfz-home__ind-list > li, .pfz-home__ind-list > .pfz-home__ind-slot")
				.forEach(function (li) {
					var btn = li.querySelector("[data-ind-row]");
					var rid = btn && btn.getAttribute("data-ind-row");
					if (rid) li.setAttribute("data-ind-slot", rid);
				});
			return document.querySelectorAll("[data-ind-slot]");
		}

		function industriesActivateSlotEl(slotEl) {
			if (!slotEl) return;
			var id = slotEl.getAttribute("data-ind-slot");
			var container = industriesResolveContainer(slotEl);
			if (!id || !container) return;
			industriesSetActiveById(id, container);
		}

		function industriesSeed() {
			document.querySelectorAll(".pfz-home__ind-preview-stack").forEach(function (stack) {
				var container =
					stack.closest("[data-ind-root]") ||
					stack.closest(".pfz-home__ind-body") ||
					stack.closest(".pfz-home__shell") ||
					stack.closest("#industries");
				if (!container) return;
				var rows = container.querySelectorAll("[data-ind-row]");
				var cards = stack.querySelectorAll("[data-ind-preview-card]");
				if (!rows.length || !cards.length) return;
				var seedRow = container.querySelector("[data-ind-row].is-active") || rows[0];
				var seedId = seedRow && seedRow.getAttribute("data-ind-row");
				if (seedId) industriesSetActiveById(seedId, container);
			});
		}

		function initNavSectionSpy() {
			var navRoot = document.querySelector("[data-nav-root]");
			if (!navRoot) return;

			var ids = [
				"industries",
				"about",
				"branding",
				"websites",
				"process",
				"engagements",
				"contact",
			];

			function setActiveSection(id) {
				document
					.querySelectorAll(
						"[data-nav-pills] a[data-section], [data-nav-sheet] a[data-section]",
					)
					.forEach(function (a) {
						var on = a.getAttribute("data-section") === id;
						a.classList.toggle("is-active", on);
						if (on) a.setAttribute("aria-current", "true");
						else a.removeAttribute("aria-current");
					});
			}

			var sections = ids
				.map(function (id) {
					return document.getElementById(id);
				})
				.filter(Boolean);

			if (!sections.length) return;

			setActiveSection(ids[0]);

			if (!window.IntersectionObserver) {
				function activationY() {
					var h = navRoot.getBoundingClientRect().height || 72;
					return h + 12;
				}
				function computeActiveId() {
					var yLine = activationY();
					var hit = ids[0];
					for (var i = 0; i < ids.length; i++) {
						var id = ids[i];
						var el = document.getElementById(id);
						if (!el) continue;
						if (el.getBoundingClientRect().top <= yLine) hit = id;
					}
					return hit;
				}
				var scheduled = false;
				function flush() {
					scheduled = false;
					setActiveSection(computeActiveId());
				}
				function onScrollOrResize() {
					if (!scheduled) {
						scheduled = true;
						requestAnimationFrame(flush);
					}
				}
				flush();
				window.addEventListener("scroll", onScrollOrResize, { passive: true });
				window.addEventListener("resize", onScrollOrResize, { passive: true });
				return;
			}

			var io = new IntersectionObserver(
				function (entries) {
					var visible = entries
						.filter(function (e) {
							return e.isIntersecting;
						})
						.sort(function (a, b) {
							return b.intersectionRatio - a.intersectionRatio;
						});
					if (visible[0]) setActiveSection(visible[0].target.id);
				},
				{
					rootMargin: "-45% 0px -45% 0px",
					threshold: [0, 0.2, 0.5, 1],
				},
			);

			sections.forEach(function (s) {
				io.observe(s);
			});
		}

		initNavSectionSpy();

		var indSlots = industriesEnsureSlotNodes();

		indSlots.forEach(function (slot) {
			slot.addEventListener(
				"click",
				function () {
					industriesActivateSlotEl(slot);
				},
				false,
			);
		});

		industriesSeed();
		requestAnimationFrame(industriesSeed);
		setTimeout(industriesSeed, 400);
		var webSlots = document.querySelectorAll("[data-web-slot]");
		var webMockups = document.querySelectorAll("[data-web-mockup]");
		var webDots = document.querySelectorAll("[data-web-dot]");
		var webUrlEl = document.querySelector("[data-web-url]");
		var webCounter = document.querySelector("[data-web-counter]");
		var total = webMockups.length;
		function setWebActive(idx, url) {
			webMockups.forEach(function (m, i) {
				m.classList.toggle("is-active", i === idx);
			});
			webDots.forEach(function (d, i) {
				d.classList.toggle("is-active", i === idx);
			});
			if (webUrlEl && url) webUrlEl.textContent = url;
			if (webCounter) {
				var n = String(idx + 1).padStart(2, "0");
				var t = String(total).padStart(2, "0");
				webCounter.textContent = "case " + n + " / " + t;
			}
		}
		if ("IntersectionObserver" in window && webSlots.length) {
			var io = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (e) {
						if (e.isIntersecting) {
							var idx = Number(e.target.getAttribute("data-idx"));
							var url = e.target.getAttribute("data-url") || "";
							if (!Number.isNaN(idx)) setWebActive(idx, url);
						}
					});
				},
				{ rootMargin: "-45% 0px -45% 0px", threshold: 0 },
			);
			webSlots.forEach(function (s) {
				io.observe(s);
			});
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
