"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { surfaces, type Surface } from "../_lib/site";

/**
 * Halftone — Stack Cluster (§4).
 *
 * Six floating UI panels arranged in a layered stack along z, each
 * tilted slightly around y. Per-panel slow drift on every axis.
 *
 * Interactions:
 *   • The component reads `activeId` and `onActiveChange` props so the
 *     parent can drive which panel is "lifted forward" via the
 *     capability list.
 *   • Pointer-drag on the canvas rotates the whole group around y.
 *
 * Each panel's texture is generated client-side by drawing a stylized
 * mini-UI to an OffscreenCanvas (with a CanvasRenderingContext2D
 * fallback). This means no image assets — every panel is procedurally
 * painted to match its surface kind.
 */

type Props = {
  activeId: string | null;
};

const PANEL_W = 1.6;
const PANEL_H = 1.0;

/** Layout each panel in a layered cluster. */
function panelLayout(i: number, count: number) {
  const t = i / Math.max(1, count - 1); // 0..1
  const offsetX = (t - 0.5) * 1.5;
  const offsetY = Math.sin(t * Math.PI * 2) * 0.32 + (t - 0.5) * 0.4;
  const offsetZ = -t * 1.4;
  const rotY = (t - 0.5) * 0.6;
  return { offsetX, offsetY, offsetZ, rotY };
}

