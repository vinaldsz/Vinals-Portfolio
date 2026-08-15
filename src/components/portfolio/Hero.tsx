import { Github, Linkedin } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden pb-20 pt-32 md:pt-40"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between lg:gap-12 xl:gap-16">
          <div className="w-full lg:max-w-xl xl:max-w-3xl">
            <div className="mb-8">
              <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Data Engineer · Available for Opportunities
              </span>
            </div>
            <p className="mb-3 font-mono text-sm tracking-wide text-muted-foreground md:text-base">
              Hi, I'm Vinal Dsouza
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
              Data Engineering Built for the <span className="text-gradient">AI Era</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Data Engineer with 5+ years building and modernizing pipelines for
              high-volume financial systems, now growing into AI-powered tools including RAG
              pipelines, MCP servers, and multi-agent ML systems. M.S. Computer Science,
              Northeastern University.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="glow px-8">
                <a href="#projects">Explore My Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <a href="#contact">Let's Build Together</a>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
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
                href="https://www.linkedin.com/in/vinal-dsouza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Portrait. The width/offset percentages reproduce the crop used on the
              share card (scripts/og-card.html) at any container size, since both
              resolve against the container's own width. */}
          <div className="relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-full border-2 border-primary/40 glow-sm sm:w-[200px] lg:w-[290px] xl:w-[340px]">
            <img
              src="/ProfessionalHeadshot.jpeg"
              alt="Vinal Dsouza"
              width={640}
              height={427}
              decoding="async"
              className="absolute left-[-56%] top-0 w-[215%] max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
