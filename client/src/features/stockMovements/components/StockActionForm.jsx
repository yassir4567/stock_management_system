import { useEffect, useState } from "react";
import styles from "../styles/StockActionForm.module.css";
import { getProducts } from "../../../api/products/getProducts";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";

function StockActionForm({ isOpen, type }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const result = await getProducts();
      setProducts(result.data.map((p) => ({ id: p.id, name: p.name })));
    };
    loadProjects();
  }, []);

  return (
    <form className={styles.form}>
      <h2 className={styles.formTitle}>
        {type === "in" ? <FaPlus /> : <TiMinus />}
        <span>Stock {type}</span>
      </h2>
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>Product Name</label>
          <select name="product">
            <option value="">Select project</option>
            {products.map((product) => (
              <option key={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputBox}>
          <label>Quantity</label>
          <input type="number" placeholder="Enter quantity" />
        </div>
      </div>

      <div className={styles.textAreaBox}>
        <label>Note</label>
        <textarea name="note" placeholder="Enter note" />
      </div>
    </form>
  );
}

export default StockActionForm;
