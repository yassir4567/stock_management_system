import styles from "../styles/StockAction.module.css";

function StockAction({ handleOpenForm }) {
  return (
    <div className={styles.stockActionBox}>
      <h3 className={styles.stockTitle}>Stock actions</h3>
      <div className={styles.stockActions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.inAction}`}
          onClick={() => handleOpenForm("in")}
        >
          Stock in
        </button>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.outAction}`}
          onClick={() => handleOpenForm("out")}
        >
          Stock out
        </button>
      </div>
    </div>
  );
}

export default StockAction;