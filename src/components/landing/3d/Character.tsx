"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { CinematicPhase } from "@/hooks/useCinematicTimeline";

export default function Character({ phase }: { phase: CinematicPhase }) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const coffee = useRef<THREE.Group>(null);

  // Walk-in path
  useEffect(() => {
    if (!root.current) return;
    if (phase === "entry") {
      gsap.fromTo(
        root.current.position,
        { x: -4, y: 0, z: 2.5 },
        { x: 0, y: 0, z: 1.7, duration: 2.6, ease: "power1.inOut" }
      );
      gsap.fromTo(
        root.current.rotation,
        { y: Math.PI / 2 },
        { y: Math.PI, duration: 2.6, ease: "power2.inOut" }
      );
    } else if (phase === "typing") {
      gsap.to(root.current.position, { x: 0, y: -0.18, z: 1.7, duration: 0.6 });
      gsap.to(root.current.rotation, { y: Math.PI, duration: 0.6 });
    } else {
      gsap.to(root.current.position, { x: 0, y: -0.18, z: 1.7, duration: 0.6 });
    }
  }, [phase]);

  useEffect(() => {
    if (!coffee.current) return;
    if (phase === "entry") {
      gsap.to(coffee.current.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
    } else {
      gsap.to(coffee.current.scale, { x: 0, y: 0, z: 0, duration: 0.4 });
    }
  }, [phase]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (phase === "entry") {
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * 6) * 0.5;
      if (rightLeg.current) rightLeg.current.rotation.x = -Math.sin(t * 6) * 0.5;
      if (leftArm.current) leftArm.current.rotation.x = -Math.sin(t * 6) * 0.3;
      if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 6) * 0.3;
      if (torso.current) torso.current.position.y = Math.abs(Math.sin(t * 6)) * 0.04;
    } else if (phase === "typing") {
      if (leftArm.current) {
        leftArm.current.rotation.x = -1.4 + Math.sin(t * 14) * 0.06;
        leftArm.current.rotation.z = 0.15;
      }
      if (rightArm.current) {
        rightArm.current.rotation.x = -1.4 + Math.sin(t * 14 + 1.5) * 0.06;
        rightArm.current.rotation.z = -0.15;
      }
      if (leftLeg.current) leftLeg.current.rotation.x = -Math.PI / 2.2;
      if (rightLeg.current) rightLeg.current.rotation.x = -Math.PI / 2.2;
      if (head.current) head.current.position.y = 0.06 + Math.sin(t * 1.2) * 0.005;
      if (torso.current) torso.current.position.y = Math.sin(t * 1.4) * 0.008;
    } else {
      if (torso.current) torso.current.position.y = Math.sin(t * 1.2) * 0.01;
      if (leftArm.current) leftArm.current.rotation.x = -1.3;
      if (rightArm.current) rightArm.current.rotation.x = -1.3;
      if (leftLeg.current) leftLeg.current.rotation.x = -Math.PI / 2.2;
      if (rightLeg.current) rightLeg.current.rotation.x = -Math.PI / 2.2;
    }
  });

  const skin = "#d4c5b9";
  const shirt = "#1c1d22";
  const pants = "#0a0b0e";
  const hair = "#0a0a0c";

  return (
    <group ref={root} position={[-4, 0, 2.5]} rotation={[0, Math.PI / 2, 0]}>
      <group ref={coffee} position={[0.4, 1.1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.14, 16]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.65} />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.13, 0.55, 0]}>
        <group ref={leftLeg}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
            <meshStandardMaterial color={pants} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.62, 0.05]} castShadow>
            <boxGeometry args={[0.16, 0.08, 0.28]} />
            <meshStandardMaterial color="#08080a" roughness={0.5} metalness={0.3} />
          </mesh>
        </group>
      </group>
      <group position={[0.13, 0.55, 0]}>
        <group ref={rightLeg}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
            <meshStandardMaterial color={pants} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.62, 0.05]} castShadow>
            <boxGeometry args={[0.16, 0.08, 0.28]} />
            <meshStandardMaterial color="#08080a" roughness={0.5} metalness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Torso group */}
      <group ref={torso}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.55, 4, 12]} />
          <meshStandardMaterial color={shirt} roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0, 1.18, 0]} castShadow>
          <sphereGeometry args={[0.27, 16, 12]} />
          <meshStandardMaterial color={shirt} roughness={0.7} />
        </mesh>

        {/* Arms */}
        <group ref={leftArm} position={[-0.27, 1.18, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.4, 4, 8]} />
            <meshStandardMaterial color={shirt} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 12, 10]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.27, 1.18, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.4, 4, 8]} />
            <meshStandardMaterial color={shirt} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 12, 10]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 1.40, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>

        {/* Head — slightly egg-shaped (taller than wide) for natural proportions */}
        <group ref={head} position={[0, 1.56, 0]}>
          <mesh castShadow scale={[0.95, 1.1, 1]}>
            <sphereGeometry args={[0.13, 32, 28]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
          {/* Hair — full helmet covering top + back, not a flat saucer */}
          <mesh position={[0, 0.025, -0.005]} scale={[1.0, 1.05, 1.05]} castShadow>
            <sphereGeometry args={[0.135, 32, 28, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={hair} roughness={0.9} />
          </mesh>
          {/* Subtle ear hint */}
          <mesh position={[0.115, -0.01, 0]} castShadow>
            <sphereGeometry args={[0.022, 12, 10]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
          <mesh position={[-0.115, -0.01, 0]} castShadow>
            <sphereGeometry args={[0.022, 12, 10]} />
            <meshStandardMaterial color={skin} roughness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
