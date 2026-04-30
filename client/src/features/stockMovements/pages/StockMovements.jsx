import { useState } from "react";
import StockAction from "../components/StockAction";
import styles from "../styles/StockMovements.module.css";
import StockActionForm from "../components/StockActionForm";

function StockMovements() {
  const [openActionForm, setOpenActionForm] = useState({
    open: false,
    type: "", // in or out
  });

  const handleOpenForm = (type) => {
    setOpenActionForm({ open: true, type: type });
  };

  return (
    <div>
      <div className={styles.actionsBox}>
        <StockAction handleOpenForm={handleOpenForm} />
      </div>
      {openActionForm.open && (
        <div className={styles.formBox}>
          <StockActionForm
            isOpen={openActionForm.open}
            type={openActionForm.type}
          />
        </div>
      )}
    </div>
  );
}

export default StockMovements;
