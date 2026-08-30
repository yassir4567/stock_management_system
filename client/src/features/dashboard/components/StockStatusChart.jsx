import { useEffect, useState } from "react";
import { getStockStatus } from "../../../api/dashboard/getStockStatus";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function StockStatusChart() {
  const [stockStatus, setStockStatus] = useState([]);

  useEffect(() => {
    const loadStockStatus = async () => {
      const result = await getStockStatus();
      setStockStatus(result.data);
    };
    loadStockStatus();
  }, []);

  const labelsMap = {
    out: "Rupture de stock",
    low: "Stock faible",
    in: "En stock",
  };

  const data = {
    labels: Object.keys(stockStatus ?? {}).map(
      (status) => labelsMap[status] ?? status,
    ),
    datasets: [
      {
        label: "Produits",
        data: Object.values(stockStatus ?? {}),
        backgroundColor: ["#16a34a", "#2563eb", "#f59e0b", "#dc2626"],
      },
    ],
  };
  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default StockStatusChart;
