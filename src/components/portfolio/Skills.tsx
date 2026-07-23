import { Database, Cloud, Server, Cpu } from "@/lib/icons";
import type { ComponentType } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

// Owner-supplied proficiency values (2026-07-23) — real self-rated numbers, not
// placeholders. See SPEC §Phase 3.
const competencies = [
  { label: "Data Engineering & Pipeline Architecture (PySpark, Databricks, ETL/ELT)", value: 98 },
  { label: "Cloud Infrastructure (AWS, Terraform)", value: 92 },
  { label: "AI & Agentic Systems (RAG, MCP, LLM tooling)", value: 88 },
];

const badges: { label: string; icon: ComponentType<{ size?: number | string }> }[] = [
  { label: "PySpark / Databricks", icon: Database },
  { label: "AWS / Terraform", icon: Cloud },
  { label: "PostgreSQL / pgvector", icon: Server },
  { label: "MCP / LLM APIs", icon: Cpu },
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

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            {/* Core competencies — proficiency bars */}
            <div className="glass-panel rounded-lg p-6 md:p-8 lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Core Competencies
              </p>
              <ul className="mt-8 space-y-7">
                {competencies.map((c) => (
                  <li key={c.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-sm text-foreground/90">{c.label}</span>
                      <span className="font-mono text-sm font-semibold text-primary">
                        {c.value}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                        style={{ width: isVisible ? `${c.value}%` : "0%" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badge cards */}
            <div className="grid grid-cols-2 gap-6 lg:col-span-5">
              {badges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="glass-panel hover-lift flex flex-col items-center justify-center gap-4 rounded-lg p-6 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/80">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
