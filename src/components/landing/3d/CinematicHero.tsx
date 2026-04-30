"use client";

import { Suspense, useState, useEffect } from "react";
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

  useEffect(() => {
    setHasHydrated(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isFinished) return;
    const t = setTimeout(() => setUnmountCanvas(true), 1400);
    return () => clearTimeout(t);
  }, [isFinished]);

  if (!hasHydrated) return <div className="h-screen w-full bg-black" />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {!unmountCanvas && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFinished ? 0 : 1 }}
          transition={{ duration: 1.2, ease: [0.45, 0, 0.15, 1] }}
          className="absolute inset-0"
        >
          <Canvas
            shadows
            camera={{ position: [7.5, 4.2, 8.5], fov: 42 }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
            }}
            dpr={isMobile ? [1, 1] : [1, 1.5]}
          >
            <Suspense fallback={null}>
              <DeveloperScene phase={phase} />
            </Suspense>
          </Canvas>

          {/* Soft inner glow vignette */}
          <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
        </motion.div>
      )}

      {/* Static hero crossfades in — content matches preview pixel-for-pixel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 1.0, delay: isFinished ? 0.2 : 0, ease: "easeOut" }}
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
          transition={{ delay: 0.6 }}
          onClick={skip}
          className="absolute bottom-8 right-8 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white transition-colors"
        >
          Skip Intro →
        </motion.button>
      )}
    </div>
  );
}
