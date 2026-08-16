import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";

export const routes: RouteRecord[] = [
  {
    path: "/",
    // <Analytics /> mounts once across every route. It's SSR-safe by design
    // (no-ops during prerender, only does anything in a real browser) — added
    // as part of the repo-hygiene pass (2026-08-16), see SPEC/PROGRESS.
    element: (
      <>
        <Outlet />
        <Analytics />
      </>
    ),
    children: [
      // Landing page is eager: guarantees prerender captures it and avoids a loader
      // flash above the fold. NotFound stays lazy (rarely hit).
      { index: true, Component: Index },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", lazy: () => import("./pages/NotFound").then((m) => ({ Component: m.default })) },
    ],
  },
];

export default routes;
