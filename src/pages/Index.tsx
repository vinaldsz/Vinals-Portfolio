import { useState, useEffect } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { Impact } from "@/components/portfolio/Impact";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { BackgroundEffects } from "@/components/portfolio/BackgroundEffects";

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
      <Impact />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
