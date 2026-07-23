# Portfolio rebuild — PROGRESS (current state, updated every session)

> **This file tracks WHERE WE ARE. Update it in the SAME commit as the code it
> describes** (see `CLAUDE.md` rule). Requirements/design live in `SPEC.md` and
> are not edited here. Checkboxes and deviations are claims about past work —
> verify against actual repo state before trusting them (`CLAUDE.md` rule 1).

## Phase status
- [x] Phase 0 — Re-scaffold from scratch + foundation (tokens, fonts, shared hooks/utilities)
- [x] Phase 1 — Shell: Navigation + Footer + `Index.tsx` (empty section placeholders) — code complete; **`npm run build`/prerender NOT verified in-session (sandbox deadlock — see Deviations); pending verification in the user's real environment.**
- [ ] Phase 2 — Hero + BackgroundEffects
- [ ] Phase 3 — About + Skills
- [ ] Phase 4 — Experience
- [ ] Phase 5 — Projects
- [ ] Phase 6 — Contact
- [ ] Phase 7 — Final integration pass (a11y, reduced motion, perf, build/prerender verification)

## Current state / next step
- On branch `redesign/glass-rebuild`.
- Phase 1 code complete. **Next: Phase 2** (Hero + BackgroundEffects).
- `src/App.tsx` now imports `src/pages/Index.tsx` eagerly (the `IndexStub` is gone); NotFound stays lazy.
- **Action carried into the next session: run `npm run build && npm run preview` in a real environment to confirm the prerender pass succeeds (blocked in the agent sandbox this session — see Deviations).**

## What actually exists on disk right now (Phase 0 + Phase 1 output)
- Configs: `package.json`, `vite.config.ts`, `tsconfig.json` + `tsconfig.app.json` (with `@/*` path) + `tsconfig.node.json`, `postcss.config.js`, `tailwind.config.ts`, `.oxlintrc.json`, `index.html` (font preloads + dark-navy `#app-loader`).
- Entry: `src/main.tsx` (ViteReactSSG), `src/App.tsx` (eager `Index` route + lazy NotFound; `Layout` inlined to `<Outlet />`), `src/pages/NotFound.tsx` (no `console.error`).
- Foundation: `src/index.css` (font-faces, `:root`/`.dark` tokens, utilities, `.glass-panel`/`.hover-lift`), `src/lib/utils.ts` (`cn`), `src/hooks/use-reduced-motion.ts`, `src/hooks/use-scroll-reveal.ts`.
- **Phase 1 shell (new):** `src/pages/Index.tsx` (Nav + `<main>` with 6 empty `<section id>` stubs + Footer + BackToTop), `src/components/ui/button.tsx` (cva + Radix Slot `asChild`; exports `Button` + `buttonVariants`), `src/components/portfolio/Navigation.tsx`, `src/components/portfolio/Footer.tsx`, `src/components/portfolio/BackToTop.tsx`.
- Assets: `public/fonts/{Geist,Inter,JetBrainsMono}-Variable.woff2`, `public/ProfessionalHeadshot.jpeg`, `public/placeholder.svg`, `public/robots.txt`.
- Docs kept: `SPEC.md`, `PROGRESS.md`, `CLAUDE.md`, `README.md`, `TODO.md`.

## Phase 0 verification (what was actually checked)
- `npx tsc -b --noEmit` → clean, exit 0.
- `npx oxlint` → exit 0. Known-harmless warnings: 2 `react-refresh/only-export-components` on the temporary `App.tsx` stub (resolved when Phase 1 splits out `IndexStub`), 1 `exhaustive-deps` on `use-scroll-reveal.ts`'s intentionally-omitted `options` dependency.
- `npm run build` (`vite-react-ssg build`) → both client + SSR passes succeed in <1s, prerendered `dist/index.html` generated.
- `npm run dev` → verified via curl: `/` (full HTML + meta + loader), `/src/main.tsx` (real transformed JS), `/src/index.css` (compiled Tailwind with the new HSL tokens + 3 `@font-face` rules, no PostCSS errors). `.glass-panel`/`.hover-lift` are purged out until a component references them — expected, not a bug.

