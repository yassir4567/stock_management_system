import { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { getDashboardStats } from "../../../api/dashboard/getDashboardStats";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { CgArrowBottomRight } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import DashboardStateCard from "../components/DashboardStateCard";

function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadDashboardStats = async () => {
      const result = await getDashboardStats();
      setStats(result.data)
    };
    loadDashboardStats();
  }, []);

  const stats_cards = [
    {
      label: "All products",
      icon: FiShoppingCart,
      total: stats?.total_products || 0,
    },
    {
      label: "All categories",
      icon: BiCategoryAlt,
      total: stats?.total_categories || 0,
    },
    {
      label: "All suppliers",
      icon: LuUsers,
      total: stats?.total_suppliers || 0,
    },
    {
      label: "Low stock",
      icon: CgArrowBottomRight,
      total: stats?.total_products_low_stock || 0,
    },
    {
      label: "Out of stock",
      icon: IoWarningOutline,
      total: stats?.total_products_out_of_stock || 0,
    },
  ];
  

  return (
    <div>
      <div className={styles.cards}>
        {stats_cards?.map((state) => (
          <DashboardStateCard
            label={state.label}
            icon={state.icon}
            total={state.total}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
