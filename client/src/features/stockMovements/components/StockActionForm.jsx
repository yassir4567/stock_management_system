import { useEffect, useState } from "react";
import styles from "../styles/StockActionForm.module.css";
import { getProducts } from "../../../api/products/getProducts";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { stockIn } from "../../../api/stockMovements/stockIn";
import { stockOut } from "../../../api/stockMovements/stockOut";

function StockActionForm({ isOpen, type, handleCloseForm }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      const result = await getProducts();
      setProducts(result.data.map((p) => ({ id: p.id, name: p.name })));
    };
    loadProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setGeneralError("");
    const newErrors = {};

    if (!form.product_id.trim()) {
      newErrors.product_id = "product required";
    }

    const quantityNumber = Number(form.quantity);

    if (!form.quantity.trim()) {
      newErrors.quantity = "Quantity required";
    } else if (!Number.isFinite(quantityNumber)) {
      newErrors.quantity = "Quantity must be a number";
    } else if (!Number.isInteger(quantityNumber)) {
      newErrors.quantity = "Quantity must be integer";
    } else if (quantityNumber < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (type === "in") {
      const result = await stockIn(form);
    } else if (type === "out") {
      const result = await stockOut(form);
      console.log(result);

      if (result.success === false) {
        setGeneralError(result.message);
        return;
      }
    }
    handleCloseForm();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>
        {type === "in" ? <FaPlus /> : <TiMinus />}
        <span>Stock {type}</span>
      </h2>
      {generalError && <p className={styles.generalError}>{generalError}</p>}
      <div className={styles.row}>
        <div className={styles.inputBox}>
          <label>Product Name</label>
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleInputChange}
          >
            <option value="">Select product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.product_id && (
            <p className={styles.error}>{errors.product_id}</p>
          )}
        </div>

        <div className={styles.inputBox}>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
          />
          {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
        </div>
      </div>

      <div className={styles.textAreaBox}>
        <label>Note (optional)</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleInputChange}
          placeholder="Enter note"
        />
        {errors.note && <p className={styles.error}>{errors.note}</p>}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={`${styles.actionBtn} ${styles.addBtn}`}
        >
          <FaPlus /> <span>Add action</span>
        </button>
        <button
          type="reset"
          className={`${styles.actionBtn} ${styles.cancelBtn}`}
          onClick={handleCloseForm}
        >
          <span>cancel</span>
        </button>
      </div>
    </form>
  );
}

export default StockActionForm;
