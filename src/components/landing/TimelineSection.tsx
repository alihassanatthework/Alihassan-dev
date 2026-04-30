"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={ref}>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex justify-center gap-4 flex-wrap">
            <span>The</span>
            <span 
              className="text-white/40 font-light lowercase" 
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              journey
            </span>
          </h2>
        </motion.div>

        <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-0">
          {cv.timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="mb-12 md:mb-16 relative"
            >
              {/* Timeline Dot */}
              <div 
                className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full shadow-[0_0_12px_currentColor]"
                style={{ backgroundColor: item.color, color: item.color }}
              />

              <div className="liquid-glass rounded-3xl p-6 md:p-8 relative overflow-hidden group">
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(180deg, ${item.color}, transparent)` }}
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-medium tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <div className="text-white/40 text-sm font-mono tracking-widest uppercase">
                      {item.role}
                    </div>
                  </div>
                  <div 
                    className="liquid-glass rounded-full px-4 py-1.5 text-xs font-mono font-bold w-fit"
                    style={{ color: item.color }}
                  >
                    {item.year}
                  </div>
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
