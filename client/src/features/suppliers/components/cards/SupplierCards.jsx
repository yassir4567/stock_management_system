import styles from "../../styles/SupplierCards.module.css";
import { FaRegEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBack2Line } from "react-icons/ri";
import {
  MdOutlineMailOutline,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { GoHash } from "react-icons/go";

const fields = [
  { label: "Id", key: "id", icon: GoHash, format: (value) => `#${value}` },
  { label: "Name", key: "name", icon: MdOutlineDriveFileRenameOutline },
  { label: "Email", key: "email", icon: MdOutlineMailOutline },
  { label: "Phone", key: "phone", icon: FiPhone },
  { label: "Address", key: "address", icon: HiOutlineMapPin },
];

const getInitials = (name) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

function SupplierCards({ suppliers = [], onOpenModal, onDeleteSupplier }) {
  const hasSuppliers = suppliers.length > 0;

  if (!hasSuppliers) {
    return (
      <div className={styles.emptyState}>
        No suppliers match your search yet.
      </div>
    );
  }

  return (
    <div className={styles.cardsGrid}>
      {suppliers.map((supplier) => (
        <article key={supplier.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.identity}>
              <span className={styles.avatar}>
                {getInitials(supplier.name)}
              </span>
              <div className={styles.identityContent}>
                <span className={styles.eyebrow}>supplier</span>
                <h4 className={styles.supplierName}>{supplier.name}</h4>
              </div>
            </div>
            <span className={styles.idBadge}>#{supplier.id}</span>
          </div>

          <div className={styles.fieldsList}>
            {fields.map(({ label, key, icon: Icon, format }) => (
              <div key={key} className={styles.fieldItem}>
                <div className={styles.fieldLabel}>
                  <Icon />
                  <span>{label}</span>
                </div>
                <p className={styles.fieldValue}>
                  {format ? format(supplier[key]) : supplier[key]}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.edit}`}
              onClick={() => onOpenModal("edit", supplier)}
            >
              <CiEdit />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className={`${styles.actionBtn} ${styles.delete}`}
              onClick={() => onDeleteSupplier(supplier.id)}
            >
              <RiDeleteBack2Line />
              <span>Delete</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SupplierCards;
