import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";

// Phase 1 (shell): empty section stubs so nav anchors resolve. Each stub is
// replaced by its real component in Phases 2–6, at which point the lazy/Suspense
// scaffold gets wired in incrementally.
const sectionStubs = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Index() {
  return (
    <>
      <Navigation />
      <main>
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
