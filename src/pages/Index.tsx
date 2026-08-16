import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { BackgroundEffects } from "@/components/portfolio/BackgroundEffects";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

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
        {/* Education is its own section (SPEC §Phase 10) but not nav-linked —
            a compact block, not a standalone nav entry, per the Phase 9 call. */}
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
