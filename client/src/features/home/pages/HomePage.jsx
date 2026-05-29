import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.wrapper}>
        <span className={styles.badge}>Système de gestion de stock</span>

        <h1 className={styles.title}>
          Gardez votre stock organisé, visible et prêt pour la prochaine
          opération.
        </h1>

        <p className={styles.description}>
          Gérez les produits, les catégories et l'activité quotidienne du stock
          depuis un espace de travail clair.
        </p>

        <div className={styles.actions}>
          <Link className={`${styles.action} ${styles.login}`} to="/login">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
