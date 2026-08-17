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
    duration: "Jan 2019 — Apr 2019",
    achievements: [
      "Built an end-to-end BI solution for grocery sales data, developing SSIS ETL packages to load a SQL Server data warehouse.",
      "Delivered Power BI dashboards and reports that surfaced sales trends for business stakeholders.",
    ],
    technologies: ["SSIS", "SQL Server", "Power BI", "Data Warehouse"],
  },
];

// Single column, aggressively tightened (SPEC §Phase 10, 2026-08-16 fourth
// revision — supersedes the 2-column grid). Education moved out entirely
// into its own component/section (see Education.tsx). Date still renders
// inline with company rather than a fixed-width column — that's what
// stopped "Sep 2025 — May 2026" from wrapping in the 2-column attempt, and
// the same reasoning applies to a narrow single column.
function ExperienceRow({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-2 py-8 transition-all duration-700 motion-reduce:transition-none md:grid-cols-[160px_1fr] md:gap-8",
        !isLast && "border-b border-border/40",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
    >
      {/* Rail column (owner reference, 2026-08-16): index + date move out of the
          title line into their own column, same text sizes as before — a
          layout restructure, not a type-scale change. */}
      <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
        <span className="font-mono text-xs text-muted-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wide text-muted-foreground">
          {experience.duration}
        </span>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-foreground">{experience.title}</h3>
        <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-primary">
          {experience.company}
        </p>

        <ul className="mt-2.5 space-y-1.5">
          {experience.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-2 text-sm text-muted-foreground">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span className="leading-snug">{achievement}</span>
            </li>
          ))}
        </ul>

        <p className="mt-2 font-mono text-[11px] text-muted-foreground/50">
          {experience.technologies.join(" · ")}
        </p>
      </div>
    </article>
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

        <div className="mt-12 border-y border-border/40">
          {experiences.map((experience, index) => (
            <ExperienceRow
              key={experience.title}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
