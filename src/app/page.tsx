import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ScrollProgress } from "@/components/scroll-progress";

const ProjectLab = dynamic(
  () => import("@/components/project-lab").then((m) => m.ProjectLab),
  {
    loading: () => <div className="min-h-[400px] w-full" />,
  }
);

const ResearchSection = dynamic(
  () => import("@/components/research-section").then((m) => m.ResearchSection),
  {
    loading: () => <div className="min-h-[300px] w-full" />,
  }
);

const SkillsSection = dynamic(
  () => import("@/components/skills-section").then((m) => m.SkillsSection),
  {
    loading: () => <div className="min-h-[400px] w-full" />,
  }
);

const JourneySection = dynamic(
  () => import("@/components/journey-section").then((m) => m.JourneySection),
  {
    loading: () => <div className="min-h-[400px] w-full" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/contact-section").then((m) => m.ContactSection),
  {
    loading: () => <div className="min-h-[400px] w-full" />,
  }
);

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
