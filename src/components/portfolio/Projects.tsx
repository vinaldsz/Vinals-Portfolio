import { Database, Server, Cpu, ArrowRight } from "@/lib/icons";
import type { ComponentType } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

// Owner-supplied curated set (2026-07-23) — 4 projects, verbatim descriptions and
// 3-tag format, replacing the SPEC Appendix's 8-entry array. Filter tabs and the
// ObservableIcon handling are dropped (no tabs, no Observable links). Rendered in
// the "Selected Works" reference layout: an 8/4/4/8 asymmetric grid. See SPEC §Phase 5.
const projects: {
  title: string;
  tags: string[];
  description: string;
  githubUrl: string;
  icon: ComponentType<{ size?: number | string }>;
  // Optional preview screenshot (in public/). When absent, the card falls back to
  // the gradient + category-icon placeholder tile. Path is root-relative.
  image?: string;
}[] = [
  {
    title: "AI PDF Assistant (RAG Service)",
    tags: ["Python", "FastAPI", "pgvector"],
    description:
      "Production-grade RAG pipeline with hybrid dense and sparse retrieval, a hallucination guard that skips the LLM call entirely on out-of-corpus questions, and full request tracing, running at $0/month on free-tier infrastructure.",
    githubUrl: "https://github.com/vinaldsz/ai-pdf-assistant",
    icon: Cpu,
    image: "/projects/RAG.png",
  },
  {
    title: "DataBridge",
    tags: ["Kinesis", "Spark/EMR", "Delta Lake"],
    description:
      "Hybrid batch and streaming data platform on AWS. Ingests purchase events via Kinesis and product catalogs via batch, enforces schema contracts through Glue Schema Registry with drift detection, and routes bad data to an explicit rejection dataset, preserving $136K in unmatched-product revenue for analysis rather than dropping it.",
    githubUrl: "https://github.com/vinaldsz/DataBridge",
    icon: Database,
    image: "/projects/databridge.svg",
  },
  {
    title: "Project 42 — Terraform Smart Context MCP",
    tags: ["TypeScript", "GraphQL", "MCP"],
    description:
      "Parses Terraform state into a queryable dependency graph so AI agents get exactly the infrastructure slice they need instead of raw state, cutting hard-query costs by roughly 6x in benchmark testing across Claude, Gemini, and Codex.",
    githubUrl: "https://github.com/KalharPandya/terraform-smart-context-mcp-42",
    icon: Server,
    image: "/projects/terraform-mcp.svg",
  },
  {
    title: "FMCG Delta Medallion Pipeline",
    tags: ["PySpark", "Databricks", "Delta Lake"],
    description:
      "Automated Bronze → Silver → Gold lakehouse with parallel task execution, incremental and full-load pipelines, and 10+ embedded data quality checks.",
    githubUrl: "https://github.com/vinaldsz/fmcg-delta-medallion-pipeline",
    icon: Database,
    image: "/projects/FMCG.png",
  },
];

// Column spans for the "Selected Works" asymmetric grid: big / small, then small / big.
const spans = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8"];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();
  const Icon = project.icon;

  return (
    <a
      ref={ref}
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — view on GitHub`}
      className={cn(
        "group glass-panel hover-lift block overflow-hidden rounded-xl transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
        spans[index],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      {/* Preview tile: image (cover, top-anchored — crops bottom to fill) when available, else gradient + category icon. Tags overlaid either way. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary/20 via-card to-accent/15">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/25 transition-transform duration-500 group-hover:scale-110">
            <Icon size={72} />
          </div>
        )}
        <ul className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/10 bg-background/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </a>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-px w-10 shrink-0 bg-primary" />
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
            Selected Works
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A selection of data and AI systems I've built end to end — from streaming
            lakehouses to production RAG services.
          </p>
          <a
            href="https://github.com/vinaldsz"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View All on GitHub
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
