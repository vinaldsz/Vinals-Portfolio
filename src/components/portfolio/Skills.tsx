const skillCategories = [
  {
    title: "Core Data Engineering",
    skills: [
      { name: "Databricks", level: 95 },
      { name: "Apache Spark", level: 90 },
      { name: "Delta Lake", level: 85 },
      { name: "IBM DataStage", level: 85 },
      { name: "Airflow", level: 80 },
    ],
  },
  {
    title: "Languages & Libraries",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 95 },
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS SageMaker", level: 90 },
      { name: "AWS S3", level: 95 },
      { name: "AWS Lambda", level: 85 },
      { name: "AWS EMR", level: 85 },
      { name: "Docker", level: 85 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "Oracle", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 75 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    title: "Analytics & BI",
    skills: [
      { name: "Power BI", level: 90 },
      { name: "SSIS", level: 85 },
      { name: "SSRS", level: 85 },
      { name: "Matplotlib", level: 80 },
      { name: "Excel", level: 90 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git/GitHub", level: 95 },
      { name: "Apache Kafka", level: 80 },
      { name: "Autosys", level: 85 },
      { name: "Tivoli Scheduler", level: 80 },
      { name: "Bitbucket", level: 85 },
    ],
  },
];

const techIcons = [
  "Databricks",
  "Apache Spark",
  "Python",
  "SQL",
  "AWS",
  "SageMaker",
  "PostgreSQL",
  "Power BI",
  "Pandas",
  "Docker",
  "Git/GitHub",
  "Delta Lake",
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>

          {/* Tech Icons Strip */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {techIcons.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full bg-secondary border border-border hover:border-primary/50 hover:glow-sm transition-all duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>

          {/* Skill Bars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="text-xl font-semibold mb-6 text-gradient">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
