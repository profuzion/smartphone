/**
 * Port of src/app/v2/_components/cursor.tsx — vanilla, body.profuzion-v2
 */
(function () {
	"use strict";
	if (typeof window === "undefined" || !document.body) {
		return;
	}
	if (window.matchMedia("(hover: none)").matches) {
		return;
	}

	var LERP = 0.22;
	var REST = 18;
	var HOT = 64;

	var root = document.getElementById("pz-cursor-root");
	if (!root) {
		root = document.createElement("div");
		root.id = "pz-cursor-root";
		root.setAttribute("aria-hidden", "true");
		document.body.appendChild(root);
	}

	var ring = document.createElement("div");
	ring.className = "pz-cursor-ring";
	ring.style.width = REST + "px";
	ring.style.height = REST + "px";
	var label = document.createElement("div");
	label.className = "pz-cursor-label";
	ring.appendChild(label);

	var dot = document.createElement("div");
	dot.className = "pz-cursor-dot";
	root.appendChild(ring);
	root.appendChild(dot);

	var target = { x: 0, y: 0 };
	var cursor = { x: 0, y: 0 };
	var hot = false;
	var raf = 0;

	function onMove(e) {
		target.x = e.clientX;
		target.y = e.clientY;
		var el = e.target && e.target.closest && e.target.closest("[data-cursor]");
		var isHot = !!el;
		hot = isHot;
		if (isHot && el) {
			var t = el.getAttribute("data-cursor-label");
			label.textContent = t || "";
			label.style.opacity = t ? "1" : "0";
		} else {
			label.textContent = "";
			label.style.opacity = "0";
		}
	}

	function tick() {
		cursor.x += (target.x - cursor.x) * LERP;
		cursor.y += (target.y - cursor.y) * LERP;
		var size = hot ? HOT : REST;
		ring.style.transform =
			"translate3d(" + (cursor.x - size / 2) + "px," + (cursor.y - size / 2) + "px,0)";
		ring.style.width = size + "px";
		ring.style.height = size + "px";
		if (hot) {
			ring.style.background = "var(--p-amber, #b6ff38)";
			ring.style.borderColor = "transparent";
		} else {
			ring.style.background = "transparent";
			ring.style.borderColor = "rgba(255,255,255,0.45)";
		}
		dot.style.transform =
			"translate3d(" + (target.x - 2) + "px," + (target.y - 2) + "px,0)";
		dot.style.opacity = hot ? "0" : "1";
		raf = window.requestAnimationFrame(tick);
	}

	window.addEventListener("pointermove", onMove, { passive: true });
	raf = window.requestAnimationFrame(tick);
})();
