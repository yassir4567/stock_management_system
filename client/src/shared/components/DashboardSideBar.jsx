import styles from "../styles/DashboardSideBar.module.css";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { BsCarFront } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { AiOutlineStock } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../api/auth/logout";
import { useAuth } from "../../context/AuthContext";

function DashboardSideBar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className={styles.sideBar}>
      <div className={styles.header}>
        <span className={styles.titleEyebrow}>Espace de travail</span>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Tableau de bord admin</h2>
          <p className={styles.subtitle}>
            Gérez le stock, les personnes et les opérations quotidiennes.
          </p>
        </div>
      </div>

      <nav className={styles.navbar}>
        <span className={styles.sectionLabel}>Menu principal</span>
        <ul className={styles.navbarItems}>
          <li className={styles.navbarItem}>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeLink} `
                  : `${styles.link}`
              }
            >
              <span className={styles.linkIcon}>
                <MdOutlineDashboard className={styles.icon} />
              </span>
              <span className={styles.linkText}>Tableau de bord</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeLink} `
                  : `${styles.link}`
              }
            >
              <span className={styles.linkIcon}>
                <BsCart4 className={styles.icon} />
              </span>
              <span className={styles.linkText}>Produits</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="categories"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeLink} `
                  : `${styles.link}`
              }
            >
              <span className={styles.linkIcon}>
                <MdOutlineCategory className={styles.icon} />
              </span>
              <span className={styles.linkText}>Catégories</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="suppliers"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeLink} `
                  : `${styles.link}`
              }
            >
              <span className={styles.linkIcon}>
                <BsCarFront className={styles.icon} />
              </span>
              <span className={styles.linkText}>Fournisseurs</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="stock-movements"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeLink} `
                  : `${styles.link}`
              }
            >
              <span className={styles.linkIcon}>
                <AiOutlineStock className={styles.icon} />
              </span>
              <span className={styles.linkText}>Mouvements de stock</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardSideBar;
