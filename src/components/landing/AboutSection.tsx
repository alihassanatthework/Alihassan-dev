"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cv } from "@/data/cv";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const linkClass = "text-white font-medium border-b border-white/10 hover:border-white transition-all duration-300 cursor-pointer";

  return (
    <section id="about" className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Label and Heading at the top */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-bold">
              {cv.about.label}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl text-white leading-[1] tracking-tighter"
          >
            The <span className="text-white/40 font-light italic">full</span> <span className="font-bold">picture.</span>
          </motion.h2>
        </div>

        {/* Parallel Grid: Image on Left, Bio on Right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Journey Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative group rounded-3xl overflow-hidden liquid-glass border border-white/10 shadow-2xl"
          >
            <img 
              src="/journey.png" 
              alt="My Journey" 
              className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105 filter grayscale-[0.2] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Column: Bio Text (Expanded for Vertical Symmetry) */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-white/80 text-xl md:text-2xl font-light leading-snug tracking-tight text-balance">
                I am a final year Software Engineering student at <a href="https://www.umt.edu.pk/" target="_blank" rel="noopener noreferrer" className={linkClass}>UMT Lahore</a> with a singular focus: architecting production systems that deliver measurable impact.
              </p>
              
              <p className="text-white/50 text-base md:text-lg leading-relaxed">
                Over the last two years, I have independently shipped <a href="#projects" className={linkClass}>10+ freelance applications</a>, led multi backend recruitment platforms, and delivered custom computer vision solutions to a global clientele. My work includes an AI powered dermatology platform achieving <a href="#projects" className={linkClass}>90%+ classification accuracy</a>.
              </p>

              <p className="text-white/50 text-base md:text-lg leading-relaxed">
                My approach combines rigorous engineering principles with the agility required for production success. I specialize in building <span className="text-white font-medium">enterprise grade architectures</span> that scale seamlessly, focusing on clean code, system reliability, and intuitive user experiences.
              </p>

              <p className="text-white/50 text-base md:text-lg leading-relaxed">
                I bridge the gap between frontend precision and backend depth—bringing mastery in <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={linkClass}>React</a>, <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>TypeScript</a>, <a href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>Django</a>, <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer" className={linkClass}>Spring Boot</a>, and <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>Node.js</a> to every project.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-2 flex flex-col gap-4"
            >
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 liquid-glass rounded-3xl px-6 py-4 w-fit border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-white/90 font-bold uppercase tracking-widest font-mono">Available for new engagements</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="text-sm font-mono text-white/90">
                  <span className="text-white/40 mr-1">Rate:</span> {cv.rates.hourly}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
