import CinematicHero from "@/components/landing/3d/CinematicHero";
import AboutSection from "@/components/landing/AboutSection";
import SkillsSection from "@/components/landing/SkillsSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import TimelineSection from "@/components/landing/TimelineSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

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
      <Footer />
    </main>
  );
}
