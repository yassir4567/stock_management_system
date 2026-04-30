import styles from "../styles/DashboardSideBar.module.css";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { BsCarFront } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
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
        <span className={styles.titleEyebrow}>Workspace</span>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Admin Dashboard</h2>
          <p className={styles.subtitle}>
            Manage stock, people, and daily operations.
          </p>
        </div>
      </div>

      <nav className={styles.navbar}>
        <span className={styles.sectionLabel}>Main menu</span>
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
              <span className={styles.linkText}>Dashboard</span>
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
              <span className={styles.linkText}>Products</span>
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
              <span className={styles.linkText}>Categories</span>
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
              <span className={styles.linkText}>Suppliers</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink className={styles.link}>
              <span className={styles.linkIcon}>
                <FiUsers className={styles.icon} />
              </span>
              <span className={styles.linkText}>Users</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardSideBar;
