import { Github, Linkedin } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex w-full items-center overflow-hidden pb-24 pt-36 md:pb-28 md:pt-44"
    >
      <div className="container relative z-10 mx-auto px-6">
        {/* `justify-between` used to push text/portrait to the container's
            two edges, so any leftover width (large on wide/ultrawide
            monitors) became one elastic gap between them — the "picture is
            so far from the text" complaint. `justify-center` packs the pair
            together with a fixed gap instead, so their spacing no longer
            grows with viewport width. */}
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-center lg:gap-16 xl:gap-20">
          <div className="w-full lg:max-w-xl xl:max-w-3xl">
            {/* Hero revision (owner design-review session, 2026-08-16, after
                Phase 10): the eyebrow/H1 pairing previously buried the name
                in a small muted line while the H1 carried a gradient-
                highlighted marketing tagline — Phase 10's own diagnosis
                named that exact combo (gradient-text hero) as the most
                common AI-page-builder pattern, but left it unchanged at the
                time. This reopens that call: name promoted to the H1, the
                tagline demoted to a subheading, no gradient text. See
                SPEC.md's Hero revision note. */}
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-primary md:text-base">
              Data Engineer
            </p>
            <h1 className="font-display text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl xl:text-8xl">
              Vinal Dsouza
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-medium leading-snug text-muted-foreground md:text-3xl">
              I build data pipelines that hold up at scale.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              5+ years building and modernizing pipelines for high-volume financial
              systems, now growing into AI-powered tools including RAG pipelines, MCP
              servers, and multi-agent ML systems.
            </p>
            {/* CTA row: two equal-weight boxed buttons (the other "AI-page-builder"
                tell Phase 10 flagged) dropped to one primary action + a plain text
                link. */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg" className="px-8 text-base">
                <a href="#projects">Explore My Projects</a>
              </Button>
              <a
                href="#contact"
                className="rounded-sm text-base font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Let's talk →
              </a>
            </div>
            {/* Availability status folded in here (SPEC §Phase 10) — was a
                floating pill badge above the headline; that placement is the
                single most common AI-page-builder hero pattern, so it moved
                to a quieter inline marker next to the social row instead. */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span aria-hidden className="h-2 w-2 rounded-full bg-green-400" />
                Available for opportunities
              </div>
              <div className="flex items-center gap-4">
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
          </div>

          {/* Portrait. The width/offset percentages reproduce the crop used on the
              share card (scripts/og-card.html) at any container size, since both
              resolve against the container's own width. Border dropped from a
              glowing primary ring to a plain neutral one (2026-08-16 Hero
              revision) — the glow ring was itself part of the generic
              "AI-page-builder hero" recipe Phase 10 diagnosed but didn't fix. */}
          <div className="relative aspect-square w-[170px] shrink-0 overflow-hidden rounded-full border border-border sm:w-[220px] lg:w-[320px] xl:w-[380px]">
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
