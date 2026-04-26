import SupplierList from "./pages/SupplierList";

export const supplierRoutes = [
  {
    path: "suppliers",
    children: [{ index: true, element: <SupplierList /> }],
  },
];
