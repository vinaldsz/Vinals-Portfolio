import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    warmup: {
      clientFiles: [
        "./src/main.tsx",
        "./src/App.tsx",
        "./src/pages/Index.tsx",
        "./src/components/portfolio/Navigation.tsx",
        "./src/components/portfolio/Hero.tsx",
        "./src/components/portfolio/BackgroundEffects.tsx",
      ],
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // React et al are external in the SSR (server) build, so manual
        // chunking — a client-bundle-only optimization — must be skipped there.
        manualChunks: isSsrBuild
          ? undefined
          : {
              // Split rarely-changing vendor code into its own long-cached chunk.
              "react-vendor": ["react", "react-dom", "react-router-dom"],
            },
      },
    },
  },
}));
