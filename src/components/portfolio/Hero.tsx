import { useState, useEffect, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPING_PHRASES = [
  "Optimizing ETL workflows",
  "Automating data systems at scale",
  "Designing resilient data architectures",
];

// ------- Particle network canvas -------
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = [];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 120, 255, ${0.13 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grad.addColorStop(0, `rgba(140, 160, 255, ${p.alpha})`);
        grad.addColorStop(1, `rgba(180, 120, 255, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}

// ------- Hero section -------
export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [charIndex, isDeleting, phraseIndex]);

  const currentText = TYPING_PHRASES[phraseIndex].substring(0, charIndex);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle network */}
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] bg-accent/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div
            className="animate-fade-up opacity-0 mb-8"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold tracking-widest text-primary uppercase">
              Data Engineer · Available for Opportunities
            </span>
          </div>

          {/* "Hi, I'm Vinal" — main headline */}
          <div
            className="animate-fade-up opacity-0 mb-4"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide mb-1">
              Hi there, I'm
            </p>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="text-gradient">Vinal Dsouza</span>
            </h1>
          </div>

          {/* Secondary pipeline statement — smaller */}
          <p
            className="text-sm md:text-base text-muted-foreground/70 mb-4 max-w-lg mx-auto leading-relaxed animate-fade-up opacity-0"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            I build scalable data pipelines that reduce processing time from{" "}
            <span className="text-foreground/90 font-semibold">minutes to seconds.</span>
          </p>

          {/* Typing animation */}
          <div
            className="h-7 mb-10 text-sm md:text-base font-semibold text-foreground/80 animate-fade-up opacity-0"
            style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
          >
            <span>{currentText}</span>
            <span className="animate-pulse ml-0.5 text-primary">|</span>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:opacity-90 glow transition-all duration-300 hover:scale-105 border-0 font-semibold px-8"
            >
              <a href="#projects">Explore My Projects</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:glow-sm"
            >
              <a href="#contact">Let's Build Together</a>
            </Button>
          </div>

          {/* Social icons */}
          <div
            className="flex items-center justify-center gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
          >
            <a
              href="https://github.com/vinaldsz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-white/10 hover:scale-110 transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinal-dsouza/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-white/10 hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>


      </div>
    </section>
  );
}
