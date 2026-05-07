/**
 * Profuzion v2 → vanilla preview companion for bricks-build / v9 preview HTML ONLY.
 * Mirrors motion intent from src/app/v2 for local QA — NOT the primary WordPress runtime.
 *
 * Production WordPress: use profuzion-brick-child assets enqueued from functions.php
 * (see tools/wordpress/BRICKS-DEPLOY-KIT-V6.md — pfz-v6-animations.js, motion.js, halftone, etc.).
 *
 * Optional in WP: enqueue this file only if you deliberately want the flat-preview script stack;
 * prefer theme bundles so behavior stays aligned with wp:handoff.
 *
 * No React, no Tailwind, no bundler.
 *
 * Do not paste this whole script into Bricks as a substitute for native layout — keep JS thin
 * at the theme layer or a single footer hook unless Bricks explicitly documents otherwise.
 */
(function () {
  "use strict";

  var LERP = 0.22;
  var REST_SIZE = 18;
  var HOT_SIZE = 64;
  var LOADER_MS = 3800;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    var ring = document.querySelector(".pfz-cursor-ring");
    var dot = document.querySelector(".pfz-cursor-dot");
    var label =
      ring &&
      ring.querySelector(".pfz-cursor-ring__label");
    if (!ring || !dot) return;

    var target = { x: 0, y: 0 };
    var cursor = { x: 0, y: 0 };
    var hot = false;
    var labelText = "";

    function onMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      var el = e.target && e.target.closest && e.target.closest("[data-cursor]");
      hot = !!el;
      if (hot && el && label) {
        labelText = el.getAttribute("data-cursor-label") || "";
        label.textContent = labelText;
        label.style.opacity = labelText ? "1" : "0";
      } else if (label) {
        labelText = "";
        label.textContent = "";
        label.style.opacity = "0";
      }
    }

    var raf = 0;
    function tick() {
      cursor.x += (target.x - cursor.x) * LERP;
      cursor.y += (target.y - cursor.y) * LERP;
      var size = hot ? HOT_SIZE : REST_SIZE;
      ring.style.transform =
        "translate3d(" + (cursor.x - size / 2) + "px," + (cursor.y - size / 2) + "px,0)";
      ring.style.width = size + "px";
      ring.style.height = size + "px";
      ring.style.background = hot ? "var(--primary)" : "transparent";
      ring.style.borderColor = hot ? "transparent" : "rgba(255,255,255,0.45)";
      dot.style.transform =
        "translate3d(" + (target.x - 2) + "px," + (target.y - 2) + "px,0)";
      dot.style.opacity = hot ? "0" : "1";
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
  }

  function initLoader() {
    var el = document.querySelector(".pz-site-loader");
    if (!el) return;

    if (prefersReducedMotion()) {
      window.setTimeout(function () {
        el.classList.add("pz-site-loader--exiting");
        window.setTimeout(function () {
          el.remove();
        }, 280);
      }, 400);
      return;
    }

    window.setTimeout(function () {
      el.classList.add("pz-site-loader--exiting");
      var done = function () {
        el.remove();
        el.removeEventListener("transitionend", done);
      };
      el.addEventListener("transitionend", done);
      window.setTimeout(function () {
        if (el.parentNode) el.remove();
      }, 900);
    }, LOADER_MS);
  }

  function initIndustries() {
    var section = document.getElementById("industries");
    if (!section) return;

    var rows = section.querySelectorAll("[data-industry]");
    var panels = section.querySelectorAll("[data-industry-panel]");
    if (!rows.length || !panels.length) return;

    function setActive(id) {
      rows.forEach(function (row) {
        var match = row.getAttribute("data-industry") === id;
        row.classList.toggle("is-active", match);
      });
      panels.forEach(function (panel) {
        var match = panel.getAttribute("data-industry-panel") === id;
        panel.hidden = !match;
      });
    }

    var first = rows[0] && rows[0].getAttribute("data-industry");
    if (first) setActive(first);

    rows.forEach(function (row) {
      var id = row.getAttribute("data-industry");
      if (!id) return;
      row.addEventListener("pointerenter", function () {
        setActive(id);
      });
      row.addEventListener("focus", function () {
        setActive(id);
      });
      row.addEventListener("click", function () {
        setActive(id);
      });
    });
  }

  function initScrollReveal() {
    var nodes = document.querySelectorAll("[data-scroll-reveal]");
    if (!nodes.length) return;

    if (prefersReducedMotion()) {
      nodes.forEach(function (n) {
        n.classList.add("is-inview");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("is-inview");
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /**
   * §1 Hero — Canvas 2D halftone (no WebGL). Mirrors halftone-shader.tsx intent:
   * bone dots, chartreuse lift + tint near cursor, scroll ripple, soft vignette.
   */
  function initHeroHalftone() {
    if (prefersReducedMotion()) return;

    var section = document.querySelector(".pfz-home__hero");
    var canvas = document.querySelector(".pfz-home__hero-halftone-canvas");
    if (!section || !canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    section.classList.add("pfz-home__hero--halftone-canvas");

    var PAPER = [10, 10, 11];
    var INK = [216, 216, 220];
    var AMBER = [182, 255, 56];
    var SPACING = 22;
    var DPR_CAP = 1.6;
    var MOUSE_LERP = 0.06;

    function mix(a, b, t) {
      return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
      ];
    }
    function rgba(arr, al) {
      return (
        "rgba(" +
        Math.round(arr[0]) +
        "," +
        Math.round(arr[1]) +
        "," +
        Math.round(arr[2]) +
        "," +
        al +
        ")"
      );
    }
    function hash2(i, j) {
      var s = Math.sin(i * 127.1 + j * 311.7 + 41.2) * 43758.5453123;
      return s - Math.floor(s);
    }

    var mouseTarget = { x: 0.5, y: 0.5 };
    var mouseSmooth = { x: 0.5, y: 0.5 };
    var cssW = 1;
    var cssH = 1;
    var dpr = 1;
    var t0 = performance.now() * 0.001;
    var raf = 0;
    var visible = true;
    var docVisible = !document.hidden;

    function syncSize() {
      var rect = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      var bw = Math.max(1, Math.floor(cssW * dpr));
      var bh = Math.max(1, Math.floor(cssH * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
    }

    function scrollAmt() {
      return Math.min(window.scrollY / 1400, 1);
    }

    function onPointer(e) {
      var rect = section.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      mouseTarget.x = (e.clientX - rect.left) / rect.width;
      mouseTarget.y = 1 - (e.clientY - rect.top) / rect.height;
    }

    function drawFrame() {
      syncSize();
      var time = performance.now() * 0.001 - t0;
      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * MOUSE_LERP;
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * MOUSE_LERP;

      var mouseCssX = mouseSmooth.x * cssW;
      var mouseCssY = (1 - mouseSmooth.y) * cssH;
      var sc = scrollAmt();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var gx = cssW * 0.5;
      var gy = cssH * 0.48;
      var gr = Math.max(cssW, cssH) * 0.72;
      var vg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      vg.addColorStop(0, "rgb(10,10,12)");
      vg.addColorStop(0.72, "rgb(8,8,10)");
      vg.addColorStop(1, "rgb(5,5,7)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, cssW, cssH);

      var cols = Math.ceil(cssW / SPACING) + 2;
      var rows = Math.ceil(cssH / SPACING) + 2;

      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cellX = i * SPACING + SPACING * 0.5;
          var cellY = j * SPACING + SPACING * 0.5;
          var dToMouse = Math.hypot(cellX - mouseCssX, cellY - mouseCssY);
          var mouseFalloff = Math.exp(-dToMouse / 240);
          var baseR =
            SPACING * 0.18 +
            0.6 * Math.sin(time * 0.5 + i * 0.18 + j * 0.13);
          var mouseLift = 6 * mouseFalloff;
          var scrollLift = 0.6 * Math.sin(sc * 6.283185307179586 + j * 0.05);
          var n = (hash2(i, j) - 0.5) * 1.0;
          var r = Math.max(0, baseR + mouseLift + scrollLift + n);

          var dotBase = mix(mix(PAPER, INK, 0.55), INK, mouseFalloff);
          var dotCol = mix(dotBase, AMBER, mouseFalloff * 0.98);
          dotCol = mix(dotCol, AMBER, mouseFalloff * 0.1);
          var opacity = 0.88 + mouseFalloff * 0.12;

          ctx.fillStyle = rgba(dotCol, opacity);
          ctx.beginPath();
          ctx.arc(cellX, cellY, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick() {
      if (!visible || !docVisible) {
        raf = 0;
        return;
      }
      drawFrame();
      raf = requestAnimationFrame(tick);
    }

    function kick() {
      if (!raf && visible && docVisible) raf = requestAnimationFrame(tick);
    }

    document.addEventListener("visibilitychange", function () {
      docVisible = !document.hidden;
      if (docVisible && visible) kick();
    });

    var io = new IntersectionObserver(
      function (entries) {
        var e = entries[0];
        visible = !!(e && e.isIntersecting);
        if (visible) kick();
      },
      { rootMargin: "80px", threshold: 0 },
    );
    io.observe(section);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });

    syncSize();
    kick();
  }

  function initMobileNav() {
    var shell =
      document.body.classList.contains("pfz") ?
        document.body
      : document.querySelector(".pfz");
    if (!shell) return;
    var wrap = document.querySelector("[data-nav-root]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var sheet = document.querySelector("[data-nav-sheet]");
    var scrim = document.querySelector("[data-nav-scrim]");
    if (!wrap || !toggle || !sheet || !scrim) return;

    var open = false;

    function setOpen(next) {
      open = next;
      shell.classList.toggle("pfz--nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        sheet.removeAttribute("hidden");
        scrim.setAttribute("aria-hidden", "false");
      } else {
        sheet.setAttribute("hidden", "");
        scrim.setAttribute("aria-hidden", "true");
      }
      document.body.style.overflow = open ? "hidden" : "";
    }

    function close() {
      if (open) setOpen(false);
    }

    toggle.addEventListener("click", function () {
      setOpen(!open);
    });
    scrim.addEventListener("click", close);

    sheet.querySelectorAll("[data-nav-sheet-link]").forEach(function (a) {
      a.addEventListener("click", close);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 1280px)").matches) close();
      },
      { passive: true },
    );
  }

  /**
   * Pill / sheet link highlight while scrolling — mirrors src/app/v2/_components/nav.tsx
   * (IntersectionObserver + rootMargin band + highest intersectionRatio wins).
   */
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

  function initNavGlass() {
    var wrap = document.querySelector(".pfz-home__nav-wrap");
    if (!wrap) return;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y < 48) {
        wrap.classList.add("pfz-home__nav-wrap--at-top");
      } else {
        wrap.classList.remove("pfz-home__nav-wrap--at-top");
      }
    }

    wrap.classList.add("pfz-home__nav-wrap--at-top");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /**
   * Process section (§5): scroll-scrubbed vertical rail + row stagger.
   * Mirrors section-process.tsx — GSAP ScrollTrigger start/end "top 70%" / "bottom 70%".
   */
  function initProcessRail() {
    var root = document.querySelector("[data-pr-root]");
    var fill = document.querySelector("[data-pr-rail-fill]");
    if (!root || !fill) return;

    if (prefersReducedMotion()) {
      fill.style.setProperty("--pr-progress", "1");
      return;
    }

    var smooth = 0;
    var rafLoop = 0;

    function progressTarget() {
      var H = window.innerHeight || 1;
      var line = 0.7 * H;
      var rect = root.getBoundingClientRect();
      if (rect.height < 1) return 0;
      var p = (line - rect.top) / rect.height;
      return Math.max(0, Math.min(1, p));
    }

    function loop() {
      var target = progressTarget();
      smooth += (target - smooth) * 0.2;
      if (Math.abs(target - smooth) < 0.003) smooth = target;
      fill.style.setProperty("--pr-progress", String(smooth));
      if (Math.abs(target - smooth) > 0.002) {
        rafLoop = requestAnimationFrame(loop);
      } else {
        rafLoop = 0;
      }
    }

    function kick() {
      if (!rafLoop) rafLoop = requestAnimationFrame(loop);
    }

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
  }

  function initProcessRows() {
    var rows = document.querySelectorAll("[data-pr-row]");
    if (!rows.length) return;

    if (prefersReducedMotion()) {
      rows.forEach(function (r) {
        r.classList.add("is-inview");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("is-inview");
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.04 },
    );

    rows.forEach(function (r) {
      io.observe(r);
    });
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  /** Website slots + sticky browser crossfade (section-websites.tsx). */
  function initWebsites() {
    var root = document.querySelector("[data-web-root]");
    if (!root) return;

    var slots = root.querySelectorAll("[data-web-slot]");
    var layers = root.querySelectorAll("[data-web-mock-layer]");
    var dotUl = root.querySelector("[data-web-progress-wrap] ul");
    var dots = dotUl ? dotUl.querySelectorAll("li") : [];
    var urlEl = root.querySelector("[data-web-url]");
    var counter = root.querySelector("[data-web-counter]");
    var n = slots.length;

    function setActive(idx) {
      if (idx < 0 || idx >= n) return;
      layers.forEach(function (el, i) {
        var on = i === idx;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (el, i) {
        el.classList.toggle("is-active", i === idx);
      });
      var slot = slots[idx];
      if (urlEl && slot) {
        var u = slot.getAttribute("data-url");
        if (u) urlEl.textContent = u;
      }
      if (counter) {
        counter.textContent = "case " + pad2(idx + 1) + " / " + pad2(n);
      }
    }

    if (!n) return;

    if (!window.IntersectionObserver || prefersReducedMotion()) {
      setActive(0);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var idx = parseInt(e.target.getAttribute("data-idx"), 10);
          if (!isNaN(idx)) setActive(idx);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    slots.forEach(function (s) {
      io.observe(s);
    });
    setActive(0);
  }

  /** Pull quote (§7): word opacity scrub like section-quote.tsx / GSAP ScrollTrigger. */
  function initQuoteScrub() {
    var root = document.querySelector("[data-quote-root]");
    if (!root) return;
    var words = root.querySelectorAll("[data-quote-word]");
    if (!words.length) return;
    var n = words.length;

    if (prefersReducedMotion()) {
      words.forEach(function (w) {
        w.style.opacity = "1";
      });
      return;
    }

    function progress() {
      var rect = root.getBoundingClientRect();
      var H = window.innerHeight || 1;
      var start = 0.7 * H;
      var end = 0.5 * H;
      var total = rect.height + (start - end);
      if (total < 1) return 0;
      return Math.max(0, Math.min(1, (start - rect.top) / total));
    }

    var smooth = progress();
    var raf = 0;
    function apply(p) {
      words.forEach(function (w, i) {
        var t0 = i / n;
        var t1 = (i + 1) / n;
        var span = t1 - t0 || 1;
        var local = (p - t0) / span;
        local = Math.max(0, Math.min(1, local));
        w.style.opacity = String(0.18 + local * 0.82);
      });
    }

    function tick() {
      var target = progress();
      smooth += (target - smooth) * 0.14;
      if (Math.abs(target - smooth) < 0.0035) smooth = target;
      apply(smooth);
      if (Math.abs(target - smooth) > 0.0025) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    apply(smooth);
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeroHalftone();
    initCursor();
    initLoader();
    initIndustries();
    initScrollReveal();
    initNavGlass();
    initNavSectionSpy();
    initMobileNav();
    initProcessRail();
    initProcessRows();
    initWebsites();
    initQuoteScrub();
  });
})();
