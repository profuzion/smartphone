"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Halftone — hero shader plane.
 *
 * A fullscreen plane that renders a halftone dot matrix where:
 *   • dot radius breathes slowly via uTime,
 *   • each dot's radius increases near the mouse (uMouse, in NDC),
 *   • the whole grid biases scale based on uScroll (0..1),
 *   • a faint chartreuse tint blooms near the cursor.
 *
 * The plane is intentionally unlit; the colour is computed entirely
 * inside the fragment shader. The component reads the page scroll
 * directly (window.scrollY / scrollHeight) to keep the hero coupled
 * to the document scroll without needing the Lenis store wired in.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uScroll;

  /**
   * 2D rotation around origin.
   */
  vec2 rot(vec2 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  /**
   * White noise — used for a subtle filmic grain.
   */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Aspect-correct 0..1 uv → centred space for circular fields.
    vec2 uv  = vUv;
    vec2 ar  = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p   = (uv - 0.5) * ar;
    vec2 m   = (uMouse - 0.5) * ar;

    // Distance to the cursor — drives the halo + dot expansion.
    float dM = length(p - m);
    float halo = 1.0 - smoothstep(0.0, 0.55, dM);
    halo = pow(halo, 1.6);

    // Slow breathing across the whole field.
    float breathe = 0.030 * sin(uTime * 0.55);

    // Bias from scroll — top of page = quieter dots, bottom = bigger.
    float scrollBias = uScroll * 0.10;

    // Slight rotation for character — keeps the matrix from feeling like
    // a CSS background.
    vec2 grid = rot(uv, 0.04 - breathe * 0.4);

    // Dot matrix. Density rises with viewport width; we step it in code.
    float density = mix(70.0, 96.0, smoothstep(800.0, 1800.0, uResolution.x));
    vec2 cell = fract(grid * density) - 0.5;
    float d = length(cell);

    // Per-fragment dot radius.
    float baseR = 0.14 + breathe + scrollBias + halo * 0.34;

    // Anti-aliased dot — soft-edged.
    float dot = 1.0 - smoothstep(baseR - 0.04, baseR, d);

    // Background — deep ink, slight radial fall-off toward the corners.
    float vig = 1.0 - smoothstep(0.30, 1.05, length((uv - 0.5) * ar));
    vec3 bg = mix(vec3(0.020, 0.020, 0.027), vec3(0.039, 0.039, 0.043), vig);

    // Dot colour — bone, with a chartreuse bias near the cursor.
    vec3 boneCol   = vec3(0.910, 0.910, 0.918);
    vec3 signalCol = vec3(0.713, 1.000, 0.220);
    vec3 dotCol    = mix(boneCol, signalCol, halo * 0.85);

    // Compose. Dots are dimmed away from the cursor so the field
    // reads like a soft-focus negative; the cursor "develops" them.
    float dotIntensity = 0.42 + halo * 0.58;
    vec3 col = mix(bg, dotCol, dot * dotIntensity);

    // Subtle film grain.
    float g = hash(uv * uResolution + uTime * 30.0) - 0.5;
    col += g * 0.020;

    // Small additive halo around the cursor, signal-tinted.
    col += signalCol * halo * 0.07;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Scroll value, updated outside the React tree to avoid re-renders.
  const scrollRef = useRef(0);
  // Mouse in 0..1, defaulting to centre.
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onMove = (e: PointerEvent) => {
      mouseRef.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    }),
    // size is read once; the resize listener below keeps it current.
    [size.width, size.height],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uResolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
    // Light-ease the mouse for a slightly trailing field response.
    const cur = matRef.current.uniforms.uMouse.value as THREE.Vector2;
    cur.x += (mouseRef.current.x - cur.x) * 0.10;
    cur.y += (mouseRef.current.y - cur.y) * 0.10;
    matRef.current.uniforms.uScroll.value = scrollRef.current;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export function HalftoneShaderCanvas() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    >
      <Plane />
    </Canvas>
  );
}
