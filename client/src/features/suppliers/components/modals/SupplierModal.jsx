import { useState } from "react";
import styles from "../../styles/SupplierModal.module.css";
import { createSupplier } from "../../../../api/suppliers/createSupplier";

function SupplierModal({
  mode,
  supplier = null,
  onCloseModal,
  onOpenModal,
  setSuppliers,
}) {
  const isViewMode = mode === "view";

  const [form, setForm] = useState({
    name: supplier?.name || "",
    email: supplier?.email || "",
    phone: supplier?.phone || "",
    address: supplier?.address || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const modalTitle = mode === "add" ? "Add Supplier" : "Edit Supplier";

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data) => {
    const formErrors = {};

    if (!data.name.trim()) {
      formErrors.name = "Name required";
    }

    if (!data.email.trim()) {
      formErrors.email = "Email required";
    }

    if (!data.phone.trim()) {
      formErrors.phone = "Phone required";
    }

    if (!data.address.trim()) {
      formErrors.address = "Address required";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length > 0) {
      setErrors({
        name: formErrors.name || "",
        email: formErrors.email || "",
        phone: formErrors.phone || "",
        address: formErrors.address || "",
      });
      return;
    }

    if (mode === "add") {
      const result = await createSupplier(form);
      const data = result.data;

      setSuppliers((prev) => [...prev, data]);
    }

    if (mode === "edit" && supplier) {
      setSuppliers((prev) =>
        prev.map((currentSupplier) =>
          currentSupplier.id === supplier.id
            ? { ...currentSupplier, ...form }
            : currentSupplier,
        ),
      );
    }

    onCloseModal();
  };

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter supplier name...",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter supplier email...",
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Enter supplier phone...",
    },
  ];

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h1 className={styles.modalTitle}>{modalTitle}</h1>
            <p className={styles.modalDescription}>
              {isViewMode
                ? "Review the selected supplier information."
                : "These changes stay local and use fake data only."}
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            {fields.map((field) => (
              <div key={field.name} className={styles.inputBox}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChangeInputs}
                  readOnly={isViewMode}
                  className={isViewMode ? styles.readOnlyField : ""}
                />
                {errors[field.name] && (
                  <p className={styles.error}>{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.row}>
            <div className={styles.textareaBox}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChangeInputs}
                placeholder="Enter supplier address..."
                readOnly={isViewMode}
                className={isViewMode ? styles.readOnlyField : ""}
              ></textarea>
              {errors.address && (
                <p className={styles.error}>{errors.address}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.actionsBox}>
              {isViewMode ? (
                <>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.edit}`}
                    onClick={() => onOpenModal("edit", supplier)}
                  >
                    Edit supplier
                  </button>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.cancel}`}
                    onClick={onCloseModal}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className={`${styles.action} ${styles.save}`}
                  >
                    {mode === "add" ? "Create supplier" : "Save changes"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.cancel}`}
                    onClick={onCloseModal}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierModal;
