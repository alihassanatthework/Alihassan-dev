"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2022 – 2026",
    title: "BS Software Engineering",
    institution: "University of Management and Technology (UMT)",
    location: "Lahore, Pakistan",
    desc: "Focused on requirements analysis, system design, development, testing, and project management within the software development lifecycle. Specialized in building production-grade AI platforms.",
  },
  {
    year: "2024",
    title: "IBM Machine Learning Professional",
    institution: "IBM / Coursera",
    desc: "Comprehensive certification covering classical ML, Deep Learning, NLP, and Computer Vision using Python, Scikit-learn, and TensorFlow.",
  },
  {
    year: "2023",
    title: "Meta Front-End Developer Professional",
    institution: "Meta / Coursera",
    desc: "Advanced certification in React, TypeScript, and modern UI/UX design principles, focused on building production-grade web applications.",
  },
  {
    year: "2023",
    title: "Meta Back-End Developer Professional",
    institution: "Meta / Coursera",
    desc: "In-depth training in Python, Django, Database architecture, APIs, and Version Control (Git).",
  }
];

export default function TimelineSection() {
  return (
    <section id="journey" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto"> {/* Increased max-width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-24"
        >
          <h2 className="text-white tracking-tight">
            The <span className="text-white/40 font-light italic">journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Pure White Glow */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            />
          </div>

          <div className="space-y-16"> {/* Increased spacing */}
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:ml-0 md:mr-auto md:pr-16" : "md:ml-auto md:mr-0 md:pl-16"
                } pl-12 md:pl-0`}
              >
                {/* Dot - Pure White */}
                <div 
                  className="absolute left-[-1.5px] md:left-auto md:right-[-5px] top-6 md:top-10 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)] z-10"
                  style={{ left: index % 2 === 0 ? 'auto' : '-5px', right: index % 2 === 0 ? '-5px' : 'auto' }}
                />

                <div className="w-full liquid-glass rounded-3xl p-8 md:p-10 border border-white/5 group hover:border-white/20 transition-all duration-500 hover:bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="body-small uppercase tracking-[0.25em] text-white/30 font-medium">{item.year}</span>
                    <div className="w-3 h-3 rounded-full bg-white/5 group-hover:bg-white shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_white] transition-all" />
                  </div>
                  
                  <h3 className="text-white mb-2 text-2xl md:text-3xl lg:text-4xl">{item.title}</h3>
                  <div className="text-white/60 body-large mb-6">{item.institution}</div>
                  
                  <p className="body-small text-white/40 leading-relaxed text-base md:text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
