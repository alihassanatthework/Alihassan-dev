"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";
import Character from "./Character";
import Workspace from "./Workspace";

const PHASE_CAMERA = {
  entry:      { x: 6,    y: 3.6, z: 7,    fov: 38, look: [0, 1.4, 0] as [number, number, number] },
  typing:     { x: 4,    y: 2.6, z: 5,    fov: 35, look: [0, 1.6, -0.2] as [number, number, number] },
  reveal:     { x: 2,    y: 2.4, z: 3.4,  fov: 30, look: [0, 2.3, -0.4] as [number, number, number] },
  text:       { x: 1.2,  y: 2.5, z: 2.4,  fov: 28, look: [0, 2.5, -0.42] as [number, number, number] },
  transition: { x: 0,    y: 2.5, z: 0.6,  fov: 22, look: [0, 2.5, -0.42] as [number, number, number] },
  static:     { x: 0,    y: 2.5, z: 0.4,  fov: 20, look: [0, 2.5, -0.42] as [number, number, number] },
};

export default function DeveloperScene({ phase }: { phase: CinematicPhase }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const mouse = useRef({ x: 0, y: 0 });
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const p = PHASE_CAMERA[phase];
    gsap.to(camera.position, {
      x: p.x, y: p.y, z: p.z,
      duration: phase === "entry" ? 3 : phase === "transition" ? 2 : 1.6,
      ease: phase === "entry" ? "power2.out" : "power3.inOut",
    });
    const cam = camera as THREE.PerspectiveCamera;
    gsap.to(cam, {
      fov: p.fov,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => cam.updateProjectionMatrix(),
    });
    gsap.to(targetLookAt.current, {
      x: p.look[0], y: p.look[1], z: p.look[2],
      duration: 1.6, ease: "power2.inOut",
    });
  }, [phase, camera]);

  useEffect(() => {
    setShowPanel(phase === "reveal" || phase === "text" || phase === "transition");
  }, [phase]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    lookAt.current.lerp(targetLookAt.current, Math.min(delta * 4, 1));
    camera.lookAt(lookAt.current);

    const intensity = phase === "entry" || phase === "typing" ? 0.18 : 0.06;
    const targetX = PHASE_CAMERA[phase].x + mouse.current.x * intensity;
    const targetY = PHASE_CAMERA[phase].y - mouse.current.y * intensity;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
  });

  const monitorOn = phase === "typing" || phase === "reveal" || phase === "text" || phase === "transition";
  const ambient = phase === "entry" ? 0.5 : 0.18;
  const monitorLight = monitorOn ? 8 : 0;
  const monitorEmissive = monitorOn ? 1.8 : 0;
  const screenContent: "off" | "code" | "ui" =
    phase === "typing" ? "code" :
    phase === "reveal" || phase === "text" || phase === "transition" ? "ui" : "off";

  return (
    <>
      <ambientLight intensity={ambient} color="#dde2ea" />
      <directionalLight position={[-5, 6, 4]} intensity={phase === "entry" ? 1.2 : 0.4} color="#ffffff" />
      {/* Soft fill from front so room is readable during entry */}
      <pointLight position={[3, 3, 5]} intensity={phase === "entry" ? 1.5 : 0.6} color="#e5e7eb" distance={14} decay={1.5} />
      <pointLight position={[0, 1.5, 0.5]} intensity={monitorLight} color="#ffffff" distance={6} decay={2} />
      <pointLight position={[2, 2.2, -2]} intensity={phase === "entry" ? 0.6 : 0.4} color="#9aa0aa" distance={6} decay={2} />

      <Workspace monitorEmissive={monitorEmissive} screenContent={screenContent} />
      <Character phase={phase} />

      {showPanel && (
        <Html position={[0, 2.5, -0.4]} transform distanceFactor={1.5} className="pointer-events-none">
          <UIPanel />
        </Html>
      )}
    </>
  );
}

function UIPanel() {
  const words = ["Software", "Engineer", "//", "Full-Stack", "//", "AI", "/", "ML"];
  return (
    <div
      style={{
        width: 480,
        padding: "32px 36px",
        borderRadius: 18,
        background: "rgba(8,9,12,0.72)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 60px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        color: "#fff",
        opacity: 0,
        transform: "scale(0.94) translateY(8px)",
        animation: "panelIn 1s cubic-bezier(.2,.8,.2,1) forwards",
      }}
    >
      <style>{`
        @keyframes panelIn { to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes wordIn  { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace",
        fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase", marginBottom: 18,
      }}>
        EST · 2026
      </div>

      <h2 style={{
        fontFamily: "Georgia, 'Playfair Display', serif",
        fontSize: 36, lineHeight: 1.05, fontWeight: 400,
        margin: 0, marginBottom: 18, letterSpacing: "-0.02em",
      }}>
        Welcome to my <em style={{ fontWeight: 300 }}>universe</em>.
      </h2>

      <div style={{ height: 1, width: 36, background: "rgba(255,255,255,0.18)", marginBottom: 18 }} />

      <div style={{
        fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace",
        fontSize: 10, letterSpacing: 3, color: "#a1a1aa",
        textTransform: "uppercase", display: "flex", flexWrap: "wrap", gap: 8,
      }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              opacity: 0, transform: "translateY(8px)",
              animation: `wordIn 0.5s cubic-bezier(.2,.8,.2,1) ${0.6 + i * 0.08}s forwards`,
              color: w === "//" || w === "/" ? "rgba(255,255,255,0.3)" : undefined,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      <div style={{
        marginTop: 22, paddingTop: 16,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 12,
        opacity: 0,
        animation: `wordIn 0.6s cubic-bezier(.2,.8,.2,1) ${0.6 + words.length * 0.08 + 0.2}s forwards`,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: "linear-gradient(135deg,#1c1d22,#0a0b0e)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 700,
          color: "rgba(255,255,255,0.7)",
        }}>
          ME.
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", marginBottom: 2 }}>
            ME. AI Dermatology
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
            FEATURED · 90%+ ACCURACY
          </div>
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>→</div>
      </div>
    </div>
  );
}
