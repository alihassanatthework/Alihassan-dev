"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";

interface Props {
  phase: CinematicPhase;
  monitorBrightness: number;
}

const DOMAIN = "alihassan-dev.com";

/** Draw Google search homepage with optional typed text in search bar */
function drawGoogleHome(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  typed: string,
  cursorOn: boolean,
  isTyping: boolean
) {
  // White page bg
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Top-right links
  ctx.textAlign = "right";
  ctx.fillStyle = "#1f1f1f";
  ctx.font = "400 13px Arial, sans-serif";
  ctx.fillText("Gmail", w - 220, 38);
  ctx.fillText("Images", w - 165, 38);
  // Apps grid icon (3x3 dots)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = "#5f6368";
      ctx.beginPath();
      ctx.arc(w - 110 + c * 9, 30 + r * 9, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // Profile circle
  ctx.fillStyle = "#1a73e8";
  ctx.beginPath();
  ctx.arc(w - 50, 38, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "600 14px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("A", w - 50, 43);

  // Google logo (colored)
  const cx = w / 2;
  const logoY = h * 0.36;
  drawGoogleLogo(ctx, cx, logoY);

  // Search bar
  const barW = Math.min(560, w * 0.55);
  const barH = 46;
  const barX = cx - barW / 2;
  const barY = logoY + 70;

  // Bar shadow
  ctx.shadowColor = "rgba(60,64,67,0.15)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 1;
  ctx.fillStyle = "#fff";
  roundRect(ctx, barX, barY, barW, barH, barH / 2);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Border
  ctx.strokeStyle = "#dfe1e5";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Search icon (magnifying glass)
  ctx.strokeStyle = "#9aa0a6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(barX + 22, barY + 22, 8, 0, Math.PI * 2);
  ctx.moveTo(barX + 28, barY + 28);
  ctx.lineTo(barX + 35, barY + 35);
  ctx.stroke();

  // Typed text
  ctx.textAlign = "left";
  ctx.font = "400 16px Arial, sans-serif";
  ctx.fillStyle = "#202124";
  ctx.fillText(typed, barX + 50, barY + 28);

  // Cursor
  if (isTyping && cursorOn) {
    const cursorX = barX + 50 + ctx.measureText(typed).width;
    ctx.fillStyle = "#202124";
    ctx.fillRect(cursorX + 1, barY + 14, 1.5, 18);
  }

  // Mic + camera icons on right of bar
  // Mic
  ctx.fillStyle = "#4285f4";
  ctx.beginPath();
  ctx.arc(barX + barW - 48, barY + barH / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ea4335";
  ctx.fillRect(barX + barW - 50, barY + barH / 2, 4, 8);
  // Camera
  ctx.strokeStyle = "#4285f4";
  ctx.lineWidth = 2;
  ctx.strokeRect(barX + barW - 28, barY + barH / 2 - 6, 14, 12);

  // Buttons row
  const btn1W = 130, btn2W = 150, btnH = 36, gap = 12;
  const btnsTotal = btn1W + btn2W + gap;
  const btnsX = cx - btnsTotal / 2;
  const btnsY = barY + barH + 28;

  // Google Search
  ctx.fillStyle = "#f8f9fa";
  roundRect(ctx, btnsX, btnsY, btn1W, btnH, 4);
  ctx.fill();
  ctx.strokeStyle = "#f8f9fa";
  ctx.stroke();
  ctx.fillStyle = "#3c4043";
  ctx.font = "500 13px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Google Search", btnsX + btn1W / 2, btnsY + 22);

  // I'm Feeling Lucky
  ctx.fillStyle = "#f8f9fa";
  roundRect(ctx, btnsX + btn1W + gap, btnsY, btn2W, btnH, 4);
  ctx.fill();
  ctx.fillStyle = "#3c4043";
  ctx.fillText("I'm Feeling Lucky", btnsX + btn1W + gap + btn2W / 2, btnsY + 22);

  // Language strip
  ctx.fillStyle = "#3c4043";
  ctx.font = "400 12px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Google offered in:", cx - 70, btnsY + btnH + 36);
  ctx.fillStyle = "#1a73e8";
  ["العربية", "اردو", "پښتو"].forEach((lang, i) => {
    ctx.fillText(lang, cx + 10 + i * 60, btnsY + btnH + 36);
  });

  // Footer
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, h - 80, w, 80);
  ctx.fillStyle = "#70757a";
  ctx.font = "400 12px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Pakistan", 30, h - 50);
  ctx.fillStyle = "#dadce0";
  ctx.fillRect(0, h - 32, w, 1);
  ctx.fillStyle = "#70757a";
  ["About", "Advertising", "Business", "How Search works"].forEach((item, i) => {
    ctx.fillText(item, 30 + i * 110, h - 12);
  });
  ctx.textAlign = "right";
  ["Privacy", "Terms", "Settings"].forEach((item, i) => {
    ctx.fillText(item, w - 30 - i * 80, h - 12);
  });
}

