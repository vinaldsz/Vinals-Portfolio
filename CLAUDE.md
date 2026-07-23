# CLAUDE.md — how to work in this repo

This is a personal portfolio site (React + Vite + TS, prerendered via `vite-react-ssg`) being rebuilt to a new dark navy/cyan/purple "glass" design across multiple sessions.

## Start every session here
1. **Confirm the branch.** All rebuild work happens on `redesign/glass-rebuild`, never `main`. Run `git branch --show-current` before touching a file.
2. **Read `SPEC.md`** — the source of truth for *what* we're building and *why*. It's immutable during implementation; the design, decisions, per-phase instructions, and the verbatim real-content Appendix all live there.
3. **Read `PROGRESS.md`** — the current state: phase checklist, what exists on disk, verified results, and deviations. Start at the first unchecked phase.
4. **Work one phase at a time and STOP after each.** When a phase's "Definition of done" is met, report to the user and wait — do not roll into the next phase automatically.

## The two-file split (why there are two docs)
- `SPEC.md` = intent. Changes only if *requirements* change, and only deliberately (say so in the commit).
- `PROGRESS.md` = state. Changes every session.
Keeping them apart is the drift-prevention mechanism: progress edits can't corrupt the spec, and a stale checkbox never sits next to the design it contradicts.

## Anti-drift rules (follow these, don't just read them)
1. **Verify, don't trust.** `PROGRESS.md`'s checkboxes and "verified" claims describe past work, not guarantees. At session start, spot-check at least one claim against reality (`git log --oneline -5`, confirm a file it says exists actually exists, re-run the last phase's DoD commands). If reality disagrees, trust reality and fix the doc.
2. **Update `PROGRESS.md` in the SAME commit as the code it describes** — never as a separate follow-up. Ticking a phase's box, recording what was verified, and logging any deviation all land in that phase's implementation commit. This makes git history itself guarantee code and docs match at every commit.
3. **Record deviations immediately, in place** (in `PROGRESS.md`'s "Deviations" section), not as a mental note. If implementation forces a change from what `SPEC.md` said, write down what actually happened and why.
4. **No competing planning artifacts.** No second plan file, scratch TODO, or reliance on conversation memory to track status — a fresh session only has these files.

## Stack facts a session needs immediately
- React 19.2, Vite 8.1, TypeScript ~6.0, Tailwind CSS **v3** (not v4), `vite-react-ssg` ^0.9.2, `react-router-dom` **^6** (not v7 — peer-dep constraint), `oxlint` (not ESLint).
- **No shadcn/ui.** Add specific Radix primitives directly only where a11y justifies it. `cn()` helper is in `src/lib/utils.ts`.
- Design tokens are HSL CSS variables in `src/index.css`, mapped in `tailwind.config.ts`'s `theme.extend.colors` — write `bg-primary`, `text-muted-foreground`, etc.
- Fonts self-hosted in `public/fonts/` (Geist=display, Inter=sans, JetBrains Mono=mono). No Google Fonts `<link>`.
- Commands (all verified working in-session): `npm run dev`, `npm run build` (`vite-react-ssg build`), `npm run lint` (`oxlint`), `npx tsc -b --noEmit`.
- `TODO.md` is a real bug tracker — preserve it. `README.md` still lists "shadcn/ui"; correct that when convenient (no longer accurate).

## Do not
- Merge into or push to `main` — that's an explicit, separate decision for the user once all phases are done and verified.
- Use the mockup's placeholder copy/images/names — always the real content from `SPEC.md`'s Appendix.
- Re-litigate settled decisions in `SPEC.md`'s "Confirmed decisions".
