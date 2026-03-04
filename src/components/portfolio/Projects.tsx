import { useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "Data Engineering" | "AI/ML" | "Devops and Other";

const projects: {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  category: Category;
}[] = [
  {
    title: "FMCG Delta Medallion Pipeline",
    description:
      "Built a 3-layer medallion lakehouse (Bronze/Silver/Gold) with Databricks workflows, automated quality checks, and alerting to improve pipeline reliability and monitoring coverage.",
    tags: ["Databricks", "PySpark", "SQL", "AWS", "Delta Lake"],
    githubUrl: "https://github.com/vinaldsz",
    category: "Data Engineering",
  },
  {
    title: "Flight Delay Prediction",
    description:
      "Trained an XGBoost model on 580K+ flight records and improved weather-delay detection from 0.2% to 11.6% using robust feature engineering and production-style ML pipelines on SageMaker.",
    tags: ["AWS SageMaker", "Numpy", "Pandas", "scikit-learn"],
    githubUrl: "https://github.com/yourusername/analytics-dashboard",
    category: "AI/ML",
  },
  {
    title: "Walmart Sales Forecasting",
    description:
      "Forecasted weekly store-level sales from multi-store historical data and surfaced trend signals that support faster demand-planning decisions.",
    tags: ["Python", "Numpy", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/vinaldsz/Walmart_Sales_Forecasting.git",
    category: "Data Engineering",
  },
  {
    title: "Facial Similarity Checker",
    description:
      "Built a face embedding workflow with face-api.js to compute parent-child similarity scores and deliver fast, interactive visual comparisons.",
    tags: ["Observable Notebook", "face-api.js"],
    githubUrl: "#",
    category: "AI/ML",
  },
  {
    title: "AI PDF Assistant",
    description:
      "Built a RAG assistant that indexes PDFs into pgvector and returns grounded answers through Phi agents, exposed via 3 interfaces: CLI, REST API, and Streamlit app.",
    tags: [
      "Python",
      "Phi",
      "pgvector",
      "PostgreSQL",
      "Groq",
      "Google APIs",
      "Streamlit",
    ],
    githubUrl: "https://github.com/vinaldsz/ai-pdf-assistant.git",
    category: "AI/ML",
  },
  {
    title: "Microservices & CI/CD Pipeline",
    description:
      "Containerized backend services on ECS Fargate with autoscaling and blue-green releases through CodePipeline to reduce deployment risk and improve release reliability.",
    tags: ["Node.js", "Docker", "AWS ECS Fargate", "CodePipeline"],
    githubUrl:
      "https://www.credly.com/badges/a4b38d72-6265-4eef-8d8a-cf70bfe2d8ab/public_url",
    category: "Devops and Other",
  },
  {
    title: "Distributed Systems Scalability Portfolio",
    description:
      "Scaled cloud-native services with Terraform, ECS Fargate, and ALB autoscaling, then benchmarked latency-throughput trade-offs under burst traffic to guide API and infra tuning.",
    tags: ["Go", "Terraform", "AWS ECS", "ALB", "CloudWatch"],
    githubUrl: "https://github.com/vinaldsz/scalable-distributed-systems.git",
    category: "Devops and Other",
  },
  {
    title: "TinyThreads",
    description:
      "Shipped an end-to-end marketplace to production with Next.js, MongoDB, and S3-backed media, including CI/CD automation, OAuth authentication, and tested REST APIs.",
    tags: [
      "Next.js",
      "React",
      "MongoDB",
      "AWS S3",
      "GitHub Actions",
      "REST APIs",
      "NextAuth",
      "Jest",
      "React Testing Library",
    ],
    githubUrl: "https://github.com/vinaldsz/TinyThreads.git",
    liveUrl: "",
    category: "Devops and Other",
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Data Engineering");
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
              A selection of my recent work. Each project represents a unique
              challenge and solution.
            </p>
            <Tabs
              value={activeCategory}
              onValueChange={(v) => setActiveCategory(v as Category)}
              className="w-fit mx-auto"
            >
              <TabsList>
                <TabsTrigger value="Data Engineering">
                  Data Engineering
                </TabsTrigger>
                <TabsTrigger value="AI/ML">AI/ML</TabsTrigger>
                <TabsTrigger value="Devops and Other">
                  Devops and Other
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-8 flex-nowrap overflow-x-auto pb-4">
            {filtered.map((project) => (
              <div
                key={project.title}
                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-sm min-w-[350px] flex flex-col"
              >
                {/* Project Info */}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
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
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button asChild variant="ghost" size="sm">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
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
