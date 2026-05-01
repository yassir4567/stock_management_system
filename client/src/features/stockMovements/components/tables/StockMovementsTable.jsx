import { createElement } from "react";
import { GoHash } from "react-icons/go";
import {
  MdOutlineDateRange,
  MdOutlineDriveFileRenameOutline,
  MdOutlineNotes,
} from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { SlActionRedo } from "react-icons/sl";
import productTableStyles from "../../../products/styles/ProductsListTable.module.css";
import styles from "../../styles/StockMovementsTable.module.css";

const columns = [
  { label: "Id", icon: GoHash },
  { label: "Product Name", icon: MdOutlineDriveFileRenameOutline },
  { label: "Type", icon: SlActionRedo },
  { label: "Quantity", icon: AiOutlineStock },
  { label: "Current Quantity", icon: AiOutlineStock },
  { label: "Note", icon: MdOutlineNotes },
  { label: "Date", icon: MdOutlineDateRange },
];

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function getTypeClass(type) {
  if (type === "in") {
    return styles.typeIn;
  }

  if (type === "out") {
    return styles.typeOut;
  }

  return styles.typeNeutral;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "--";
  }

  return dateFormatter.format(new Date(dateValue));
}

function getNotePreview(noteValue) {
  const fullNote = noteValue?.trim();

  if (!fullNote) {
    return {
      preview: "No note",
      fullNote: "",
      hasMore: false,
    };
  }

  const words = fullNote.split(/\s+/);

  if (words.length <= 3) {
    return {
      preview: fullNote,
      fullNote,
      hasMore: false,
    };
  }

  return {
    preview: words.slice(0, 3).join(" "),
    fullNote,
    hasMore: true,
  };
}

function getFeedbackState(selectedProduct, isLoading, error, hasMovements) {
  if (!selectedProduct) {
    return {
      className: styles.selectState,
      message: "Select product first",
    };
  }

  if (isLoading) {
    return {
      className: styles.loadingState,
      message: "Loading movements...",
    };
  }

  if (error) {
    return {
      className: styles.errorState,
      message: error,
    };
  }

  if (!hasMovements) {
    return {
      className: styles.emptyState,
      message: "No movements",
    };
  }

  return null;
}

function StockMovementsTable({
  movements = [],
  selectedProduct = "",
  isLoading = false,
  error = "",
}) {
  const hasMovements = movements.length > 0;
  const feedbackState = getFeedbackState(
    selectedProduct,
    isLoading,
    error,
    hasMovements,
  );

  return (
    <div
      className={`${productTableStyles.tableWrapper} ${styles.tableWrapper}`}
    >
      <table className={`${productTableStyles.table} ${styles.table}`}>
        <thead>
          <tr>
            {columns.map(({ label, icon }) => (
              <th key={label} scope="col">
                <div className={productTableStyles.headerContent}>
                  {createElement(icon, { className: styles.headerIcon })}
                  <span>{label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {feedbackState ? (
            <tr>
              <td
                colSpan={columns.length}
                className={`${styles.stateCell} ${feedbackState.className}`}
              >
                {feedbackState.message}
              </td>
            </tr>
          ) : (
            movements.map((movement) => {
              const notePreview = getNotePreview(movement.note);

              return (
                <tr key={movement.id}>
                  <td>
                    <span className={productTableStyles.productId}>
                      #{movement.id}
                    </span>
                  </td>

                  <td className={productTableStyles.nameCell}>
                    <span className={productTableStyles.productName}>
                      {movement.product?.name ?? "--"}
                    </span>
                  </td>

                  <td className={productTableStyles.statusCell}>
                    <span
                      className={`${productTableStyles.status} ${getTypeClass(
                        movement.type,
                      )}`}
                    >
                      {movement.type ?? "--"}
                    </span>
                  </td>

                  <td>
                    <span>{movement.quantity ?? "--"}</span>
                  </td>

                  <td>
                    <span>{movement.product?.quantity ?? "--"}</span>
                  </td>

                  <td
                    className={`${productTableStyles.nameCell} ${styles.noteCell}`}
                  >
                    <div className={styles.noteWrapper}>
                      <span className={styles.notePreview}>
                        <span className={styles.noteText}>
                          {notePreview.preview}
                        </span>

                        {notePreview.hasMore ? (
                          <span className={styles.moreText}>more...</span>
                        ) : null}
                      </span>

                      {notePreview.fullNote ? (
                        <div className={styles.noteTooltip} role="tooltip">
                          {notePreview.fullNote}
                        </div>
                      ) : null}
                    </div>
                  </td>

                  <td className={styles.dateCell}>
                    <span>{formatDate(movement.created_at)}</span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockMovementsTable;
