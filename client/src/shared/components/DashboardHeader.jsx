import styles from "../styles/DashboardHeader.module.css";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.identity}>
        <div className={styles.avatar}>FN</div>
        <div className={styles.content}>
          <span className={styles.dashboardOverViewTitle}>
            Dashboard overview
          </span>
          <h4 className={styles.fullName}>Full name</h4>
          <p className={styles.email}>yassir@gmail.com</p>
        </div>
      </div>

      <div className={styles.logoutBox}>
        <button onClick={handleLogout} className={styles.logout}>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
