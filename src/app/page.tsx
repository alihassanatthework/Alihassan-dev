import CinematicHero from "@/components/landing/3d/CinematicHero";
import AboutSection from "@/components/landing/AboutSection";
import SkillsSection from "@/components/landing/SkillsSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import TimelineSection from "@/components/landing/TimelineSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <CinematicHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ReviewsSection />
      <ContactSection />
      
      <footer className="border-t border-white/10 py-8 text-center bg-black">
        <p className="text-xs text-white/30 tracking-widest font-mono uppercase mb-4">© 2026 Ali Hassan. Built with precision.</p>
        <div className="flex items-center justify-center gap-6">
          <a href="https://github.com/alihassanatthework" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">GitHub</a>
          <a href="https://linkedin.com/in/ali-hassan-at-the-work" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">LinkedIn</a>
          <a href="mailto:alihassan.at.the.work@gmail.com" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Email</a>
        </div>
      </footer>
    </main>
  );
}
