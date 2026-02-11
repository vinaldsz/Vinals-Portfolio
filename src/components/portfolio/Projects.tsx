import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "Data Engineering" | "AI/ML";

const projects: { title: string; description: string; image: string; tags: string[]; liveUrl: string; githubUrl: string; category: Category }[] = [
  {
    title: "Real-Time Data Pipeline",
    description: "An end-to-end streaming data pipeline processing millions of events per day with monitoring and alerting.",
    image: "/placeholder.svg",
    tags: ["Apache Kafka", "Spark", "Airflow", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Data Engineering",
  },
  {
    title: "Data Warehouse Platform",
    description: "A modern cloud data warehouse with automated ETL, data quality checks, and self-service analytics.",
    image: "/placeholder.svg",
    tags: ["Snowflake", "dbt", "Python", "Terraform"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Data Engineering",
  },
  {
    title: "Sentiment Analysis Engine",
    description: "An NLP-powered sentiment analysis system for social media monitoring with real-time dashboards.",
    image: "/placeholder.svg",
    tags: ["Python", "HuggingFace", "FastAPI", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    category: "AI/ML",
  },
  {
    title: "Predictive Maintenance Model",
    description: "A machine learning system that predicts equipment failures using sensor data and time-series analysis.",
    image: "/placeholder.svg",
    tags: ["PyTorch", "Scikit-learn", "MLflow", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "AI/ML",
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("Data Engineering");
  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              A selection of my recent work. Each project represents a unique challenge and solution.
            </p>
            <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)} className="w-fit mx-auto">
              <TabsList>
                <TabsTrigger value="Data Engineering">Data Engineering</TabsTrigger>
                <TabsTrigger value="AI/ML">AI/ML</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((project, index) => (
              <div
                key={project.title}
                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-sm"
              >
                {/* Project Image */}
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
