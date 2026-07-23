import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import Index from "./pages/Index";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Outlet />,
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
