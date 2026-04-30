import StockMovements from "./pages/StockMovements";

export const stockMovementsRoutes = [
  {
    path: "stock-movements",
    children: [{ index: true, element: <StockMovements /> }],
  },
];
