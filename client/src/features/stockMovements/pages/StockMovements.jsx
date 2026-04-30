import { useState } from "react";
import StockAction from "../components/StockAction";
import styles from "../styles/StockMovements.module.css";
import StockActionForm from "../components/StockActionForm";

function StockMovements() {
  const [openActionForm, setOpenActionForm] = useState({
    open: false,
    type: null, // in or out
  });

  const handleOpenForm = (type) => {
    setOpenActionForm({ open: true, type: type });
  };

  const handleCloseForm = (type) => {
    setOpenActionForm({ open: false, type: null });
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
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
}

export default StockMovements;
