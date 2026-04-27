import styles from "../styles/DeleteAlert.module.css";
import { FaPlus } from "react-icons/fa6";

function DeleteAlert({ text, setShowDeleteAlert }) {
  return (
    <div
      className={styles.alertModal}
      onClick={() => setShowDeleteAlert(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>This {text} contains products</p>
        <FaPlus
          className={styles.icon}
          onClick={() => setShowDeleteAlert(false)}
        />
      </div>
    </div>
  );
}

export default DeleteAlert;
