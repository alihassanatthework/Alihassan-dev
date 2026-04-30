"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cv } from "@/data/cv";
import { ExternalLink, X, Trophy, Code2, Layers, Cpu, Database, Globe, Briefcase } from "lucide-react";

const TECH_LINKS: Record<string, string> = {
  "React": "https://react.dev",
  "TypeScript": "https://www.typescriptlang.org",
  "Tailwind CSS": "https://tailwindcss.com",
  "Bootstrap": "https://getbootstrap.com",
  "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "Node.js": "https://nodejs.org",
  "Express": "https://expressjs.com",
  "Django": "https://www.djangoproject.com",
  "DRF": "https://www.django-rest-framework.org",
  "Spring Boot": "https://spring.io/projects/spring-boot",
  "Flask": "https://flask.palletsprojects.com",
  "Scikit-learn": "https://scikit-learn.org",
  "XGBoost": "https://xgboost.readthedocs.io",
  "Pandas": "https://pandas.pydata.org",
  "NumPy": "https://numpy.org",
  "spaCy": "https://spacy.io",
  "Hugging Face": "https://huggingface.co",
  "YOLOv8": "https://docs.ultralytics.com",
  "U-Net": "https://arxiv.org/abs/1505.04597",
  "EfficientNet-B4": "https://arxiv.org/abs/1905.11946",
  "MediaPipe": "https://mediapipe.dev",
  "OpenCV": "https://opencv.org",
  "CNNs": "https://en.wikipedia.org/wiki/Convolutional_neural_network",
  "MySQL": "https://www.mysql.com",
  "PostgreSQL": "https://www.postgresql.org",
  "MongoDB": "https://www.mongodb.com",
  "SQLite": "https://www.sqlite.org",
  "Git": "https://git-scm.com",
  "Agile / Scrum": "https://www.scrum.org",
  "SDLC": "https://en.wikipedia.org/wiki/Systems_development_life_cycle",
  "SPM": "https://en.wikipedia.org/wiki/Software_project_management",
  "SQE": "https://en.wikipedia.org/wiki/Software_quality_assurance",
  "Code Review": "https://en.wikipedia.org/wiki/Code_review",
};

export default function SkillsSection() {
  const ref = useRef(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const selectedSkill = cv.skills.find(s => s.id === selectedId);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {cv.skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={() => setSelectedId(skill.id)}
              className="liquid-glass rounded-3xl p-6 md:p-8 group relative overflow-hidden flex flex-col h-full cursor-pointer hover:border-white/20 transition-all duration-500"
            >
              {/* Subtle top border gradient in white */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
              />

              <div className="flex-1 flex flex-col">
                <div className="mb-8 h-10 flex items-start justify-between">
                  <span className="text-white/40 text-xs tracking-widest uppercase font-medium font-mono">
                    {skill.num}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-green-500 group-hover:shadow-[0_0_12px_rgba(34,197,94,0.8)] transition-all"
                  />
                </div>

                <div className="min-h-[140px]">
                  <h3 className="text-white text-xl md:text-2xl mb-4 tracking-tight font-medium">
                    {skill.label}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-[280px]">
                    {skill.desc}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10 min-h-[140px]">
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1.5 rounded-md text-[10px] font-mono tracking-wider border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-sm flex items-center gap-1.5 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                    Click to view intelligence →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Intelligence Dashboard Overlay */}
      <AnimatePresence>
        {selectedId && selectedSkill && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedId(null)}
            />

            {/* Dashboard Content */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl liquid-glass rounded-3xl p-8 md:p-12 relative z-10 border border-white/10 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white/40" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left Side: Stats & Info */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-white/20 text-3xl font-mono">{selectedSkill.num}</span>
                    <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tighter uppercase">{selectedSkill.label}</h2>
                  </div>

                  <p className="text-white/60 text-base leading-relaxed mb-10">
                    {selectedSkill.desc}
                  </p>

                  <div className="space-y-8">
                    <h4 className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Stack Proficiency
                    </h4>
                    <div className="space-y-6">
                      {selectedSkill.proficiency?.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono tracking-widest">
                            <span className="text-white/60">{item.name}</span>
                            <span className="text-white">{item.pct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Relevant Projects */}
                <div className="flex flex-col h-full">
                  <h4 className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Relevant Experience
                  </h4>
                  <div className="flex flex-col gap-4 flex-1">
                    {selectedSkill.projects?.map((projName) => {
                      // Attempt to match project name to cv.projects
                      const proj = cv.projects.find(p => p.title.toLowerCase().includes(projName.toLowerCase()) || projName.includes(p.abbr));
                      
                      return (
                        <div key={projName} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-white font-medium mb-1 tracking-tight">{projName}</h5>
                              <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">Verified Production Shipped</p>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5">
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      &quot;Each skill area is verified through real-world deployment across multiple industry-standard platforms.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
