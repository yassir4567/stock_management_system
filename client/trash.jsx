import styles from "../styles/ProductsListTable.module.css";
import { GoHash } from "react-icons/go";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { GrStatusInfo } from "react-icons/gr";
import { TbCategory2 } from "react-icons/tb";
import { FaLuggageCart, FaRegEye } from "react-icons/fa";
import { SlActionRedo } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBack2Line } from "react-icons/ri";

const columns = [
  { key: "id", label: "Id", icon: GoHash },
  { key: "name", label: "Name", icon: MdOutlineDriveFileRenameOutline },
  { key: "price", label: "Price", icon: IoPricetagOutline },
  { key: "quantity", label: "Quantity", icon: AiOutlineStock },
  { key: "status", label: "Status", icon: GrStatusInfo },
  { key: "category", label: "Category", icon: TbCategory2 },
  { key: "supplier", label: "Supplier", icon: FaLuggageCart },
  { key: "actions", label: "Actions", icon: SlActionRedo },
];


function ProductsListTable({ products = [], categories = [], suppliers = [] }) {
  const hasProducts = products.length > 0;

  return (
    <div className={styles.tableShell}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(({ key, label, icon: Icon }) => (
                <th key={key} scope="col">
                  <div className={styles.headerContent}>
                    <Icon className={styles.headerIcon} />
                    <span>{label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hasProducts ? (
              products.map((product) => {
                const stockStatus = getStockStatus(product.quantity);
                const categoryName = getRelatedName(
                  product,
                  categories,
                  "category",
                );
                const supplierName = getRelatedName(
                  product,
                  suppliers,
                  "supplier",
                );

                return (
                  <tr key={product.id}>
                    <td>
                      <span className={styles.idBadge}>#{product.id}</span>
                    </td>

                    <td className={styles.nameCell}>
                      <div className={styles.nameContent}>
                        <span className={styles.nameText}>{product.name}</span>
                        <span className={styles.subText}>Product item</span>
                      </div>
                    </td>

                    <td>
                      <span className={styles.priceValue}>
                        {formatPrice(product.price)}
                      </span>
                    </td>

                    <td>
                      <span className={styles.quantityValue}>
                        {product.quantity}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${styles.statusBadge} ${stockStatus.toneClassName}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>

                    <td>
                      <span className={styles.plainBadge}>{categoryName}</span>
                    </td>

                    <td>
                      <span className={styles.plainBadge}>{supplierName}</span>
                    </td>

                    <td>
                      <div className={styles.actionsCell}>
                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          aria-label={`View ${product.name}`}
                          title={`View ${product.name}`}
                        >
                          <FaRegEye />
                        </button>

                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.editButton}`}
                          aria-label={`Edit ${product.name}`}
                          title={`Edit ${product.name}`}
                        >
                          <CiEdit />
                        </button>

                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          aria-label={`Delete ${product.name}`}
                          title={`Delete ${product.name}`}
                        >
                          <RiDeleteBack2Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  No products available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsListTable;


