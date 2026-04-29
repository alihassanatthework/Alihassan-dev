"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { cv } from "@/data/cv";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.7.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-300",
          scrolled
            ? "bg-[rgba(7,8,15,0.85)] backdrop-blur-md border-white/8 shadow-lg shadow-black/40"
            : "bg-[rgba(255,255,255,0.04)] backdrop-blur-sm border-white/6"
        )}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-base font-bold tracking-tight text-[#eae9fc]"
        >
          Ali<span className="text-[#00e5bf]">hassan</span>
        </button>

        {/* Center links */}
        <div className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-xs text-white/45 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right: socials + CV */}
        <div className="flex items-center gap-2">
          <a
            href={cv.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:text-[#00e5bf] hover:bg-white/5 transition"
          >
            <GithubIcon />
          </a>
          <a
            href={cv.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:text-[#00e5bf] hover:bg-white/5 transition"
          >
            <LinkedinIcon />
          </a>
          <a
            href="/Ali_Hassan_Resume.pdf"
            download
            className="ml-1 flex items-center gap-1.5 rounded-full bg-[#eae9fc] text-[#07080f] px-4 py-1.5 text-xs font-semibold hover:bg-white transition"
          >
            <Download size={12} />
            Download CV
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
