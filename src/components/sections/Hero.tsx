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
        {val}<span className="text-xs text-[#00e5bf]">{stat.suffix}</span>
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-white/30">{stat.label}</div>
    </div>
  );
}

const COLORS = ["#00e5bf", "#4d7cff", "#8b5cf6", "#ec4899"];

export default function Hero() {
  const [statsActive, setStatsActive] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // 80 particles — scatter randomly, then converge to orbit positions
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 160 + Math.random() * 30;
      const startAngle = Math.random() * Math.PI * 2;
      const startRadius = 250 + Math.random() * 200;
      return {
        id: i,
        startX: Math.cos(startAngle) * startRadius,
        startY: Math.sin(startAngle) * startRadius,
        endX: Math.cos(angle) * radius,
        endY: Math.sin(angle) * radius,
        size: 1 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.6,
        orbitDuration: 6 + Math.random() * 6,
      };
    });
  }, []);

  // Trigger image reveal after particles converge
  useEffect(() => {
    const t = setTimeout(() => setImageRevealed(true), 1400);
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
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16">
      {/* Soft pastel gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(244,114,182,0.08),transparent 70%)" }}
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-10 h-[450px] w-[450px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(77,124,255,0.10),transparent 70%)" }}
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/4 bottom-0 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(0,229,191,0.08),transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
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

        {/* Curved tagline ring */}
        <motion.div
          className="absolute inset-[-50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageRevealed ? 1 : 0, rotate: 360 }}
          transition={{ opacity: { duration: 1, delay: 1.6 }, rotate: { repeat: Infinity, duration: 30, ease: "linear" } }}
        >
          <svg viewBox="0 0 480 480" className="h-full w-full">
            <defs>
              <path id="circlePath" d="M 240,240 m -210,0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0" />
            </defs>
            <text fill="rgba(0,229,191,0.55)" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "8px" }}>
              <textPath href="#circlePath">
                LET&apos;S BUILD SOMETHING · CRAFT · SHIP · SCALE · LEARN ·
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Dashed orbit ring */}
        <motion.div
          className="absolute inset-[-30px] rounded-full border border-dashed border-white/8"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: imageRevealed ? 1 : 0, rotate: -360 }}
          transition={{ opacity: { duration: 0.8, delay: 1.5 }, rotate: { repeat: Infinity, duration: 40, ease: "linear" } }}
        />

        {/* Inner accent ring */}
        <motion.div
          className="absolute inset-[-12px] rounded-full"
          style={{ border: "1px solid rgba(0,229,191,0.2)" }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: imageRevealed ? 1 : 0, rotate: 360 }}
          transition={{ opacity: { duration: 0.8, delay: 1.5 }, rotate: { repeat: Infinity, duration: 25, ease: "linear" } }}
        />

        {/* Glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(0,229,191,0.18),transparent 65%)" }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={
            imageRevealed
              ? { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
              : { scale: 1, opacity: 0.4 }
          }
          transition={
            imageRevealed
              ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
              : { duration: 1, delay: 0.8 }
          }
        />

        {/* Profile image — circle, fades in after particles converge */}
        <motion.div
          className="relative h-[280px] w-[280px] overflow-hidden rounded-full sm:h-[340px] sm:w-[340px]"
          style={{
            background: "linear-gradient(135deg,#0d1428,#1a0f3c)",
            boxShadow: "0 25px 70px rgba(0,229,191,0.18), inset 0 0 0 2px rgba(255,255,255,0.06)",
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
            style={{ background: "linear-gradient(180deg,transparent 55%,rgba(7,8,15,0.35))" }}
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
        <h1 className="text-5xl font-black tracking-[-2px] text-[#eae9fc] sm:text-7xl lg:text-[88px] lg:leading-[0.95]">
          {cv.name.split(" ")[0]}{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg,#00e5bf,#4d7cff,#8b5cf6)" }}
          >
            {cv.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[3px] text-white/45 sm:text-sm"
        >
          <span>Software Engineer</span>
          <span className="text-[#00e5bf]">//</span>
          <span>Full-Stack Developer</span>
          <span className="text-[#00e5bf]">//</span>
          <span>AI / ML Engineer</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="mt-5 text-sm leading-relaxed text-white/40 max-w-md mx-auto"
        >
          {cv.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <motion.button
            onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl px-7 py-3 text-sm font-semibold text-[#07080f]"
            style={{ background: "linear-gradient(135deg,#00e5bf,#4d7cff)", boxShadow: "0 8px 24px rgba(0,229,191,0.2)" }}
          >
            Explore my work
          </motion.button>
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl border border-white/12 px-7 py-3 text-sm text-[#eae9fc] hover:border-white/30 transition-colors"
          >
            Get in touch
          </motion.button>
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-6 border-t border-white/5 pt-7 sm:gap-12"
        >
          {cv.stats.map((s) => (
            <StatCounter key={s.label} stat={s} active={statsActive} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
