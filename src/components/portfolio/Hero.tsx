import { useState, useEffect } from "react";
import { Github, Linkedin } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TYPING_PHRASES = [
  "Optimizing ETL workflows",
  "Automating data systems at scale",
  "Designing resilient data architectures",
];

export function Hero() {
  const reduced = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Reduced motion: no per-char interval — the full phrase shows statically.
    if (reduced) return;

    const delay = isDeleting ? 40 : 100;
    const phrase = TYPING_PHRASES[phraseIndex];
    const t = setTimeout(() => {
      if (!isDeleting && charIndex === phrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((p) => (p + 1) % TYPING_PHRASES.length);
      } else {
        setCharIndex((c) => c + (isDeleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex, reduced]);

  const currentText = reduced
    ? TYPING_PHRASES[0]
    : TYPING_PHRASES[phraseIndex].substring(0, charIndex);

  return (
    <section
      id="hero"
      className="relative flex w-full items-center justify-center overflow-hidden pb-32 pt-40 md:pb-40 md:pt-48 lg:pt-56"
    >
      <div className="container relative z-10 mx-auto px-6 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Data Engineer · Available for Opportunities
            </span>
          </div>
          <div className="mb-4">
            <p className="mb-1 text-lg font-medium tracking-wide text-muted-foreground md:text-xl">
              Hi there, I'm
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="text-gradient">Vinal Dsouza</span>
            </h1>
          </div>
          <p className="mx-auto mb-4 max-w-lg text-sm leading-relaxed text-muted-foreground/70 md:text-base">
            I build scalable data pipelines that reduce processing time from{" "}
            <span className="font-semibold text-foreground/90">minutes to seconds.</span>
          </p>
          <div className="mb-10 h-7 text-sm font-semibold text-foreground/80 md:text-base">
            <span>{currentText}</span>
            <span className="ml-0.5 animate-pulse text-primary motion-reduce:animate-none">|</span>
          </div>
          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="glow px-8">
              <a href="#projects">Explore My Projects</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <a href="#contact">Let's Build Together</a>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/vinaldsz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/40 hover:bg-white/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinal-dsouza-9a9912187"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
