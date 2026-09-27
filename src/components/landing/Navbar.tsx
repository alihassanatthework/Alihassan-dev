"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const { isFinished } = useCinematic();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <AnimatePresence>
      {isFinished && (
        <>
          <motion.nav
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: hidden && !mobileOpen ? -100 : 0
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
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                className="flex items-center gap-2 group cursor-pointer bg-transparent border-none"
              >
                <img
                  src="/logo.png"
                  alt="Ali Hassan Logo"
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <div className="hidden lg:flex items-center gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-1.5 uppercase tracking-[0.15em] text-[10px] text-white/40 hover:text-white transition-all hover:bg-white/5 rounded-full"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden md:flex items-center gap-5 border-r border-white/10 pr-6">
                  <a href="https://github.com/alihassanatthework" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors">
                    <GithubIcon />
                  </a>
                  <a href="https://www.linkedin.com/in/alihassan-developer/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors">
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

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 lg:hidden"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-2xl text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] font-light"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
                  <a href="https://github.com/alihassanatthework" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors">
                    <GithubIcon />
                  </a>
                  <a href="https://www.linkedin.com/in/alihassan-developer/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors">
                    <LinkedinIcon />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
