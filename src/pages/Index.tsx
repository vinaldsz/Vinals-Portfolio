import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { BackgroundEffects } from "@/components/portfolio/BackgroundEffects";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";

// Sections not yet built: empty stubs so nav anchors resolve. Each is replaced by
// its real component in Phase 6; the below-fold lazy/Suspense scaffold gets wired
// in incrementally at that point. (About was dropped — owner, 2026-07-23.)
const sectionStubs = [
  { id: "contact", label: "Contact" },
];

export default function Index() {
  return (
    <>
      <BackgroundEffects />
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        {sectionStubs.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[70vh] items-center justify-center scroll-mt-16"
          >
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/30">
              {section.label}
            </span>
          </section>
        ))}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
