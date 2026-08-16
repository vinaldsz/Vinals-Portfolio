import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { NodeMark } from "@/components/portfolio/NodeMark";

// Owner-supplied verbatim content (2026-07-23), reverse-chronological. Richer than
// the original SPEC Appendix array (new titles, month-level dates, 2 quantified
// bullets/role); `description`/`level`/`icon`/`status` dropped. Tech pills are
// derived from the bullets + real stack. Intern bullets grounded in the SPEC's
// existing SSIS/SQL Server/Power BI grocery-sales BI — no invented metrics.
// See SPEC §Phase 4.
const experiences: {
  title: string;
  company: string;
  duration: string;
  achievements: string[];
  technologies: string[];
}[] = [
  {
    title: "Graduate Research Assistant",
    company: "Northeastern University",
    duration: "Sep 2025 — May 2026",
    achievements: [
      "Ran a structured inter-rater reliability study using Cohen's Kappa and Likert scaling to calibrate human judgment of AI output across 45 government employees.",
      "Embedded with 14+ municipal departments during a live Copilot deployment to diagnose adoption gaps. Findings accepted at PEPR'26, intended to inform municipal AI governance policy.",
    ],
    technologies: ["AI Research", "Cohen's Kappa", "Survey Design", "Data Analysis"],
  },
  {
    title: "Graduate Teaching Assistant & Lead TA",
    company: "Northeastern University",
    duration: "2024 — May 2026",
    achievements: [
      "Led a 4-person TA team supporting 80+ students across multiple programming languages, ensuring zero grading delays throughout the semester.",
      "Provided targeted tutoring that drove an average 2-letter-grade improvement by semester's end.",
    ],
    technologies: ["Kotlin", "Java", "Python", "Education"],
  },
  {
    title: "Senior Data Engineer",
    company: "Accenture",
    duration: "Mar 2022 — Jun 2024",
    achievements: [
      "Rebuilt a commercial loan risk pipeline from a legacy mainframe setup to Databricks on AWS, cutting runtime from 6 hours to 36 minutes on 5M+ daily records with 100% accuracy over a 30-day parallel run.",
      "Built a metadata-driven ingestion accelerator adopted by multiple delivery teams, cutting new-source onboarding from 1 week to 2 days.",
    ],
    technologies: ["Databricks", "AWS", "PySpark", "Python", "SQL"],
  },
  {
    title: "Senior Systems Engineer",
    company: "Infosys",
    duration: "Sep 2019 — Mar 2022",
    achievements: [
      "Migrated 8+ legacy COBOL-based ETL pipelines to IBM DataStage with 98% data accuracy and zero post-migration errors.",
      "Built a configuration-driven egress framework that let a single DataStage job generate unique customer deliverables dynamically, cutting pipeline onboarding from 2 days to 3 hours.",
    ],
    technologies: ["IBM DataStage", "COBOL", "ETL", "SQL"],
  },
  {
    title: "Systems Engineer Intern",
    company: "Infosys",
    duration: "2019",
    achievements: [
      "Built an end-to-end BI solution for grocery sales data, developing SSIS ETL packages to load a SQL Server data warehouse.",
      "Delivered Power BI dashboards and reports that surfaced sales trends for business stakeholders.",
    ],
    technologies: ["SSIS", "SQL Server", "Power BI", "Data Warehouse"],
  },
];

// Education (owner-supplied 2026-08-15) — a compact block, not a standalone
// section/nav entry, per owner choice. Closes the Jun 2024 → Sep 2025 gap the
// experience timeline otherwise leaves unexplained. Rendered as the rail's
// trailing nodes (SPEC §Phase 10), not a separate boxed grid.
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

// The rail node marker: a hollow ring (page-background fill, punches a gap in
// the connecting line behind it) with a filled dot centered inside — the same
// node/edge motif as NodeMark, sized up for the timeline. `accent` distinguishes
// education nodes from role nodes on the same continuous rail.
function RailNode({ accent = false }: { accent?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background",
        accent ? "border-accent/50" : "border-primary/50",
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", accent ? "bg-accent" : "bg-primary")} />
    </span>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={cn(
        "panel hover-lift rounded-xl p-6 transition-all duration-700 motion-reduce:transition-none md:p-8",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            {experience.title}
          </h3>
          <p className="mt-1 font-mono text-sm uppercase tracking-widest text-primary">
            {experience.company}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary">
          {experience.duration}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {experience.achievements.map((achievement) => (
          <li key={achievement} className="flex gap-3 text-muted-foreground">
            <span aria-hidden className="mt-1 shrink-0 text-primary">
              ▹
            </span>
            <span className="leading-relaxed">{achievement}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-foreground/70"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

function EducationRow({ entry }: { entry: (typeof education)[number] }) {
  return (
    <div className="panel flex flex-wrap items-start justify-between gap-3 rounded-lg p-5">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground">{entry.degree}</h3>
        <p className="mt-1 font-mono text-sm uppercase tracking-widest text-accent">
          {entry.institution}
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
        {entry.duration}
      </span>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4">
          <NodeMark />
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
            Professional Experience
          </h2>
        </div>

        {/* Timeline (SPEC §Phase 10): a single rail line runs behind every role
            + education entry, in chronological order, each with its own node —
            replaces 5+2 disconnected cards with one connected structure. The
            rail is purely decorative (aria-hidden); it doesn't carry the
            content, so it's safe for screen readers and reduced-motion (static,
            no animation of its own). */}
        <div className="relative mt-12 space-y-6">
          <span
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-accent/30"
          />

          {experiences.map((experience, index) => (
            <div key={experience.title} className="grid grid-cols-[32px_1fr] gap-4 md:gap-6">
              <RailNode />
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}

          {education.map((entry) => (
            <div key={entry.degree} className="grid grid-cols-[32px_1fr] gap-4 md:gap-6">
              <RailNode accent />
              <EducationRow entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
