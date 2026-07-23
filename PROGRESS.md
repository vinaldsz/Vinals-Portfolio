# Portfolio rebuild — PROGRESS (current state, updated every session)

> **This file tracks WHERE WE ARE. Update it in the SAME commit as the code it
> describes** (see `CLAUDE.md` rule). Requirements/design live in `SPEC.md` and
> are not edited here. Checkboxes and deviations are claims about past work —
> verify against actual repo state before trusting them (`CLAUDE.md` rule 1).

## Phase status
- [x] Phase 0 — Re-scaffold from scratch + foundation (tokens, fonts, shared hooks/utilities)
- [ ] Phase 1 — Shell: Navigation + Footer + `Index.tsx` (empty section placeholders)
- [ ] Phase 2 — Hero + BackgroundEffects
- [ ] Phase 3 — About + Skills
- [ ] Phase 4 — Experience
- [ ] Phase 5 — Projects
- [ ] Phase 6 — Contact
- [ ] Phase 7 — Final integration pass (a11y, reduced motion, perf, build/prerender verification)

## Current state / next step
- On branch `redesign/glass-rebuild`.
- Phase 0 complete and verified in-session. **Next: Phase 1** (Navigation + Footer + `Index.tsx` shell with empty section stubs).
- `src/App.tsx` currently holds a temporary `IndexStub` route (a blank `min-h-screen` div). Phase 1 replaces it by wiring `src/pages/Index.tsx`.

## What actually exists on disk right now (Phase 0 output)
- Configs: `package.json`, `vite.config.ts`, `tsconfig.json` + `tsconfig.app.json` (with `@/*` path) + `tsconfig.node.json`, `postcss.config.js`, `tailwind.config.ts`, `.oxlintrc.json`, `index.html` (font preloads + dark-navy `#app-loader`).
- Entry: `src/main.tsx` (ViteReactSSG), `src/App.tsx` (route stub), `src/pages/NotFound.tsx` (no `console.error`).
- Foundation: `src/index.css` (font-faces, `:root`/`.dark` tokens, utilities, `.glass-panel`/`.hover-lift`), `src/lib/utils.ts` (`cn`), `src/hooks/use-reduced-motion.ts`, `src/hooks/use-scroll-reveal.ts`.
- Assets: `public/fonts/{Geist,Inter,JetBrainsMono}-Variable.woff2`, `public/ProfessionalHeadshot.jpeg`, `public/placeholder.svg`, `public/robots.txt`.
- Docs kept: `SPEC.md`, `PROGRESS.md`, `CLAUDE.md`, `README.md`, `TODO.md`.

## Phase 0 verification (what was actually checked)
- `npx tsc -b --noEmit` → clean, exit 0.
- `npx oxlint` → exit 0. Known-harmless warnings: 2 `react-refresh/only-export-components` on the temporary `App.tsx` stub (resolved when Phase 1 splits out `IndexStub`), 1 `exhaustive-deps` on `use-scroll-reveal.ts`'s intentionally-omitted `options` dependency.
- `npm run build` (`vite-react-ssg build`) → both client + SSR passes succeed in <1s, prerendered `dist/index.html` generated.
- `npm run dev` → verified via curl: `/` (full HTML + meta + loader), `/src/main.tsx` (real transformed JS), `/src/index.css` (compiled Tailwind with the new HSL tokens + 3 `@font-face` rules, no PostCSS errors). `.glass-panel`/`.hover-lift` are purged out until a component references them — expected, not a bug.

## Deviations from SPEC (recorded in place, per CLAUDE.md rule 3)
- **`react-router-dom` pinned to `^6.30.1`, not v7.** `vite-react-ssg@0.9.2` peer-depends on `^6.14.1`; installing v7 caused an `ERESOLVE` conflict.
- **`vite.config.ts` `manualChunks` is a function, not an object literal.** The object form fails to type-check against this Vite/Rollup version's `ManualChunksOption`; the function returns `"react-vendor"` for react/react-dom/react-router-dom module ids.
- **`tsconfig.app.json` uses `paths` without `baseUrl`.** `baseUrl` is deprecated under `moduleResolution: "bundler"` in TS ~6.0; `paths` alone resolves the `@/*` alias.

## Environment note — RESOLVED by the full re-scaffold
An earlier attempt on the old Vite 5 / ESLint 9 toolchain had `npm run dev`/`build`/`lint` hang indefinitely in the agent sandbox (esbuild's long-lived "service" subprocess deadlocked on its stdin/stdout pipe handshake). The Vite 8 (rolldown/Rust bundler) + `oxlint` re-scaffold fixed this — all three commands now run and are verifiable directly in an agent session via curl. Not a limitation anymore.

## History note
An earlier `Plan.md` combined spec + progress in one file; it was split into `SPEC.md` / `PROGRESS.md` / `CLAUDE.md` to stop drift. The pre-split external plan at `~/.claude/plans/doctype-html-html-lang-en-class-dark-crystalline-quilt.md` is stale and superseded — ignore it.
