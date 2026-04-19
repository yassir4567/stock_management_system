import CategoriesList from "./pages/CategoriesList";

export const categoryRoutes = [
  {
    path: "categories",
    children: [{ index: true, element: <CategoriesList /> }],
  },
];
