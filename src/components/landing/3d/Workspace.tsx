"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  monitorEmissive: number;
  screenContent: "off" | "code" | "ui";
}

function makeCodeCanvas() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a0d14";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.font = "13px ui-monospace,SFMono-Regular,Menlo,monospace";
  const lines: [string, string][] = [
    ["#a1a1aa", "// portfolio.ts"],
    ["#71717a", "import { craft } from '~/dev'"],
    ["", ""],
    ["#e5e7eb", "export default function Hero() {"],
    ["#fbbf24", "  const skills = ['react', 'three', 'ai']"],
    ["#a1a1aa", "  return craft(skills).ship()"],
    ["#e5e7eb", "}"],
    ["", ""],
    ["#10b981", "✓ build  passed"],
    ["#10b981", "✓ deploy ready"],
  ];
  let y = 28;
  for (const [color, text] of lines) {
    if (!text) { y += 16; continue; }
    ctx.fillStyle = color;
    ctx.fillText(text, 24, y);
    y += 20;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeUiCanvas() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(48, 56, 416, 208);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 56, 416, 208);
  ctx.fillStyle = "#71717a";
  ctx.font = "10px ui-monospace,monospace";
  ctx.fillText("EST. 2026", 72, 86);
  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 30px Georgia,serif";
  ctx.fillText("Welcome to my", 72, 138);
  ctx.fillText("universe.", 72, 174);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(72, 192, 32, 1);
  ctx.fillStyle = "#a1a1aa";
  ctx.font = "10px ui-monospace,monospace";
  ctx.fillText("SOFTWARE  //  FULL-STACK  //  AI / ML", 72, 220);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function Workspace({ monitorEmissive, screenContent }: Props) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  const { codeTex, uiTex } = useMemo(() => {
    if (typeof document === "undefined") return { codeTex: null, uiTex: null };
    return { codeTex: makeCodeCanvas(), uiTex: makeUiCanvas() };
  }, []);

  // Subtle screen flicker
  useFrame((state) => {
    if (!screenMat.current) return;
    const t = state.clock.elapsedTime;
    const flicker = Math.sin(t * 12) * 0.03 + Math.sin(t * 27) * 0.02;
    screenMat.current.emissiveIntensity = monitorEmissive * (1 + flicker * 0.3);
  });

  const screenTex =
    screenContent === "code" ? codeTex :
    screenContent === "ui" ? uiTex : null;

  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#08080a" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 4, -4]} receiveShadow>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.95} />
      </mesh>

      {/* Desk top */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.7]} />
        <meshStandardMaterial color="#1a1a1d" roughness={0.55} metalness={0.15} />
      </mesh>

      {/* Desk legs */}
      {[
        [-2.05, 0.7, -0.75],
        [2.05, 0.7, -0.75],
        [-2.05, 0.7, 0.75],
        [2.05, 0.7, 0.75],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 1.42, 0.06]} />
          <meshStandardMaterial color="#0a0a0d" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}

      {/* Monitor stand neck */}
      <mesh position={[0, 1.7, -0.45]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Monitor stand base */}
      <mesh position={[0, 1.5, -0.45]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.32]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Monitor — bezel */}
      <mesh position={[0, 2.5, -0.45]} castShadow>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#08080a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Monitor — screen (emissive) */}
      <mesh position={[0, 2.5, -0.42]}>
        <planeGeometry args={[2.38, 1.38]} />
        <meshStandardMaterial
          ref={screenMat}
          color={screenTex ? "#ffffff" : "#000000"}
          emissive="#ffffff"
          emissiveIntensity={monitorEmissive}
          emissiveMap={screenTex}
          map={screenTex}
          toneMapped={false}
        />
      </mesh>

      {/* MacBook base */}
      <mesh position={[0, 1.5, 0.4]} castShadow>
        <boxGeometry args={[1.45, 0.04, 1.0]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* MacBook lid */}
      <mesh position={[0, 1.93, -0.05]} rotation={[Math.PI / 2.5, 0, 0]} castShadow>
        <boxGeometry args={[1.45, 0.04, 0.95]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* MacBook keyboard cutout (subtle glow) */}
      <mesh position={[0, 1.525, 0.55]}>
        <planeGeometry args={[1.15, 0.55]} />
        <meshStandardMaterial color="#0a0a0c" emissive="#ffffff" emissiveIntensity={monitorEmissive * 0.15} toneMapped={false} />
      </mesh>

      {/* External keyboard */}
      <mesh position={[0, 1.5, 1.05]} castShadow>
        <boxGeometry args={[1.7, 0.05, 0.4]} />
        <meshStandardMaterial color="#15161a" roughness={0.45} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.532, 1.05]}>
        <boxGeometry args={[1.6, 0.001, 0.32]} />
        <meshStandardMaterial color="#08090b" roughness={0.7} />
      </mesh>

      {/* Coffee cup */}
      <group position={[1.55, 1.5, 0.6]}>
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

      {/* Plant pot */}
      <mesh position={[-1.85, 1.62, -0.45]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, 0.24, 16]} />
        <meshStandardMaterial color="#1a1a1d" roughness={0.7} />
      </mesh>
      <mesh position={[-1.85, 1.85, -0.45]}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#1f2823" roughness={0.9} />
      </mesh>

      {/* Chair seat */}
      <mesh position={[0, 0.85, 1.7]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Chair backrest */}
      <mesh position={[0, 1.45, 2.05]} castShadow>
        <boxGeometry args={[0.9, 1.25, 0.08]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Chair stem */}
      <mesh position={[0, 0.5, 1.7]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial color="#0c0d11" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Chair 5-star base */}
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
