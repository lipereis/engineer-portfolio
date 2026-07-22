import { AboutSection } from "@/components/about/about-section";
import { Hero } from "@/components/hero/hero";
import { SkillsSection } from "@/components/skills/skills-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      {/* Placeholder landmark so "View Projects" CTA has a scroll target until Task 11+ */}
      <section
        id="projects"
        aria-label="Projects"
        className="min-h-[40vh] scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
      />
    </>
  );
}
