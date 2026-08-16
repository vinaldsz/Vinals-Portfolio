import { NodeMark } from "@/components/portfolio/NodeMark";

// Education (owner-supplied 2026-08-15) — moved into its own component and
// section (SPEC §Phase 10, 2026-08-16 third revision) after being tried as
// a rail's trailing nodes, then an in-line label row inside Experience, then
// a separate labeled block still inside Experience. The owner asked for it
// to be a genuinely separate section, same visual weight as every other
// section (NodeMark + h2 heading). Still not nav-linked — that call stands
// from Phase 9 (a compact block, not a standalone nav entry).
const education: { degree: string; institution: string; duration: string }[] = [
  {
    degree: "M.S. Computer Science",
    institution: "Northeastern University",
    duration: "Sep 2024 — May 2026",
  },
  {
    degree: "B.E. Information Technology",
    institution: "NMAM Institute of Technology",
    duration: "2019",
  },
];

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4">
          <NodeMark />
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
            Education
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {education.map((entry) => (
            <div key={entry.degree}>
              <h3 className="font-display text-xl font-bold text-foreground">{entry.degree}</h3>
              <p className="mt-1 font-mono text-sm uppercase tracking-widest text-accent">
                {entry.institution} · {entry.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
