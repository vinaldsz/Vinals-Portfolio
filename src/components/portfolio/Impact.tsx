import { Timer, Users, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Impact() {
  const metrics = [
    {
      icon: <Timer className="w-6 h-6 text-primary" />,
      value: "30 min → 15 sec",
      label: "Report Optimization",
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      value: "70+",
      label: "FTE Hours Saved",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      value: "10+",
      label: "Automations Delivered",
    },
  ];

  return (
    <section className="relative z-10 -mt-20 pb-20 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="animate-fade-up"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(120,119,198,0.2)] transition-all duration-300 group">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  {metric.icon}
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-gradient tracking-tight mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {metric.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
