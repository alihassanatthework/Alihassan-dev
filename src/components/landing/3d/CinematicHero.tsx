"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useCinematicTimeline } from "@/hooks/useCinematicTimeline";
import DeveloperScene from "./DeveloperScene";
import StaticHero from "../StaticHero";

export default function CinematicHero() {
  const { phase, isFinished, skip } = useCinematicTimeline();
  const [isMobile, setIsMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [unmountCanvas, setUnmountCanvas] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    setHasHydrated(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Stable mount flag — avoid HMR/strict double-init churn
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Unmount Canvas only AFTER crossfade has fully finished (perf rule)
  useEffect(() => {
    if (!isFinished) return;
    const t = setTimeout(() => setUnmountCanvas(true), 1800);
    return () => clearTimeout(t);
  }, [isFinished]);

  if (!hasHydrated) return <div className="h-screen w-full bg-black" />;
  if (isMobile) return <StaticHero />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas — single instance, never re-keyed, frameloop stable */}
      {!unmountCanvas && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFinished ? 0 : 1 }}
          transition={{ duration: 1.5, ease: [0.45, 0, 0.15, 1] }}
          className="absolute inset-0"
        >
          <Canvas
            shadows
            camera={{ position: [6, 4, 8], fov: 38 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <DeveloperScene phase={phase} />
            </Suspense>
          </Canvas>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_220px_rgba(0,0,0,0.85)]" />
        </motion.div>
      )}

      {/* Static hero — fades in as 3D fades out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 1.3, delay: isFinished ? 0.3 : 0, ease: "easeOut" }}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: isFinished ? "auto" : "none" }}
      >
        <StaticHero />
      </motion.div>

      {/* Skip Intro */}
      {!isFinished && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={skip}
          className="absolute bottom-10 right-10 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
        >
          Skip Intro →
        </motion.button>
      )}
    </div>
  );
}