/** Generate a stylized UI texture for a given surface kind. */
function makeSurfaceTexture(s: Surface): THREE.CanvasTexture {
  const W = 800;
  const H = 500;
  const canvas =
    typeof document !== "undefined"
      ? document.createElement("canvas")
      : ({ width: W, height: H } as HTMLCanvasElement);
  canvas.width = W;
  canvas.height = H;

  const ctx = (canvas as HTMLCanvasElement).getContext?.("2d");
  if (!ctx) {
    const tex = new THREE.CanvasTexture(canvas as HTMLCanvasElement);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // Background — panel bg with subtle vertical gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#13131A");
  grad.addColorStop(1, "#0C0C12");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Hairline grid
  ctx.strokeStyle = "rgba(255,255,255,0.035)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Window chrome bar
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, W, 38);
  ctx.fillStyle = "#1B1B22";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(20 + i * 14, 19, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  // Live dot on first
  ctx.fillStyle = s.color;
  ctx.beginPath();
  ctx.arc(20, 19, 4, 0, Math.PI * 2);
  ctx.fill();

  // Filename
  ctx.font = "12px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#8A8A91";
  ctx.fillText(`${s.id}.surface.tsx`, 80, 23);

  // Title
  ctx.font = "32px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#E8E8EA";
  ctx.fillText(s.name, 28, 90);

  // Note
  ctx.font = "16px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#8A8A91";
  ctx.fillText(s.note, 28, 118);

  // Per-surface composition
  paintSurfaceBody(ctx, s, W, H);

  // Bottom status bar
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(0, H - 32, W, 32);
  ctx.fillStyle = s.color;
  ctx.beginPath();
  ctx.arc(20, H - 16, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "11px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#5A5A61";
  ctx.fillText(`ht / ${s.id}`, 32, H - 13);
  ctx.fillStyle = "#5A5A61";
  ctx.fillText("ready", W - 50, H - 13);

  const tex = new THREE.CanvasTexture(canvas as HTMLCanvasElement);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function paintSurfaceBody(
  ctx: CanvasRenderingContext2D,
  s: Surface,
  W: number,
  H: number,
) {
  const top = 160;
  const left = 28;
  const right = W - 28;
  const accent = s.color;

  ctx.font = "13px ui-monospace, SFMono-Regular, monospace";

  switch (s.id) {
    case "assistant": {
      // Chat bubbles
      const lines = [
        { who: "user", body: "summarise the q4 cohort retention" },
        { who: "assistant", body: "▸ pulling cohort 4 across 12 segments" },
        { who: "assistant", body: "▸ regressions found in 3 segments" },
        { who: "user", body: "show me segment 7" },
        { who: "assistant", body: "▸ rendering chart..." },
      ];
      lines.forEach((l, i) => {
        const y = top + i * 46;
        const isUser = l.who === "user";
        const x = isUser ? right - 240 : left;
        ctx.fillStyle = isUser ? "#1B1B22" : "rgba(182,255,56,0.07)";
        ctx.strokeStyle = isUser ? "#25252E" : accent + "55";
        ctx.lineWidth = 1;
        roundedRect(ctx, x, y, 240, 32, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = isUser ? "#B8B8BD" : "#E8E8EA";
        ctx.fillText(l.body, x + 12, y + 21);
      });
      break;
    }
    case "admin": {
      // Dense table with rows
      const cols = ["id", "endpoint", "p50", "p99", "rps"];
      const colX = [left, left + 60, left + 290, left + 360, left + 430];
      ctx.fillStyle = "#5A5A61";
      cols.forEach((c, i) => ctx.fillText(c.toUpperCase(), colX[i], top));
      ctx.strokeStyle = "#1B1B22";
      ctx.beginPath();
      ctx.moveTo(left, top + 8);
      ctx.lineTo(right, top + 8);
      ctx.stroke();
      const rows = [
        ["a01", "/v1/chat/completions", "84ms", "412ms", "1.2k"],
        ["a02", "/v1/agents/run", "212ms", "1.84s", "640"],
        ["a03", "/v1/eval/score", "62ms", "320ms", "2.1k"],
        ["a04", "/v1/embeddings", "31ms", "98ms", "8.4k"],
        ["a05", "/v1/files/upload", "118ms", "640ms", "112"],
        ["a06", "/v1/runs/cancel", "12ms", "44ms", "32"],
      ];
      rows.forEach((r, i) => {
        const y = top + 28 + i * 28;
        if (i === 1) {
          ctx.fillStyle = "rgba(124,156,255,0.08)";
          ctx.fillRect(left, y - 16, right - left, 24);
        }
        r.forEach((cell, ci) => {
          ctx.fillStyle =
            ci === 3 && cell.includes("s")
              ? "#FF7A5C"
              : ci === 4
                ? "#E8E8EA"
                : "#B8B8BD";
          ctx.fillText(cell, colX[ci], y);
        });
      });
      break;
    }
    case "agent": {
      // Tool tree
      const tree = [
        ["▾", "tools/", null],
        [" ▸", "search.web()", "0.42"],
        [" ▸", "fs.read()", "0.81"],
        [" ▾", "db/", null],
        ["  ▸", "query()", "0.93"],
        ["  ▸", "mutate()", "0.18"],
        [" ▸", "ui.render()", "0.55"],
      ];
      tree.forEach((t, i) => {
        const y = top + i * 32;
        ctx.fillStyle = "#5A5A61";
        ctx.fillText(t[0]!, left, y);
        ctx.fillStyle = t[2] ? "#E8E8EA" : "#B8B8BD";
        ctx.fillText(t[1]!, left + 30, y);
        if (t[2]) {
          ctx.fillStyle = accent;
          ctx.fillText(t[2], right - 60, y);
        }
      });
      break;
    }
    case "observability": {
      // Sparkline grid
      const cells = 12;
      const w = (right - left) / 4;
      const h = 56;
      for (let i = 0; i < cells; i++) {
        const cx = left + (i % 4) * w;
        const cy = top + Math.floor(i / 4) * (h + 14);
        ctx.strokeStyle = "#1B1B22";
        ctx.strokeRect(cx, cy, w - 8, h);
        // Sparkline
        ctx.beginPath();
        ctx.strokeStyle = i === 5 ? accent : "rgba(232,232,234,0.4)";
        ctx.lineWidth = i === 5 ? 1.6 : 1;
        const samples = 24;
        for (let j = 0; j < samples; j++) {
          const seed = (i * 91 + j * 31) % 100;
          const v = (Math.sin(j * 0.6 + i) + 1) / 2 + seed / 600;
          const x = cx + 6 + (j / samples) * (w - 20);
          const y = cy + h - 6 - v * (h - 12);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = "#5A5A61";
        ctx.font = "10px ui-monospace";
        ctx.fillText(`m.${(i + 1).toString().padStart(2, "0")}`, cx + 6, cy + 12);
      }
      break;
    }
    case "eval": {
      // Side-by-side panes
      const midX = (left + right) / 2;
      const colW = midX - left - 8;
      ctx.strokeStyle = "#1B1B22";
      ctx.strokeRect(left, top, colW, 220);
      ctx.strokeRect(midX + 8, top, colW, 220);
      ctx.fillStyle = "#5A5A61";
      ctx.fillText("CANDIDATE A", left + 10, top + 16);
      ctx.fillText("CANDIDATE B", midX + 18, top + 16);
      // Output lines
      const outA = ["▸ accepted", "▸ tokens: 412", "▸ latency: 84ms", "▸ cost: $0.0042"];
      const outB = ["▸ accepted", "▸ tokens: 690", "▸ latency: 152ms", "▸ cost: $0.0089"];
      outA.forEach((t, i) => {
        ctx.fillStyle = i === 0 ? accent : "#B8B8BD";
        ctx.fillText(t, left + 12, top + 50 + i * 32);
      });
      outB.forEach((t, i) => {
        ctx.fillStyle = "#8A8A91";
        ctx.fillText(t, midX + 20, top + 50 + i * 32);
      });
      // Verdict pill
      ctx.fillStyle = accent;
      roundedRect(ctx, left + 12, top + 192, 100, 22, 11);
      ctx.fill();
      ctx.fillStyle = "#0A0A0B";
      ctx.font = "11px ui-monospace";
      ctx.fillText("PREFER A", left + 30, top + 207);
      break;
    }
    case "config": {
      // Schema-aware code editor
      const lines = [
        ["1", "{"],
        ["2", '  "model": "claude-sonnet-4-5",'],
        ["3", '  "temperature": 0.2,'],
        ["4", '  "tools": ['],
        ["5", '    { "name": "search", "scope": "web" },'],
        ["6", '    { "name": "fs",     "scope": "repo" }'],
        ["7", "  ],"],
        ["8", '  "max_tokens": 4096'],
        ["9", "}"],
      ];
      ctx.font = "13px ui-monospace, SFMono-Regular, monospace";
      lines.forEach(([num, body], i) => {
        const y = top + i * 26;
        ctx.fillStyle = "#3A3A41";
        ctx.fillText(num, left, y);
        // Crude syntax tinting
        ctx.fillStyle = body.includes('"name"')
          ? "#5DD3B0"
          : body.includes('"')
            ? "#B8B8BD"
            : "#E8E8EA";
        ctx.fillText(body, left + 30, y);
        if (i === 4) {
          // Mark validation hint
          ctx.fillStyle = accent;
          ctx.fillText("✓", right - 30, y);
        }
      });
      break;
    }
  }
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function Panel({
  surface,
  index,
  total,
  active,
  rotateY,
}: {
  surface: Surface;
  index: number;
  total: number;
  active: boolean;
  rotateY: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => makeSurfaceTexture(surface), [surface]);
  const layout = useMemo(() => panelLayout(index, total), [index, total]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Targets — driven by active state.
    const targetX = active ? 0 : layout.offsetX;
    const targetY = active ? 0 : layout.offsetY;
    const targetZ = active ? 0.6 : layout.offsetZ;
    const targetRotY = active ? rotateY : layout.rotY + rotateY;
    const targetScale = active ? 1.08 : 1.0;

    const breathe = Math.sin(t * 0.6 + index * 1.7) * 0.04;
    const wobbleY = Math.sin(t * 0.4 + index) * 0.03;

    const obj = meshRef.current;
    obj.position.x += (targetX - obj.position.x) * 0.08;
    obj.position.y += (targetY + wobbleY - obj.position.y) * 0.08;
    obj.position.z += (targetZ + breathe - obj.position.z) * 0.08;
    obj.rotation.y += (targetRotY - obj.rotation.y) * 0.08;
    obj.rotation.x += (Math.sin(t * 0.3 + index) * 0.05 - obj.rotation.x) * 0.05;
    const s = obj.scale.x;
    obj.scale.setScalar(s + (targetScale - s) * 0.08);
  });

  return (
    <group ref={meshRef}>
      {/* Panel */}
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshBasicMaterial map={texture} transparent={false} />
      </mesh>
      {/* Edge rim glow when active */}
      <mesh position={[0, 0, -0.005]} scale={1.04}>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshBasicMaterial
          color={active ? surface.color : "#1B1B22"}
          opacity={active ? 0.55 : 0.4}
          transparent
        />
      </mesh>
    </group>
  );
}

function Cluster({ activeId }: { activeId: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const dragState = useRef({ dragging: false, lastX: 0, baseY: 0, targetY: 0 });

  useEffect(() => {
    const onUp = () => {
      dragState.current.dragging = false;
    };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Auto-rotate when not dragging.
    if (!dragState.current.dragging) {
      dragState.current.targetY += 0.0015;
    }
    groupRef.current.rotation.y +=
      (dragState.current.targetY - groupRef.current.rotation.y) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        dragState.current.dragging = true;
        dragState.current.lastX = e.clientX;
        dragState.current.baseY = dragState.current.targetY;
      }}
      onPointerMove={(e) => {
        if (!dragState.current.dragging) return;
        const dx = e.clientX - dragState.current.lastX;
        dragState.current.targetY = dragState.current.baseY + dx * 0.005;
      }}
    >
      {surfaces.map((s, i) => (
        <Panel
          key={s.id}
          surface={s}
          index={i}
          total={surfaces.length}
          active={activeId === s.id}
          rotateY={0}
        />
      ))}
    </group>
  );
}

export function StackCluster({ activeId }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4.2], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="absolute inset-0"
    >
      <ambientLight intensity={1} />
      <Cluster activeId={activeId} />
    </Canvas>
  );
}
