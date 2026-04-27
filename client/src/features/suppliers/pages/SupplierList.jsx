import { useEffect, useMemo, useState } from "react";
import SupplierListHeader from "../components/SupplierListHeader";
import SupplierCards from "../components/cards/SupplierCards";
import SupplierModal from "../components/modals/SupplierModal";
import styles from "../styles/SupplierList.module.css";
import { getSuppliers } from "../../../api/suppliers/getSuppliers";
import DeleteAlert from "../../../shared/components/DeleteAlert";
import { deleteSupplier } from "../../../api/suppliers/deleteSupplier";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    mode: null,
    supplier: null,
  });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    const loadSuppliers = async () => {
      const result = await getSuppliers(search);
      setSuppliers(result.data);
    };
    loadSuppliers();
  }, [search]);

  const handleOpenModal = (mode, supplier = null) => {
    setModalState({ open: true, mode, supplier });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, mode: null, supplier: null });
  };

  const handleDeleteSupplier = async (supplierId) => {
    // *
    const supplier = suppliers.find((sp) => sp.id === supplierId);
    if (supplier.products_count > 0) {
      setShowDeleteAlert(true);
      return;
    }
    const result = await deleteSupplier(supplierId);
    setSuppliers((prev) =>
      prev.filter((supplier) => supplier.id !== supplierId),
    );
  };

  useEffect(() => {
    document.body.style.overflow = modalState.open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalState.open]);

  return (
    <div className={styles.suppliersList}>
      <SupplierListHeader
        totalSuppliers={suppliers.length}
        search={search}
        onOpenModal={handleOpenModal}
        onSearchChange={setSearch}
      />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>Suppliers</h4>
        </div>

        <SupplierCards
          suppliers={suppliers}
          onDeleteSupplier={handleDeleteSupplier}
          onOpenModal={handleOpenModal}
        />
      </div>

      {modalState.open && (
        <SupplierModal
          mode={modalState.mode}
          supplier={modalState.supplier}
          onCloseModal={handleCloseModal}
          onOpenModal={handleOpenModal}
          setSuppliers={setSuppliers}
        />
      )}

      {showDeleteAlert && (
        <DeleteAlert text="supplier" setShowDeleteAlert={setShowDeleteAlert} />
      )}
    </div>
  );
}

export default SupplierList;
