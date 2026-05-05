import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../api/dashboard/getProductsByCategory";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function ProductsByCategoryChart() {
  const [productsByCategory, setProductsByCategory] = useState([]);

  const data = {
    labels: productsByCategory.map((pbc) => pbc.name),
    datasets: [
      {
        label: "Number of products",
        data: productsByCategory.map((pbc) => pbc.products_count),
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };
  const options = {
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Products by Category",
        font: {
          size: 24, // حجم العنوان
          weight: "bold", // optional
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  useEffect(() => {
    const loadProductsByCategory = async () => {
      const result = await getProductsByCategory();
      setProductsByCategory(result.data);
    };

    loadProductsByCategory();
  }, []);
  return <Bar data={data} options={options} />;
}

export default ProductsByCategoryChart;
