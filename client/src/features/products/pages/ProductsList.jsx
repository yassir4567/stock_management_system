import { useEffect, useState } from "react";
import ProductsListHeader from "../components/ProductsListHeader";
import styles from "../styles/ProductsList.module.css";
import { getCategoriesForOptions } from "../../../api/categories/getCategoriesForOptions";
import { getSuppliersForOptions } from "../../../api/suppliers/getSuppliersForOptions";
import { getProducts } from "../../../api/products/getProducts";
import ProductsListTable from "../components/tables/ProductsListTable";
import { GoPlus } from "react-icons/go";
import ProductFormModal from "../components/modals/ProductFormModal";

function ProductsList() {
  const [openModal, setOpenModal] = useState({
    open: false,
    mode: null,
    product: null,
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  async function loadCategories() {
    const data = await getCategoriesForOptions();
    setCategories(data.data);
  }

  async function loadSuppliers() {
    const data = await getSuppliersForOptions();
    setSuppliers(data.data);
  }

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data?.data ?? []);
  }

  useEffect(() => {
    loadProducts();
    loadSuppliers();
    loadCategories();
  }, []);

  const onOpenModal = (mode, product = null) => {
    setOpenModal({ open: true, mode: mode, product: product });
  };

  const onCloseModal = () => {
    setOpenModal({ open: false, mode: null, product: null });
  };

  // * remove scroll
  useEffect(() => {
    if (openModal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <div className={styles.productsList}>
      <ProductsListHeader categories={categories} suppliers={suppliers} />

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <h4 className={styles.tableTitle}>Products</h4>
          <button
            type="button"
            className={styles.addProductBtn}
            onClick={() => onOpenModal("add")}
          >
            <GoPlus />
            <span>Add product</span>
          </button>
        </div>
        <ProductsListTable
          onOpenModal={onOpenModal}
          products={products}
          setProducts={setProducts}
        />
      </div>

      {openModal.open && (
        <ProductFormModal
          categories={categories}
          suppliers={suppliers}
          mode={openModal.mode}
          product={openModal.product}
          setProducts={setProducts}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
}

export default ProductsList;
