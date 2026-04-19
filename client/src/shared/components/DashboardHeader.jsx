import styles from "../styles/DashboardHeader.module.css";

function DashboardHeader() {
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
    </header>
  );
}

export default DashboardHeader;
