"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cv } from "@/data/cv";

function useCountUp(target: number, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

function StatCounter({ stat, active }: { stat: (typeof cv.stats)[number]; active: boolean }) {
  const val = useCountUp(stat.value, 1600, active);
  return (
    <div className="text-center">
      <div className="text-2xl font-black text-[#eae9fc] tabular-nums">
        {val}<span className="text-xs text-[#ffffff]">{stat.suffix}</span>
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-white/30">{stat.label}</div>
    </div>
  );
}

// User requested pure white dots instead of the colorful ones.
const COLORS = ["#ffffff"];

export default function ProfileIntroSection() {
  const [statsActive, setStatsActive] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // 80 particles — scatter randomly, then converge to orbit positions
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      // Using deterministic Math.random replacement for pure components (pseudo-random)
      const rand = () => Math.random(); 
      const angle = rand() * Math.PI * 2;
      const radius = 160 + rand() * 30;
      const startAngle = rand() * Math.PI * 2;
      const startRadius = 250 + rand() * 200;
      return {
        id: i,
        startX: Math.cos(startAngle) * startRadius,
        startY: Math.sin(startAngle) * startRadius,
        endX: Math.cos(angle) * radius,
        endY: Math.sin(angle) * radius,
        size: 1 + rand() * 2.5,
        color: COLORS[i % COLORS.length],
        delay: rand() * 0.6,
        orbitDuration: 6 + rand() * 6,
      };
    });
  }, []);

  // Trigger image reveal after particles converge
  useEffect(() => {
    // Reveal slightly later since this is no longer the absolute top of the page
    const t = setTimeout(() => setImageRevealed(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about-intro" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 bg-black z-10 border-t border-white/5">
      {/* Soft pastel gradient blobs (updated to match darker theme) */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03),transparent 70%)" }}
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-10 h-[450px] w-[450px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(255,255,255,0.02),transparent 70%)" }}
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Image cluster */}
      <div className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[400px] sm:w-[400px]">
        {/* Particles — scatter then converge */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              left: "50%",
              top: "50%",
            }}
            initial={{ x: p.startX, y: p.startY, opacity: 0 }}
            animate={
              imageRevealed
                ? {
                    x: [p.endX, p.endX * 1.05, p.endX],
                    y: [p.endY, p.endY * 1.05, p.endY],
                    opacity: [0.3, 0.8, 0.3],
                  }
                : { x: p.endX, y: p.endY, opacity: 0.9 }
            }
            transition={
              imageRevealed
                ? { repeat: Infinity, duration: p.orbitDuration, ease: "easeInOut" }
                : { duration: 1.2, delay: p.delay, ease: [0.34, 1.56, 0.64, 1] }
            }
          />
        ))}

        {/* Dashed orbit ring */}
        <motion.div
          className="absolute inset-[-30px] rounded-full border border-dashed border-white/10"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: imageRevealed ? 1 : 0, rotate: -360 }}
          transition={{ opacity: { duration: 0.8, delay: 1.5 }, rotate: { repeat: Infinity, duration: 40, ease: "linear" } }}
        />

        {/* Inner accent ring */}
        <motion.div
          className="absolute inset-[-12px] rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: imageRevealed ? 1 : 0, rotate: 360 }}
          transition={{ opacity: { duration: 0.8, delay: 1.5 }, rotate: { repeat: Infinity, duration: 25, ease: "linear" } }}
        />

        {/* Profile image — circle, fades in after particles converge */}
        <motion.div
          className="relative h-[280px] w-[280px] overflow-hidden rounded-full sm:h-[340px] sm:w-[340px]"
          style={{
            background: "linear-gradient(135deg,#0d1428,#1a0f3c)",
            boxShadow: "0 25px 70px rgba(255,255,255,0.1), inset 0 0 0 2px rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={
            imageRevealed
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.85, filter: "blur(20px)" }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/profile.jpg"
            alt={`${cv.name} — ${cv.title}`}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 15%" }}
            sizes="(max-width: 640px) 280px, 340px"
          />
          {/* Subtle bottom fade */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.8))" }}
          />
        </motion.div>
      </div>

      {/* Name + roles below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
        className="relative z-10 mt-10 text-center max-w-3xl"
      >
        <h1 className="text-5xl font-black tracking-[-2px] text-white sm:text-7xl lg:text-[88px] lg:leading-[0.95]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {cv.name.split(" ")[0]}{" "}
          <em className="italic font-light text-white/80">
            {cv.name.split(" ").slice(1).join(" ")}
          </em>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[3px] text-white/50 sm:text-sm"
        >
          <span>Software Engineer</span>
          <span className="text-white/30">//</span>
          <span>Full-Stack Developer</span>
          <span className="text-white/30">//</span>
          <span>AI / ML Engineer</span>
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-white/10"
        >
          {cv.stats.map((s) => (
            <StatCounter key={s.label} stat={s} active={statsActive} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
