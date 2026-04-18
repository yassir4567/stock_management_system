import styles from "../styles/DashboardSideBar.module.css";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { BsCarFront } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function DashboardSideBar() {
  return (
    <aside className={styles.sideBar}>
      <h2 className={styles.title}>Admin Dashboard</h2>
      <nav className={styles.navbar}>
        <ul className={styles.navbarItems}>
          <li className={styles.navbarItem}>
            <NavLink className={styles.link}>
              <MdOutlineDashboard className={styles.icon} />
              <span>Dashboard</span>
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
              <BsCart4 className={styles.icon} />
              <span>Products</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink className={styles.link}>
              <MdOutlineCategory className={styles.icon} />
              <span>Categories</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink className={styles.link}>
              <BsCarFront className={styles.icon} />
              <span>Suppliers</span>
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink className={styles.link}>
              <FiUsers className={styles.icon} />
              <span>Users</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className={styles.logout}>Logout</button>
    </aside>
  );
}

export default DashboardSideBar;
