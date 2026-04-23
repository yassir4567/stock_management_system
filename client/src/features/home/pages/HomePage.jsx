import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.wrapper}>
        <span className={styles.badge}>Stock Management System</span>

        <h1 className={styles.title}>
          Keep your stock organized, visible, and ready for the next move.
        </h1>

        <p className={styles.description}>
          Manage products, categories, and daily stock activity from one clean
          workspace !!!
        </p>

        <div className={styles.actions}>
          <Link className={`${styles.action} ${styles.login}`} to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
