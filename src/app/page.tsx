import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { EducationSection } from "@/components/education/education-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsSection } from "@/components/projects/projects-section";
import { AskProjects } from "@/components/search/ask-projects";
import { SkillsSection } from "@/components/skills/skills-section";
import { StatsSection } from "@/components/stats/stats-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <SkillsSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <AskProjects />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <Reveal>
        <ExperienceSection />
      </Reveal>
      <Reveal>
        <EducationSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </>
  );
}
