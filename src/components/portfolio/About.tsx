import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "I write maintainable, scalable code following best practices.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "I love tackling complex challenges with creative solutions.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and user experience is my priority.",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaboration and clear communication drive great results.",
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
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-secondary rounded-lg border border-border">
                  <span className="text-sm font-medium">5+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Full-Stack Developer & UI/UX Enthusiast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate developer with over 5 years of experience building 
                web applications. I specialize in React, TypeScript, and Node.js, 
                with a keen eye for design and user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge through 
                blog posts and community talks.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
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
