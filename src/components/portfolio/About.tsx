import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "I build things that the next engineer can actually understand and maintain.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description:
      "I dig into root causes. Whether it's a broken pipeline or a data mismatch no one noticed yet.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "If it can be faster or lighter, I'll find a way to make it so.",
  },
  {
    icon: Users,
    title: "Team Player",
    description:
      "I've worked across regions and business units. Good communication is half the job.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get to know me and what drives my passion for development.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Avatar/Image placeholder */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-primary p-1 glow">
                  <img
                    src="/ProfessionalHeadshot.jpeg"
                    alt="Vinal D'Souza"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-secondary rounded-lg border border-border">
                  <span className="text-sm font-medium">
                    5+ Years Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Data Engineer & AI Enthusiast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From COBOL to Databricks, I've seen data at every stage of its
                evolution
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've spent 5+ years building data pipelines that teams actually
                rely on. From migrating legacy COBOL workflows to designing
                modern pipelines on Databricks and AWS that process millions of
                records daily, I've worked across the full spectrum of data
                engineering. I've led teams, been the go-to person for
                production issues, and driven modernization projects that made a
                real difference. These days I'm at Northeastern, deepening my
                knowledge and exploring where data engineering meets AI.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
