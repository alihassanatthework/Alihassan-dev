"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import MonitorPreview from "./MonitorPreview";

interface Props {
  /** 0..1 — driven by phase: dim during entry, bright during typing+ */
  monitorBrightness: number;
  /** When true, the DOM screen content is mounted (always true after first frame) */
  showScreenContent: boolean;
}

export default function Workspace({ monitorBrightness, showScreenContent }: Props) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const laptopScreenMat = useRef<THREE.MeshStandardMaterial>(null);
  const keyboardMat = useRef<THREE.MeshStandardMaterial>(null);
  const screenOpacity = useRef({ v: 0 });

  // GSAP fade for DOM screen content — never harsh
  useEffect(() => {
    gsap.to(screenOpacity.current, {
      v: showScreenContent ? 1 : 0.15, // never fully dark — gentle dim
      duration: 0.7,
      ease: "power2.out",
    });
  }, [showScreenContent]);

  // Live flicker on emissive intensity
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const flicker = Math.sin(t * 12) * 0.025 + Math.sin(t * 27) * 0.015;
    const target = monitorBrightness * 1.6;
    if (screenMat.current) screenMat.current.emissiveIntensity = target * (1 + flicker);
    if (laptopScreenMat.current) laptopScreenMat.current.emissiveIntensity = target * 0.7 * (1 + flicker);
    if (keyboardMat.current) keyboardMat.current.emissiveIntensity = monitorBrightness * 0.5;
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0b10" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Back wall — much wider, uniform color, no harsh shadow */}
      <mesh position={[0, 5, -6]} receiveShadow={false}>
        <planeGeometry args={[60, 14]} />
        <meshStandardMaterial color="#0c0d12" roughness={1} metalness={0} />
      </mesh>

      {/* Side walls (kill any visible vertical seam) */}
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow={false}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#0c0d12" roughness={1} />
      </mesh>
      <mesh position={[15, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow={false}>
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
        <meshStandardMaterial color="#08080b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Monitor — emissive screen plane (provides the bloom + light) */}
      <mesh position={[0, 2.5, -0.421]}>
        <planeGeometry args={[2.38, 1.38]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#000"
          emissive="#ffffff"
          emissiveIntensity={monitorBrightness * 1.6}
          toneMapped={false}
        />
      </mesh>

      {/* Monitor — DOM preview content rendered exactly on the screen, clipped */}
      {showScreenContent && (
        <Html
          position={[0, 2.5, -0.418]}
          transform
          occlude={false}
          distanceFactor={0.9}
          zIndexRange={[0, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              width: 2380, // matches plane width × 1000 so distanceFactor=0.9 makes it tight
              height: 1380,
              overflow: "hidden",
              borderRadius: 6,
              opacity: screenOpacity.current.v,
              transition: "opacity 0.4s ease-out",
              boxShadow: "0 0 90px rgba(255,255,255,0.18)",
            }}
          >
            <div style={{ transform: "scale(1.86)", transformOrigin: "top left" }}>
              <MonitorPreview />
            </div>
          </div>
        </Html>
      )}

      {/* MacBook base */}
      <mesh position={[0, 1.5, 0.42]} castShadow>
        <boxGeometry args={[1.5, 0.04, 1.0]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* MacBook lid (open) */}
      <group position={[0, 1.97, -0.08]} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.04, 1.0]} />
          <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Laptop screen — emissive front face */}
        <mesh position={[0, 0.022, 0]}>
          <planeGeometry args={[1.4, 0.88]} />
          <meshStandardMaterial
            ref={laptopScreenMat}
            color="#000"
            emissive="#ffffff"
            emissiveIntensity={monitorBrightness * 1.1}
            toneMapped={false}
          />
        </mesh>

        {/* Same DOM preview on laptop, mirrored to be readable from front */}
        {showScreenContent && (
          <Html
            position={[0, 0.024, 0]}
            transform
            occlude={false}
            distanceFactor={0.9}
            rotation={[Math.PI, 0, 0]}
            zIndexRange={[0, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                width: 1400,
                height: 880,
                overflow: "hidden",
                borderRadius: 4,
                opacity: screenOpacity.current.v * 0.9,
                transition: "opacity 0.4s ease-out",
              }}
            >
              <div style={{ transform: "scale(1.09)", transformOrigin: "top left" }}>
                <MonitorPreview />
              </div>
            </div>
          </Html>
        )}
      </group>

      {/* MacBook keyboard area — bright backlit glow */}
      <mesh position={[0, 1.525, 0.6]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial
          ref={keyboardMat}
          color="#0a0a0c"
          emissive="#fff7e0"
          emissiveIntensity={monitorBrightness * 0.5}
          toneMapped={false}
        />
      </mesh>
      {/* Keyboard key grid hint */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.55 + col * 0.092,
              1.526,
              0.42 + row * 0.06,
            ]}
          >
            <boxGeometry args={[0.072, 0.001, 0.04]} />
            <meshStandardMaterial color="#15161a" emissive="#fff7e0" emissiveIntensity={monitorBrightness * 0.18} />
          </mesh>
        ))
      )}

      {/* External keyboard */}
      <mesh position={[0, 1.5, 1.18]} castShadow>
        <boxGeometry args={[1.7, 0.05, 0.4]} />
        <meshStandardMaterial color="#15161a" roughness={0.45} metalness={0.5} />
      </mesh>
      {/* External keyboard backlight glow */}
      <mesh position={[0, 1.532, 1.18]}>
        <planeGeometry args={[1.6, 0.32]} />
        <meshStandardMaterial
          color="#08090b"
          emissive="#fff7e0"
          emissiveIntensity={monitorBrightness * 0.35}
          toneMapped={false}
        />
      </mesh>

      {/* Coffee cup */}
      <group position={[1.6, 1.5, 0.65]}>
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
      <mesh position={[-1.95, 1.62, -0.5]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, 0.24, 16]} />
        <meshStandardMaterial color="#1a1a1d" roughness={0.7} />
      </mesh>
      <mesh position={[-1.95, 1.85, -0.5]}>
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
