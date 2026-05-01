"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";
import Character from "./Character";
import Workspace from "./Workspace";

// Camera holds a stable medium shot — workspace always framed.
// No fly-into-screen. Slide-up overlay handles the takeover.
const PHASE_CAMERA = {
  entry:      { x: 7.0, y: 4.0, z: 8.0, fov: 42, look: [0, 1.4, 0]    as [number, number, number] },
  typing:     { x: 4.5, y: 3.0, z: 5.5, fov: 36, look: [0, 1.9, -0.2] as [number, number, number] },
  transition: { x: 3.8, y: 2.9, z: 4.8, fov: 34, look: [0, 2.1, -0.3] as [number, number, number] },
  static:     { x: 3.8, y: 2.9, z: 4.8, fov: 34, look: [0, 2.1, -0.3] as [number, number, number] },
};

export default function DeveloperScene({ phase }: { phase: CinematicPhase }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const p = PHASE_CAMERA[phase as keyof typeof PHASE_CAMERA] ?? PHASE_CAMERA.typing;
    const dur = phase === "entry" ? 1.8 : phase === "typing" ? 1.4 : 1.0;

    gsap.to(camera.position, {
      x: p.x, y: p.y, z: p.z,
      duration: dur,
      ease: phase === "entry" ? "power2.out" : "power3.inOut",
    });
    const cam = camera as THREE.PerspectiveCamera;
    gsap.to(cam, {
      fov: p.fov,
      duration: dur,
      ease: "power2.inOut",
      onUpdate: () => cam.updateProjectionMatrix(),
    });
    gsap.to(targetLookAt.current, {
      x: p.look[0], y: p.look[1], z: p.look[2],
      duration: dur, ease: "power2.inOut",
    });
  }, [phase, camera]);

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

    const intensity = phase === "entry" ? 0.18 : 0.1;
    const target = PHASE_CAMERA[phase as keyof typeof PHASE_CAMERA] ?? PHASE_CAMERA.typing;
    const targetX = target.x + mouse.current.x * intensity;
    const targetY = target.y - mouse.current.y * intensity;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
  });

  // Brightness: dim during entry, full during typing+
  const monitorBrightness =
    phase === "entry" ? 0.4 :
    phase === "typing" ? 1.1 :
    1.0;

  return (
    <>
      {/* Ambient + soft fill */}
      <ambientLight intensity={0.6} color="#dde2ea" />
      <hemisphereLight args={["#cbd5e1", "#0a0b10", 0.5]} />

      {/* Front fill */}
      <pointLight position={[3, 4, 6]} intensity={1.4} color="#f0f4fa" distance={20} decay={1.2} />

      {/* Wall washes */}
      <pointLight position={[-6, 5, -3]} intensity={0.9} color="#a8b0bc" distance={18} decay={1.5} />
      <pointLight position={[6, 5, -3]} intensity={0.9} color="#a8b0bc" distance={18} decay={1.5} />

      {/* Monitor key + face wash — reduced so the screen isn't a hotspot */}
      <pointLight
        position={[0, 2.4, 0.6]}
        intensity={monitorBrightness * 2.5}
        color="#ffffff"
        distance={6}
        decay={2}
      />
      <pointLight
        position={[0, 2.4, 1.6]}
        intensity={monitorBrightness * 1.5}
        color="#cbd5e1"
        distance={7}
        decay={2}
      />

      <Workspace phase={phase} monitorBrightness={monitorBrightness} />
      <Character phase={phase} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.18} darkness={0.5} />
      </EffectComposer>
    </>
  );
}
