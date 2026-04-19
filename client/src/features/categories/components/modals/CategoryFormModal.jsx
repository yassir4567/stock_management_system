import { useMemo, useState } from "react";
import styles from "../../styles/CategoryFormModal.module.css";
import { sortObject } from "../../../../helpers/helpers";
import { createCategory } from "../../../../api/categories/createCategory";
import { updateCategory } from "../../../../api/categories/updateCategory";

function CategoryFormModal({
  mode,
  category = null,
  onCloseModal,
  setCategories,
}) {
  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const initCategory = useMemo(() => {
    return {
      name: category?.name || "",
      description: category?.description || "",
    };
  }, [category]);

  // * handle inputs change
  const handleChangeInputs = (e) => {
    const { name, value } = e.target;

    if (name === "description" && value.length > 120) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // * handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name) {
      newErrors.name = "Name required";
    }

    if (!form.description) {
      newErrors.description = "Description required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors({
        name: newErrors?.name || "",
        description: newErrors?.description || "",
      });
      return;
    }

    if (mode === "edit") {
      if (
        JSON.stringify(sortObject(initCategory)) ===
        JSON.stringify(sortObject(form))
      ) {
        setGeneralError("Nothing change");
        return;
      } else {
        const response = await updateCategory(form, category.id);
        const data = response.data;
        setCategories((prev) =>
          prev.map((c) => (c.id === category.id ? data : c)),
        );
      }
    } else if (mode === "add") {
      const response = await createCategory(form);
      const data = response.data;
      console.log(response);
      setCategories((prev) => [...prev, data]);
    }

    onCloseModal();
  };

  const [generalError, setGeneralError] = useState("");

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>
            {mode === "add" ? "Add" : "Edit"} Category
          </h1>
          {generalError && (
            <p className={styles.generalError}>{generalError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputBox}>
            <label className={styles.label}>Category name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChangeInputs}
              className={styles.input}
              placeholder="Enter category name..."
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.textareaBox}>
            <div className={styles.labelAndMax}>
              <label className={styles.label}>Description</label>
              <p className={styles.maxLetters}>{form.description.length}/120</p>
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChangeInputs}
              className={styles.textarea}
              placeholder="Enter category name..."
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>

          <div className={styles.actionsBox}>
            <button type="submit" className={`${styles.action} ${styles.send}`}>
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
        </form>
      </div>
    </div>
  );
}

export default CategoryFormModal;
