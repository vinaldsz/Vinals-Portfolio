import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { BackgroundEffects } from "@/components/portfolio/BackgroundEffects";

// Above-the-fold (Navigation, BackgroundEffects, Hero) loads eagerly so the page
// paints instantly. Everything below the fold is split into separate chunks that
// stream in after first paint.
const Impact = lazy(() => import("@/components/portfolio/Impact").then((m) => ({ default: m.Impact })));
const About = lazy(() => import("@/components/portfolio/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/portfolio/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/portfolio/Experience").then((m) => ({ default: m.Experience })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/portfolio/Footer").then((m) => ({ default: m.Footer })));

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center backdrop-blur-sm hover:bg-primary/40 hover:scale-110 hover:glow transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      <BackgroundEffects />
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="min-h-[20vh]" />}>
        <Impact />
      </Suspense>
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="min-h-[20vh]" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div className="min-h-[10vh]" />}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
};

export default Index;
