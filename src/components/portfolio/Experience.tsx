import { useState } from "react";
import { ChevronDown, Database, Server, Cpu, Cloud, Network } from "lucide-react";

type ExperienceLevel = "Senior" | "Mid-Level" | "Junior" | "Internship";

const experiences = [
  {
    title: "Graduate Research Apprentice",
    company: "Northeastern University",
    duration: "2025 - Current",
    description: "Assessing Copilot's impact on city operations through surveys and research studies.",
    achievements: ["Conducting monthly studies and interviews"],
    technologies: ["AI Research", "Survey Design", "Data Analysis"],
    level: "Senior",
    icon: Database,
    status: "RUNNING"
  },
  {
    title: "Graduate Teaching Assistant & Lead TA",
    company: "Northeastern University",
    duration: "2024 - Current",
    description: "Led TA team managing 80+ students across multiple programming languages.",
    achievements: ["Managed 4-person TA team and conducted labs"],
    technologies: ["Kotlin", "Java", "Python", "Education"],
    level: "Senior",
    icon: Server,
    status: "RUNNING"
  },
  {
    title: "Data Eng & Governance Sr. Analyst",
    company: "Accenture",
    duration: "2022 - 2024",
    description: "Automated initiatives across BODS, EDW, and DataStage systems.",
    achievements: ["Saved 70+ FTEs annually through automation"],
    technologies: ["AWS", "Spark", "Databricks", "Python", "SQL", "DataStage"],
    level: "Senior",
    icon: Cloud,
    status: "SUCCESS"
  },
  {
    title: "Senior Systems Engineer",
    company: "Infosys",
    duration: "2019 - 2022",
    description: "Migrated legacy COBOL ETL pipelines to DataStage.",
    achievements: ["Migrated 8+ legacy COBOL pipelines, achieved 98% accuracy"],
    technologies: ["DataStage", "COBOL", "ETL", "SQL"],
    level: "Senior",
    icon: Cpu,
    status: "SUCCESS"
  },
  {
    title: "Systems Engineer Intern",
    company: "Infosys",
    duration: "2019",
    description: "Built BI solution for grocery sales data using SSIS and SQL.",
    achievements: ["Developed data warehouse with dashboards and reports"],
    technologies: ["SSIS", "SQL", "PowerBI", "Data Warehouse"],
    level: "Internship",
    icon: Network,
    status: "SUCCESS"
  },
];

// Helper to draw a single Node Card
function DagNode({ exp, isExpanded, onToggle }: { exp: any, isExpanded: boolean, onToggle: () => void }) {
  const Icon = exp.icon;
  const statusColor = exp.status === "RUNNING" ? "text-blue-400" : "text-green-400";
  
  return (
    <div className="w-full md:w-[400px] shrink-0 mx-auto h-full">
      <button
        onClick={onToggle}
        className="w-full text-left relative z-10 block h-full focus:outline-none"
      >
        <div className="bg-card border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] group hover:-translate-y-1 h-full flex flex-col">
          
          {/* Task Node Header */}
          <div className="bg-secondary/80 px-4 py-2 flex items-center justify-between border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                task: {exp.company.toLowerCase().replace(/\s+/g, '_').substring(0, 25)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold tracking-widest flex items-center gap-1.5 ${statusColor}`}>
                {exp.status === "RUNNING" && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>}
                {exp.status === "SUCCESS" && <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>}
                {exp.status}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 relative overflow-hidden flex-1 flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-foreground leading-tight min-h-[56px] pr-4">
                {exp.title}
              </h3>
              <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </div>
            <div className="text-primary font-mono text-sm mb-2">{exp.duration}</div>
            
            {/* Expanded view (Payload details) */}
            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden space-y-4">
                <p className="text-sm text-foreground/80 leading-relaxed font-sans">{exp.description}</p>

                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">{"//"} Execution_Details</p>
                  <p className="text-sm bg-black/30 p-3 rounded font-mono text-green-400/90">{exp.achievements[0]}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">{"//"} Dependencies</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function VerticalConnector({ delay }: { delay: string }) {
  return (
    <div className="w-1.5 md:w-2 h-10 md:h-12 bg-secondary mx-auto relative rounded-full overflow-hidden border border-white/5 my-1">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-primary/80 shadow-[0_0_10px_#6366f1] animate-data-flow" style={{ animationDelay: delay }} />
    </div>
  );
}

function BranchConnectorVertical() {
  return (
    <div className="w-full max-w-[864px] h-24 mx-auto relative hidden md:block overflow-hidden my-1">
       {/* Base branching structure perfectly aligned to 400px cards with gap-16 (64px) */}
       <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 864 100">
         <path d="M 432 0 C 432 50, 200 50, 200 100" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" className="opacity-80" />
         <path d="M 432 0 C 432 50, 664 50, 664 100" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" className="opacity-80" />
         
         <path d="M 432 0 C 432 50, 200 50, 200 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 8" className="animate-flow-path" opacity="0.4" />
         <path d="M 432 0 C 432 50, 664 50, 664 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 8" className="animate-flow-path" opacity="0.4" />
       </svg>
    </div>
  );
}

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Career <span className="text-gradient">Graph</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A vertical directed acyclic graph detailing my technical progression. Click a node to view execution payload.
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden pb-12 pt-8">
         <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-6">
            
            {/* Oldest Role: Intern */}
            <DagNode exp={experiences[4]} isExpanded={expandedIndex === 4} onToggle={() => setExpandedIndex(expandedIndex === 4 ? null : 4)} />
            <VerticalConnector delay="0s" />

            {/* Next Role: Senior Systems Eng */}
            <DagNode exp={experiences[3]} isExpanded={expandedIndex === 3} onToggle={() => setExpandedIndex(expandedIndex === 3 ? null : 3)} />
            <VerticalConnector delay="1s" />

            {/* Next Role: Data Eng Analyst */}
            <DagNode exp={experiences[2]} isExpanded={expandedIndex === 2} onToggle={() => setExpandedIndex(expandedIndex === 2 ? null : 2)} />
            
            {/* Branching SVG (Visible on Desktop) */}
            <BranchConnectorVertical />

            {/* Branching Fallback Connection (Mobile) */}
            <div className="md:hidden">
              <VerticalConnector delay="2s" />
            </div>

            {/* Concurrent Latest Roles (Branch) */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-16 w-full justify-center mt-2 md:mt-0 items-stretch">
               <div className="flex flex-col items-center md:items-start w-full md:w-auto h-full">
                 <DagNode exp={experiences[0]} isExpanded={expandedIndex === 0} onToggle={() => setExpandedIndex(expandedIndex === 0 ? null : 0)} />
               </div>
               
               {/* Small connector for the second branched node on mobile only */}
               <div className="md:hidden flex items-center justify-center">
                 <VerticalConnector delay="0.5s" />
               </div>
               
               <div className="flex flex-col items-center md:items-start w-full md:w-auto h-full">
                 <DagNode exp={experiences[1]} isExpanded={expandedIndex === 1} onToggle={() => setExpandedIndex(expandedIndex === 1 ? null : 1)} />
               </div>
            </div>

         </div>
      </div>
    </section>
  );
}
