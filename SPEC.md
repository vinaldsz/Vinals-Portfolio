# Portfolio rebuild — SPEC (source of truth for intent)

> **This file describes WHAT we are building and WHY. It is immutable during
> implementation.** Do not tick checkboxes, record progress, or log deviations
> here — that lives in `PROGRESS.md`. Only edit this file if the *requirements
> themselves* change, and when you do, say so explicitly in the commit message.
> For how to work (branch, workflow, anti-drift rules) see `CLAUDE.md`.

## Context
The current site (`Vinals-Portfolio`, React + Vite + TS, prerendered via `vite-react-ssg`) felt laggy/glitchy/buggy to the owner. Root causes found during exploration: a hand-rolled `<canvas>` particle-network animation in `Hero.tsx` running an O(n²) distance check every frame, an always-on full-viewport animated SVG background (`BackgroundEffects.tsx`) that never pauses regardless of scroll position, zero `prefers-reduced-motion` handling anywhere, a ~1MB orphaned image, and a few dead files. Separately, the owner supplied a new visual design (a dark navy/cyan/purple "Material-3-glass" mockup, static HTML+Tailwind-CDN) and wants the whole site rebuilt to match it, while keeping the real content and functional behaviors that already work (mailto contact form, project category filters, prerendering, code-splitting).

This spec builds every section fresh (new component files, not in-place edits) to the new design language, fixes the perf/a11y issues along the way (baked into each new component, not a separate pass), and ports all real content — never the mockup's placeholder copy/images/names. The entire project scaffolding was torn down and rebuilt from a clean `create-vite` template; nothing is archived, so the real content/data lives verbatim in the Appendix at the end of this file. The build is split into independently-validatable phases (foundation → shell → sections, in the order a page actually renders) so each phase can be its own session and be checked before moving to the next.

