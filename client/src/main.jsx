import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
