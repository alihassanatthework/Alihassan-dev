"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";
import Character from "./Character";
import Workspace from "./Workspace";

// Camera path: WIDE start → smooth zoom toward monitor → fill-frame at end.
// Final 'transition' position is so close to the screen plane (z=-0.4 in world)
// that the website preview occupies the entire viewport, ready for crossfade.
const PHASE_CAMERA = {
  entry:      { x: 8.5, y: 4.8, z: 9.5,  fov: 42, look: [0, 1.4, 0] as [number, number, number] },
  typing:     { x: 5.5, y: 3.2, z: 6.5,  fov: 36, look: [0, 1.8, -0.2] as [number, number, number] },
  reveal:     { x: 2.5, y: 2.8, z: 3.8,  fov: 30, look: [0, 2.4, -0.4] as [number, number, number] },
  text:       { x: 1.0, y: 2.55, z: 1.8, fov: 26, look: [0, 2.5, -0.42] as [number, number, number] },
  transition: { x: 0,   y: 2.5, z: 0.55, fov: 22, look: [0, 2.5, -0.42] as [number, number, number] },
  static:     { x: 0,   y: 2.5, z: 0.42, fov: 18, look: [0, 2.5, -0.42] as [number, number, number] },
};

export default function DeveloperScene({ phase }: { phase: CinematicPhase }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const p = PHASE_CAMERA[phase];
    const dur =
      phase === "entry" ? 3.0 :
      phase === "typing" ? 2.5 :
      phase === "reveal" ? 1.8 :
      phase === "text" ? 1.5 :
      phase === "transition" ? 2.0 :
      1.0;

    gsap.to(camera.position, {
      x: p.x, y: p.y, z: p.z,
      duration: dur,
      ease: phase === "entry" ? "power2.out"
          : phase === "transition" ? "power3.in"
          : "power3.inOut",
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

    // Subtle parallax — fades out as we approach the screen
    const intensity =
      phase === "entry" || phase === "typing" ? 0.18 :
      phase === "reveal" ? 0.08 :
      0.0;

    if (intensity > 0) {
      const targetX = PHASE_CAMERA[phase].x + mouse.current.x * intensity;
      const targetY = PHASE_CAMERA[phase].y - mouse.current.y * intensity;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
    }
  });

  // Lighting — much brighter than before, but still cinematic
  const screenOn = phase !== "entry";
  const monitorEmissive = screenOn ? 1.6 : 0;
  const ambient = phase === "entry" ? 0.55 : 0.32;

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={ambient} color="#dde2ea" />

      {/* Soft key light */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={phase === "entry" ? 1.6 : 0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Front fill — keeps room readable during entry */}
      <pointLight
        position={[3, 3, 5]}
        intensity={phase === "entry" ? 1.8 : 0.7}
        color="#e5e7eb"
        distance={14}
        decay={1.5}
      />

      {/* Monitor key light — punches once typing starts */}
      <pointLight
        position={[0, 2.4, 0.5]}
        intensity={screenOn ? 9 : 0}
        color="#ffffff"
        distance={7}
        decay={2}
      />
      {/* Wider monitor wash for face illumination */}
      <pointLight
        position={[0, 2.4, 1.5]}
        intensity={screenOn ? 4 : 0}
        color="#cbd5e1"
        distance={8}
        decay={2}
      />

      {/* Soft rim from behind */}
      <pointLight
        position={[2, 2.2, -2]}
        intensity={phase === "entry" ? 0.9 : 0.5}
        color="#a8b0bc"
        distance={6}
        decay={2}
      />

      <Workspace
        monitorEmissive={monitorEmissive}
        showScreenContent={screenOn}
      />
      <Character phase={phase} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={screenOn ? 0.85 : 0.25}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
