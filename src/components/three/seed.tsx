"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "@/lib/scroll-store";
import { lerp } from "@/lib/utils";

/**
 * The Seed — our single persistent 3D subject that evolves across all
 * eight acts. One object, driven by `scrollStore.actFloat`, which gives
 * us a continuous 0..7 value.
 *
 * No runtime GLSL yet: we drive the built-in transmission material's
 * uniforms through scroll and let <Float> give the piece its breathing.
 * The next iteration swaps in a custom vertex shader for Act 4 faceting
 * and Act 6 crystallisation.
 */

type ActPreset = {
  name: string;
  color: string;
  emissive: string;
  /** 0..1 — how liquid / warped the body becomes. */
  distortion: number;
  /** 0..1 — temporal wobble on the distortion. */
  temporalDistortion: number;
  /** 0..1 — glassy roughness. 0 = mirror, 1 = matte. */
  roughness: number;
  /** 0..1 — chromatic aberration. */
  chroma: number;
  /** target scale. */
  scale: number;
  /** y-rotation speed multiplier. */
  spin: number;
};

/**
 * Eight presets, indexed by act. Designed as a journey:
 * spark → blur → form → precision → radiance → fusion → network → horizon.
 */
const ACTS: ActPreset[] = [
  // 0 · Spark      — the unformed ember
  { name: "spark",    color: "#FF4D1F", emissive: "#FF6A3A", distortion: 0.30, temporalDistortion: 0.15, roughness: 0.08, chroma: 0.06, scale: 0.95, spin: 0.15 },
  // 1 · Blur       — overwhelmed, smeared
  { name: "blur",     color: "#6B6B75", emissive: "#14141B", distortion: 0.75, temporalDistortion: 0.45, roughness: 0.35, chroma: 0.04, scale: 1.05, spin: 0.08 },
  // 2 · Form       — the studio emerges
  { name: "form",     color: "#D9D5C9", emissive: "#1F1F29", distortion: 0.18, temporalDistortion: 0.08, roughness: 0.12, chroma: 0.05, scale: 1.00, spin: 0.10 },
  // 3 · Precision  — websites, faceted
  { name: "precision",color: "#F4F1EA", emissive: "#FF4D1F", distortion: 0.08, temporalDistortion: 0.04, roughness: 0.05, chroma: 0.08, scale: 1.05, spin: 0.12 },
  // 4 · Mark       — brand, forged
  { name: "mark",     color: "#B07A3A", emissive: "#FF4D1F", distortion: 0.14, temporalDistortion: 0.06, roughness: 0.18, chroma: 0.05, scale: 1.10, spin: 0.10 },
  // 5 · Fusion     — AI, radiant
  { name: "fusion",   color: "#FF6A3A", emissive: "#7C3AED", distortion: 0.22, temporalDistortion: 0.12, roughness: 0.04, chroma: 0.12, scale: 1.15, spin: 0.22 },
  // 6 · Network    — the ecosystem
  { name: "network",  color: "#FF4D1F", emissive: "#7C3AED", distortion: 0.35, temporalDistortion: 0.18, roughness: 0.14, chroma: 0.09, scale: 1.08, spin: 0.14 },
  // 7 · Horizon    — settled, warm
  { name: "horizon",  color: "#F8B14F", emissive: "#FF4D1F", distortion: 0.12, temporalDistortion: 0.06, roughness: 0.10, chroma: 0.06, scale: 1.00, spin: 0.08 },
];

/** Smoothly sample preset `i` between integer acts. */
function samplePreset(actFloat: number) {
  const i = Math.max(0, Math.min(ACTS.length - 1, Math.floor(actFloat)));
  const j = Math.min(ACTS.length - 1, i + 1);
  const t = actFloat - i;
  const a = ACTS[i];
  const b = ACTS[j];

  const colorA = new THREE.Color(a.color);
  const colorB = new THREE.Color(b.color);
  const emissiveA = new THREE.Color(a.emissive);
  const emissiveB = new THREE.Color(b.emissive);

  return {
    color: colorA.lerp(colorB, t),
    emissive: emissiveA.lerp(emissiveB, t),
    distortion: lerp(a.distortion, b.distortion, t),
    temporalDistortion: lerp(a.temporalDistortion, b.temporalDistortion, t),
    roughness: lerp(a.roughness, b.roughness, t),
    chroma: lerp(a.chroma, b.chroma, t),
    scale: lerp(a.scale, b.scale, t),
    spin: lerp(a.spin, b.spin, t),
  };
}

export function Seed() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<
    THREE.Material & {
      distortion?: number;
      temporalDistortion?: number;
      distortionScale?: number;
      chromaticAberration?: number;
      roughness?: number;
      color?: THREE.Color;
    }
  >(null);

  const targets = useRef({
    scale: 1,
    spin: 0.1,
  });

  useFrame((_, delta) => {
    const actFloat = useScrollStore.getState().actFloat;
    const p = samplePreset(actFloat);

    if (mesh.current) {
      mesh.current.rotation.y += delta * p.spin;
      mesh.current.rotation.x += delta * p.spin * 0.35;
    }

    if (group.current) {
      // Ease scale toward target for a hand-feel.
      targets.current.scale = lerp(targets.current.scale, p.scale, 0.06);
      group.current.scale.setScalar(targets.current.scale);
    }

    const mat = materialRef.current;
    if (mat) {
      if (typeof mat.distortion === "number") {
        mat.distortion = lerp(mat.distortion, p.distortion, 0.06);
      }
      if (typeof mat.temporalDistortion === "number") {
        mat.temporalDistortion = lerp(
          mat.temporalDistortion,
          p.temporalDistortion,
          0.06,
        );
      }
      if (typeof mat.chromaticAberration === "number") {
        mat.chromaticAberration = lerp(mat.chromaticAberration, p.chroma, 0.06);
      }
      if (typeof mat.roughness === "number") {
        mat.roughness = lerp(mat.roughness, p.roughness, 0.06);
      }
      if (mat.color) mat.color.lerp(p.color, 0.06);
    }
  });

  return (
    <>
      <Environment preset="warehouse" environmentIntensity={0.6} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFE4C8" />
      <pointLight position={[-3, -2, -2]} intensity={0.9} color="#FF4D1F" />

      <Float
        speed={1.1}
        rotationIntensity={0.35}
        floatIntensity={0.7}
        floatingRange={[-0.08, 0.08]}
      >
        {/*
         * Seed sits slightly right-of-center so it shoulders the hero
         * typography rather than hiding behind it. The position drift
         * with scroll is handled by the camera dolly later (Act 4+).
         */}
        <group ref={group} position={[1.7, 0.05, 0]}>
          {/*
           * Halo: a slightly larger back-mesh with additive emission so
           * the seed reads on dark backgrounds even when the transmission
           * material disappears into black. Cheap (no extra material
           * uniforms), and visually it does the heavy lifting.
           */}
          <mesh scale={1.18}>
            <icosahedronGeometry args={[1.15, 3]} />
            <meshBasicMaterial
              color="#FF4D1F"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <mesh ref={mesh}>
            <icosahedronGeometry args={[1.15, 6]} />
            <MeshTransmissionMaterial
              ref={
                materialRef as unknown as React.Ref<THREE.Material>
              }
              samples={8}
              thickness={0.85}
              chromaticAberration={0.08}
              anisotropy={0.4}
              distortion={0.3}
              distortionScale={0.4}
              temporalDistortion={0.15}
              roughness={0.08}
              transmission={1}
              ior={1.45}
              attenuationDistance={1.2}
              attenuationColor="#FF4D1F"
              color="#FF4D1F"
              backside
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
