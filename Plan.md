# Portfolio visual rebuild: cyan/purple "glass" redesign

## How to resume this plan in a new session
This build spans multiple sessions/phases and happens entirely on a dedicated branch, never on `main`. **Before any Phase 0 work**, create and switch to it once: `git checkout -b redesign/glass-rebuild` (or `git fetch && git checkout redesign/glass-rebuild` in every subsequent session if it already exists remotely/locally) — confirm with `git branch --show-current` before touching any file. **The old component files are deleted outright, not archived to `src/legacy/`** — every phase's real content/data now lives in the "Appendix: Real content reference (verbatim)" at the end of this file; use that instead of reading any `src/legacy/...` path (that directory does not exist in this version of the plan). Each phase below is self-contained: it names the exact files to create, and a "Definition of done" checklist to validate before moving on. **Work through phases in order** — later phases assume earlier ones are merged (e.g., Phase 2+ assumes the design tokens and shared hooks from Phase 0 exist). At the start of any session: confirm you're on `redesign/glass-rebuild` (not `main`), read this whole file, then check the `[ ]`/`[x]` boxes under "Phase status" below to see where the last session left off, then re-read only the legacy file(s) named in the next unchecked phase. After finishing a phase, tick its box in this file before ending the session, and commit **on this branch only** with a message naming the phase (e.g. `git commit -m "Phase 2: Hero + BackgroundEffects rebuild"`). Do not merge into `main` or push directly to it — that's a separate, explicit decision for the user to make once all phases are done and verified.

