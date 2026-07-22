import { AboutSection } from "@/components/about/about-section";
import { Hero } from "@/components/hero/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { AskProjects } from "@/components/search/ask-projects";
import { SkillsSection } from "@/components/skills/skills-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AskProjects />
    </>
  );
}