## Phase 1 verification (what was actually checked)
- `npx tsc --noEmit -p tsconfig.app.json` → clean, exit 0.
- `npm run lint` (`oxlint`) → exit 0. Remaining warnings are harmless: 1 `react/only-export-components` on `button.tsx` (the `buttonVariants` export — canonical Button pattern), 1 `exhaustive-deps` on `use-scroll-reveal.ts` (pre-existing, from Phase 0). The Phase-0 `App.tsx` `only-export-components` warnings are gone (stub removed + `Layout` inlined).
- `npm run dev` → verified via curl: `/` serves HTTP 200 with correct `<title>`/meta/`#app-loader`; all six new/changed modules (`Index.tsx`, `Navigation.tsx`, `Footer.tsx`, `BackToTop.tsx`, `button.tsx`, `App.tsx`) transform without error (HTTP 200); compiled `/src/index.css` now emits `.glass-panel`, `.text-gradient`, `.bg-gradient-primary`, `.glow-sm` (referenced by the new components) plus the 3 `@font-face` rules. `.hover-lift` still purged (no Phase-1 component uses it yet — expected).
- **NOT verified in-session: `npm run build` / prerender / `npm run preview`** — see Deviations (sandbox build deadlock). Code is SSR-safe by construction (all `window`/scroll/`matchMedia` access is inside `useEffect`; `Footer` uses `new Date()` which is SSR-safe), so prerender is expected to pass in a real environment.

## Deviations from SPEC (recorded in place, per CLAUDE.md rule 3)
- **Phase 1: shared `Button` created this phase, not deferred.** `src/components/ui/button.tsx` (cva variants `default`/`outline`/`ghost` + Radix `Slot` `asChild`) was built now (user-approved) so Nav uses it immediately and Hero reuses it in Phase 2. All deps were already installed. Not a departure from intent — SPEC allows adding specific primitives where justified — recorded for traceability.
- **Phase 1: eager-Hero / lazy-below-fold `Suspense` scaffold deferred.** SPEC §Phase 1 says carry the legacy `Index.tsx` Suspense pattern "verbatim", but the legacy `Index.tsx`/`BackToTop` were deleted and are NOT in the Appendix, and there are no real section components to lazy-load yet. `Index.tsx` currently renders 6 plain `<section id>` stubs directly; the lazy/`Suspense` wiring will be added incrementally as Phases 2–6 drop in each real component. `BackToTop` was reconstructed fresh (scroll-visibility + `useReducedMotion`-gated smooth scroll), not carried verbatim.
- **Phase 1: `npm run build`/prerender could NOT be verified in the agent sandbox.** `vite-react-ssg build` (and even a plain `vite build`) deadlocks at the rolldown "transforming…" step and never writes `dist/` — the esbuild/rolldown hang below. Verification is deferred to the user's real environment (`npm run build && npm run preview`, then view-source `dist/index.html` to confirm nav/footer/stubs prerender with no SSR errors).
- **`react-router-dom` pinned to `^6.30.1`, not v7.** `vite-react-ssg@0.9.2` peer-depends on `^6.14.1`; installing v7 caused an `ERESOLVE` conflict.
- **`vite.config.ts` `manualChunks` is a function, not an object literal.** The object form fails to type-check against this Vite/Rollup version's `ManualChunksOption`; the function returns `"react-vendor"` for react/react-dom/react-router-dom module ids.
- **`tsconfig.app.json` uses `paths` without `baseUrl`.** `baseUrl` is deprecated under `moduleResolution: "bundler"` in TS ~6.0; `paths` alone resolves the `@/*` alias.

## Environment note — PARTIALLY resolved (corrected in Phase 1, per anti-drift rule 1)
An earlier attempt on the old Vite 5 / ESLint 9 toolchain had `npm run dev`/`build`/`lint` hang indefinitely in the agent sandbox (esbuild's long-lived "service" subprocess deadlocked on its stdin/stdout pipe handshake). The Vite 8 (rolldown) + `oxlint` re-scaffold fixed **`lint` and `dev`** — both run and are verifiable via curl in an agent session (Phase 1 confirmed `dev` again after a clean `node_modules/.vite` wipe + clean process state).

**However, `npm run build` / `vite-react-ssg build` still deadlocks in the agent sandbox** (Phase 1 finding — the earlier "all three commands work" claim was too broad). Symptom: a plain `vite build` prints `building client environment for production… transforming…` and then stalls indefinitely, never emitting `dist/`; the `vite-react-ssg` wrapper produces no output at all. It appears to be the same rolldown/esbuild native-transform hang, and is aggravated by stray stopped (`state T`) esbuild/vite processes from killed prior runs (force-kill `pkill -9 -f "Vinals-Portfolio/node_modules"` + `esbuild`/`rolldown` between attempts). **Build/prerender verification must be done in a real (non-sandbox) environment** for now — this is a live limitation again, not resolved.

## History note
An earlier `Plan.md` combined spec + progress in one file; it was split into `SPEC.md` / `PROGRESS.md` / `CLAUDE.md` to stop drift. The pre-split external plan at `~/.claude/plans/doctype-html-html-lang-en-class-dark-crystalline-quilt.md` is stale and superseded — ignore it.
