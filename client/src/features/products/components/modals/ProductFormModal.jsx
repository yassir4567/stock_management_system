import { useMemo, useState } from "react";
import styles from "../../styles/ProductFormModal.module.css";
import { createProduct } from "../../../../api/products/createProduct";
import { updateProduct } from "../../../../api/products/updateProduct";
import { deleteProduct } from "../../../../api/products/deleteProduct";
import { sortObject } from "../../../../helpers/helpers";

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
    quantity: product?.quantity ?? "",
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
      quantity: product?.quantity ?? "",
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
      formErrors.name = "Le nom est requis";
    }

    if (data.price === "") {
      formErrors.price = "Le prix est requis";
    } else if (Number(data.price) < 0) {
      formErrors.price = "Le prix doit être supérieur à 0";
    }

    if (data.quantity === "") {
      formErrors.quantity = "La quantité est requise";
    } else if (Number(data.quantity) < 0) {
      formErrors.quantity = "La quantité doit être supérieure à 0";
    }

    if (!data.supplier_id) {
      formErrors.supplier_id = "Le fournisseur est requis";
    }

    if (!data.category_id) {
      formErrors.category_id = "La catégorie est requise";
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
        setGeneralError("Aucune modification");
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
      
      const data = response.data.data;

      setProducts((prev) => [...prev, data]);
    }

    onCloseModal();
  };

  const inputs = {
    row1: [
      {
        label: "Nom",
        name: "name",
        type: "text",
        placeholder: "Saisir le nom du produit...",
      },
      {
        label: "Prix",
        name: "price",
        type: "number",
        placeholder: "Saisir le prix du produit...",
      },
      {
        label: "Quantité",
        name: "quantity",
        type: "number",
        placeholder: "Saisir la quantité du produit...",
      },
    ],
  };

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>
            {mode === "add" ? "Ajouter un produit" : "Modifier le produit"}
          </h1>
          {generalError && (
            <p className={styles.generalError}>{generalError}</p>
          )}
        </div>
        <form className={styles.form}  onSubmit={handleSubmit}>
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
                  Sélectionner une catégorie
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
                  Sélectionner un fournisseur
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
                placeholder="Saisir la description du produit (optionnel)"
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
                Enregistrer
              </button>
              <button
                type="reset"
                className={`${styles.action} ${styles.cancel}`}
                onClick={onCloseModal}
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
