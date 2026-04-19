import styles from "../styles/CategoriesListHeader.module.css";
import { GoPlus } from "react-icons/go";

function CategoriesListHeader({ onOpenModal, total }) {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Categories</h1>
          <p className={styles.subTitle}>{total} Total categories</p>
        </div>

        <div className={styles.leftSide}>
          <button
            type="button"
            onClick={() => onOpenModal("add")}
            className={styles.addCategoryBtn}
          >
            <GoPlus />
            <span>Add Category</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesListHeader;
