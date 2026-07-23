import { Github, Linkedin } from "@/lib/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <a href="#hero" className="rounded-sm font-display text-xl font-bold tracking-tight text-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          Vinal.
        </a>

        <p className="order-last text-sm text-muted-foreground sm:order-none">
          © {currentYear} All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/vinaldsz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/vinal-dsouza-9a9912187"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
