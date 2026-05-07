/**
 * Forces system cursor inside Bricks builder / preview before body and heavy JS run.
 * CSS string is inlined before this file by WordPress (`__PFZ_BRICKS_CURSOR_CSS`).
 */
(function () {
	"use strict";

	var STYLE_ID = "profuzion-bricks-builder-cursor-fix-js";
	var ATTR = "data-pfz-bricks-canvas";

	function getCss() {
		return typeof window.__PFZ_BRICKS_CURSOR_CSS === "string"
			? window.__PFZ_BRICKS_CURSOR_CSS
			: "";
	}

	function hasBuilderQuery() {
		try {
			var q = new URLSearchParams(window.location.search || "").get("bricks");
			if (!q) {
				return false;
			}
			q = String(q).toLowerCase();
			return (
				q === "run" ||
				q === "preview" ||
				q === "1" ||
				q === "true" ||
				q === "yes"
			);
		} catch (e) {
			return false;
		}
	}

	function bodyHintsBuilder(body) {
		if (!body || !body.classList) {
			return false;
		}
		if (body.classList.contains("profuzion-bricks-builder")) {
			return true;
		}
		if (body.classList.contains("bricks-is-builder")) {
			return true;
		}
		/* bricks-is-frontend is on normal Bricks pages — only trust it inside the editor iframe */
		if (
			window.self !== window.top &&
			body.classList.contains("bricks-is-frontend")
		) {
			return true;
		}
		var cn = body.className;
		var s =
			typeof cn === "string"
				? cn.toLowerCase()
				: body.classList && body.classList.value
					? String(body.classList.value).toLowerCase()
					: "";
		if (!s) {
			return false;
		}
		if (s.indexOf("bricks-is-builder") !== -1) {
			return true;
		}
		if (
			window.self !== window.top &&
			s.indexOf("bricks-is-frontend") !== -1
		) {
			return true;
		}
		return s.indexOf("bricks") !== -1 && s.indexOf("builder") !== -1;
	}

	function adminIframeLikelyBricks() {
		if (window.self === window.top) {
			return false;
		}
		try {
			var ref = document.referrer || "";
			if (!/\/wp-admin\//.test(ref)) {
				return false;
			}
			return (
				/post\.php/i.test(ref) ||
				/admin\.php/i.test(ref) ||
				/customize\.php/i.test(ref)
			);
		} catch (e) {
			return false;
		}
	}

	function shouldActivate() {
		if (hasBuilderQuery()) {
			return true;
		}
		if (document.body && bodyHintsBuilder(document.body)) {
			return true;
		}
		if (adminIframeLikelyBricks()) {
			return true;
		}
		return false;
	}

	var scheduled = false;
	function apply() {
		if (!shouldActivate()) {
			return;
		}
		document.documentElement.setAttribute(ATTR, "1");
		if (document.body) {
			document.body.classList.add("profuzion-bricks-builder");
		}

		var css = getCss();
		if (!css || document.getElementById(STYLE_ID)) {
			return;
		}
		var el = document.createElement("style");
		el.id = STYLE_ID;
		el.textContent = css;
		(document.head || document.documentElement).appendChild(el);
	}

	function scheduleApply() {
		if (scheduled) {
			return;
		}
		scheduled = true;
		window.requestAnimationFrame(function () {
			scheduled = false;
			apply();
		});
	}

	function watchBodyClass() {
		if (typeof MutationObserver === "undefined") {
			return;
		}
		var root = document.body;
		if (!root) {
			return;
		}
		var mo = new MutationObserver(function () {
			scheduleApply();
		});
		try {
			mo.observe(root, {
				attributes: true,
				attributeFilter: ["class"],
				subtree: false,
			});
		} catch (e) {}
	}

	function watchBodyAppear() {
		if (document.body) {
			watchBodyClass();
			return;
		}
		if (typeof MutationObserver === "undefined") {
			return;
		}
		var mo = new MutationObserver(function () {
			if (document.body) {
				mo.disconnect();
				apply();
				watchBodyClass();
			}
		});
		try {
			mo.observe(document.documentElement, { childList: true });
		} catch (e) {}
	}

	apply();

	if (document.readyState === "loading") {
		watchBodyAppear();
		document.addEventListener("DOMContentLoaded", function () {
			apply();
			watchBodyClass();
		});
	} else {
		watchBodyClass();
	}

	document.addEventListener("readystatechange", scheduleApply);
})();
