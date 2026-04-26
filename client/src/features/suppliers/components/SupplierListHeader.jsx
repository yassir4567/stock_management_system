import Input from "../../../shared/ui/Input";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import styles from "../styles/SupplierListHeader.module.css";

function SupplierListHeader({
  totalSuppliers = 0,
  search = "",
  onSearchChange,
  onOpenModal,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Suppliers</h1>
          <p className={styles.subTitle}>
            {totalSuppliers} total supplier{totalSuppliers === 1 ? "" : "s"}
          </p>
        </div>

        <div className={styles.rightSide}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name ..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => onOpenModal("add")}
            className={styles.addSupplierBtn}
          >
            <GoPlus />
            <span>Add supplier</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierListHeader;
