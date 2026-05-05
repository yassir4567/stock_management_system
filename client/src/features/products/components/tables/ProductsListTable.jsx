import styles from "../../styles/ProductsListTable.module.css";
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
import { deleteProduct } from "../../../../api/products/deleteProduct";
import { useState } from "react";
import DeleteProductAlert from "../modals/DeleteProductAlert";

const columns = [
  { label: "Id", icon: GoHash },
  { label: "Name", icon: MdOutlineDriveFileRenameOutline },
  { label: "Price", icon: IoPricetagOutline },
  { label: "Quantity", icon: AiOutlineStock },
  { label: "Status", icon: GrStatusInfo },
  { label: "Category", icon: TbCategory2 },
  { label: "Supplier", icon: FaLuggageCart },
  { label: "Actions", icon: SlActionRedo },
];

const getStockStatus = (quantity) => {
  let numQuantity = Number(quantity);
  if (numQuantity <= 0) {
    return {
      status: "out of stock",
      className: styles.outOfStock,
    };
  }

  if (numQuantity <= 10) {
    return {
      status: "Low stock",
      className: styles.lowStock,
    };
  }

  return {
    status: "In stock",
    className: styles.inStock,
  };
};

function ProductsListTable({ products = [], onOpenModal, setProducts }) {
  const hasProducts = products.length > 0;

  const [showAlert, setShowAlert] = useState({
    show: false,
    productId: null,
  });

  // * handle delete product
  const handleDeleteProduct = async (id) => {
    const curProduct = products.find((product) => product.id === id);

    if (!curProduct) return;

    if (curProduct.movements_count > 0) {
      setShowAlert({ show: true, productId: curProduct.id });
      return;
    }

    await deleteProductFinalAction(id);
  };

  const deleteProductFinalAction = async (id) => {
    const result = await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const onClose = () => {
    setShowAlert({ show: false, productId: null });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ label, icon: Icon }) => (
              <th key={label} scope="col">
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
              const category_name = product.category?.name;
              const supplier_name = product.supplier?.name;

              return (
                <tr key={product.id}>
                  <td>
                    <span className={styles.productId}>#{product.id}</span>
                  </td>

                  <td className={styles.nameCell}>
                    <span className={styles.productName}>{product.name}</span>
                  </td>

                  <td className={styles.priceCell}>
                    <span className={styles.productPrice}>
                      ${product.price}
                    </span>
                  </td>

                  <td className={styles.quantityCell}>
                    <span className={styles.productQuantity}>
                      {product.quantity}
                    </span>
                  </td>

                  <td className={styles.statusCell}>
                    <span
                      className={`${styles.status} ${stockStatus.className}`}
                    >
                      {stockStatus.status}
                    </span>
                  </td>

                  <td>
                    <span className={styles.categoryName}>{category_name}</span>
                  </td>

                  <td>
                    <span className={styles.supplierName}>{supplier_name}</span>
                  </td>

                  <td className={styles.cellActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.detail}`}
                      >
                        <FaRegEye />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenModal("edit", product)}
                        className={`${styles.actionBtn} ${styles.edit}`}
                      >
                        <CiEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className={`${styles.actionBtn} ${styles.delete}`}
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

      {showAlert.show && (
        <DeleteProductAlert
          onClose={onClose}
          productId={showAlert.productId}
          deleteProduct={deleteProductFinalAction}
        />
      )}
    </div>
  );
}

export default ProductsListTable;
