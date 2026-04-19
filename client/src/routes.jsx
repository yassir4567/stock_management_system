import { createBrowserRouter } from "react-router-dom";
import HomePage from "./shared/pages/HomePage.jsx";
import { productRoutes } from "./features/products/route.jsx";
import DashboardLayout from "./shared/layouts/DashboardLayout.jsx";
import ProductsList from "./features/products/pages/ProductsList.jsx";
import { categoryRoutes } from "./features/categories/routes.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/a",
    element: <DashboardLayout />,
    children: [...productRoutes, ...categoryRoutes],
  },
]);
