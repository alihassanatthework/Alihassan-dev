"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom SVG Icons for Brands
const GithubIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.3.7-4 2.6-4 4.3 0 1.3 1.7 2.7 4 2.7 2.3 0 4-1.3 4-2.7 0-1.7-1.7-3.6-4-4.3zm6.1-58.5c-4.2-1.2-8.8.9-10.4 5.1-1.6 4.1.6 8.7 4.8 9.9 4.1 1.2 8.8-.9 10.4-5.1 1.5-4.1-.6-8.7-4.8-9.9zm235.1-176.1c-23.2-53.2-71.5-82.4-121.3-82.4-50.5 0-98.1 28.5-121.3 82.4-2.2 5.1-.4 11 4.5 13.1 5.1 2.2 11 .4 13.1-4.5 19.1-44.5 58.7-68 103.7-68 44.4 0 84.1 23.5 103.7 68 2.2 5.1 8.1 6.8 13.1 4.5 5.1-2.2 6.9-8.1 4.5-13.1z"></path>
    <path d="M496 256c0 137-111 248-248 248S0 393 0 256 111 8 248 8s248 111 248 248zm-82.3-112.5c-31.1-31.1-71.5-47.5-113.7-47.5-87.1 0-158.1 71-158.1 158.1 0 69.7 45.3 128.8 108.1 149.7 7.9 1.5 10.8-3.4 10.8-7.6 0-3.8-.1-13.9-.2-27.3-43.9 9.5-53.2-21.2-53.2-21.2-7.2-18.3-17.5-23.2-17.5-23.2-14.3-9.8 1.1-9.6 1.1-9.6 15.8 1.1 24.1 16.2 24.1 16.2 14.1 24.2 37.1 17.2 46.1 13.1 1.4-10.2 5.5-17.2 10.1-21.2-35.1-4-72-17.5-72-78.1 0-17.2 6.2-31.3 16.3-42.3-1.6-4-7.1-20.1 1.6-41.8 0 0 13.2-4.2 43.3 16.2 12.6-3.5 26.1-5.2 39.5-5.3 13.4.1 26.9 1.8 39.5 5.3 30.1-20.4 43.3-16.2 43.3-16.2 8.7 21.7 3.2 37.8 1.6 41.8 10.1 11 16.3 25.1 16.3 42.3 0 60.8-37 74-72.2 77.9 5.7 4.9 10.8 14.6 10.8 29.4 0 21.2-.2 38.3-.2 43.5 0 4.2 2.8 9.2 10.9 7.6 62.7-21 108-80 108-149.7 0-42.2-16.4-82.6-47.5-113.7z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
  </svg>
);

const LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isFinished } = useCinematic();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <AnimatePresence>
      {isFinished && (
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ 
            opacity: 1, 
            y: hidden ? -100 : 0 
          }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-8 left-0 right-0 z-[100] px-6 flex justify-center"
        >
          <div 
            className={cn(
              "flex items-center justify-between w-full max-w-7xl h-16 px-6 md:px-10 rounded-full border border-white/10 bg-black/80 backdrop-blur-2xl transition-all duration-500",
              scrolled ? "bg-black/95 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-white/15 h-14" : ""
            )}
          >
            {/* Left: Logo */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.png" 
                alt="Ali Hassan Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Center: Links */}
            <div className="hidden lg:flex items-center gap-2">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 uppercase tracking-[0.15em] text-[10px] text-white/40 hover:text-white transition-all hover:bg-white/5 rounded-full"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right: Socials + CV */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-5 border-r border-white/10 pr-6">
                <a href="https://github.com/alihassanatthework" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <GithubIcon />
                </a>
                <a href="https://www.linkedin.com/in/alihassan-developer/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <LinkedinIcon />
                </a>
              </div>
              
              <a 
                href="/Ali_Hassan_Resume.pdf" 
                download="Ali_Hassan_Resume.pdf"
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
