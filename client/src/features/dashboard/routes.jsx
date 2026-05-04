import Dashboard from "./pages/Dashboard";

export const dashboardRoutes = [
  {
    path: "dashboard",
    children: [{ index: true, element: <Dashboard />}],
  },
];