## Confirmed decisions (already asked/answered — do not re-litigate)
- **Full re-scaffold from scratch, not just a component rewrite**: every old config/scaffolding file was deleted (`package.json`, `package-lock.json`, `node_modules`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`, `components.json`, `vitest.config.ts`, `index.html`, all of `src/`) and replaced by scaffolding a brand-new project via `npm create vite@latest -- --template react-ts` into a scratch directory, then copying its config/entry files into the real repo and adapting them. No Lovable/shadcn boilerplate was carried over. Real content (`public/ProfessionalHeadshot.jpeg`) and project docs (`README.md`, `TODO.md`) were kept.
- **Resulting stack** (all newer major versions than the old project — intentional, not a mistake to "fix"): React 19.2, Vite 8.1, TypeScript ~6.0, `vite-react-ssg` ^0.9.2 (still used for prerendering, compatible with Vite 8 / React 19), `react-router-dom` ^6.30 (pinned to v6 — `vite-react-ssg@0.9.2` peer-depends on `^6.14.1`; v7 causes an `ERESOLVE` conflict), `oxlint` instead of ESLint (single native binary, `.oxlintrc.json`, run via `npm run lint`), Tailwind CSS **v3** (not v4 — deliberately, to keep the HSL-CSS-variable / `tailwind.config.ts`-`theme.extend` token approach rather than v4's CSS-first `@theme` model), `tailwindcss-animate` retained.
- **No shadcn/ui component library** — the ~50-file `src/components/ui/*` boilerplate was not recreated. Where real accessibility complexity justifies it (Select, Tabs, Toast, Label), phases add a *specific* Radix primitive directly (`@radix-ui/react-select`, `-tabs`, `-toast`, `-label`, plus `-slot` for the `Button` `asChild` pattern) rather than pulling shadcn's full generated set. `class-variance-authority`, `clsx`, `tailwind-merge`, and a small `cn()` helper in `src/lib/utils.ts` are kept as generically useful.
- **Experience**: replace the mockup's plain card-per-job layout, and drop the old DAG / "Career Graph" visualization (not ported).
- **Impact section**: dropped entirely (no equivalent in the new design).
- **About section**: dropped entirely (owner, 2026-07-23) — no headshot/bio/highlights section; the Hero paragraph already carries the bio. The `#about` nav link and stub are removed. About's original copy/data stays in the Appendix for reversibility only.
- **Projects**: keep the image-less cards for now, but add an `image?` field with a styled placeholder fallback so real screenshots drop in later. Keep the working category filter tabs — rebuild with new styling, don't remove the behavior.
- **Nav**: add a "Resume" button now, pointing at `/Resume.pdf` (file supplied by the user later).

---

## Phase 0 — Full re-scaffold + Foundation

### 0a. Re-scaffold the project from scratch
Delete everything old (see the "Full re-scaffold" decision above), keeping only `SPEC.md`/`PROGRESS.md`/`CLAUDE.md`, `TODO.md`, `README.md`, `.gitignore`, and `public/ProfessionalHeadshot.jpeg` + `public/placeholder.svg` + `public/robots.txt`. Then:
1. Scaffold a throwaway fresh project via `npm create vite@latest fresh-scaffold -- --template react-ts` in a scratch directory (not inside the repo).
2. Copy its `package.json`, `vite.config.ts`, `tsconfig*.json`, `.oxlintrc.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css` into the repo, then hand-adapt each (none verbatim).
3. `package.json`: rename to `vinals-portfolio`, `build` = `vite-react-ssg build`, add `test`/`test:watch`, add the dependency list from the "Resulting stack" decision.
4. `vite.config.ts`: add `@` → `./src` alias, and a `manualChunks` **function** (not object form — the object form fails to type-check against this Vite/Rollup version's `ManualChunksOption`; use a function returning `"react-vendor"` for react/react-dom/react-router-dom ids) gated by `isSsrBuild`.
5. `tsconfig.app.json`: add `"paths": { "@/*": ["./src/*"] }` (no `baseUrl` — deprecated under `moduleResolution: "bundler"` in this TS version; `paths` alone suffices).
6. `src/main.tsx`: `vite-react-ssg` pattern (`export const createRoot = ViteReactSSG({ routes })`, importing `routes` from `./App.tsx`).
7. `src/App.tsx`: route-config stub (Phase 1 replaces the stub). Re-add `src/pages/NotFound.tsx` without the per-404 `console.error` (a `TODO.md`-flagged bug — clean rewrite, not carried forward).
8. Re-add Tailwind (`tailwindcss`/`postcss`/`autoprefixer`/`tailwindcss-animate` + `postcss.config.js` + `tailwind.config.ts`).
9. `npm install`, then verify `tsc -b --noEmit`, `npm run build`, `npm run dev` (via curl), `npx oxlint`.

### 0b. Design tokens
Update `src/index.css`'s `:root` and `.dark` blocks (both — site is dark-only, matches `darkMode: ["class"]` and the mockup's `<html class="dark">`). Variable names are exactly what `tailwind.config.ts`'s `theme.extend.colors` maps to (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`) so components write `bg-primary`, `text-muted-foreground`, etc.:

**Palette updated (owner, 2026-07-23):** the original cyan/purple "glass" palette below was
replaced by an owner-supplied 4-color system — Primary `#22d3ee` (cyan), Secondary `#94a3b8`
(slate), Tertiary `#0ea5e9` (sky), Neutral `#020617` (dark navy). **Purple is dropped**; the
accent (and gradient-end) is now sky, so gradients/glows run cyan→sky. Neutrals moved from
teal-navy to slate. Current values:

| Token | Source | HSL |
|---|---|---|
| `--background` | Neutral `#020617` | `229 84% 5%` |
| `--card` / `--popover` / `--glass-bg` | slate-900 (derived) | `222 47% 11%` |
| `--foreground` (+ all `-foreground`) | slate-50 (derived) | `210 40% 98%` |
| `--primary` / `--ring` / `--glow` / `--gradient-start` | Primary `#22d3ee` | `188 86% 53%` |
| `--primary-foreground` | dark on cyan | `229 84% 5%` |
| `--accent` / `--gradient-end` | Tertiary `#0ea5e9` (sky) | `199 89% 48%` |
| `--muted-foreground` | Secondary `#94a3b8` | `215 20% 65%` |
| `--secondary` / `--muted` | slate-800 (derived) | `217 33% 17%` |
| `--border` / `--input` | slate-700 (derived) | `215 25% 27%` |

Custom glass tokens: `--glass-bg: 222 47% 11%` (used at low alpha) and `--glass-border: 0 0% 100%`
(low alpha, e.g. `hsl(var(--glass-border) / 0.1)`). `--radius: 0.5rem` (8px).

<details><summary>Original cyan/purple palette (superseded 2026-07-23)</summary>

| Token | Mockup source | HSL |
|---|---|---|
| `--background` / `--card` base | `#051424` | `211 76% 8%` / `211 60% 11%` |
| `--primary` | `#00f5ff` | `182 100% 50%` |
| `--accent` | `#7000ff` | `266 100% 50%` |
| `--border` / `--input` | `#3a494a` | `183 12% 27%` |

</details>

### 0c. Fonts — self-host, no Google Fonts `<link>`
**Typography updated (owner, 2026-07-23):** Headline + Body = **Geist**, Labels = **Space Mono**
(replacing the original Inter body / JetBrains Mono labels).
- Geist (variable, headings + body) and Space Mono (static 400 + 700, labels/tags/nav) as `.woff2`
  in `public/fonts/`, declared via `@font-face { font-display: swap }` in a `@layer base` block at
  the top of `src/index.css`. Inter and JetBrains Mono are removed (files deleted).
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html` for Geist +
  SpaceMono-Regular (both above-the-fold — Hero body is Geist, nav/badges are Space Mono).
- `tailwind.config.ts` `theme.extend.fontFamily`: `sans: ["Geist", ...]`, `display: ["Geist", ...]`,
  `mono: ["Space Mono", ...]`. Do **not** replicate the mockup's custom `fontSize` keys — combine
  `font-display` with existing size utilities (e.g. `text-6xl md:text-7xl font-display font-extrabold
  tracking-tight` for the Hero H1).

### 0d. Icon strategy
Keep `lucide-react` (already used), no Material Symbols. Map: `terminal→Terminal`, `database→Database`, `cloud→Cloud`, `alternate_email→Mail`, `location_on→MapPin`, `arrow_forward→ArrowRight`.

### 0e. Shared hooks/utilities
- **`src/hooks/use-reduced-motion.ts`** — `useState` + `useEffect` + `matchMedia` listener for `(prefers-reduced-motion: reduce)`. All `window`/`matchMedia` access inside `useEffect` (never module scope) so the prerender pass doesn't break.
- **`src/hooks/use-scroll-reveal.ts`** — replaces the mockup's inline IntersectionObserver `<script>` with a hook returning a ref. Calls `useReducedMotion()` and renders final state immediately when true. Same SSR guard.
- **`src/index.css` `@layer components`**: `.glass-panel` (`bg-[hsl(var(--glass-bg)/0.6)] backdrop-blur-md border border-[hsl(var(--glass-border)/0.1)]`), `.hover-lift` (`transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none`), `.glow-accent` (sibling to `.glow`/`.glow-sm`, reading `--accent`).

### Definition of done (Phase 0)
- Old files gone from the working tree (full delete, no `src/legacy/`); real content preserved in the Appendix.
- `npx tsc -b --noEmit` → clean, exit 0.
- `npx oxlint` → exit 0 (harmless `react-refresh` warnings on the temporary `App.tsx` stub are acceptable until Phase 1).
- `npm run build` (`vite-react-ssg build`) → both client and SSR passes succeed, prerendered `dist/index.html` generated.
- `npm run dev` → serves real compiled output (verify via curl: `/`, `/src/main.tsx`, `/src/index.css` with the new HSL tokens + 3 `@font-face` rules present, no PostCSS errors).
- `use-reduced-motion.ts` and `use-scroll-reveal.ts` exist and type-check.

---

## Phase 1 — Shell: Navigation + Footer + `Index.tsx`
See the Appendix's "Navigation.tsx" and "Footer.tsx".

**`src/components/portfolio/Navigation.tsx`** — `navLinks`: Skills, Experience, Projects, Contact (Experience was missing from the legacy nav — independent bug, fixed now; About was later dropped — owner, 2026-07-23). Add a "Resume" outline-button (desktop + mobile) → `/Resume.pdf`, `target="_blank" rel="noopener noreferrer"`, with an inline comment noting the file doesn't exist yet. **A11y**: `aria-label="Toggle menu"` + `aria-expanded={isMobileMenuOpen}` on the hamburger. Carry over the scroll-listener/state pattern; brand stays `Vinal.`. Glass/blur nav bar, `.glass-panel`-ish on scroll.

**`src/components/portfolio/Footer.tsx`** — no Twitter link (no real account). GitHub `https://github.com/vinaldsz` + LinkedIn `https://www.linkedin.com/in/vinal-dsouza-9a9912187` (canonical), real copyright line.

**`src/pages/Index.tsx`** — same eager-Hero / lazy-below-fold `Suspense` pattern + `BackToTop` as legacy (a working perf win — carry verbatim), but no `Impact`, and a `<main>` landmark wrapping the Hero→Contact stack (Nav/Footer stay outside it). For now, sections can be empty placeholder `<section id="...">` stubs (correct `id`s so nav anchors resolve) until Phases 2–6 fill them in.

### Definition of done (Phase 1)
- `npm run dev` renders the new-styled nav (5 links + Resume + mobile hamburger with working `aria-expanded`), empty section stubs at the right anchors, and the new-styled footer.
- Each nav link scrolls to its stub.
- `npm run build && npm run preview` succeeds; prerender completes with no SSR errors.
- Keyboard-tab shows visible focus rings on every interactive element.

---

## Phase 2 — Hero + BackgroundEffects
See the Appendix's "Hero.tsx" and "BackgroundEffects.tsx".

**`src/components/portfolio/BackgroundEffects.tsx`** — a static (no keyframes, no JS) layered radial-gradient `<div>` using the new primary/accent tokens at low opacity. No animated SVG flow-lines, no `animate-float` orbs.

**`Hero.tsx`** — no particle canvas (the O(n²) loop is not ported). No glow-orb divs in Hero (handled globally by `BackgroundEffects`). **Left-aligned layout** (not centered), matching the owner-supplied Hero mockup: a content block (`max-w-3xl`) pinned to the left of the centered container. **Requirements change (owner, 2026-07-22):** the rotating typewriter (`TYPING_PHRASES` + state machine) is **dropped** — lead instead with a static value-proposition headline plus a short supporting paragraph. Copy (all grounded in the real content — the mockup's own copy is placeholder and must not be used): badge "Data Engineer · Available for Opportunities"; eyebrow "Hi, I'm Vinal Dsouza"; two-tone `font-display` headline "Data Engineering Built for the AI Era" (gradient on "AI Era" via `.text-gradient`); supporting paragraph (owner-supplied, verbatim): "Data Engineer with 5+ years building and modernizing pipelines for high-volume financial systems, now growing into AI-powered tools including RAG pipelines, MCP servers, and multi-agent ML systems. M.S. Computer Science, Northeastern University."; CTAs "Explore My Projects" (#projects) / "Let's Build Together" (#contact); GitHub `https://github.com/vinaldsz`, LinkedIn canonical `https://www.linkedin.com/in/vinal-dsouza-9a9912187`. With the typewriter gone, Hero no longer needs `useReducedMotion` (nothing animates; `BackgroundEffects` is static).

### Definition of done (Phase 2)
- Hero renders at mobile/tablet/desktop with no `<canvas>` in the DOM.
- Content is **left-aligned** (not centered); headline + supporting paragraph are static (no typewriter).
- Background is a static gradient (no continuously-repainting layer).
- Social links match Footer's GitHub/LinkedIn URLs.
- No long tasks attributable to Hero on load.

---

## Phase 3 — Skills (About dropped)
**About is dropped** (owner, 2026-07-23 — see Confirmed decisions); this phase builds only Skills.

**Requirements change (owner, 2026-07-23):** the Skills section was redesigned from the
original 6-category no-percentages bento into a curated "Technical Arsenal" layout supplied
by the owner (a Material-3-glass mockup). This **overrides** the earlier "no fake
percentages / no progress bars" rule and the 6-category data: the left panel now uses real,
owner-supplied proficiency bars. The original 6-category `skillCategories` array is retained
in the Appendix (marked superseded) for reference/reversibility only — it is not rendered.

**`src/components/portfolio/Skills.tsx`** — `<section id="skills">`, `container mx-auto px-6`,
`scroll-mt-16`. Heading "TECHNICAL ARSENAL" — `font-display` (Geist), uppercase, solid
`text-foreground` (no gradient), preceded by a short cyan (`bg-primary`) dash accent, matching
the owner mockup — + subheading "From pipelines to cloud infrastructure — the full data
engineering stack."
Layout `grid gap-6 lg:grid-cols-12`:
- **Left `lg:col-span-7` — `.glass-panel`** with a "CORE COMPETENCIES" `font-mono` eyebrow and
  3 proficiency-bar rows (owner-supplied real values): "Data Engineering & Pipeline
  Architecture (PySpark, Databricks, ETL/ELT)" 98%, "Cloud Infrastructure (AWS, Terraform)"
  92%, "AI & Agentic Systems (RAG, MCP, LLM tooling)" 88%. Each row: label + `text-primary` %,
  then a `bg-muted` track with a `bg-gradient-primary` fill that animates `0 → value%` on
  reveal (`transition-[width]`, `motion-reduce:transition-none`).
- **Right `lg:col-span-5` — `grid grid-cols-2 gap-6`** of 4 `.glass-panel .hover-lift` badge
  cards (icon in a tinted rounded square + `font-mono` uppercase label): "PySpark / Databricks"
  (Database), "AWS / Terraform" (Cloud), "PostgreSQL / pgvector" (Server), "MCP / LLM APIs" (Cpu).

Wrap the section content in `useScrollReveal` (fade-up; reduced-motion renders final state
immediately, so bars show final width without transition). New icons (`Database`, `Cloud`,
`Server`, `Cpu`) added to `src/lib/icons.ts`.

### Definition of done (Phase 3)
- Replace the Phase 1 `#skills` stub with the real `Skills` component in `Index.tsx`; the
  `#about` stub and its nav link are removed.
- Visual check at 3 breakpoints: left competency panel + right 2×2 badge grid stack correctly;
  the 3 bars fill to 98/92/88%.
- Scroll-reveal fires once, skipped under reduced motion.
- Content matches the owner-supplied values above (no fabricated skills).

---

## Phase 4 — Experience
See the Appendix's "Experience.tsx" `experiences` array — do not port DAG rendering.
**Owner content update (2026-07-23):** the Appendix array below was replaced with richer owner-supplied verbatim content (new titles, month-level date ranges, two quantified bullets per role). The `description` field is dropped; `technologies[]` are derived from the bullets + real stack. See PROGRESS Deviations.

**`Experience.tsx`** — do not port `DagNode`/`VerticalConnector`/`BranchConnectorVertical`/`expandedIndex`. Data model per entry: `title`, `company`, `duration`, `achievements[]`, `technologies[]` — 5 entries (the Graduate Teaching Assistant role is kept). Drop `description`/`level`/`icon`/`status`. Render a simple top-to-bottom `.map()` as static (non-interactive) `.glass-panel` cards matching the owner's reference layout: H2 "Professional Experience" (cyan-dash + uppercase `font-display`); per card a top row with the title (`font-display`) + company (cyan mono uppercase) on the left and a glass **date-range badge** (mono, uppercase, em-dash) top-right; a `▹`-prefixed achievement list; and a small derived `technologies` tag-pill row at the bottom. `useScrollReveal` per card for staggered fade-up (`transitionDelay` by index).

### Definition of done (Phase 4)
- Replace the `#experience` stub.
- All 5 jobs render in reverse-chronological order with correct data — diff against the Appendix.
- No `<button>`-wrapped cards with suppressed focus outlines.
- No DAG/SVG connector markup remains.

---

## Phase 5 — Projects
See the Appendix's "Projects.tsx".

**`Projects.tsx`** — carry over the `Category` filter-tab state/logic, the full 8-entry `projects` array, and the `ObservableIcon`/GitHub-link handling. Add `image?: string` to the type (undefined on all entries for now). Use the mockup's asymmetric grid (`grid grid-cols-1 lg:grid-cols-12 gap-6`, cycling an 8/4/4/8 span rhythm by `index % 3` within the *filtered* subset; handle a lone-card case with full width) instead of the legacy horizontal-scroll row. Card image area: `project.image ? <img/> : <PlaceholderTile/>` — a new inline component rendering a gradient + category-relevant lucide icon (`Database` / `Cpu` / `Server`) in `.glass-panel`.

### Definition of done (Phase 5)
- Replace the `#projects` stub.
- All 8 projects present with correct data across all 3 filter tabs — diff against the Appendix.
- Tab switching re-filters and re-renders without layout breakage, incl. the 2-item and 3-item cases.
- Placeholder tiles render a distinct icon per category; no broken `<img>`.
- All external links point to the correct real URLs.

---

## Phase 6 — Contact
See the Appendix's "Contact.tsx".

**`Contact.tsx`** — carry over the `handleSubmit` mailto logic exactly (builds `mailto:dsouza.vi@northeastern.edu?subject=...&body=...`, no fake backend). Add a `subject` field via `@radix-ui/react-select`, options: "Job Opportunity", "Collaboration", "General Inquiry", "Other"; fold into the mailto subject/body. Add a short cosmetic "SENDING..." disabled-button state (~700ms `setTimeout`) around the synchronous mailto call. **A11y**: `<Label htmlFor>`/`id` pairs for every field (legacy was placeholder-only). Style the right column as a `.glass-panel` form, left column info rows with icon circles. Carry over real email/location/availability strings verbatim ("San Francisco, CA", "Open to new opportunities").

### Definition of done (Phase 6)
- Replace the `#contact` stub.
- Submitting opens the OS mail client with the correct pre-filled subject (incl. subject-select value) and body.
- Every field has a properly associated, announced label.
- "SENDING..." shows briefly and resets, doesn't get stuck.

---

## Phase 7 — Final integration & verification pass
Every section real (no stubs). Run the cross-cutting checks:
1. `npm run dev` — walk every section at ~375 / ~768 / ~1440px.
2. Reduced motion: DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" — typewriter static, no scroll-reveal motion.
3. Keyboard pass: Tab top to bottom — visible focus ring everywhere, no dead stops.
4. `npm run build` — no SSR-time errors (confirms hooks' `window`/`matchMedia`/`IntersectionObserver` are guarded in `useEffect`). `npm run preview`, view-source `dist/index.html` to confirm sections are prerendered, not an empty shell.
5. Lighthouse before/after vs. the pre-rebuild site — confirm removing the canvas loop + always-on SVG reduces Total Blocking Time, and self-hosted fonts (preloaded) don't regress LCP.
6. `npm run lint` — clean.
7. Functional: Projects filter swaps cards; Contact opens the mail client with subject; Resume path is `/Resume.pdf` (404 until the user supplies the file — flag it, not a regression).
8. `grep -r "legacy" src/ -l` returns nothing.

---

## Appendix: Real content reference (verbatim)
**The old component files were deleted outright (no `src/legacy/` archive) — this appendix is the only record of their real copy/data/logic.** Port verbatim; do not rewrite or paraphrase.

### Hero.tsx (full original source)
```tsx
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
    <section className="w-full pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 flex items-center justify-center relative overflow-hidden">
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold tracking-widest text-primary uppercase">
              Data Engineer · Available for Opportunities
            </span>
          </div>
          <div className="mb-4">
            <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide mb-1">Hi there, I'm</p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="text-gradient">Vinal Dsouza</span>
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground/70 mb-4 max-w-lg mx-auto leading-relaxed">
            I build scalable data pipelines that reduce processing time from{" "}
            <span className="text-foreground/90 font-semibold">minutes to seconds.</span>
          </p>
          <div className="h-7 mb-10 text-sm md:text-base font-semibold text-foreground/80">
            <span>{currentText}</span>
            <span className="animate-pulse ml-0.5 text-primary">|</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 glow transition-all duration-300 hover:scale-105 border-0 font-semibold px-8">
              <a href="#projects">Explore My Projects</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:glow-sm">
              <a href="#contact">Let's Build Together</a>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/vinaldsz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vinal-dsouza-9a9912187" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-white/10 hover:scale-110 transition-all duration-300">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```
Note: the LinkedIn URL above (`.../vinal-dsouza-9a9912187`) is the corrected/canonical one (the live legacy file had a wrong slug — `.../vinal-dsouza/`). Use this value, matching Footer.

### About.tsx (real content)
*(Section dropped 2026-07-23 — retained for reference/reversibility only; not rendered.)*
- Section heading: "About Me" (gradient on "Me"), subheading: "Get to know me and what drives my passion for data engineering."
- Headshot: `/ProfessionalHeadshot.jpeg`, alt "Vinal D'Souza", intrinsic size 640×427, badge overlay "5+ Years Experience"
- Subheading above bio: "Data Engineer & AI Enthusiast"
- Lede line: "From COBOL to Databricks, I've seen data at every stage of its evolution"
- Full bio paragraph (verbatim): "I've spent 5+ years building data pipelines that teams actually rely on. From migrating legacy COBOL workflows to designing modern pipelines on Databricks and AWS that process millions of records daily, I've worked across the full spectrum of data engineering. I've led teams, been the go-to person for production issues, and driven modernization projects that made a real difference. These days I'm at Northeastern, deepening my knowledge and exploring where data engineering meets AI."
- 4 highlight cards (icon / title / description), verbatim:
  1. `Code2` — **Clean Code** — "I build things that the next engineer can actually understand and maintain."
  2. `Lightbulb` — **Problem Solver** — "I dig into root causes. Whether it's a broken pipeline or a data mismatch no one noticed yet."
  3. `Rocket` — **Performance** — "If it can be faster or lighter, I'll find a way to make it so."
  4. `Users` — **Team Player** — "I've worked across regions and business units. Good communication is half the job."

### Skills.tsx (real content — exact `skillCategories` array)
*(Superseded 2026-07-23 by the curated "Technical Arsenal" design in §Phase 3 — this 6-category array is no longer rendered; retained for reference/reversibility only.)*
```ts
const skillCategories = [
  { label: "Data Engineering", color: "primary", skills: ["Databricks", "Apache Spark", "Delta Lake", "IBM DataStage", "Airflow", "Apache Kafka"] },
  { label: "Languages & Libraries", color: "accent", skills: ["Python", "SQL", "Pandas", "NumPy", "JavaScript"] },
  { label: "Cloud & Infrastructure", color: "primary", skills: ["AWS S3", "AWS SageMaker", "AWS Lambda", "AWS EMR", "Docker"] },
  { label: "Databases", color: "accent", skills: ["PostgreSQL", "Oracle", "MySQL", "MongoDB", "Redis"] },
  { label: "Analytics & BI", color: "primary", skills: ["Power BI", "SSIS", "SSRS", "Matplotlib", "Excel"] },
  { label: "DevOps & Tools", color: "accent", skills: ["Git/GitHub", "Autosys", "Tivoli Scheduler", "Bitbucket"] },
];
```
Section heading: "Skills & Technologies" (gradient on "Technologies"), subheading: "From pipelines to cloud infrastructure — the full data engineering stack." Two alternating pill colors (`primary`/`accent`) per category, a small colored dot next to each category label.

### Experience.tsx (real content — exact `experiences` data, minus the DAG rendering code)
**Owner-updated 2026-07-23** — replaces the earlier terse array (one bullet/role, year-only durations, older titles). New titles, month-level date ranges, and two quantified bullets per role; `description` dropped; `technologies[]` derived from the bullets + real stack. The Graduate Teaching Assistant role is retained (owner: keep it); its bullets are its earlier `description` + `achievement` folded into two lines. The Systems Engineer Intern role was "add from what you know" — grounded verbatim in the prior array's SSIS/SQL Server/Power BI grocery-sales BI, no invented metrics. (The pre-update array is preserved in git history at/before commit `f3dd9dc`.)
```ts
const experiences = [
  {
    title: "Graduate Research Assistant",
    company: "Northeastern University",
    duration: "Sep 2025 — Present",
    achievements: [
      "Ran a structured inter-rater reliability study using Cohen's Kappa and Likert scaling to calibrate human judgment of AI output across 45 government employees.",
      "Embedded with 14+ municipal departments during a live Copilot deployment to diagnose adoption gaps. Findings accepted at PEPR'26, intended to inform municipal AI governance policy.",
    ],
    technologies: ["AI Research", "Cohen's Kappa", "Survey Design", "Data Analysis"],
  },
  {
    title: "Graduate Teaching Assistant & Lead TA",
    company: "Northeastern University",
    duration: "2024 — Present",
    achievements: [
      "Led a TA team managing 80+ students across multiple programming languages.",
      "Managed a 4-person TA team and conducted labs.",
    ],
    technologies: ["Kotlin", "Java", "Python", "Education"],
  },
  {
    title: "Senior Data Engineer",
    company: "Accenture",
    duration: "Mar 2022 — Jun 2024",
    achievements: [
      "Rebuilt a commercial loan risk pipeline from a legacy mainframe setup to Databricks on AWS, cutting runtime from 6 hours to 36 minutes on 5M+ daily records with 100% accuracy over a 30-day parallel run.",
      "Built a metadata-driven ingestion accelerator adopted by multiple delivery teams, cutting new-source onboarding from 1 week to 2 days.",
    ],
    technologies: ["Databricks", "AWS", "PySpark", "Python", "SQL"],
  },
  {
    title: "Senior Systems Engineer",
    company: "Infosys",
    duration: "Sep 2019 — Mar 2022",
    achievements: [
      "Migrated 8+ legacy COBOL-based ETL pipelines to IBM DataStage with 98% data accuracy and zero post-migration errors.",
      "Built a configuration-driven egress framework that let a single DataStage job generate unique customer deliverables dynamically, cutting pipeline onboarding from 2 days to 3 hours.",
    ],
    technologies: ["IBM DataStage", "COBOL", "ETL", "SQL"],
  },
  {
    title: "Systems Engineer Intern",
    company: "Infosys",
    duration: "2019",
    achievements: [
      "Built an end-to-end BI solution for grocery sales data, developing SSIS ETL packages to load a SQL Server data warehouse.",
      "Delivered Power BI dashboards and reports that surfaced sales trends for business stakeholders.",
    ],
    technologies: ["SSIS", "SQL Server", "Power BI", "Data Warehouse"],
  },
];
```
(Array order above is reverse-chronological, rendered top-to-bottom as authored; the legacy DAG re-ordered these into a branching layout — not ported.)

### Projects.tsx (real content — exact `projects` array + filter logic)
```ts
type Category = "Data Engineering" | "AI/ML" | "Devops and Other";

const projects: { title: string; description: string; tags: string[]; githubUrl: string; liveUrl?: string; category: Category }[] = [
  {
    title: "FMCG Delta Medallion Pipeline",
    description: "Built a 3-layer medallion lakehouse (Bronze/Silver/Gold) with Databricks workflows, automated quality checks, and alerting to improve pipeline reliability and monitoring coverage.",
    tags: ["Databricks", "PySpark", "SQL", "AWS", "Delta Lake"],
    githubUrl: "https://github.com/vinaldsz",
    category: "Data Engineering",
  },
  {
    title: "Flight Delay Prediction",
    description: "Trained an XGBoost model on 580K+ flight records and improved weather-delay detection from 0.2% to 11.6% using robust feature engineering and production-style ML pipelines on SageMaker.",
    tags: ["AWS SageMaker", "Numpy", "Pandas", "scikit-learn"],
    githubUrl: "https://github.com/vinaldsz/FlightDelayPrediction.git",
    category: "AI/ML",
  },
  {
    title: "Walmart Sales Forecasting",
    description: "Forecasted weekly store-level sales from multi-store historical data and surfaced trend signals that support faster demand-planning decisions.",
    tags: ["Python", "Numpy", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/vinaldsz/Walmart_Sales_Forecasting.git",
    category: "Data Engineering",
  },
  {
    title: "Facial Similarity Checker",
    description: "Built a face embedding workflow with face-api.js to compute parent-child similarity scores and deliver fast, interactive visual comparisons.",
    tags: ["Observable Notebook", "face-api.js"],
    githubUrl: "https://observablehq.com/d/60de971c7cd60d5c",
    category: "AI/ML",
  },
  {
    title: "AI PDF Assistant",
    description: "Built a RAG assistant that indexes PDFs into pgvector and returns grounded answers through Phi agents, exposed via 3 interfaces: CLI, REST API, and Streamlit app.",
    tags: ["Python", "Phi", "pgvector", "PostgreSQL", "Groq", "Google APIs", "Streamlit"],
    githubUrl: "https://github.com/vinaldsz/ai-pdf-assistant.git",
    category: "AI/ML",
  },
  {
    title: "Microservices & CI/CD Pipeline",
    description: "Containerized backend services on ECS Fargate with autoscaling and blue-green releases through CodePipeline to reduce deployment risk and improve release reliability.",
    tags: ["Node.js", "Docker", "AWS ECS Fargate", "CodePipeline"],
    githubUrl: "https://www.credly.com/badges/a4b38d72-6265-4eef-8d8a-cf70bfe2d8ab/public_url",
    category: "Devops and Other",
  },
  {
    title: "Distributed Systems Scalability Portfolio",
    description: "Scaled cloud-native services with Terraform, ECS Fargate, and ALB autoscaling, then benchmarked latency-throughput trade-offs under burst traffic to guide API and infra tuning.",
    tags: ["Go", "Terraform", "AWS ECS", "ALB", "CloudWatch"],
    githubUrl: "https://github.com/vinaldsz/scalable-distributed-systems.git",
    category: "Devops and Other",
  },
  {
    title: "TinyThreads",
    description: "Shipped an end-to-end marketplace to production with Next.js, MongoDB, and S3-backed media, including CI/CD automation, OAuth authentication, and tested REST APIs.",
    tags: ["Next.js", "React", "MongoDB", "AWS S3", "GitHub Actions", "REST APIs", "NextAuth", "Jest", "React Testing Library"],
    githubUrl: "https://github.com/vinaldsz/TinyThreads.git",
    liveUrl: "",
    category: "Devops and Other",
  },
];
```
Filter tabs: "Data Engineering" / "AI/ML" / "Devops and Other", default active "Data Engineering". The Facial Similarity Checker card shows a custom inline `ObservableIcon` SVG instead of the GitHub icon (link is an Observable notebook) — check `githubUrl.includes("observablehq.com")`. Bottom CTA: "View All Projects on GitHub" → `https://github.com/vinaldsz`.

### Contact.tsx (real content + mailto logic)
- Real email: `dsouza.vi@northeastern.edu`; location: "San Francisco, CA"; availability: "Open to new opportunities" (green dot indicator)
- Heading: "Get In Touch", subheading: "Have a project in mind or want to collaborate? I'd love to hear from you."
- Left column intro: "Let's Connect" / "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
- `handleSubmit` logic (verbatim): builds `mailto:dsouza.vi@northeastern.edu?subject=<Portfolio Contact from {name}>&body=<Name: {name}\nEmail: {email}\n\nMessage:\n{message}>`, sets `window.location.href`, then shows a toast `{ title: "Opening email client", description: "Your default email app should open shortly." }`. Legacy fields: name, email, message (Phase 6 adds subject).

### Navigation.tsx (real content)
- Brand: `Vinal.` (with the period)
- Legacy `navLinks`: About (`#about`), Skills (`#skills`), Projects (`#projects`), Contact (`#contact`) — **Experience was missing**, confirmed bug, Phase 1 adds it.
- CTA button: "Get in Touch" → `#contact`
- No Resume link existed.

### Footer.tsx (real content)
- Brand: `Vinal.`
- Copyright: `© {currentYear} All rights reserved.`
- Socials: GitHub `https://github.com/vinaldsz`, LinkedIn `https://www.linkedin.com/in/vinal-dsouza-9a9912187` (canonical).

### BackgroundEffects.tsx (legacy — being replaced, not ported)
Fixed full-viewport SVG with 5 animated dashed paths (CSS `@keyframes flow`, 10–25s loops) plus two blurred `animate-float` glow orbs, rendered unconditionally regardless of scroll. Replaced with a static gradient. Documented only so its behavior is on record.

### index.css / tailwind.config.ts (pre-rebuild values, reference only)
Old theme "Dark Professional Developer Portfolio": `--background: 222 47% 6%`, `--primary: 217 91% 60%` (blue), `--accent: 280 70% 60%` (purple), `--radius: 0.75rem`. No custom `fontFamily` (default Tailwind stack). Custom keyframes: `fade-up`, `fade-in`, `slide-in-left`, `float`, `data-flow`, `data-flow-horizontal`, `flow-path`. Superseded by Phase 0's new palette.
