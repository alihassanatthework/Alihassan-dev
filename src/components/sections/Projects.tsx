"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";
import FadeIn from "@/components/ui/FadeIn";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "fullstack", label: "FULL-STACK" },
  { id: "ml", label: "ML / AI" },
  { id: "vision", label: "VISION" },
  { id: "freelance", label: "FREELANCE" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const visible = cv.projects.filter(
    (p) => filter === "all" || p.category.includes(filter)
  );

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-[#00e5bf]" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-[#00e5bf]">Work</span>
        </div>
        <h2 className="mb-2 text-4xl font-black tracking-[-1px] text-[#eae9fc]">Things I&apos;ve built.</h2>
        <p className="mb-7 text-sm text-white/35">Each project solved a real problem for a real client or stakeholder.</p>
      </FadeIn>

      {/* Filter tabs */}
      <FadeIn delay={0.1}>
        <div className="mb-7 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setFilter(f.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-xs rounded-lg px-4 py-2 transition-all duration-200"
              style={
                filter === f.id
                  ? { background: "#00e5bf", color: "#07080f", fontWeight: 700 }
                  : { color: "rgba(255,255,255,0.3)", border: "0.5px solid rgba(255,255,255,0.06)" }
              }
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/2 cursor-pointer"
              style={{ transition: "border-color .2s, box-shadow .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Thumbnail */}
              <div
                className="relative flex h-36 flex-col items-center justify-center overflow-hidden"
                style={{ background: p.bgGradient }}
              >
                <motion.span
                  className="font-mono text-2xl font-bold text-white/40"
                  whileHover={{ scale: 1.1 }}
                >
                  {p.abbr}
                </motion.span>
                {p.badge && (
                  <span
                    className="absolute top-2.5 right-2.5 font-mono text-[9px] px-2.5 py-1 rounded-md"
                    style={{
                      background: `rgba(${
                        p.badgeColor === "#00e5bf" ? "0,229,191" :
                        p.badgeColor === "#4d7cff" ? "77,124,255" :
                        p.badgeColor === "#f0c040" ? "240,192,64" :
                        p.badgeColor === "#ec4899" ? "236,72,153" :
                        "249,115,22"
                      },0.15)`,
                      color: p.badgeColor,
                      border: `0.5px solid ${p.badgeColor}30`,
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(0,0,0,.65)" }}>
                  <span className="rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs text-white/80 backdrop-blur">Case study</span>
                  <span className="rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs text-white/80 backdrop-blur">GitHub →</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="mb-1.5 text-sm font-bold text-[#eee]">{p.title}</div>
                <div className="mb-4 text-xs leading-relaxed text-white/40">{p.desc}</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded"
                      style={{ background: "rgba(77,124,255,0.08)", color: "#4d7cff" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
