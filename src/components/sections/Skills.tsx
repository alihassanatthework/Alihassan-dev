"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";

type Skill = (typeof cv.skills)[number];

export default function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#00e5bf]" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-[#00e5bf]">Expertise</span>
        </div>
        <h2 className="mb-2 text-4xl font-black tracking-[-1px] text-[#eae9fc]">What I bring to the table.</h2>
        <p className="mb-8 text-sm text-white/35">Click any card to see proficiency levels + related projects.</p>
      </FadeIn>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-4">
        {cv.skills.map((skill, i) => (
          <FadeIn key={skill.id} delay={i * 0.07}>
            <motion.button
              onClick={() => setActive(active?.id === skill.id ? null : skill)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="group relative w-full rounded-xl border p-5 text-left"
              style={{
                background: active?.id === skill.id ? `rgba(${skill.colorRgb},0.06)` : "rgba(255,255,255,0.02)",
                borderColor: active?.id === skill.id ? `rgba(${skill.colorRgb},0.3)` : "rgba(255,255,255,0.06)",
                transition: "background .2s, border-color .2s",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl transition-opacity"
                style={{ background: `linear-gradient(90deg,${skill.color},#4d7cff)`, opacity: active?.id === skill.id ? 1 : 0.4 }}
              />

              <div className="font-mono text-[11px] uppercase tracking-[2px] mb-2" style={{ color: skill.color }}>
                {skill.num} // {skill.id.toUpperCase()}
              </div>
              <div className="text-base font-bold text-[#eee] mb-1">{skill.label}</div>
              <div className="text-xs leading-relaxed text-white/35 mb-3">{skill.desc}</div>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      background: `rgba(${skill.colorRgb},0.06)`,
                      color: skill.color,
                      borderColor: `rgba(${skill.colorRgb},0.1)`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-white/20 group-hover:text-white/40 transition">
                {active?.id === skill.id ? "Collapse ↑" : "View full breakdown →"}
              </div>
            </motion.button>
          </FadeIn>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-white/6 bg-white/2 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-base font-bold text-[#eee]">{active.label} — full breakdown</div>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/6 text-xs text-white/40 hover:text-white/70 transition"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[2px] text-white/25 mb-4">Proficiency</div>
                <div className="flex flex-col gap-3">
                  {active.proficiency.map((p) => (
                    <div key={p.name} className="flex items-center gap-3">
                      <span className="text-xs text-white/50 min-w-[150px]">{p.name}</span>
                      <div className="flex-1 h-[3px] bg-white/6 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: p.color }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-white/30 w-8 text-right">{p.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[2px] text-white/25 mb-3">Related projects</div>
                <div className="flex flex-col gap-2">
                  {active.projects.map((proj) => (
                    <div key={proj} className="flex items-center justify-between rounded-lg border border-white/4 bg-white/2 px-4 py-2.5">
                      <div className="text-sm font-medium text-[#eee]">{proj}</div>
                      <span className="text-xs text-white/20">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
