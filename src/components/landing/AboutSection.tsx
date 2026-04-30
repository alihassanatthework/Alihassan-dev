"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-white/40 text-sm tracking-widest uppercase">
            {cv.about.label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 lg:gap-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          >
            {cv.about.heading.split(" ")[0]} <span className="text-white/60 font-light" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>{cv.about.heading.split(" ").slice(1).join(" ")}</span>
          </motion.h2>

          <div className="flex flex-col gap-6 pt-2">
            {cv.about.bio.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="text-white/60 text-base md:text-lg leading-relaxed text-balance"
              >
                {paragraph}
              </motion.p>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-3 liquid-glass rounded-full px-5 py-2.5 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-white/80 font-medium">Available for freelance work · {cv.rates.hourly}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
