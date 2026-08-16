import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

// Owner-supplied grouped technology chips (2026-08-15), replacing the 3
// proficiency bars + 4 badge cards from Phase 3. The percentages were
// unfalsifiable and read as overconfidence; chips name 22 technologies where
// bars+badges named ~8, which matters for recruiter/ATS keyword search. Every
// technology here is one the site already claims in project tags or
// experience bullets — nothing new is asserted. Losing the animated
// fill-on-scroll is an accepted cost. See SPEC §Phase 9.
const groups: { label: string; technologies: string[] }[] = [
  {
    label: "Languages",
    technologies: ["Python", "SQL", "TypeScript", "Java", "Kotlin", "COBOL"],
  },
  {
    label: "Data & Pipelines",
    technologies: ["PySpark", "Databricks", "Delta Lake", "Spark/EMR", "IBM DataStage", "SSIS"],
  },
  {
    label: "Cloud & Infrastructure",
    technologies: ["AWS", "Terraform", "Kinesis", "Glue Schema Registry"],
  },
  {
    label: "AI & Data Stores",
    technologies: ["RAG", "MCP", "LLM APIs", "pgvector", "PostgreSQL", "FastAPI"],
  },
];

export function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="skills" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-10 shrink-0 bg-primary" />
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
              Technical Arsenal
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            From pipelines to cloud infrastructure — the full data engineering stack.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {groups.map((group) => (
              <div key={group.label} className="glass-panel rounded-lg p-6 md:p-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-foreground/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
