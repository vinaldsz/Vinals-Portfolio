import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";

function Layout() {
  return <Outlet />;
}

// TEMPORARY (Phase 0 stub): src/pages/Index.tsx is rebuilt in Phase 1.
function IndexStub() {
  return <div style={{ minHeight: "100vh" }} />;
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, Component: IndexStub },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", lazy: () => import("./pages/NotFound").then((m) => ({ Component: m.default })) },
    ],
  },
];

export default routes;
