import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Reviews />
      <Contact />
      <footer className="border-t border-white/4 py-8 text-center">
        <p className="text-xs text-white/20">© 2025 Ali Hassan. Built with precision.</p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <a href="https://github.com/alihassanatthework" target="_blank" rel="noreferrer" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition">GitHub</a>
          <a href="https://linkedin.com/in/ali-hassan-at-the-work" target="_blank" rel="noreferrer" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition">LinkedIn</a>
          <a href="mailto:alihassan.at.the.work@gmail.com" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition">Email</a>
        </div>
      </footer>
    </>
  );
}
