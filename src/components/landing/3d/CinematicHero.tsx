"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { cn } from "@/lib/utils";
import DeveloperScene from "./DeveloperScene";
import StaticHero from "../StaticHero";

export default function CinematicHero() {
  const { phase, isFinished, skip } = useCinematic();
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

  // Unmount Canvas after slide-up has fully landed + a beat
  useEffect(() => {
    if (!isFinished) return;
    const t = setTimeout(() => setUnmountCanvas(true), 800);
    return () => clearTimeout(t);
  }, [isFinished]);

  if (!hasHydrated) return <div className="h-screen w-full bg-black" />;

  // Slide-up triggers as soon as transition phase starts (or on skip)
  const slideUp = phase === "transition" || phase === "static" || isFinished;

  return (
    <div className={cn("relative w-full h-screen bg-black overflow-hidden", !isFinished ? "z-[60]" : "z-0")}>
      {/* 3D scene — never unmounts mid-cinematic */}
      {!unmountCanvas && (
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            camera={{ position: [7, 4, 8], fov: 42 }}
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
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]" />
        </div>
      )}

      {/* Slide-up overlay — preview rises from bottom, covers viewport, becomes the real site */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: slideUp ? "0%" : "100%" }}
        transition={{
          duration: 1.4,
          ease: [0.32, 0.72, 0, 1], // smooth deceleration curve
        }}
        className="absolute inset-0 z-20 bg-black"
        style={{ pointerEvents: slideUp ? "auto" : "none" }}
      >
        <StaticHero />
      </motion.div>

      {/* Skip Intro */}
      {!isFinished && phase !== "transition" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={skip}
          className="absolute bottom-8 right-8 z-[9999] font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white transition-colors"
        >
          Skip Intro →
        </motion.button>
      )}
    </div>
  );
}
