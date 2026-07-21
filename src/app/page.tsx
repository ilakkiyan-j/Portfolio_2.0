import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectLab } from "@/components/project-lab";
import { ResearchSection } from "@/components/research-section";
import { SkillsSection } from "@/components/skills-section";
import { JourneySection } from "@/components/journey-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollProgress } from "@/components/scroll-progress";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectLab />
      <ResearchSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
