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

## Open

- No favicon
- No `og:image` / `twitter:image` (link previews on LinkedIn/Slack/etc. will be blank)
- Generic `<title>Vinals Portfolio</title>`
- Focus outline removed with no replacement on Experience cards (`focus:outline-none`) - keyboard a11y gap
- Contact form fields have no `<label>`s (placeholder-only) - a11y gap
- Mobile hamburger button missing `aria-label` / `aria-expanded`
- No `<main>` landmark / skip-to-content link
- Animations don't respect `prefers-reduced-motion`
- Dead code: `src/components/portfolio/PipelineDemo.tsx`, `src/components/NavLink.tsx`, `src/App.css`
- Stray untracked `vite.config.ts.timestamp-*.mjs` file in repo root (add `.gitignore` pattern)
- `console.error` fires on every 404 hit (`src/pages/NotFound.tsx`)

## Pending decision

- Hero section fade-in stagger currently takes ~1.25s (delays 0.1s-0.65s across 6 elements). Options discussed: keep as-is, compress delays, or remove entirely. Leaning toward compressing delays per user's "almost instantaneous" goal - awaiting final go-ahead.
