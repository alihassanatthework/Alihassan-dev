"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cv } from "@/data/cv";
import { ArrowUpRight } from "lucide-react";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "fullstack", label: "FULL-STACK" },
  { id: "ml", label: "ML / AI" },
  { id: "vision", label: "VISION" },
  { id: "freelance", label: "FREELANCE" },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("all");

  const visibleProjects = cv.projects.filter(
    (p) => filter === "all" || p.category.includes(filter)
  );

  return (
    <section id="projects" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex items-center gap-4 flex-wrap">
              <span>Selected</span>
              <span className="text-white/40 font-light lowercase">works</span>
            </h2>
            <span className="hidden md:block text-white/40 text-sm tracking-widest uppercase">
              Portfolio
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`liquid-glass rounded-full px-5 py-2 text-xs md:text-sm font-medium transition-all ${
                  filter === f.id 
                    ? "bg-white/10 text-white" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="liquid-glass rounded-3xl overflow-hidden group flex flex-col cursor-pointer"
              >
                {/* Visual Header */}
                <div 
                  className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden"
                  style={{ background: p.bgGradient }}
                >
                  <motion.span
                    className="font-mono text-4xl md:text-5xl font-bold text-white/20 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/30"
                  >
                    {p.abbr}
                  </motion.span>
                  
                  {p.badge && (
                    <div className="absolute top-4 right-4 liquid-glass rounded-full px-3 py-1 backdrop-blur-md border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      <span 
                        className="text-[10px] font-mono tracking-widest font-bold text-white/90"
                      >
                        {p.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="liquid-glass rounded-full p-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="mt-auto">
                    <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                      {p.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {p.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
