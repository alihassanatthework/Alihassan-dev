"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
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

  // Unmount the Canvas after crossfade finishes (perf rule)
  useEffect(() => {
    if (!isFinished) return;
    const t = setTimeout(() => setUnmountCanvas(true), 2200);
    return () => clearTimeout(t);
  }, [isFinished]);

  if (!hasHydrated) return <div className="h-screen bg-black" />;
  if (isMobile) return <StaticHero />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="sync">
        {!unmountCanvas && (
          <motion.div
            key="3d-scene"
            initial={{ opacity: 1 }}
            animate={{ opacity: isFinished ? 0 : 1 }}
            transition={{ duration: 1.6, ease: [0.45, 0, 0.15, 1] }}
            className="absolute inset-0"
          >
            <Canvas
              shadows
              camera={{ position: [6, 4, 8], fov: 38 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 1.75]}
              frameloop={isFinished ? "never" : "always"}
            >
              <Suspense fallback={null}>
                <DeveloperScene phase={phase} />
              </Suspense>
            </Canvas>

            {/* Vignette + grain */}
            <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_220px_rgba(0,0,0,0.85)]" />
            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static hero — fades in as 3D fades out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 1.4, delay: isFinished ? 0.3 : 0, ease: "easeOut" }}
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
