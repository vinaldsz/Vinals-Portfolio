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
// experience list otherwise leaves unexplained. Continues the same divided
// list below an in-line "Education" label row (SPEC §Phase 10 revision).
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

// Plain divided-list row (SPEC §Phase 10 revision, 2026-08-16): no card, no
// glass, no rail/node — a numbered-index + date column and a content column,
// separated by the shared `divide-y` on the parent. Matches Skills' Option A
// row pattern so the two sections read as one system. Reworked after the
// owner pointed to https://www.abhishektuteja.com as a minimalism reference
// (structure only — its light/serif look was explicitly not what was wanted).
function ExperienceRow({
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
        "grid grid-cols-1 gap-x-8 gap-y-3 py-10 transition-all duration-700 motion-reduce:transition-none md:grid-cols-[140px_1fr]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      <div>
        <p className="font-mono text-xs text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {experience.duration}
        </p>
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          {experience.title}
        </h3>
        <p className="mt-1 font-mono text-sm uppercase tracking-widest text-primary">
          {experience.company}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3 text-muted-foreground">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{achievement}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 font-mono text-xs text-muted-foreground/60">
          {experience.technologies.join(" · ")}
        </p>
      </div>
    </article>
  );
}

function EducationRow({ entry }: { entry: (typeof education)[number] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-2 py-8 md:grid-cols-[140px_1fr]">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {entry.duration}
      </p>
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">{entry.degree}</h3>
        <p className="mt-1 font-mono text-sm uppercase tracking-widest text-accent">
          {entry.institution}
        </p>
      </div>
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

        <div className="mt-12 divide-y divide-border/40 border-y border-border/40">
          {experiences.map((experience, index) => (
            <ExperienceRow key={experience.title} experience={experience} index={index} />
          ))}

          {/* In-line label row, not a separate boxed grid (SPEC §Phase 10
              revision) — continues the same divided list, explicitly naming
              the transition from roles to degrees. */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[140px_1fr]">
            <div />
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Education
            </p>
          </div>

          {education.map((entry) => (
            <EducationRow key={entry.degree} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
