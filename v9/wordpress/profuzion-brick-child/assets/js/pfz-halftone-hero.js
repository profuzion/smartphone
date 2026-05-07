/**
 * Profuzion v6 — vanilla Three.js halftone hero (ported from src/app/v2/_three/halftone-shader.tsx).
 * Requires global THREE (enqueue three.min.js before this file).
 * Mount: optional [data-pfz-halftone] inside #top; otherwise a mount node is created.
 * Pointer mapping uses full #top bounds (same as v2 window pointer listener).
 */
(function () {
	"use strict";
	if (typeof window.THREE === "undefined") {
		return;
	}

	var THREE = window.THREE;

	var VERT =
		"varying vec2 vUv;\n" +
		"void main() {\n" +
		"  vUv = uv;\n" +
		"  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n" +
		"}\n";

	var FRAG =
		"precision highp float;\n" +
		"varying vec2 vUv;\n" +
		"uniform float uTime;\n" +
		"uniform vec2  uMouse;\n" +
		"uniform vec2  uRes;\n" +
		"uniform float uScroll;\n" +
		"uniform float uReduced;\n" +
		"uniform vec3 uPaper;\n" +
		"uniform vec3 uInk;\n" +
		"uniform vec3 uAmber;\n" +
		"float hash21(vec2 p){\n" +
		"  p = fract(p * vec2(123.34, 456.21));\n" +
		"  p += dot(p, p + 34.345);\n" +
		"  return fract(p.x * p.y);\n" +
		"}\n" +
		"float noise2(vec2 p){\n" +
		"  vec2 i = floor(p), f = fract(p);\n" +
		"  float a = hash21(i);\n" +
		"  float b = hash21(i + vec2(1.0, 0.0));\n" +
		"  float c = hash21(i + vec2(0.0, 1.0));\n" +
		"  float d = hash21(i + vec2(1.0, 1.0));\n" +
		"  vec2 u = f*f*(3.0-2.0*f);\n" +
		"  return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;\n" +
		"}\n" +
		"void main(){\n" +
		"  vec2 frag = vUv * uRes;\n" +
		"  float spacing = 22.0;\n" +
		"  vec2 cell = floor(frag / spacing);\n" +
		"  vec2 c    = (cell + 0.5) * spacing;\n" +
		"  vec2 d    = frag - c;\n" +
		"  float t = uReduced > 0.5 ? 0.0 : uTime;\n" +
		"  float baseR = spacing * 0.18 + 0.6 * sin(t * 0.5 + cell.x * 0.18 + cell.y * 0.13);\n" +
		"  vec2 mousePx = uMouse * uRes;\n" +
		"  float dToMouse = length(c - mousePx);\n" +
		"  float mouseFalloff = exp(-dToMouse / 240.0);\n" +
		"  float mouseLift = 6.0 * mouseFalloff;\n" +
		"  float scrollLift = 0.6 * sin(uScroll * 6.28 + cell.y * 0.05) * (1.0 - uReduced);\n" +
		"  float n = noise2(cell * 0.18 + vec2(t * 0.06, -t * 0.04));\n" +
		"  float noiseLift = 1.0 * (n - 0.5);\n" +
		"  float r = baseR + mouseLift + scrollLift + noiseLift;\n" +
		"  r = max(r, 0.0);\n" +
		"  float ring = smoothstep(r, r - 1.4, length(d));\n" +
		"  float g = (hash21(frag) - 0.5) * 0.02;\n" +
		"  vec2 uvc = vUv - 0.5;\n" +
		"  float vignette = 1.0 - dot(uvc, uvc) * 0.4;\n" +
		"  vec3 paper = uPaper * vignette + g;\n" +
		"  vec3 dotBase = mix(mix(uPaper, uInk, 0.55), uInk, mouseFalloff);\n" +
		"  vec3 dotColor = mix(dotBase, uAmber, mouseFalloff * 0.98);\n" +
		"  float opacity = mix(0.88, 1.0, mouseFalloff);\n" +
		"  vec3 col = mix(paper, dotColor, ring * opacity);\n" +
		"  float glow = mouseFalloff * 0.1;\n" +
		"  col = mix(col, uAmber, glow);\n" +
		"  gl_FragColor = vec4(col, 1.0);\n" +
		"}\n";

	var hero = document.getElementById("top");
	if (!hero) {
		return;
	}

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		hero.classList.add("pfz-halftone--static");
		return;
	}

	var mount = hero.querySelector("[data-pfz-halftone]");
	if (!mount) {
		mount = document.createElement("div");
		mount.setAttribute("data-pfz-halftone", "");
		mount.className = "pfz-hero__halftone";
		mount.setAttribute("aria-hidden", "true");
		hero.insertBefore(mount, hero.firstChild);
	}

	var renderer;
	var scene;
	var camera;
	var mesh;
	var mat;
	var uniforms;
	var clock;
	var raf = 0;
	var ro;
	var mouseTarget = { x: 0.5, y: 0.5 };

	function onScroll() {
		if (uniforms) {
			uniforms.uScroll.value = Math.min(window.scrollY / 1400, 1);
		}
	}

	function onPointerMove(e) {
		var r = hero.getBoundingClientRect();
		if (r.width <= 0 || r.height <= 0) {
			return;
		}
		if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
			return;
		}
		mouseTarget.x = (e.clientX - r.left) / r.width;
		mouseTarget.y = 1 - (e.clientY - r.top) / r.height;
	}

	function getDpr() {
		return Math.min(window.devicePixelRatio || 1, 1.6);
	}

	function teardown() {
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("pointermove", onPointerMove);
		if (ro) {
			ro.disconnect();
		}
		if (raf) {
			cancelAnimationFrame(raf);
			raf = 0;
		}
		if (renderer) {
			renderer.dispose();
			renderer = null;
		}
		if (mesh) {
			if (mesh.geometry) {
				mesh.geometry.dispose();
			}
			if (mesh.material) {
				mesh.material.dispose();
			}
			mesh = null;
		}
		scene = null;
		camera = null;
		mat = null;
		uniforms = null;
	}

	function build(w, h) {
		var dpr = getDpr();
		renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: false,
			powerPreference: "high-performance",
		});
		renderer.setPixelRatio(dpr);
		renderer.setSize(w, h, false);
		renderer.domElement.style.display = "block";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		mount.innerHTML = "";
		mount.appendChild(renderer.domElement);

		scene = new THREE.Scene();
		var halfW = w / 2;
		var halfH = h / 2;
		camera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 0.1, 100);
		camera.position.z = 10;

		var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		uniforms = {
			uTime: { value: 0 },
			uMouse: { value: new THREE.Vector2(0.5, 0.5) },
			uRes: { value: new THREE.Vector2(w * dpr, h * dpr) },
			uScroll: { value: 0 },
			uReduced: { value: reduced ? 1 : 0 },
			uPaper: { value: new THREE.Color("#0a0a0b") },
			uInk: { value: new THREE.Color("#d8d8dc") },
			uAmber: { value: new THREE.Color("#b6ff38") },
		};

		mat = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG,
		});
		var planeGeo = new THREE.PlaneGeometry(w, h);
		mesh = new THREE.Mesh(planeGeo, mat);
		scene.add(mesh);
		clock = new THREE.Clock();
		onScroll();
	}

	function resize() {
		var w = mount.clientWidth;
		var h = mount.clientHeight;
		if (!renderer || w < 32 || h < 32) {
			return;
		}
		var dpr = getDpr();
		var halfW = w / 2;
		var halfH = h / 2;
		camera.left = -halfW;
		camera.right = halfW;
		camera.top = halfH;
		camera.bottom = -halfH;
		camera.updateProjectionMatrix();
		renderer.setPixelRatio(dpr);
		renderer.setSize(w, h, false);
		uniforms.uRes.value.set(w * dpr, h * dpr);
		if (mesh && mesh.geometry) {
			mesh.geometry.dispose();
		}
		mesh.geometry = new THREE.PlaneGeometry(w, h);
	}

	function tick() {
		raf = requestAnimationFrame(tick);
		if (!uniforms || !renderer || !scene || !camera) {
			return;
		}
		uniforms.uTime.value = clock.getElapsedTime();
		var m = uniforms.uMouse.value;
		m.x += (mouseTarget.x - m.x) * 0.06;
		m.y += (mouseTarget.y - m.y) * 0.06;
		renderer.render(scene, camera);
	}

	function tryStart() {
		var w = mount.clientWidth;
		var h = mount.clientHeight;
		if (w < 32 || h < 32) {
			return;
		}
		if (renderer) {
			resize();
			return;
		}
		build(w, h);
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		tick();
	}

	ro = new ResizeObserver(function () {
		if (renderer) {
			resize();
		} else {
			tryStart();
		}
	});
	ro.observe(mount);
	tryStart();

	window.addEventListener(
		"beforeunload",
		function () {
			teardown();
		},
		{ once: true },
	);
})();
