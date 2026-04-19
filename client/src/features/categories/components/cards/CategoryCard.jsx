import { deleteCategory } from "../../../../api/categories/deleteCategory";
import styles from "../../styles/CategoryCard.module.css";

function CategoryCard({
  category,
  onOpenModal,
  setShowDeleteAlert,
  setCategories,
}) {
  const getFirstLetter = (text) => {
    const splitText = text.split(" ").slice(0, 2);
    return splitText.reduce((acc, cur) => acc + cur[0], "");
  };

  // * delete category if it doesn't contains any product
  const handleDeleteCategory = async (id) => {
    if (category.products_count > 0) {
      setShowDeleteAlert(true);
      return;
    }
    const response = await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const created_at = new Date(category.created_at);
  const formatted = created_at.toISOString().split("T")[0];

  return (
    <div className={styles.categoryCard}>
      <div className={styles.wrapper}>
        <div className={styles.cardHeader}>
          <div className={styles.categoryNameBox}>
            <span className={styles.avatar}>
              {getFirstLetter(category.name)}
            </span>
            <div className={styles.content}>
              <span className={styles.subTitle}>category</span>
              <h4 className={styles.categoryName}>{category.name}</h4>
            </div>
          </div>

          <div className={styles.createdData}>{formatted}</div>
        </div>

        <div className={styles.mainBox}>
          <div className={styles.mainWrapper}>
            <div className={styles.productsCountBox}>
              <h5 className={styles.minTitle}>Products</h5>
              <p className={styles.count}>{category.products_count}</p>
            </div>
            <div className={styles.descriptionBox}>
              <h5 className={styles.minTitle}>Description</h5>
              <p className={styles.description}>{category.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => onOpenModal("edit", category)}
            className={`${styles.actionBtn} ${styles.edit}`}
          >
            edit
          </button>
          <button
            type="button"
            onClick={() => handleDeleteCategory(category.id)}
            className={`${styles.actionBtn} ${styles.delete}`}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
