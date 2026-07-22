import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { EducationSection } from "@/components/education/education-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { Hero } from "@/components/hero/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { AskProjects } from "@/components/search/ask-projects";
import { SkillsSection } from "@/components/skills/skills-section";
import { StatsSection } from "@/components/stats/stats-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AskProjects />
      <StatsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
