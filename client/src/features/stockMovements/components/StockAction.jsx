import styles from "../styles/StockAction.module.css";

function StockAction({ handleOpenForm }) {
  return (
    <div className={styles.stockActionBox}>
      <h3 className={styles.stockTitle}>Actions de stock</h3>
      <div className={styles.stockActions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.inAction}`}
          onClick={() => handleOpenForm("in")}
        >
          Entrée de stock
        </button>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.outAction}`}
          onClick={() => handleOpenForm("out")}
        >
          Sortie de stock
        </button>
      </div>
    </div>
  );
}

export default StockAction;
