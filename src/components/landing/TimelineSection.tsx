"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    type: "education",
    title: "BS Software Engineering",
    institution: "University of Management and Technology (UMT)",
    date: "Nov 2022 – Jun 2026",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/University_of_Management_and_Technology_%28Lahore%29_logo.png",
    skills: ["Software Architecture", "AI ML", "Web Engineering", "Database Systems", "SPM", "SQE"],
    isTop: true
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Front-End Developer Professional",
    date: "Issued Jan 2024 · Expires Apr 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Front-End Development"],
    category: "frontend"
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Back-End Developer Professional",
    date: "Issued Jul 2024 · Expires Dec 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Back-End Web Development"],
    category: "backend"
  },
  {
    type: "cert",
    platform: "University of Michigan",
    title: "Django for Everybody Specialization",
    date: "Issued Apr 2024 · Expires Jul 2024",
    logo: "/University of Michigan.png",
    skills: ["Django", "Python", "Back-End Web Development"],
    category: "django"
  },
  {
    type: "cert",
    platform: "Meta",
    title: "Meta Full Stack Developer Specialization",
    date: "Issued Jan 2024 · Expires Dec 2024",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    skills: ["Front-End Development", "Full-Stack Development"],
    category: "fullstack"
  },
  {
    type: "cert",
    platform: "IBM",
    title: "IBM Machine Learning Professional",
    date: "Issued Oct 2025 · Expires Feb 2025",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    skills: ["Machine Learning", "Data Science"],
    category: "ml"
  },
  {
    type: "cert",
    platform: "Board Infinity",
    title: "Machine Learning and Deep Learning Specialization",
    date: "Issued Oct 2025 · Expires Jan 2026",
    logo: "/boardinfinity.png",
    skills: ["Deep Learning", "Computer Vision"],
    category: "dl"
  },
  {
    type: "cert",
    platform: "IBM",
    title: "Introduction to Computer Vision and Image Processing",
    date: "Issued Oct 2025 · Expires Feb 2026",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    skills: ["Deep Learning", "Computer Vision"],
    category: "cv"
  }
];

export default function TimelineSection() {
  return (
    <section id="journey" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            <span>Academic</span>
            <span className="text-white/40 font-light lowercase">Journey</span>
          </h2>
          <div className="h-[1px] w-24 bg-white/10 mx-auto mt-8" />
        </motion.div>

        <div className="space-y-4">
          {timelineData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
              className={cn(
                "liquid-glass rounded-3xl p-6 md:p-8 border border-white/5 hover:border-white/10 transition-all duration-500 group overflow-hidden",
                item.isTop && "border-white/20 bg-white/[0.03] shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              )}
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                {/* Logo Section */}
                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] p-2 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all shrink-0 overflow-hidden shadow-inner">
                  <img 
                    src={item.logo} 
                    alt={item.institution || item.platform} 
                    className={cn(
                      "max-w-full max-h-full object-contain filter brightness-90 transition-all duration-700 group-hover:scale-110",
                      item.logo.includes('svg') ? "grayscale group-hover:grayscale-0" : ""
                    )}
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === "education" ? (
                          <GraduationCap className="w-3.5 h-3.5 text-white/40" />
                        ) : (
                          <Award className="w-3.5 h-3.5 text-white/40" />
                        )}
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                          {item.type === "education" ? "Academic Degree" : "Professional Certification"}
                        </span>
                      </div>
                      <h3 className="text-white text-lg md:text-xl font-medium tracking-tight group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light">
                        {item.institution || item.platform}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 md:text-right">
                      <div className="hidden md:block h-8 w-[1px] bg-white/10" />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono tracking-widest uppercase mb-1">
                          <Calendar className="w-3 h-3" />
                          Timeline
                        </div>
                        <div className="text-white/50 text-xs font-light">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase mr-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      Skills:
                    </span>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border border-white/5 bg-white/[0.01] text-white/40 hover:text-white/80 hover:bg-white/[0.03] transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-mono">
            Verification IDs available upon request
          </p>
        </motion.div>
      </div>
    </section>
  );
}