/** Draw the Google logo (G-o-o-g-l-e) using colored letters */
function drawGoogleLogo(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  // Use a single colored-letters draw with classic Google palette
  const letters = [
    { ch: "G", c: "#4285f4" },
    { ch: "o", c: "#ea4335" },
    { ch: "o", c: "#fbbc05" },
    { ch: "g", c: "#4285f4" },
    { ch: "l", c: "#34a853" },
    { ch: "e", c: "#ea4335" },
  ];
  ctx.font = "400 92px 'Product Sans', 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "left";
  // Measure total width
  let total = 0;
  letters.forEach((l) => (total += ctx.measureText(l.ch).width));
  let x = cx - total / 2;
  letters.forEach((l) => {
    ctx.fillStyle = l.c;
    ctx.fillText(l.ch, x, cy);
    x += ctx.measureText(l.ch).width;
  });
}


function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function Workspace({ phase, monitorBrightness }: Props) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const laptopScreenMat = useRef<THREE.MeshStandardMaterial>(null);
  const keyboardMat = useRef<THREE.MeshStandardMaterial>(null);
  const phaseStartRef = useRef<number>(0);

  // Single canvas-backed texture, redrawn based on phase
  const { canvas, texture } = useMemo(() => {
    if (typeof document === "undefined") return { canvas: null, texture: null };
    const c = document.createElement("canvas");
    c.width = 1280;
    c.height = 800;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { canvas: c, texture: tex };
  }, []);

  // Initial draw on mount
  useEffect(() => {
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d")!;
    drawGoogleHome(ctx, canvas.width, canvas.height, "", false, false);
    texture.needsUpdate = true;
  }, [canvas, texture]);

  // Reset phase clock on phase change
  useEffect(() => {
    phaseStartRef.current = performance.now();
  }, [phase]);

  // Per-frame: redraw canvas texture based on phase
  useFrame((state) => {
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d")!;
    const phaseElapsed = (performance.now() - phaseStartRef.current) / 1000;

    if (phase === "typing") {
      // Type out domain over 2.4s
      const charsPerSec = DOMAIN.length / 2.4;
      const charCount = Math.min(DOMAIN.length, Math.floor(phaseElapsed * charsPerSec));
      const cursorOn = Math.floor(phaseElapsed * 2) % 2 === 0;
      drawGoogleHome(
        ctx, canvas.width, canvas.height,
        DOMAIN.slice(0, charCount),
        cursorOn,
        true
      );
      texture.needsUpdate = true;
    } else if (phase === "entry") {
      // Static URL field empty (or "alihassan-dev.com" already filled-in idle)
      if (phaseElapsed < 0.1) {
        drawGoogleHome(ctx, canvas.width, canvas.height, "", false, false);
        texture.needsUpdate = true;
      }
    } else {
      // transition / static — final state, full URL no cursor
      if (phaseElapsed < 0.1) {
        drawGoogleHome(ctx, canvas.width, canvas.height, DOMAIN, false, false);
        texture.needsUpdate = true;
      }
    }

    // Subtle flicker — kept low so canvas content stays readable
    const t = state.clock.elapsedTime;
    const flicker = Math.sin(t * 12) * 0.02 + Math.sin(t * 27) * 0.012;
    const target = monitorBrightness * 0.5; // was 1.6 — tuned so white bg doesn't blow out
    if (screenMat.current) screenMat.current.emissiveIntensity = target * (1 + flicker);
    if (laptopScreenMat.current) laptopScreenMat.current.emissiveIntensity = monitorBrightness * 0.35 * (1 + flicker);
    if (keyboardMat.current) keyboardMat.current.emissiveIntensity = monitorBrightness * 0.4;
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0b10" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Back wall — uniform */}
      <mesh position={[0, 5, -6]}>
        <planeGeometry args={[60, 14]} />
        <meshStandardMaterial color="#0c0d12" roughness={1} />
      </mesh>
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#0c0d12" roughness={1} />
      </mesh>
      <mesh position={[15, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#0c0d12" roughness={1} />
      </mesh>

      {/* Desk top */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.6, 0.08, 1.8]} />
        <meshStandardMaterial color="#1d1d22" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Desk legs */}
      {[
        [-2.15, 0.7, -0.8],
        [2.15, 0.7, -0.8],
        [-2.15, 0.7, 0.8],
        [2.15, 0.7, 0.8],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 1.42, 0.06]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}

      {/* Monitor stand */}
      <mesh position={[0, 1.7, -0.45]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.5, -0.45]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.32]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Monitor bezel */}
      <mesh position={[0, 2.5, -0.45]} castShadow>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#08080b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Monitor SCREEN — canvas texture (Google homepage / typing) */}
      <mesh position={[0, 2.5, -0.421]}>
        <planeGeometry args={[2.38, 1.38]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#ffffff"
          map={texture ?? undefined}
          emissive="#ffffff"
          emissiveMap={texture ?? undefined}
          emissiveIntensity={monitorBrightness * 0.5}
          toneMapped={true}
        />
      </mesh>

      {/* MacBook — moved to LEFT side of desk, angled slightly toward camera */}
      <group position={[-1.5, 0, 0.35]} rotation={[0, Math.PI / 9, 0]}>
        {/* base */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1.1, 0.04, 0.74]} />
          <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* lid (open) */}
        <group position={[0, 1.86, -0.32]} rotation={[Math.PI / 2.2, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.04, 0.74]} />
            <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Laptop screen — soft "code editor" look, NOT mirroring monitor */}
          <mesh position={[0, 0.022, 0]}>
            <planeGeometry args={[1.02, 0.65]} />
            <meshStandardMaterial
              ref={laptopScreenMat}
              color="#0d1117"
              emissive="#3a4a78"
              emissiveIntensity={monitorBrightness * 0.35}
              toneMapped={true}
            />
          </mesh>
          {/* Apple-style logo on lid back */}
          <mesh position={[0, -0.022, 0]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.05, 32]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.4} metalness={0.7} />
          </mesh>
        </group>
        {/* Laptop keyboard backlight glow */}
        <mesh position={[0, 1.525, 0.05]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshStandardMaterial
            ref={keyboardMat}
            color="#0a0a0c"
            emissive="#fff7e0"
            emissiveIntensity={monitorBrightness * 0.4}
            toneMapped={true}
          />
        </mesh>
      </group>

      {/* External keyboard + glow */}
      <mesh position={[0, 1.5, 1.18]} castShadow>
        <boxGeometry args={[1.7, 0.05, 0.4]} />
        <meshStandardMaterial color="#15161a" roughness={0.45} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.532, 1.18]}>
        <planeGeometry args={[1.6, 0.32]} />
        <meshStandardMaterial
          color="#08090b"
          emissive="#fff7e0"
          emissiveIntensity={monitorBrightness * 0.35}
          toneMapped={false}
        />
      </mesh>

      {/* Coffee — moved a bit further right of laptop area */}
      <group position={[1.3, 1.5, 0.7]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.3, 24]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.65} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.145, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.001, 24]} />
          <meshStandardMaterial color="#3a2418" roughness={0.4} />
        </mesh>
        <mesh position={[0.135, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.075, 0.018, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.65} />
        </mesh>
      </group>

      {/* Plant — moved to RIGHT side */}
      <mesh position={[1.95, 1.62, -0.5]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, 0.24, 16]} />
        <meshStandardMaterial color="#1a1a1d" roughness={0.7} />
      </mesh>
      <mesh position={[1.95, 1.85, -0.5]}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#1f2823" roughness={0.9} />
      </mesh>

      {/* Chair */}
      <mesh position={[0, 0.85, 1.7]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.45, 2.05]} castShadow>
        <boxGeometry args={[0.9, 1.25, 0.08]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 1.7]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.5} metalness={0.5} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.32, 0.1, 1.7 + Math.sin(a) * 0.32]}
            rotation={[0, -a, 0]}
            castShadow
          >
            <boxGeometry args={[0.5, 0.05, 0.06]} />
            <meshStandardMaterial color="#0c0d11" roughness={0.5} metalness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
