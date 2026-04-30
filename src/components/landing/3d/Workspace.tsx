"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import MonitorPreview from "./MonitorPreview";

interface Props {
  monitorEmissive: number;   // 0..2 — drives both bezel emissive + DOM opacity
  showScreenContent: boolean; // when true, mount the Html screen
}

export default function Workspace({ monitorEmissive, showScreenContent }: Props) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const laptopScreenMat = useRef<THREE.MeshStandardMaterial>(null);
  const screenOpacity = useRef({ v: 0 });

  // GSAP fade-in for DOM screen so it doesn't hard-flash
  useEffect(() => {
    gsap.to(screenOpacity.current, {
      v: showScreenContent ? 1 : 0,
      duration: showScreenContent ? 0.8 : 0.3,
      ease: "power2.out",
    });
  }, [showScreenContent]);

  // Subtle screen flicker for liveness
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const flicker = Math.sin(t * 12) * 0.03 + Math.sin(t * 27) * 0.02;
    if (screenMat.current) {
      screenMat.current.emissiveIntensity = monitorEmissive * (1 + flicker * 0.25);
    }
    if (laptopScreenMat.current) {
      laptopScreenMat.current.emissiveIntensity = monitorEmissive * 0.65 * (1 + flicker * 0.25);
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0c0c10" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 4, -4]} receiveShadow>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color="#0e0f14" roughness={0.95} />
      </mesh>

      {/* Desk top — slight metallic for screen reflections */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.7]} />
        <meshStandardMaterial color="#1d1d22" roughness={0.4} metalness={0.25} />
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
      <mesh position={[0, 1.5, -0.45]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.32]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Monitor — bezel */}
      <mesh position={[0, 2.5, -0.45]} castShadow>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#0a0a0d" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Monitor — emissive screen plane (provides bloom + light) */}
      <mesh position={[0, 2.5, -0.421]}>
        <planeGeometry args={[2.38, 1.38]} />
        <meshStandardMaterial
          ref={screenMat}
          color={monitorEmissive > 0 ? "#1a1a22" : "#000000"}
          emissive="#ffffff"
          emissiveIntensity={monitorEmissive}
          toneMapped={false}
        />
      </mesh>

      {/* Monitor — DOM content rendered on top of screen */}
      {showScreenContent && (
        <Html
          position={[0, 2.5, -0.418]}
          transform
          occlude={false}
          distanceFactor={1.45}
          zIndexRange={[0, 0]}
          style={{
            opacity: screenOpacity.current.v,
            transition: "none",
            pointerEvents: "none",
          }}
          className="cinematic-screen"
        >
          <div
            style={{
              width: 1280,
              height: 800,
              transform: "scale(0.001)", // hack: real scale set via distanceFactor
            }}
          />
          {/* Drei <Html transform> already handles real scaling — render preview directly */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1280,
              height: 800,
              opacity: showScreenContent ? 1 : 0,
              transition: "opacity 0.6s ease-out",
              boxShadow: "0 0 80px rgba(255,255,255,0.15)",
              pointerEvents: "none",
            }}
          >
            <MonitorPreview />
          </div>
        </Html>
      )}

      {/* MacBook base */}
      <mesh position={[0, 1.5, 0.4]} castShadow>
        <boxGeometry args={[1.45, 0.04, 1.0]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* MacBook lid */}
      <group position={[0, 1.93, -0.05]} rotation={[Math.PI / 2.5, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.04, 0.95]} />
          <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Laptop screen — glowing emissive front face */}
        <mesh position={[0, 0.022, 0]}>
          <planeGeometry args={[1.38, 0.86]} />
          <meshStandardMaterial
            ref={laptopScreenMat}
            color={monitorEmissive > 0 ? "#1a1a22" : "#000000"}
            emissive="#ffffff"
            emissiveIntensity={monitorEmissive * 0.65}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* MacBook keyboard glow */}
      <mesh position={[0, 1.525, 0.55]}>
        <planeGeometry args={[1.15, 0.55]} />
        <meshStandardMaterial
          color="#0a0a0c"
          emissive="#ffffff"
          emissiveIntensity={monitorEmissive * 0.18}
          toneMapped={false}
        />
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
