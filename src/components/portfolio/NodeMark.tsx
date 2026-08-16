// Signature motif (SPEC §Phase 10): a node + edge mark, replacing the plain
// tick (`<span className="h-px w-10 bg-primary" />`) that used to precede
// every section heading. Reused as-is on Skills/Projects/Experience/Contact —
// one recurring idea instead of generic glow/glass, tied to the actual
// subject matter (pipelines, graphs, structured data flow). Purely
// decorative (aria-hidden); no JS, no animation, zero perf cost.
export function NodeMark() {
  return (
    <span aria-hidden className="flex shrink-0 items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--glow)/0.6)]" />
      <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
    </span>
  );
}
