"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex gap-4 flex-wrap">
            <span>Client</span>
            <span className="text-white/40 font-light lowercase">Feedback</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cv.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl p-8 flex flex-col relative group"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-0 blur-3xl pointer-events-none transition-opacity group-hover:opacity-10"
              />

              <div className="mb-8 flex-1">
                <span className="text-white/20 text-4xl font-serif leading-none absolute -mt-4 -ml-2">&quot;</span>
                <p className="text-white/60 text-sm md:text-base leading-relaxed relative z-10">
                  {review.text}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono bg-white/5 text-white/60 border border-white/10 group-hover:bg-white group-hover:text-black transition-all"
                >
                  {review.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{review.author}</div>
                  <div className="text-white/40 text-xs font-mono tracking-wider">{review.project}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
