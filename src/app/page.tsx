import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Placeholder landmark so "View Projects" CTA has a scroll target until Task 10+ */}
      <section
        id="projects"
        aria-label="Projects"
        className="min-h-[40vh] scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
      />
    </>
  );
}
