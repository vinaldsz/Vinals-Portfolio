import React from 'react';

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Data Streams Simulation */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            
            <style>
              {`
                @keyframes flow {
                  from { stroke-dashoffset: 1000; }
                  to { stroke-dashoffset: 0; }
                }
                .flow-line {
                  stroke: url(#stream-gradient);
                  stroke-width: 1;
                  stroke-dasharray: 200 400;
                  animation: flow 15s linear infinite;
                }
                .flow-line-slow {
                  animation-duration: 25s;
                }
                .flow-line-fast {
                  animation-duration: 10s;
                  stroke-width: 1.5;
                }
              `}
            </style>
          </defs>

          {/* Network Lines */}
          <path d="M-100 100 C 200 300, 400 -100, 1000 200" className="flow-line flow-line-fast" fill="none" />
          <path d="M-100 400 C 300 200, 600 600, 1200 300" className="flow-line flow-line-slow" fill="none" opacity="0.6" />
          <path d="M0 600 C 400 500, 800 800, 1400 400" className="flow-line" fill="none" opacity="0.8" />
          
          <path d="M1000 -100 C 800 200, 1200 400, 800 800" className="flow-line flow-line-slow" fill="none" opacity="0.5" />
          <path d="M1200 100 C 900 300, 1100 600, 600 900" className="flow-line" fill="none" opacity="0.7" />
        </svg>
      </div>
      
      {/* Existing Floating glow effects from Hero, moved here for consistency */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-float mix-blend-screen" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-float mix-blend-screen"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}
