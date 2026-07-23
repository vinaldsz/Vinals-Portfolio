// Static background layer: layered radial gradients from the primary/accent
// tokens at low opacity over the base background. No keyframes, no JS, no SVG
// flow-lines, no animated orbs — nothing repaints (replaces the legacy always-on
// animated SVG). Rendered once, fixed behind all content.
export function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
      style={{
        backgroundImage: [
          "radial-gradient(60% 50% at 20% 15%, hsl(var(--primary) / 0.10), transparent 70%)",
          "radial-gradient(55% 50% at 85% 85%, hsl(var(--accent) / 0.10), transparent 70%)",
          "radial-gradient(45% 40% at 50% 50%, hsl(var(--accent) / 0.04), transparent 75%)",
        ].join(", "),
      }}
    />
  );
}
