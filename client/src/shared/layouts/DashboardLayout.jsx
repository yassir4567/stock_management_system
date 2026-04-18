import { Outlet } from "react-router-dom";
import styles from "../styles/DashboardLayout.module.css";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardLayout() {
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.sidebar}>
        <DashboardSideBar />
      </div>
      <main className={styles.main}>
        <DashboardHeader />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
