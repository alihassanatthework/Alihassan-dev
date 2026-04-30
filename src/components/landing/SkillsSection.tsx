"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex items-center gap-4 flex-wrap">
            <span>Core</span>
            <span className="text-white/40 font-light lowercase">competencies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cv.skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="liquid-glass rounded-3xl p-6 md:p-8 group relative overflow-hidden flex flex-col"
            >
              {/* Subtle top border gradient matching skill color */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
              />

              <div className="flex items-start justify-between mb-8">
                <span className="text-white/40 text-xs tracking-widest uppercase font-medium font-mono">
                  {skill.num}
                </span>
                <div 
                  className="w-2 h-2 rounded-full opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_12px_currentColor] transition-all"
                  style={{ backgroundColor: skill.color, color: skill.color }}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                  {skill.label}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
