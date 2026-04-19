import { useEffect, useState } from "react";
import CategoriesListHeader from "../components/CategoriesListHeader";
import CategoryCard from "../components/cards/CategoryCard";
import styles from "../styles/CategoriesList.module.css";
import { getCategories } from "../../../api/categories/getCategories";
import CategoryFormModal from "../components/modals/CategoryFormModal";
import DeleteAlert from "../components/modals/DeleteAlert";

function CategoriesList() {
  const [openModal, setOpenModal] = useState({
    open: false,
    mode: null,
    category: null,
  });

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [categories, setCategories] = useState([]);

  // * load categories from api
  async function loadCategories() {
    const response = await getCategories();
    setCategories(response.data);
  }
  useEffect(() => {
    loadCategories();
  }, []);

  // * open category modal
  const onOpenModal = (mode, category = null) => {
    setOpenModal({ open: true, mode: mode, category: category });
  };

  // * close category modal
  const onCloseModal = () => {
    setOpenModal({ open: false, mode: null, category: null });
  };

  // * open delete alert modal
  const onOpenAlertModal = () => {
    setShowDeleteAlert(true);
  };
  // * close delete alert modal
  const onCloseAlertModal = () => {
    setShowDeleteAlert(false);
  };

  // * remove scroll when modal is open
  useEffect(() => {
    if (openModal.open || showDeleteAlert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  const HasCategories = categories?.length > 0;



  return (
    <div className={styles.categoriesListPage}>
      <CategoriesListHeader
        onOpenModal={onOpenModal}
        total={categories.length}
      />

      <div className={styles.categoryCards}>
        {HasCategories ? (
          categories?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onOpenModal={onOpenModal}
              setShowDeleteAlert={setShowDeleteAlert}
              setCategories={setCategories}
            />
          ))
        ) : (
          <div className={styles.empty}>Empty categories</div>
        )}
      </div>

      {openModal.open && (
        <CategoryFormModal
          mode={openModal.mode}
          category={openModal.category}
          onCloseModal={onCloseModal}
          setCategories={setCategories}
        />
      )}

      {showDeleteAlert && (
        <DeleteAlert setShowDeleteAlert={setShowDeleteAlert} />
      )}
    </div>
  );
}

export default CategoriesList;
