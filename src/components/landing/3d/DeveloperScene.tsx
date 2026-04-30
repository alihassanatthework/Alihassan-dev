"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";
import Character from "./Character";
import Workspace from "./Workspace";

// Camera path: WIDE → smooth zoom toward monitor screen → frame fills screen
const PHASE_CAMERA = {
  entry:      { x: 7.5, y: 4.2, z: 8.5,  fov: 42, look: [0, 1.4, 0]    as [number, number, number] },
  typing:     { x: 4.2, y: 2.8, z: 5.0,  fov: 36, look: [0, 1.8, -0.2] as [number, number, number] },
  reveal:     { x: 1.6, y: 2.65, z: 2.8, fov: 30, look: [0, 2.45, -0.42] as [number, number, number] },
  text:       { x: 0.5, y: 2.55, z: 1.4, fov: 24, look: [0, 2.5, -0.42] as [number, number, number] },
  transition: { x: 0,   y: 2.5, z: 0.05, fov: 18, look: [0, 2.5, -0.42] as [number, number, number] },
  static:     { x: 0,   y: 2.5, z: -0.3, fov: 14, look: [0, 2.5, -0.42] as [number, number, number] },
};

export default function DeveloperScene({ phase }: { phase: CinematicPhase }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const p = PHASE_CAMERA[phase];
    const dur =
      phase === "entry" ? 1.8 :
      phase === "typing" ? 1.4 :
      phase === "reveal" ? 1.1 :
      phase === "text" ? 1.0 :
      phase === "transition" ? 1.1 :
      0.6;

    gsap.to(camera.position, {
      x: p.x, y: p.y, z: p.z,
      duration: dur,
      ease:
        phase === "entry" ? "power2.out" :
        phase === "transition" ? "power2.in" :
        "power3.inOut",
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

    const intensity =
      phase === "entry" || phase === "typing" ? 0.15 :
      phase === "reveal" ? 0.05 :
      0.0;

    if (intensity > 0) {
      const targetX = PHASE_CAMERA[phase].x + mouse.current.x * intensity;
      const targetY = PHASE_CAMERA[phase].y - mouse.current.y * intensity;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
    }
  });

  // Screen always shows preview — even during entry, dim version is up
  // so we never see a white/blank screen flash.
  const screenOn = true;
  const monitorBrightness =
    phase === "entry" ? 0.4 :
    phase === "typing" ? 1.0 :
    phase === "reveal" || phase === "text" ? 1.15 :
    phase === "transition" ? 1.3 :
    1.0;

  // Wall fill — bright soft fill so wall is uniform, no harsh shadow
  const wallFill = phase === "entry" ? 1.0 : 0.6;

  return (
    <>
      {/* Ambient — generous so room is readable */}
      <ambientLight intensity={0.6} color="#dde2ea" />

      {/* Soft area-style fill positioned behind/above to bathe wall uniformly */}
      <hemisphereLight args={["#cbd5e1", "#0a0b10", 0.5]} />

      {/* Front fill that lights the desk + faces (no shadow, soft) */}
      <pointLight
        position={[3, 4, 6]}
        intensity={1.4}
        color="#f0f4fa"
        distance={20}
        decay={1.2}
      />

      {/* Wall wash light — keeps backdrop uniform */}
      <pointLight
        position={[-6, 5, -3]}
        intensity={wallFill * 1.2}
        color="#a8b0bc"
        distance={18}
        decay={1.5}
      />
      <pointLight
        position={[6, 5, -3]}
        intensity={wallFill * 1.2}
        color="#a8b0bc"
        distance={18}
        decay={1.5}
      />

      {/* Monitor key light — face illumination during typing */}
      <pointLight
        position={[0, 2.4, 0.6]}
        intensity={monitorBrightness * 6}
        color="#ffffff"
        distance={6}
        decay={2}
      />
      {/* Wider monitor wash for face */}
      <pointLight
        position={[0, 2.4, 1.6]}
        intensity={monitorBrightness * 3}
        color="#cbd5e1"
        distance={7}
        decay={2}
      />

      <Workspace
        monitorBrightness={monitorBrightness}
        showScreenContent={screenOn}
      />
      <Character phase={phase} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.18} darkness={0.6} />
      </EffectComposer>
    </>
  );
}
