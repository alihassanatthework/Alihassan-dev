"use client";

import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left — text */}
        <div>
          <FadeIn>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#00e5bf]" />
              <span className="font-mono text-xs uppercase tracking-[2px] text-[#00e5bf]">{cv.about.label}</span>
            </div>
            <h2 className="mb-8 text-4xl font-black tracking-[-1px] text-[#eae9fc]">{cv.about.heading}</h2>
          </FadeIn>

          <div className="space-y-5">
            {cv.about.bio.map((para, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <p className="text-sm leading-7 text-white/50 sm:text-[15px]">{para}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#00e5bf]/15 bg-[#00e5bf]/6 px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5bf] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5bf]" />
              </span>
              <span className="text-sm font-medium text-[#00e5bf]">Available for freelance work · {cv.rates.hourly}</span>
            </div>
          </FadeIn>
        </div>

        {/* Right — services */}
        <div className="space-y-4">
          {cv.services.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1} direction="left">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-xl border border-white/6 bg-white/2 p-5"
              >
                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: `linear-gradient(180deg,${s.color},transparent)` }}
                />
                <div className="pl-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: s.color }}>
                      {s.num}
                    </span>
                    <span className="text-sm font-bold text-[#eae9fc]">{s.title}</span>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-white/40">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border"
                        style={{
                          background: `rgba(${s.colorRgb},0.06)`,
                          color: s.color,
                          borderColor: `rgba(${s.colorRgb},0.12)`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
