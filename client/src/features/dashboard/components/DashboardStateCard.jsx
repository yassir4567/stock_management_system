import styles from "../styles/DashboardStateCard.module.css";

function DashboardStateCard({ label, icon: Icon, total }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <Icon className={styles.icon} />
      </div>
      <p className={styles.total}>{total}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export default DashboardStateCard;
