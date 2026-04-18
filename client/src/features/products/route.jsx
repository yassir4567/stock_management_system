import ProductsList from "./pages/ProductsList";

export const productRoutes = [
  {
    path: "products",
    children: [{ index: true, element: <ProductsList /> }],
  },
];
