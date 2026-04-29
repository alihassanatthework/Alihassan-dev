"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <FadeIn>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#00e5bf]" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-[#00e5bf]">Journey</span>
        </div>
        <h2 className="mb-12 text-4xl font-black tracking-[-1px] text-[#eae9fc]">How I got here.</h2>
      </FadeIn>

      <div className="relative">
        {/* Animated vertical line */}
        <div ref={lineRef} className="absolute left-[88px] top-0 bottom-0 w-px bg-white/5 overflow-hidden">
          <motion.div
            className="w-full origin-top"
            style={{ background: "linear-gradient(180deg,#00e5bf,#4d7cff,#8b5cf6,transparent)" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-8">
          {cv.timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="left">
              <div className="flex items-start gap-8">
                {/* Year */}
                <div className="w-[72px] shrink-0 text-right">
                  <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                    {item.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative z-10 mt-0.5">
                  <motion.div
                    className="h-3 w-3 rounded-full border-2 border-[#07080f]"
                    style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 300 }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="text-sm font-bold text-[#eae9fc]">{item.title}</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider" style={{ color: item.color }}>
                    {item.role}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/40">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
