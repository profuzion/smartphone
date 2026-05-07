"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Profuzion · v4 — halftone hero (Halftone iteration: void + bone + chartreuse).
 *
 * Dots read bone on near-black; cursor pulls them toward the signal green.
 * Matches /halftone feel while keeping the same v2 layout and copy.
 */

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2  uMouse;     // 0..1
uniform vec2  uRes;       // viewport pixel size (DPR-aware)
uniform float uScroll;    // 0..1
uniform float uReduced;   // 1.0 if reduced motion

uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uAmber;

// hash + noise (cheap, stable)
float hash21(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float noise2(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
}

void main(){
  vec2 frag = vUv * uRes;

  // halftone grid — original density (richer field)
  float spacing = 22.0;
  vec2 cell = floor(frag / spacing);
  vec2 c    = (cell + 0.5) * spacing;
  vec2 d    = frag - c;

  // base radius — visible dots + breathing
  float t = uReduced > 0.5 ? 0.0 : uTime;
  float baseR = spacing * 0.18 + 0.6 * sin(t * 0.5 + cell.x * 0.18 + cell.y * 0.13);

  // mouse warp — local lift only
  vec2 mousePx = uMouse * uRes;
  float dToMouse = length(c - mousePx);
  float mouseFalloff = exp(-dToMouse / 240.0);
  float mouseLift = 6.0 * mouseFalloff;

  // scroll pulse — bias dots subtly
  float scrollLift = 0.6 * sin(uScroll * 6.28 + cell.y * 0.05) * (1.0 - uReduced);

  // soft procedural noise — organic variance
  float n = noise2(cell * 0.18 + vec2(t * 0.06, -t * 0.04));
  float noiseLift = 1.0 * (n - 0.5);

  float r = baseR + mouseLift + scrollLift + noiseLift;
  r = max(r, 0.0);

  // dot SDF
  float ring = smoothstep(r, r - 1.4, length(d));

  // background grain — visible on void
  float g = (hash21(frag) - 0.5) * 0.02;

  // base void + vignette
  vec2 uvc = vUv - 0.5;
  float vignette = 1.0 - dot(uvc, uvc) * 0.4;
  vec3 paper = uPaper * vignette + g;

  // bone dots → chartreuse at cursor
  vec3 dotBase = mix(mix(uPaper, uInk, 0.55), uInk, mouseFalloff);
  vec3 dotColor = mix(dotBase, uAmber, mouseFalloff * 0.98);

  float opacity = mix(0.88, 1.0, mouseFalloff);
  vec3 col = mix(paper, dotColor, ring * opacity);

  float glow = mouseFalloff * 0.1;
  col = mix(col, uAmber, glow);

  gl_FragColor = vec4(col, 1.0);
}
`;

function Plane({
  scrollRef,
  mouseTargetRef,
}: {
  scrollRef: React.RefObject<number>;
  mouseTargetRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport, size } = useThree();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uScroll: { value: 0 },
      uReduced: { value: reduced ? 1 : 0 },
      uPaper: { value: new THREE.Color("#0a0a0b") },
      uInk: { value: new THREE.Color("#d8d8dc") },
      uAmber: { value: new THREE.Color("#b6ff38") },
    }),
    [reduced, size.height, size.width],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const t = mouseTargetRef.current;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    // Window-level pointer map → 0..1; matches uMouse * uRes in fragment (v=0 at bottom)
    u.uMouse.value.x += (t.x - u.uMouse.value.x) * 0.06;
    u.uMouse.value.y += (t.y - u.uMouse.value.y) * 0.06;
    u.uRes.value.set(size.width, size.height);
    if (scrollRef.current != null) u.uScroll.value = scrollRef.current;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </mesh>
  );
}

export function ProfuzionHalftoneCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef(0);
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / 1400, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track pointer in hero bounds even when cursor is over stacked copy / links (not the canvas).
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        return;
      }
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      mouseTargetRef.current.x = x;
      mouseTargetRef.current.y = y;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Plane scrollRef={scrollRef} mouseTargetRef={mouseTargetRef} />
      </Canvas>
    </div>
  );
}
