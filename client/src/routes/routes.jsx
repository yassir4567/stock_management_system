import { createBrowserRouter } from "react-router-dom";
import { productRoutes } from "../features/products/route.jsx";
import DashboardLayout from "../shared/layouts/DashboardLayout.jsx";
import ProductsList from "../features/products/pages/ProductsList.jsx";
import { categoryRoutes } from "../features/categories/routes.jsx";
import HomePage from "../features/home/pages/HomePage.jsx";
import { authRoutes } from "../features/auth/route.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/a",
        element: <DashboardLayout />,
        children: [...productRoutes, ...categoryRoutes],
      },
    ],
  },
  ...authRoutes,
]);
