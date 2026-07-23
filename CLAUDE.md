# CLAUDE.md — how to work in this repo

This is a personal portfolio site (React + Vite + TS, prerendered via `vite-react-ssg`) being rebuilt to a new dark navy/cyan/purple "glass" design across multiple sessions.

## One phase per session
**Each phase is its own session, and each session covers exactly one phase — no more, no less.** Do not start the next phase in the same session that finished one; when a phase is done, stop so the user can open a fresh session for the next.

Within a phase's session, work in two explicit steps:
1. **Plan first.** Read that phase's section in `SPEC.md`, inspect the relevant real content in the Appendix and the current code on disk, then produce a concrete implementation plan for *this phase only* (files to create/change, component structure, how the DoD will be verified) and get the user's approval before writing code.
2. **Then implement.** Build to the approved plan, verify against the phase's "Definition of done", update `PROGRESS.md` in the same commit, and stop.

## Start every session here
1. **Confirm the branch.** All rebuild work happens on `redesign/glass-rebuild`, never `main`. Run `git branch --show-current` before touching a file.
2. **Read `SPEC.md`** — the source of truth for *what* we're building and *why*. It's immutable during implementation; the design, decisions, per-phase instructions, and the verbatim real-content Appendix all live there.
3. **Read `PROGRESS.md`** — the current state: phase checklist, what exists on disk, verified results, and deviations. Identify the one unchecked phase this session will handle.
4. **Plan that phase, get approval, implement it, verify the DoD, then STOP.** One phase per session (see above). Report when done and wait — never roll into the next phase.

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