### Environment limitation — RESOLVED by the full re-scaffold
An earlier attempt on the old Vite 5 / ESLint 9 toolchain found that `npm run dev`, `npm run build`, and `npm run lint` all hung indefinitely in an agent/harness session (confirmed cause: esbuild's long-lived "service" subprocess deadlocked on its stdin/stdout pipe handshake in that sandbox). **This is fixed as a side effect of the "build from complete scratch" re-scaffold**: the project now runs on Vite 8 (which uses a Rust-based "rolldown" bundler instead of the old esbuild-service architecture) and `oxlint` (a single native binary, not Node+esbuild) instead of ESLint. Verified directly in an agent session: `npm run build` completes in <1s, `npm run dev` serves real transformed content instantly (confirmed via `curl` — HTML, `/src/main.tsx`, and `/src/index.css` all return real content with HTTP 200, no hang), and `npx oxlint` runs instantly. **All three commands can now be run and validated directly inside an agent session** — this is no longer deferred to the human user. (The old "blank white page" bug from an even earlier attempt was never diagnosed and is moot now — that code no longer exists.)

### Phase status
- [x] Phase 0 — Re-scaffold from scratch + build the foundation (tokens, fonts, shared hooks/utilities)
- [ ] Phase 1 — Shell: Navigation + Footer + Index.tsx wiring (empty section placeholders)
- [ ] Phase 2 — Hero + BackgroundEffects
- [ ] Phase 3 — About + Skills
- [ ] Phase 4 — Experience
- [ ] Phase 5 — Projects
- [ ] Phase 6 — Contact
- [ ] Phase 7 — Final integration pass (a11y, reduced motion, perf, build/prerender verification)

## Context
The current site (`Vinals-Portfolio`, React + Vite + TS, prerendered via `vite-react-ssg`) feels laggy/glitchy/buggy to the owner. Root causes found during exploration: a hand-rolled `<canvas>` particle-network animation in `Hero.tsx` running an O(n²) distance check every frame, an always-on full-viewport animated SVG background (`BackgroundEffects.tsx`) that never pauses regardless of scroll position, zero `prefers-reduced-motion` handling anywhere (a known, already-documented bug in `TODO.md`), a ~1MB orphaned image, and a few dead files. Separately, the owner supplied a new visual design (a dark navy/cyan/purple "Material-3-glass" mockup, static HTML+Tailwind-CDN) and wants the whole site rebuilt to match it, while keeping the real content and functional behaviors that already work (mailto contact form, project category filters, prerendering, code-splitting).

This plan builds every section fresh (new component files, not in-place edits) to the new design language, fixes the perf/a11y issues along the way (baked into each new component, not a separate pass), and ports all real content — never using the mockup's placeholder copy/images/names. **The entire project scaffolding was torn down and rebuilt from a clean `create-vite` template** (see "Confirmed decisions" below) — nothing is archived; the real content/data lives verbatim in the Appendix at the end of this file instead. The build is split into independently-validatable phases (foundation → shell → sections, in the order a page actually renders) so each phase can be its own session and be checked before moving to the next — this is standard frontend build sequencing: design tokens and shared primitives first, then layout shell, then sections, so later phases are just "fill in the shell" rather than fighting inconsistent foundations.

**Confirmed decisions (already asked/answered):**
- **Full re-scaffold from scratch, not just a component rewrite**: every old config/scaffolding file was deleted (`package.json`, `package-lock.json`, `node_modules`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`, `components.json`, `vitest.config.ts`, `index.html`, all of `src/`) and replaced by scaffolding a brand-new project via `npm create vite@latest -- --template react-ts` into a scratch directory, then copying its config/entry files into the real repo and adapting them. No Lovable/shadcn boilerplate was carried over. Real content (`public/ProfessionalHeadshot.jpeg`) and project docs (`README.md`, `TODO.md`, `Plan.md`) were kept.
- **Resulting stack** (all newer major versions than the old project — this is intentional, not a mistake to "fix" in a later phase): React 19.2, Vite 8.1, TypeScript ~6.0, `vite-react-ssg` ^0.9.2 (still used for prerendering — confirmed compatible with Vite 8 / React 19 via its `peerDependencies`), `react-router-dom` ^6.30 (pinned to v6, not v7 — `vite-react-ssg@0.9.2` peer-depends on `^6.14.1` and installing v7 causes an `ERESOLVE` conflict), `oxlint` instead of ESLint (single native binary, configured via `.oxlintrc.json`, run via `npm run lint`), Tailwind CSS **v3** (not v4 — deliberately, so the HSL-CSS-variable/`tailwind.config.ts`-`theme.extend` token approach already designed for this plan didn't have to be rewritten for v4's CSS-first `@theme` config model), `tailwindcss-animate` plugin retained.
- **No shadcn/ui component library** — `src/components/ui/*`'s ~50-file boilerplate was not recreated. Where real accessibility complexity justifies it (Select, Tabs, Toast, Label), later phases add a *specific* Radix primitive directly (`@radix-ui/react-select`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-label`, plus `@radix-ui/react-slot` for the `Button`'s `asChild` pattern) rather than pulling in shadcn's full generated set. `class-variance-authority`, `clsx`, `tailwind-merge`, and a small `cn()` helper in `src/lib/utils.ts` are kept since they're generically useful, not bloat.
- Experience: replace the mockup's plain card-per-job layout for the (removed) DAG/"Career Graph" visualization.
- Impact section: drop entirely (no equivalent in new design, not re-created).
- Projects: keep the existing image-less cards for now, but add an `image?` field with a styled placeholder fallback so real screenshots can be dropped in later. Keep the working category filter tabs — rebuild with new styling, don't remove the behavior.
- Nav: add a "Resume" button now, pointing at `/Resume.pdf` (file to be supplied by the user later).

---

## Phase 0 — Full re-scaffold + Foundation (DONE — see below for exactly what was done)

### 0a. Re-scaffold the project from scratch (completed)
Everything old was deleted (`package.json`, `package-lock.json`, `node_modules`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`/`tsconfig.app.json`/`tsconfig.node.json`, `eslint.config.js`, `components.json`, `vitest.config.ts`, `index.html`, and all of `src/` including `src/components/ui/*`, `src/hooks/*`, `src/lib/utils.ts`), keeping only `Plan.md`, `TODO.md`, `README.md`, `.gitignore`, and `public/ProfessionalHeadshot.jpeg` + `public/placeholder.svg` + `public/robots.txt`. Then:
1. Scaffolded a throwaway fresh project via `npm create vite@latest fresh-scaffold -- --template react-ts` in a scratch directory (not inside the repo).
2. Copied its `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.oxlintrc.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css` into the real repo root, then hand-adapted every one of them (see the "Resulting stack" bullet above for exact versions/choices) — none were used verbatim.
3. Rewrote `package.json`: renamed to `vinals-portfolio`, `build` script set to `vite-react-ssg build` (not plain `vite build`), added back `test`/`test:watch` scripts, added the dependency list from the "Resulting stack" bullet above.
4. Rewrote `vite.config.ts`: added the `@` → `./src` alias, and a `manualChunks` function (not the object form — the object form fails to type-check against this Vite/Rollup version's `ManualChunksOption` type; use a function that returns `"react-vendor"` for react/react-dom/react-router-dom module ids) gated by `isSsrBuild` (skip manual chunking during the SSR build pass, same pattern as before).
5. Added `"paths": { "@/*": ["./src/*"] }` to `tsconfig.app.json` (no `baseUrl` — this TS version deprecates it under `moduleResolution: "bundler"`, and `paths` alone is sufficient).
6. Rewrote `src/main.tsx` to the `vite-react-ssg` pattern (`export const createRoot = ViteReactSSG({ routes })`, importing `routes` from `./App.tsx`) instead of the scaffold's plain `createRoot(...).render(...)`.
7. Rewrote `src/App.tsx` as the route-config stub (see Phase 1 below for what replaces the stub), and added `src/pages/NotFound.tsx` back (dropped the `console.error` on every 404 hit that `TODO.md` had flagged as a bug — clean rewrite, not carried forward).
8. Re-added Tailwind (`tailwindcss`/`postcss`/`autoprefixer`/`tailwindcss-animate` devDependencies + `postcss.config.js` + `tailwind.config.ts`) since the whole design system is written in Tailwind utility classes.
9. `npm install` — first attempt failed (`ERESOLVE`: `vite-react-ssg@0.9.2` peer-depends on `react-router-dom@^6.14.1`, and `package.json` initially had `^7.9.6`) — fixed by pinning `react-router-dom` to `^6.30.1`, then it installed clean with 0 vulnerabilities.
10. Verified `npx tsc -b --noEmit` passes, `npm run build` completes in under a second, `npm run dev` serves real content (confirmed via `curl`), and `npx oxlint` runs instantly with only two expected `react-refresh` warnings about the temporary `App.tsx` stub (harmless, resolved when Phase 1 splits `IndexStub` out).

### 0b. Design tokens
Update `src/index.css`'s `:root` and `.dark` blocks (both — site stays dark-only, matches `darkMode: ["class"]` and the mockup's `<html class="dark">`). Since there's no shadcn scaffolding anymore, these variable names are simply the ones `tailwind.config.ts`'s `theme.extend.colors` maps to (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`) — keep using exactly those names so components can just write `bg-primary`, `text-muted-foreground`, etc.:

| Token | Mockup source | New HSL |
|---|---|---|
| `--background` / `--card` base | `#051424` (surface) | `211 76% 8%` (background), `211 60% 11%` (card, +~3% L) |
| `--primary` | `#00f5ff` (primary-container) | `182 100% 50%` |
| `--primary-foreground` | `#002021` (on-primary-fixed) | `183 90% 7%` |
| `--accent` | `#7000ff` (secondary-container) | `266 100% 50%` |
| `--accent-foreground` | `#d1bcff` (secondary-fixed-dim) | `259 100% 87%` |
| `--muted` / `--secondary` | `#122131`/`#1c2b3c` (surface-container / -high) | scale from background, keep current +6-8% L relationship |
| `--border` / `--input` | `#3a494a` (outline-variant) | `183 12% 27%` |
| `--ring` | same as `--primary` | `182 100% 50%` |
| `--gradient-start` / `--glow` | → `--primary` | `182 100% 50%` |
| `--gradient-end` | → `--accent` | `266 100% 50%` |

Add two new custom tokens for the glass effect (no shadcn equivalent exists): `--glass-bg: 211 60% 11%` (used at low alpha) and `--glass-border: 0 0% 100%` (used at low alpha, e.g. `hsl(var(--glass-border) / 0.1)`).

`--radius`: mockup's scale (2px/4px/8px/12px) is sharper than shadcn components expect; set `--radius: 0.5rem` (8px) as a middle ground — sharp enough to read as the new aesthetic without breaking existing `Button`/`Input`/`Card` proportions.

### 0c. Fonts — self-host, do not add a Google Fonts `<link>`
- Add Geist (variable, display/headings), Inter (variable, body), JetBrains Mono (400/500, labels/tags/nav) as `.woff2` in `public/fonts/`, declared via `@font-face { font-display: swap }` in a new `@layer base` block at the top of `src/index.css`.
- Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html` `<head>` for Geist + Inter only (both needed for Hero, which is eager/above-the-fold); JetBrains Mono can lazy-swap since it's only used for small label text.
- `tailwind.config.ts`: add under `theme.extend.fontFamily`: `sans: ["Inter", ...]` (default body), `display: ["Geist", ...]` (headings), `mono: ["JetBrains Mono", ...]`. Do **not** replicate the mockup's custom `fontSize` keys (`display`, `headline-lg`, etc.) in the config — just combine `font-display` with existing Tailwind size utilities (e.g. `text-6xl md:text-7xl font-display font-extrabold tracking-tight` for the Hero H1, matching the mockup's 72px/-0.04em/800 spec at desktop).

### 0d. Icon strategy
Keep `lucide-react` (already installed, already used throughout), do not add Material Symbols Outlined. Map: `terminal→Terminal`, `database→Database`, `cloud→Cloud`, `alternate_email→Mail`, `location_on→MapPin`, `arrow_forward→ArrowRight`.

### 0e. Shared hooks/utilities (new files — completed)
- **`src/hooks/use-reduced-motion.ts`** (done) — a simple `useState` + `useEffect` + `matchMedia` listener for `(prefers-reduced-motion: reduce)`. All `window`/`matchMedia` access is inside `useEffect` (never at module scope) so `vite-react-ssg`'s prerender pass doesn't break.
- **`src/hooks/use-scroll-reveal.ts`** — replaces the mockup's inline `<script>` IntersectionObserver with a hook returning a ref to attach per section/card. Calls `useReducedMotion()` internally and skips the animation (renders final state immediately) when true. Same SSR-safety guard as above.
- **`src/index.css` new `@layer components` block**: `.glass-panel` (`bg-[hsl(var(--glass-bg)/0.6)] backdrop-blur-md border border-[hsl(var(--glass-border)/0.1)]`), `.hover-lift` (`transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none`), `.glow-accent` (sibling to existing `.glow`/`.glow-sm` but reading `--accent` for purple-tinted glows).

### Definition of done (Phase 0) — ALL VERIFIED
- ✅ Old files gone from the working tree (full delete, no `src/legacy/`); real content preserved in the Appendix.
- ✅ `npx tsc -b --noEmit` → clean, exit 0.
- ✅ `npx oxlint` → exit 0 (2 harmless `react-refresh` warnings about the temporary `App.tsx` stub, resolved in Phase 1; 1 harmless `exhaustive-deps` warning on `use-scroll-reveal.ts`'s intentionally-omitted `options` dependency).
- ✅ `npm run build` (`vite-react-ssg build`) → completes in <1s, both client and SSR passes succeed, prerendered `dist/index.html` generated.
- ✅ `npm run dev` → verified via `curl` that it serves real compiled output, not just a static shell: fetched `/` (full HTML with correct meta tags + dark-navy inline loader), `/src/main.tsx` (real transformed JS module), and `/src/index.css` (fully compiled Tailwind output — confirmed all the new HSL tokens, the 3 self-hosted `@font-face` rules, and Tailwind's base reset are present with zero PostCSS errors; `.glass-panel`/`.hover-lift` don't appear yet only because nothing references those class names until Phase 1+, which is expected Tailwind purging behavior, not a bug).
- `use-reduced-motion.ts` and `use-scroll-reveal.ts` exist and type-check, even though nothing consumes them yet (that starts in Phase 1+).

---

## Phase 1 — Shell: Navigation + Footer + `Index.tsx`

See the Appendix's "Navigation.tsx" and "Footer.tsx" sections for real content/logic to carry forward. Build:

**`src/components/portfolio/Navigation.tsx`** (new) — include an `Experience` link in `navLinks` (missing from the legacy nav entirely — independent bug, fixed now regardless of redesign): About, Skills, Experience, Projects, Contact. Add a "Resume" outline-button (desktop + mobile menu) linking to `/Resume.pdf`, `target="_blank" rel="noopener noreferrer"`, with an inline comment flagging the file doesn't exist yet. **A11y fix**: add `aria-label="Toggle menu"` + `aria-expanded={isMobileMenuOpen}` to the hamburger button (legacy version has neither). Carry over scroll-listener/state logic pattern from the legacy file; brand stays "Vinal." (mockup's "Vinal" without a period is not used). Style with new glass/blur nav bar per mockup, `.glass-panel`-ish on scroll.

**`src/components/portfolio/Footer.tsx`** (new) — no Twitter link (mockup has one, but there's no real account) — don't add one. Carry over GitHub + LinkedIn from the legacy file (`https://github.com/vinaldsz`, `https://www.linkedin.com/in/vinal-dsouza-9a9912187` — this is the canonical LinkedIn URL the new Hero.tsx must match in Phase 2) and the real copyright line.

**`src/pages/Index.tsx`** (new) — same eager-Hero/lazy-below-fold `Suspense` pattern and `BackToTop` component as the legacy file (a recent, working perf win — carry the pattern over verbatim), but with no `Impact` import/render (confirmed drop — not carried over) and with a `<main>` landmark wrapping the Hero→Contact section stack (Navigation and Footer stay outside it) — the legacy file has no `<main>` at all. For now, `Hero`/`About`/`Experience`/`Skills`/`Projects`/`Contact` can be temporary empty placeholder `<section id="...">` stubs (with the right `id`s so nav anchors resolve) until Phases 2-6 fill them in — this lets the shell be validated end-to-end before section content exists.

### Definition of done (Phase 1)
- `npm run dev` renders a page with the new-styled nav (all 5 links + Resume button + mobile hamburger with working `aria-expanded`), empty section stubs at the right anchors, and the new-styled footer.
- Clicking each nav link scrolls to the corresponding empty stub (anchors resolve).
- `npm run build && npm run preview` succeeds; `vite-react-ssg` prerender completes with no SSR errors.
- Keyboard-tab through nav + footer shows visible focus rings on every interactive element.

---

## Phase 2 — Hero + BackgroundEffects

See the Appendix's "Hero.tsx" and "BackgroundEffects.tsx" sections for real content/logic.

**`src/components/portfolio/BackgroundEffects.tsx`** (new) — a static (no keyframes, no JS) layered radial-gradient `<div>` using the new primary/accent tokens at low opacity — no animated SVG flow-lines, no `animate-float` orbs. Avoids the legacy version's "always running regardless of visibility" perf cost outright rather than just gating it.

**`Hero.tsx`** (new) — no particle canvas at all (the legacy `ParticleCanvas`'s O(n²) loop is not ported). Keep the typewriter effect (cheap, adds personality) — pull the `TYPING_PHRASES` array (`"Optimizing ETL workflows"`, `"Automating data systems at scale"`, `"Designing resilient data architectures"`) and state-machine logic from the legacy file — but make its `useEffect` show the full phrase statically with no per-char interval when `useReducedMotion()` is true (from Phase 0e). No glow-orb `div`s in Hero itself (handled once, globally, by the new `BackgroundEffects`). Carry over all real copy verbatim: badge "Data Engineer · Available for Opportunities", name "Vinal Dsouza", tagline "I build scalable data pipelines that reduce processing time from minutes to seconds.", CTAs "Explore My Projects" (#projects) / "Let's Build Together" (#contact), GitHub `https://github.com/vinaldsz`. Fix the LinkedIn URL to the canonical `https://www.linkedin.com/in/vinal-dsouza-9a9912187` (legacy Hero has a different, wrong slug vs. legacy Footer). Style with `font-display` headline, new gradient tokens (flows through automatically via `.text-gradient`), new glass badge.

### Definition of done (Phase 2)
- Hero renders at mobile/tablet/desktop breakpoints with no canvas element in the DOM (confirm via DevTools Elements panel — zero `<canvas>` tags).
- Typewriter cycles phrases at normal motion; with DevTools "Emulate prefers-reduced-motion: reduce" the full phrase shows statically with no flicker.
- Background is a static gradient (confirm no continuously-repainting layer in DevTools Rendering → Paint flashing).
- Both social links point to the correct, matching GitHub/LinkedIn URLs (spot-check against Footer's values from Phase 1).
- Lighthouse/Performance panel: no long tasks attributable to Hero on load (sanity check against the legacy version's canvas-driven main-thread cost).

---

## Phase 3 — About + Skills

See the Appendix's "About.tsx" and "Skills.tsx" sections for real content/logic.

**`About.tsx`** (new) — carry over the bio paragraph ("I've spent 5+ years building data pipelines that teams actually rely on...through Northeastern, deepening my knowledge and exploring where data engineering meets AI."), "5+ Years Experience" badge, the 4-item `highlights` array (Clean Code/Problem Solver/Performance/Team Player), and the `/ProfessionalHeadshot.jpeg` image (with its existing explicit width/height) verbatim from the legacy file — content is unaffected by the redesign. Wrap section in `useScrollReveal` (Phase 0e). Style the 4 highlight cards as `.glass-panel .hover-lift` tiles.

**`Skills.tsx`** (new) — carry over the real 6-category pill data (`skillCategories`: Data Engineering, Languages & Libraries, Cloud & Infrastructure, Databases, Analytics & BI, DevOps & Tools, with their real tool lists) from the legacy file verbatim. Adapt the mockup's bento pattern to fit it: no fake percentages, no fixed 4-icon tile grid (no real proficiency-% data exists to justify progress bars). Each category becomes a `.glass-panel .hover-lift` tile in a `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`; make the "Data Engineering" tile `lg:col-span-2` for genuine visual hierarchy instead of inventing numbers. Reuse the legacy `colorMap` alternating scheme, remapped to new tokens.

### Definition of done (Phase 3)
- Replace the Phase 1 empty stubs for `#about`/`#skills` with these real components in `Index.tsx`.
- Visual check at 3 breakpoints: About's 2-column layout (bio + headshot) and 4 highlight tiles; Skills' bento grid with all 6 categories present and the Data Engineering tile visibly wider on `lg`.
- Scroll-reveal fires once per section on scroll-into-view (not on every scroll tick) and is skipped entirely under reduced motion.
- No content regressions vs. the original: compare the rendered bio text and skill list against the Appendix's "About.tsx"/"Skills.tsx" sections to confirm nothing was dropped or reworded.

---

## Phase 4 — Experience

See the Appendix's "Experience.tsx" section for the real `experiences` data array — do not port its DAG rendering code (not included in the Appendix on purpose).

**`Experience.tsx`** (new) — do not port `DagNode`/`VerticalConnector`/`BranchConnectorVertical`/`expandedIndex` from the legacy file at all. Carry over only the `experiences` array's real data fields (`title`, `company`, `duration`, `description`, `achievements[]`, `technologies[]`) verbatim — 5 entries: Graduate Research Apprentice (Northeastern, 2025–Current), Graduate Teaching Assistant & Lead TA (Northeastern, 2024–Current), Data Eng & Governance Sr. Analyst (Accenture, 2022–2024), Senior Systems Engineer (Infosys, 2019–2022), Systems Engineer Intern (Infosys, 2019). Drop the `level`/`icon`/`status` fields (unused by the new layout). Render a simple top-to-bottom `.map()` over `experiences` as static (non-interactive — no expand/collapse, which sidesteps the legacy `focus:outline-none`-with-no-replacement a11y bug entirely by construction) `.glass-panel` cards: title, company, a date-range badge pill, a `▹`-prefixed achievement list, and a `technologies` tag-pill row. Apply `useScrollReveal` per card for a staggered fade-up.

### Definition of done (Phase 4)
- Replace the Phase 1 `#experience` stub with the real component.
- All 5 jobs render in reverse-chronological order with correct company/duration/achievements/technologies — diff against the legacy array to confirm no data loss.
- No `<button>`-wrapped cards with suppressed focus outlines (confirm via keyboard tab — either no focus stop on cards at all, or a visible ring if any interactivity was kept).
- No DAG/SVG connector markup remains anywhere in the DOM for this section.

---

## Phase 5 — Projects

See the Appendix's "Projects.tsx" section for the real `projects` array and filter/tab logic.

**`Projects.tsx`** (new) — carry over the `Category` filter-tab state/logic pattern, the full 8-entry `projects` array (FMCG Delta Medallion Pipeline, Flight Delay Prediction, Walmart Sales Forecasting, Facial Similarity Checker, AI PDF Assistant, Microservices & CI/CD Pipeline, Distributed Systems Scalability Portfolio, TinyThreads — with their real descriptions/tags/URLs), and the `ObservableIcon`/GitHub-link handling from the legacy file (the behavior works — this is a rewrite of the presentation layer around the same working logic, not a logic change). Add `image?: string` to the type (leave `undefined` on all entries for now). Use the mockup's asymmetric grid (`grid grid-cols-1 lg:grid-cols-12 gap-6`, cycling an 8/4/4/8 column-span rhythm by `index % 3` within the *filtered* subset, not absolute position, since filtering changes count — current categories have 2/3/3 items respectively, so also handle a lone-card case by giving it full width) instead of the legacy horizontal-scroll row. Each card's image area: `project.image ? <img/> : <PlaceholderTile/>` — a small new inline component rendering a gradient + a category-relevant lucide icon (`Database` for Data Engineering, `Cpu` for AI/ML, `Server` for Devops) inside `.glass-panel`, so screenshots can be dropped in later with zero markup changes.

### Definition of done (Phase 5)
- Replace the Phase 1 `#projects` stub with the real component.
- All 8 projects present with correct data across all 3 filter tabs — diff against the legacy array.
- Switching tabs correctly re-filters and re-renders the asymmetric grid without layout breakage, including the 2-item and 3-item tab cases (lone/odd-count fallback works).
- Placeholder tiles render a distinct icon per category when no `image` is set; no broken `<img>` tags.
- GitHub/Observable/Credly links all still point to the correct real URLs.

---

## Phase 6 — Contact

See the Appendix's "Contact.tsx" section for the real mailto logic and content.

**`Contact.tsx`** (new) — carry over the `handleSubmit` mailto-link logic exactly as-is from the legacy file (builds `mailto:dsouza.vi@northeastern.edu?subject=...&body=...`, no fake backend). Add a `subject` field to `formData` using the already-installed shadcn `Select` (`src/components/ui/select.tsx`, unused elsewhere), options: "Job Opportunity", "Collaboration", "General Inquiry", "Other"; fold the selection into the mailto subject/body. Add a short cosmetic "SENDING..." disabled-button state (~700ms `setTimeout`) around the existing synchronous mailto call, matching the mockup's button micro-interaction without pretending there's a real network call. **A11y fix**: add `<Label htmlFor>`/`id` pairs for every field (legacy version is placeholder-only, no labels — reuse `src/components/ui/label.tsx`). Style right column as `.glass-panel` form, left column info rows with icon circles per mockup. Carry over real email/location/availability strings verbatim ("San Francisco, CA", "Open to new opportunities").

### Definition of done (Phase 6)
- Replace the Phase 1 `#contact` stub with the real component.
- Submitting the form opens the OS mail client with the correct pre-filled subject (including the new subject-select value) and body.
- Every field has a properly associated, screen-reader-announced label (verify via VoiceOver or the accessibility tree in DevTools).
- "SENDING..." state shows briefly and doesn't get stuck (button re-enables / resets appropriately).

---

## Phase 7 — Final integration & verification pass
By this point every section is real (no more placeholder stubs in `Index.tsx`). Run the full cross-cutting checks:
1. `npm run dev` — walk every section at mobile (~375px)/tablet (~768px)/desktop (~1440px): Hero, About, Skills bento, Experience cards, Projects at all 3 filter tabs, Contact, Footer, Nav (including mobile menu + Resume link + Experience link).
2. Reduced motion: Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" — confirm typewriter shows static text, no scroll-reveal motion anywhere.
3. Keyboard pass: Tab through the entire page top to bottom — every interactive element shows a visible focus ring, no dead stops.
4. `npm run build` (runs `vite-react-ssg build`) — must complete with no SSR-time errors (confirms the Phase 0 hooks' `window`/`matchMedia`/`IntersectionObserver` calls are properly guarded inside `useEffect`). Then `npm run preview` and view-source the built `dist/index.html` to confirm sections are actually prerendered (not an empty shell).
5. Lighthouse before/after comparison against the pre-rebuild site — confirm removing the canvas loop + always-on background SVG reduces Total Blocking Time, and the new self-hosted fonts (with preload) don't regress LCP.
6. `npm run lint` — clean, no unused-import fallout.
7. Functional check: Projects filter still swaps cards correctly; Contact form still opens the OS mail client with the subject value included; Resume link path is `/Resume.pdf` (expected 404 until the user supplies the file — flag this to them, not a regression).
8. `grep -r "legacy" src/ --include=*.tsx --include=*.ts -l` — should return nothing (there is no `src/legacy/` in this version of the plan; the old components were deleted outright, not archived — see the Appendix below for their real content instead).

---

## Appendix: Real content reference (verbatim)
**The old component files were deleted outright (no `src/legacy/` archive) — this appendix is now the only record of their real copy/data/logic.** Every phase above that says "read `src/legacy/components/portfolio/X.tsx`" should instead use the corresponding section below. Port this content verbatim; do not rewrite or paraphrase it.

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
Note: the LinkedIn URL shown above (`.../vinal-dsouza-9a9912187`) is already the corrected/canonical one (the live legacy file actually had a different, wrong slug — `.../vinal-dsouza/` — this appendix records the *correct* value to use, matching Footer).

### About.tsx (real content)
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

### Experience.tsx (real content — exact `experiences` data, minus the DAG rendering code which is not being ported)
```ts
const experiences = [
  {
    title: "Graduate Research Apprentice",
    company: "Northeastern University",
    duration: "2025 - Current",
    description: "Assessing Copilot's impact on city operations through surveys and research studies.",
    achievements: ["Conducting monthly studies and interviews"],
    technologies: ["AI Research", "Survey Design", "Data Analysis"],
  },
  {
    title: "Graduate Teaching Assistant & Lead TA",
    company: "Northeastern University",
    duration: "2024 - Current",
    description: "Led TA team managing 80+ students across multiple programming languages.",
    achievements: ["Managed 4-person TA team and conducted labs"],
    technologies: ["Kotlin", "Java", "Python", "Education"],
  },
  {
    title: "Data Eng & Governance Sr. Analyst",
    company: "Accenture",
    duration: "2022 - 2024",
    description: "Automated initiatives across BODS, EDW, and DataStage systems.",
    achievements: ["Saved 70+ FTEs annually through automation"],
    technologies: ["AWS", "Spark", "Databricks", "Python", "SQL", "DataStage"],
  },
  {
    title: "Senior Systems Engineer",
    company: "Infosys",
    duration: "2019 - 2022",
    description: "Migrated legacy COBOL ETL pipelines to DataStage.",
    achievements: ["Migrated 8+ legacy COBOL pipelines, achieved 98% accuracy"],
    technologies: ["DataStage", "COBOL", "ETL", "SQL"],
  },
  {
    title: "Systems Engineer Intern",
    company: "Infosys",
    duration: "2019",
    description: "Built BI solution for grocery sales data using SSIS and SQL.",
    achievements: ["Developed data warehouse with dashboards and reports"],
    technologies: ["SSIS", "SQL", "PowerBI", "Data Warehouse"],
  },
];
```
(Original array order above is oldest-last; the legacy DAG manually re-ordered these into a branching layout — the rebuild just `.map()`s over this array top-to-bottom as authored, no reordering needed.)

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
Filter tabs: "Data Engineering" / "AI/ML" / "Devops and Other" (shadcn `Tabs`), default active tab "Data Engineering". The Facial Similarity Checker card shows a custom inline `ObservableIcon` SVG instead of the GitHub icon (its link is an Observable notebook, not a repo) — check `githubUrl.includes("observablehq.com")` to decide which icon to render. Bottom CTA: "View All Projects on GitHub" → `https://github.com/vinaldsz`.

### Contact.tsx (real content + mailto logic)
- Real email: `dsouza.vi@northeastern.edu`; location: "San Francisco, CA"; availability: "Open to new opportunities" (green dot indicator)
- Heading: "Get In Touch", subheading: "Have a project in mind or want to collaborate? I'd love to hear from you."
- Left column intro: "Let's Connect" / "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
- `handleSubmit` logic (verbatim, keep as-is): builds `mailto:dsouza.vi@northeastern.edu?subject=<Portfolio Contact from {name}>&body=<Name: {name}\nEmail: {email}\n\nMessage:\n{message}>`, sets `window.location.href` to it, then shows a toast `{ title: "Opening email client", description: "Your default email app should open shortly." }`. Form fields today: name, email, message (no subject field — Phase 6 adds one per the plan).

### Navigation.tsx (real content)
- Brand: `Vinal.` (with the period)
- Legacy `navLinks`: About (`#about`), Skills (`#skills`), Projects (`#projects`), Contact (`#contact`) — **Experience was missing**, confirmed bug, Phase 1 adds it.
- CTA button: "Get in Touch" → `#contact`
- No Resume link existed.

### Footer.tsx (real content)
- Brand: `Vinal.`
- Copyright: `© {currentYear} All rights reserved.`
- Socials: GitHub `https://github.com/vinaldsz`, LinkedIn `https://www.linkedin.com/in/vinal-dsouza-9a9912187` (this is the canonical slug — Hero's legacy copy had a different, incorrect one, already corrected in the Hero snippet above).

### BackgroundEffects.tsx (legacy version — being replaced, not ported)
Fixed full-viewport SVG with 5 animated dashed paths (CSS `@keyframes flow`, 10-25s loops) plus two blurred `animate-float` glow orbs, rendered unconditionally regardless of scroll position. This is being replaced with a static gradient per the rebuild — recorded here only so its existence/behavior is documented, not because any of it should be ported.

### index.css / tailwind.config.ts (pre-rebuild values, for reference only — being replaced by Phase 0's new tokens)
Old theme was "Dark Professional Developer Portfolio": `--background: 222 47% 6%`, `--primary: 217 91% 60%` (blue), `--accent: 280 70% 60%` (purple), `--radius: 0.75rem`. No custom `fontFamily` was set (default Tailwind stack). Custom keyframes present: `fade-up`, `fade-in`, `slide-in-left`, `float`, `data-flow`, `data-flow-horizontal`, `flow-path`. These are superseded by Phase 0's new palette — listed here only in case any of the old keyframe utilities turn out to still be referenced by something and need re-adding.
