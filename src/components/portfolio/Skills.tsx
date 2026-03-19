const skillCategories = [
  {
    label: "Data Engineering",
    color: "primary",
    skills: ["Databricks", "Apache Spark", "Delta Lake", "IBM DataStage", "Airflow", "Apache Kafka"],
  },
  {
    label: "Languages & Libraries",
    color: "accent",
    skills: ["Python", "SQL", "Pandas", "NumPy", "JavaScript"],
  },
  {
    label: "Cloud & Infrastructure",
    color: "primary",
    skills: ["AWS S3", "AWS SageMaker", "AWS Lambda", "AWS EMR", "Docker"],
  },
  {
    label: "Databases",
    color: "accent",
    skills: ["PostgreSQL", "Oracle", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Analytics & BI",
    color: "primary",
    skills: ["Power BI", "SSIS", "SSRS", "Matplotlib", "Excel"],
  },
  {
    label: "DevOps & Tools",
    color: "accent",
    skills: ["Git/GitHub", "Autosys", "Tivoli Scheduler", "Bitbucket"],
  },
];

const colorMap: Record<string, { pill: string; label: string; dot: string }> = {
  primary: {
    pill: "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/60",
    label: "text-primary",
    dot: "bg-primary",
  },
  accent: {
    pill: "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/60",
    label: "text-accent",
    dot: "bg-accent",
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills &amp; <span className="text-gradient">Technologies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From pipelines to cloud infrastructure — the full data engineering stack.
            </p>
          </div>

          {/* Category grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => {
              const c = colorMap[cat.color];
              return (
                <div
                  key={cat.label}
                  className="p-5 rounded-xl bg-card border border-white/8 hover:border-white/15 transition-all duration-300"
                >
                  {/* Category label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <h3 className={`text-xs font-bold uppercase tracking-widest ${c.label}`}>
                      {cat.label}
                    </h3>
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 cursor-default ${c.pill}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
