"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import { ArrowUpRight, Mail, Cpu, Code2, Globe, Database, Layers } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#projects" },
  { name: "Services", href: "#services" },
];

const TECH_STACK = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Layers },
  { name: "Node.js", icon: Cpu },
  { name: "Python", icon: Database },
  { name: "Cloud", icon: Globe },
];

export default function Footer() {
  const [time, setTime] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-12 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 lg:gap-24 mb-32">
          
          {/* Column 1: Brand */}
          <div className="space-y-10">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" className="flex items-center gap-2 group cursor-pointer bg-transparent border-none">
              <img
                src="/logo.png"
                alt="Ali Hassan Logo"
                className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            
            <div className="flex items-center gap-5 grayscale opacity-20 hover:opacity-50 transition-all duration-700">
              {TECH_STACK.map((tech) => (
                <tech.icon key={tech.name} className="w-4 h-4 text-white" />
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/20 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-white transition-colors text-sm font-light flex items-center group gap-2">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/20 mb-8">Connect</h4>
            <ul className="space-y-4">
              <li><a href={cv.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-3"><GithubIcon /> GitHub</a></li>
              <li><a href={cv.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-3"><LinkedinIcon /> LinkedIn</a></li>
              <li><a href={`mailto:${cv.email}`} className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-3"><Mail className="w-4 h-4" /> Email</a></li>
            </ul>
          </div>

          {/* Column 4: Local Context */}
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/20 mb-8">Current Context</h4>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Lahore, PK</div>
                  <div className="text-xl text-white font-light tracking-tight">{time || "00:00 AM"}</div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Available</span>
                </div>
              </div>
            </div>
            
            <p className="text-[11px] text-white/20 leading-relaxed max-w-[240px] italic">
              &quot;Designing systems that work seamlessly across time and space.&quot;
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] text-white/10 uppercase tracking-[0.3em] font-mono">
            © {currentYear} All rights reserved by <span className="text-white/30">alihassan-dev.com</span>
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 text-[10px] text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em] font-mono"
          >
            Back to top
            <div className="w-10 h-[1px] bg-white/10 group-hover:bg-white transition-all group-hover:w-16" />
          </button>
        </div>
      </div>
    </footer>
  );
}
