"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    type: "education",
    title: "BS Software Engineering",
    institution: "University of Management and Technology (UMT)",
    date: "Nov 2022 – Jun 2026",
    logo: "/UMT Logo.png",
    skills: ["Software Architecture", "AI ML", "Web Engineering", "Database Systems", "SPM", "SQE"],
    isTop: true
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Front-End Developer Professional",
    date: "Jan 2024 · Apr 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Front-End Development"],
    category: "frontend"
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Back-End Developer Professional",
    date: "Jul 2024 · Dec 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Back-End Web Development"],
    category: "backend"
  },
  {
    type: "cert",
    platform: "University of Michigan",
    title: "Django for Everybody Specialization",
    date: "Apr 2024 · Jul 2024",
    logo: "/University of Michigan.png",
    skills: ["Django", "Python", "Back-End Web Development"],
    category: "django"
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Full Stack Developer Specialization",
    date: "Jan 2024 · Dec 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Front-End Development", "Full-Stack Development"],
    category: "fullstack"
  },
  {
    type: "cert",
    platform: "IBM",
    title: "IBM Machine Learning Professional",
    date: "Oct 2025 · Feb 2025",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    skills: ["Machine Learning", "Data Science"],
    category: "ml"
  },
  {
    type: "cert",
    platform: "Board Infinity",
    title: "Machine Learning and Deep Learning Specialization",
    date: "Oct 2025 · Jan 2026",
    logo: "/boardinfinity.png",
    skills: ["Deep Learning", "Computer Vision"],
    category: "dl"
  },
  {
    type: "cert",
    platform: "IBM",
    title: "Introduction to Computer Vision and Image Processing",
    date: "Oct 2025 · Feb 2026",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    skills: ["Deep Learning", "Computer Vision"],
    category: "cv"
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            <span>The</span>
            <span className="text-white/40 font-light lowercase">Journey</span>
          </h2>
          <div className="h-[1px] w-24 bg-white/10 mx-auto mt-8" />
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/40 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-12 md:space-y-32">
            {timelineData.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center">
                  {/* Central Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 z-20 hidden md:flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                    />
                  </div>

                  {/* Card Container */}
                  <div className={cn(
                    "w-full md:w-[45%]",
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  )}>
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className={cn(
                        "liquid-glass rounded-3xl p-6 md:p-10 border border-white/5 hover:border-white/10 transition-all duration-500 group relative",
                        item.isTop && "border-white/20 bg-white/[0.03] shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                      )}
                    >
                      {/* Brand Connector (Small tail pointing to axis) */}
                      <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/10 hidden md:block",
                        isLeft ? "-right-8" : "-left-8"
                      )} />

                      <div className="flex flex-col gap-8">
                        {/* Header Area */}
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              {item.type === "education" ? (
                                <GraduationCap className="w-4 h-4 text-[#00e5bf]" />
                              ) : (
                                <Award className="w-4 h-4 text-white/40" />
                              )}
                              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                                {item.type === "education" ? "Foundational Degree" : "Professional Specialization"}
                              </span>
                            </div>
                            <h3 className="text-white text-xl md:text-3xl font-medium tracking-tight mb-2 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-white/60 text-sm font-light">
                              {item.institution || item.platform}
                            </p>
                          </div>

                          {/* Logo: Unified Scaling */}
                          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] p-4 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all shrink-0 overflow-hidden relative shadow-inner">
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img 
                              src={item.logo} 
                              alt={item.platform} 
                              className={cn(
                                "max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110",
                                // Specialized fit for U-Mich, Board Infinity, and UMT to match Meta weight
                                (item.platform?.includes("University of Michigan") || item.platform === "Board Infinity" || item.institution?.includes("UMT")) && "scale-[1.35] group-hover:scale-[1.45]",
                                item.logo.includes('svg') ? "grayscale group-hover:grayscale-0 brightness-90" : ""
                              )}
                            />
                          </div>
                        </div>

                        {/* Details Area */}
                        <div className="flex items-center gap-6 py-4 border-y border-white/5">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-white/20" />
                            <span className="text-xs text-white/40 font-mono tracking-wider">{item.date}</span>
                          </div>
                          <div className="h-4 w-[1px] bg-white/10" />
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                            <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Verified Artifact</span>
                          </div>
                        </div>

                        {/* Skills Cloud */}
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider border border-white/5 bg-white/[0.01] text-white/40 hover:text-white hover:bg-white/[0.05] hover:border-white/20 transition-all backdrop-blur-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Graduation Anchor */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-32 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6">
            <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
            <p className="text-[10px] text-white/10 uppercase tracking-[0.6em] font-mono">
              The Journey Continues
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
