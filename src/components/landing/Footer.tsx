"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cv } from "@/data/cv";
import { ArrowUpRight, Mail, MapPin, Phone, Cpu, Code2, Globe, Database, Layers } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.3.7-4 2.6-4 4.3 0 1.3 1.7 2.7 4 2.7 2.3 0 4-1.3 4-2.7 0-1.7-1.7-3.6-4-4.3zm6.1-58.5c-4.2-1.2-8.8.9-10.4 5.1-1.6 4.1.6 8.7 4.8 9.9 4.1 1.2 8.8-.9 10.4-5.1 1.5-4.1-.6-8.7-4.8-9.9zm235.1-176.1c-23.2-53.2-71.5-82.4-121.3-82.4-50.5 0-98.1 28.5-121.3 82.4-2.2 5.1-.4 11 4.5 13.1 5.1 2.2 11 .4 13.1-4.5 19.1-44.5 58.7-68 103.7-68 44.4 0 84.1 23.5 103.7 68 2.2 5.1 8.1 6.8 13.1 4.5 5.1-2.2 6.9-8.1 4.5-13.1z"></path>
    <path d="M496 256c0 137-111 248-248 248S0 393 0 256 111 8 248 8s248 111 248 248zm-82.3-112.5c-31.1-31.1-71.5-47.5-113.7-47.5-87.1 0-158.1 71-158.1 158.1 0 69.7 45.3 128.8 108.1 149.7 7.9 1.5 10.8-3.4 10.8-7.6 0-3.8-.1-13.9-.2-27.3-43.9 9.5-53.2-21.2-53.2-21.2-7.2-18.3-17.5-23.2-17.5-23.2-14.3-9.8 1.1-9.6 1.1-9.6 15.8 1.1 24.1 16.2 24.1 16.2 14.1 24.2 37.1 17.2 46.1 13.1 1.4-10.2 5.5-17.2 10.1-21.2-35.1-4-72-17.5-72-78.1 0-17.2 6.2-31.3 16.3-42.3-1.6-4-7.1-20.1 1.6-41.8 0 0 13.2-4.2 43.3 16.2 12.6-3.5 26.1-5.2 39.5-5.3 13.4.1 26.9 1.8 39.5 5.3 30.1-20.4 43.3-16.2 43.3-16.2 8.7 21.7 3.2 37.8 1.6 41.8 10.1 11 16.3 25.1 16.3 42.3 0 60.8-37 74-72.2 77.9 5.7 4.9 10.8 14.6 10.8 29.4 0 21.2-.2 38.3-.2 43.5 0 4.2 2.8 9.2 10.9 7.6 62.7-21 108-80 108-149.7 0-42.2-16.4-82.6-47.5-113.7z"></path>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
  </svg>
);

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
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.png" 
                alt="Ali Hassan Logo" 
                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
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
              <li><a href={cv.github} target="_blank" className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-3"><GithubIcon /> GitHub</a></li>
              <li><a href={cv.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-3"><LinkedinIcon /> LinkedIn</a></li>
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
