import { useEffect, useState } from "react";
import { Menu, X } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  // About section dropped (owner, 2026-07-23) — the Hero paragraph carries the bio.
  { label: "Skills", href: "#skills" },
  // Experience was missing from the legacy nav — independent bug, added here.
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// /Resume.pdf is supplied by the user later; the file does not exist yet (404 until then).
const RESUME_HREF = "/Resume.pdf";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "glass-panel border-b" : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="#hero" className="font-display text-2xl font-bold tracking-tight text-gradient">
          Vinal.
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="sm">
            <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
          <Button asChild size="sm">
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="glass-panel border-t md:hidden">
          <ul className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-3">
              <Button asChild variant="outline">
                <a
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  Resume
                </a>
              </Button>
              <Button asChild>
                <a href="#contact" onClick={closeMenu}>
                  Get in Touch
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
