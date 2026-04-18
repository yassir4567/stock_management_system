import { useMemo, useState } from "react";
import styles from "../../styles/ProductFormModal.module.css";
import { createProduct } from "../../../../api/products/createProduct";
import { updateProduct } from "../../../../api/products/updateProduct";
import { deleteProduct } from "../../../../api/products/deleteProduct";

const sortObject = (object) => {
  return Object.keys(object)
    .sort()
    .reduce((acc, key) => {
      acc[key] = object[key];
      return acc;
    }, {});
};

function ProductFormModal({
  mode,
  product = null,
  categories,
  suppliers,
  onCloseModal,
  setProducts,
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    description: product?.description || "",
    category_id: product?.category_id || "",
    supplier_id: product?.supplier_id || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category_id: "",
    supplier_id: "",
  });

  const [generalError, setGeneralError] = useState("");

  const initProduct = useMemo(() => {
    return {
      name: product?.name || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      description: product?.description || "",
      category_id: product?.category_id || "",
      supplier_id: product?.supplier_id || "",
    };
  }, [product]);

  // * handle input onChange
  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateData = (data) => {
    const formErrors = {};

    if (!data.name.trim()) {
      formErrors.name = "Name required";
    }

    if (data.price === "") {
      formErrors.price = "Price required";
    } else if (Number(data.price) < 0) {
      formErrors.price = "Price must be greater than 0";
    }

    if (data.quantity === "") {
      formErrors.quantity = "Quantity required";
    } else if (Number(data.quantity) < 0) {
      formErrors.quantity = "Quantity must be greater than 0";
    }

    if (!data.description) {
      formErrors.description = "Description required";
    }

    if (!data.supplier_id) {
      formErrors.supplier_id = "Supplier required";
    }

    if (!data.category_id) {
      formErrors.category_id = "Category required";
    }

    return formErrors;
  };

  // * handle on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateFormData = validateData(form);
    if (Object.keys(validateFormData).length > 0) {
      setErrors({
        name: validateFormData?.name || "",
        price: validateFormData?.price || "",
        quantity: validateFormData?.quantity || "",
        description: validateFormData?.description || "",
        category_id: validateFormData?.category_id || "",
        supplier_id: validateFormData?.supplier_id || "",
      });
      return;
    }
    if (mode === "edit") {
      // * check if the user don't make change in the form values
      if (
        JSON.stringify(sortObject(initProduct)) ===
        JSON.stringify(sortObject(form))
      ) {
        setGeneralError("Nothing change");
        return;
      } else {
        // * send update request and modify the products state array
        const response = await updateProduct(form, product.id);
        const data = response.data;
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? data : p)),
        );
      }
    } else if (mode === "add") {
      const response = await createProduct(form);
      const data = response.data;
      setProducts((prev) => [...prev, data]);
    }

    onCloseModal();
  };

  const inputs = {
    row1: [
      {
        label: "name",
        name: "name",
        type: "text",
        placeholder: "Enter product name...",
      },
      {
        label: "price",
        name: "price",
        type: "number",
        placeholder: "Enter product price...",
      },
      {
        label: "quantity",
        name: "quantity",
        type: "number",
        placeholder: "Enter product quantity...",
      },
    ],
  };

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>
            {mode === "add" ? "Add" : "Edit"} Product
          </h1>
          {generalError && (
            <p className={styles.generalError}>{generalError}</p>
          )}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            {inputs.row1.map((row, index) => (
              <div key={index} className={styles.inputBox}>
                <label>{row.label}</label>
                <input
                  type={row.type}
                  name={row.name}
                  placeholder={row.placeholder}
                  value={form[row.name]}
                  onChange={handleChangeInputs}
                />
                {errors[row.name] && (
                  <p className={styles.error}>{errors[row.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.row}>
            <div className={styles.selectBox}>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChangeInputs}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors["category_id"] && (
                <p className={styles.error}>{errors["category_id"]}</p>
              )}
            </div>

            <div className={styles.selectBox}>
              <select
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleChangeInputs}
              >
                <option value="" disabled>
                  Select supplier
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors["supplier_id"] && (
                <p className={styles.error}>{errors["supplier_id"]}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.textareaBox}>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChangeInputs}
                placeholder="Enter product description"
              ></textarea>
              {errors["description"] && (
                <p className={styles.error}>{errors["description"]}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.actionsBox}>
              <button
                type="submit"
                className={`${styles.action} ${styles.send}`}
              >
                Send
              </button>
              <button
                type="reset"
                className={`${styles.action} ${styles.cancel}`}
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
