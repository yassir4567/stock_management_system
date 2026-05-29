import { useMemo, useState } from "react";
import styles from "../../styles/SupplierModal.module.css";
import { createSupplier } from "../../../../api/suppliers/createSupplier";
import { sortObject } from "../../../../helpers/helpers";
import { updateSupplier } from "../../../../api/suppliers/updateSupplier";

function SupplierModal({
  mode,
  supplier = null,
  onCloseModal,
  onOpenModal,
  setSuppliers,
}) {
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

  const [generalError, setGeneralError] = useState("");

  const initSupplier = useMemo(() => {
    return {
      name: supplier?.name || "",
      email: supplier?.email || "",
      phone: supplier?.phone || "",
      address: supplier?.address || "",
    };
  }, [supplier]);

  const modalTitle =
    mode === "add" ? "Ajouter un fournisseur" : "Modifier le fournisseur";

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data) => {
    const formErrors = {};

    if (!data.name.trim()) {
      formErrors.name = "Le nom est requis";
    }

    if (!data.email.trim()) {
      formErrors.email = "L'email est requis";
    }

    if (!data.phone.trim()) {
      formErrors.phone = "Le téléphone est requis";
    }

    if (!data.address.trim()) {
      formErrors.address = "L'adresse est requise";
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
    } else if (mode === "edit") {
      if (
        JSON.stringify(sortObject(initSupplier)) ===
        JSON.stringify(sortObject(form))
      ) {
        setGeneralError("Aucune modification");
        return;
      }
      const result = await updateSupplier(form, supplier.id);
      const data = result.data;
      setSuppliers((prev) =>
        prev.map((sp) => (sp.id === supplier.id ? data : sp)),
      );
    }

    onCloseModal();
  };

  const fields = [
    {
      label: "Nom",
      name: "name",
      type: "text",
      placeholder: "Saisir le nom du fournisseur...",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Saisir l'email du fournisseur...",
    },
    {
      label: "Téléphone",
      name: "phone",
      type: "text",
      placeholder: "Saisir le téléphone du fournisseur...",
    },
  ];

  return (
    <div className={styles.container} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>{modalTitle}</h1>
          {generalError && <p className={styles.err}>{generalError}</p>}
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
                />
                {errors[field.name] && (
                  <p className={styles.error}>{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.row}>
            <div className={styles.textareaBox}>
              <label htmlFor="address">Adresse</label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChangeInputs}
                placeholder="Saisir l'adresse du fournisseur..."
              ></textarea>
              {errors.address && (
                <p className={styles.error}>{errors.address}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.actionsBox}>
              <button
                type="submit"
                className={`${styles.action} ${styles.save}`}
              >
                {mode === "add"
                  ? "Créer le fournisseur"
                  : "Enregistrer les modifications"}
              </button>
              <button
                type="button"
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

export default SupplierModal;
