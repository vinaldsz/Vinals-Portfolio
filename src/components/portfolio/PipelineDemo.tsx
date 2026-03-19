import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const pipelineStyles = `
  @keyframes flowLeftToRight {
    0% { transform: translateX(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(300%); opacity: 0; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 15px rgba(120, 119, 198, 0.4); }
    50% { box-shadow: 0 0 30px rgba(120, 119, 198, 0.8); }
  }
`;

export function PipelineDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-6 text-muted-foreground hover:text-primary transition-colors gap-2 group">
          <Play fill="currentColor" className="w-4 h-4 group-hover:text-primary transition-colors" />
          View Pipeline Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] border-white/10 bg-background/95 backdrop-blur-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">ETL Pipeline Flow</h2>
          <p className="text-muted-foreground mb-8 text-sm">Automating data ingestion to analytics in seconds.</p>
          {/* Animated Pipeline Visual */}
          <div className="relative h-[200px] flex items-center justify-between w-full mx-auto px-4 max-w-lg">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 -z-10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-1/3 animate-[flowLeftToRight_2s_linear_infinite]" />
            </div>
            {/* Nodes */}
            <PipelineNode title="Extract" icon="S3/API" delay="0s" />
            <PipelineNode title="Transform" icon="Spark" delay="0.5s" active />
            <PipelineNode title="Load" icon="Data Warehouse" delay="1s" />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: pipelineStyles }} />
      </DialogContent>
    </Dialog>
  );
}

function PipelineNode({ title, icon, delay, active = false }: { title: string; icon: string; delay: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-20 h-20 rounded-xl border flex items-center justify-center bg-card z-10 transition-all duration-300
          ${active ? 'border-primary text-primary' : 'border-white/10 text-muted-foreground'}
        `}
        style={active ? { animation: "pulse-glow 2s infinite" } : {}}
      >
        <span className="font-semibold text-xs tracking-wider">{icon}</span>
      </div>
      <span className={`font-medium text-sm ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {title}
      </span>
    </div>
  );
}