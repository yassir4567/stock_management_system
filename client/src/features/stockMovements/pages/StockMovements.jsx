import { useEffect, useState } from "react";
import StockAction from "../components/StockAction";
import styles from "../styles/StockMovements.module.css";
import StockActionForm from "../components/StockActionForm";
import StockMovementsTable from "../components/tables/StockMovementsTable";
import { getStockMovements } from "../../../api/stockMovements/getStockMovements";
import { getProducts } from "../../../api/products/getProducts";

function StockMovements() {
  const [openActionForm, setOpenActionForm] = useState({
    open: false,
    type: null, // in or out
  });
  const [stockMovements, setStockMovements] = useState([]);
  const [isLoadingMovements, setIsLoadingMovements] = useState(false);
  const [movementsError, setMovementsError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      setProducts(result?.data ?? []);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadStockMovements = async () => {
      if (!selectedProduct) {
        setStockMovements([]);
        setMovementsError("");
        setIsLoadingMovements(false);
        return;
      }

      setIsLoadingMovements(true);
      setMovementsError("");

      const result = await getStockMovements(selectedProduct);

      if (ignore) {
        return;
      }

      if (result?.success) {
        setStockMovements(result.data ?? []);
      } else {
        setStockMovements([]);
        setMovementsError(result?.message || "Failed to load stock movements");
      }

      setIsLoadingMovements(false);
    };

    loadStockMovements();

    return () => {
      ignore = true;
    };
  }, [selectedProduct]);

  const handleOpenForm = (type) => {
    setOpenActionForm({ open: true, type: type });
  };

  const handleCloseForm = () => {
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
            setStockMovements={setStockMovements}
          />
        </div>
      )}
      <div className={styles.movementsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.movementsTitle}>Stock Movements</h2>

          <div className={styles.filterBox}>
            <label>Select product</label>
            <select
              name="product_id"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.tableSection}>
          <StockMovementsTable
            movements={stockMovements}
            selectedProduct={selectedProduct}
            isLoading={isLoadingMovements}
            error={movementsError}
          />
        </div>
      </div>
    </div>
  );
}

export default StockMovements;
