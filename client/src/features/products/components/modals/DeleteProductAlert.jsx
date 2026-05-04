import styles from "../../styles/DeleteProductAlert.module.css";

function DeleteProductAlert({ onClose, deleteProduct, productId }) {
  const handleYesClick = async () => {
    await deleteProduct(productId);
    onClose();
  };
  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>
          Ce produit contient des mouvements, souhaitez-vous supprimer les
          mouvements aussi ?
        </p>
        <div className={styles.actions}>
          <button className={styles.yes} onClick={handleYesClick}>
            Oui
          </button>
          <button className={styles.no} onClick={onClose}>
            Non{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductAlert;
