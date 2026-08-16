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

// Education (owner-supplied 2026-08-15) — a compact block, not a
// nav-linked/top-level section (that call stands from Phase 9). Rendered as
// its own labeled block below the roles grid (Phase 10 compacting pass,
// 2026-08-16) — visually separate from the numbered jobs, not folded into
// the same list.
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

// Compact 2-column grid (SPEC §Phase 10 compacting pass, 2026-08-16) —
// supersedes the single-column divided list. All 5 roles fit in roughly a
// third of the previous height, close to one viewport. Date renders inline
// with the company name (not confined to a narrow fixed column) specifically
// so a long range like "Sep 2025 — May 2026" never wraps. No card, no glass,
// no rail/node — a hairline border per cell is the only separator.
function ExperienceCell({
  experience,
  index,
  isLastRow,
}: {
  experience: (typeof experiences)[number];
  index: number;
  isLastRow: boolean;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const isRightColumn = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={cn(
        "py-6 transition-all duration-700 motion-reduce:transition-none",
        !isLastRow && "border-b border-border/40",
        isRightColumn ? "md:border-l md:pl-8" : "md:pr-8",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
    >
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-xs text-muted-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground">
          {experience.title}
        </h3>
      </div>
      <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-primary">
        {experience.company} · {experience.duration}
      </p>

      <ul className="mt-3 space-y-1.5">
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
    </article>
  );
}

export function Experience() {
  const rows = Math.ceil(experiences.length / 2);
  const lastRowStart = (rows - 1) * 2;

  return (
    <section id="experience" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4">
          <NodeMark />
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
            Professional Experience
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 border-y border-border/40 md:grid-cols-2">
          {experiences.map((experience, index) => (
            <ExperienceCell
              key={experience.title}
              experience={experience}
              index={index}
              isLastRow={index >= lastRowStart}
            />
          ))}
        </div>

        {/* Education: its own labeled block, separate from the numbered jobs
            grid above (not a nav-linked section — see Phase 9). */}
        <div className="mt-12 border-t border-border/40 pt-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Education
          </p>
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {education.map((entry) => (
              <div key={entry.degree}>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {entry.degree}
                </h3>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-accent">
                  {entry.institution} · {entry.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
