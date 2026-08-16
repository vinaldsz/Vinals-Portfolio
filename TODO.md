# UI/UX Audit Tracker

## Fixed

- Contact mailto link pointed to placeholder `your@email.com` instead of the real email
- Broken/placeholder project GitHub links (Flight Delay Prediction, Facial Similarity Checker, "View All Projects")
- Facial Similarity Checker card now shows an Observable icon instead of GitHub icon
- Headshot image: 3.5MB/8192x5464px -> 66KB/640x427px, added explicit width/height attrs
- Split the single Suspense boundary in `Index.tsx` into per-section boundaries
- Removed unused `@tanstack/react-query`, `sonner`, `TooltipProvider` from `App.tsx` (verified unused, dead weight)
- Replaced 5MB `react-icons` package with a tiny inline SVG for the one icon needed
- Fixed the `picomatch` high-severity npm vulnerability
- Diagnosed and resolved a hung dev server (stale Vite dependency cache after a suspended process)
- **The 11 items below were resolved by the Phase 0–9 glass rebuild (see `SPEC.md`/`PROGRESS.md`), not fixed individually off this list — recorded here 2026-08-16 during the repo-hygiene pass, once verified against the current codebase:**
  - No favicon → Phase 8 added a full favicon set (`favicon.ico`/`.svg`/32px PNG/apple-touch-icon)
  - No `og:image`/`twitter:image` → Phase 8 added a real 1200×630 share card + full OG/Twitter meta
  - Generic `<title>Vinals Portfolio</title>` → Phase 8 set a real title/description
  - Focus outline removed with no replacement on Experience cards → Phase 7 added `focus-visible` rings sitewide
  - Contact form fields had no `<label>`s → Phase 6 built Contact with real `@radix-ui/react-label` on every field
  - Mobile hamburger button missing `aria-label`/`aria-expanded` → present on `Navigation.tsx`'s hamburger since Phase 1
  - No `<main>` landmark / skip-to-content → Phase 1's shell has exactly one `<main>`; skip-link never added, see Open
  - Animations don't respect `prefers-reduced-motion` → every animating surface gates on `useReducedMotion`/`motion-reduce`, audited in Phase 7
  - Dead code (`PipelineDemo.tsx`, `NavLink.tsx`, `App.css`) → these files don't exist; the whole component tree was re-scaffolded from scratch in Phase 0
  - Stray untracked `vite.config.ts.timestamp-*.mjs` → not present; `.gitignore` already has the pattern
  - `console.error` fires on every 404 hit → current `NotFound.tsx` has no `console.error`
- **Pending decision (Hero fade-in stagger) → moot.** The typewriter/staggered-fade Hero was dropped entirely in Phase 2's redesign (left-aligned, static copy, no stagger).
- **Repo hygiene pass (2026-08-16):** missing `LICENSE` (added, MIT); `README.md`'s 4 contradictions (`shadcn/ui` claim, wrong clone URL, wrong dev port, dead License link) all corrected; `vitest`/`@testing-library`/`jsdom` removed (zero tests existed across 9 phases — dead weight, same rationale as the `react-query`/`sonner` removal above); the two ~300KB project screenshots (`FMCG.png`, `RAG.png`) converted to WebP (~80% smaller, no visible quality loss at their rendered card size); Vercel Analytics wired in.

## Open

- No skip-to-content link (the one item under the old "No `<main>` landmark" bullet that wasn't actually addressed — the landmark exists, the skip-link doesn't).
- **Owner action, not code:** force a LinkedIn Post Inspector re-scrape of the live URL — LinkedIn caches the pre-Phase-8 blank card and won't refresh on its own.
- **Owner action, not code:** the manual browser QA deferred since Phase 7 — visual walk at ~375/768/1440px, keyboard Tab pass, `prefers-reduced-motion` emulation, before/after Lighthouse. Automated gates (tsc/lint/build/prerender) are green; these are real-browser checks only a human can do.
