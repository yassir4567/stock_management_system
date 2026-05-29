import styles from "../styles/CategoriesListHeader.module.css";
import { GoPlus } from "react-icons/go";

function CategoriesListHeader({ onOpenModal, total }) {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Catégories</h1>
          <p className={styles.subTitle}>
            {total} catégorie{total === 1 ? "" : "s"} au total
          </p>
        </div>

        <div className={styles.leftSide}>
          <button
            type="button"
            onClick={() => onOpenModal("add")}
            className={styles.addCategoryBtn}
          >
            <GoPlus />
            <span>Ajouter une catégorie</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesListHeader;
