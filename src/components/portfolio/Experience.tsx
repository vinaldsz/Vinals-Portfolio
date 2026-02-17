import { useState } from "react";
import { ChevronDown } from "lucide-react";

type ExperienceLevel = "Senior" | "Mid-Level" | "Junior" | "Internship";

const experiences: {
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  level: ExperienceLevel;
}[] = [
  {
    title: "Graduate Research Apprentice",
    company: "Oakland",
    duration: "2025 - Current",
    description:
      "Assessing Copilot's impact on city operations through surveys and research studies.",
    achievements: ["Conducting monthly studies and interviews"],
    technologies: ["AI Research", "Survey Design", "Data Analysis"],
    level: "Senior",
  },
  {
    title: "Graduate Teaching Assistant & Lead TA",
    company: "Oakland Campus",
    duration: "2024 - Current",
    description:
      "Led TA team managing 80+ students across multiple programming languages.",
    achievements: ["Managed 4-person TA team and conducted labs"],
    technologies: ["Kotlin", "Java", "Python", "Education"],
    level: "Senior",
  },
  {
    title: "Data Eng & Governance Sr. Analyst",
    company: "Accenture",
    duration: "2022 - 2024",
    description:
      "Automated initiatives across BODS, EDW, and DataStage systems.",
    achievements: ["Saved 250+ FTEs annually through automation"],
    technologies: ["Python", "SQL", "BODS", "EDW", "DataStage"],
    level: "Senior",
  },
  {
    title: "Senior Systems Engineer",
    company: "Infosys",
    duration: "2019 - 2022",
    description: "Migrated legacy COBOL ETL pipelines to DataStage.",
    achievements: ["Migrated 8+ legacy COBOL pipelines, achieved 98% accuracy"],
    technologies: ["DataStage", "COBOL", "ETL", "SQL"],
    level: "Senior",
  },
  {
    title: "Systems Engineer Intern",
    company: "Retail Analytics",
    duration: "2019",
    description: "Built BI solution for grocery sales data using SSIS and SQL.",
    achievements: ["Developed data warehouse with dashboards and reports"],
    technologies: ["SSIS", "SQL", "PowerBI", "Data Warehouse"],
    level: "Internship",
  },
];

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click to explore each milestone.
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-transparent transform md:-translate-x-1/2"></div>

            {/* Experience items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 -top-2 w-5 h-5 bg-primary rounded-full border-4 border-background transform md:-translate-x-2.5"></div>

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-16 md:w-1/2"
                        : "md:ml-auto md:pl-16 md:w-1/2"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="w-full text-left"
                    >
                      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/40 rounded-lg p-4 hover:bg-primary/20 transition-all hover:shadow-lg cursor-pointer">
                        {/* Minimal view - Year and Title */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-primary font-bold text-sm">
                              {exp.duration}
                            </div>
                            <h3 className="text-lg font-bold mt-1">
                              {exp.title}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-primary transition-transform ${
                              expandedIndex === index ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Expanded view */}
                        {expandedIndex === index && (
                          <div className="mt-4 pt-4 border-t border-primary/30 space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                COMPANY
                              </p>
                              <p className="text-sm font-medium">
                                {exp.company}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                ABOUT
                              </p>
                              <p className="text-sm">{exp.description}</p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                KEY ACHIEVEMENT
                              </p>
                              <p className="text-sm">{exp.achievements[0]}</p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground mb-2">
                                TECHNOLOGIES
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {exp.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
