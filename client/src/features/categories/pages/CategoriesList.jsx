import { useEffect, useState } from "react";
import CategoriesListHeader from "../components/CategoriesListHeader";
import CategoryCard from "../components/cards/CategoryCard";
import styles from "../styles/CategoriesList.module.css";
import { getCategories } from "../../../api/categories/getCategories";
import CategoryFormModal from "../components/modals/CategoryFormModal";
function CategoriesList() {
  const [openModal, setOpenModal] = useState({
    open: false,
    mode: null,
    category: null,
  });

  const [categories, setCategories] = useState([]);

  // * load categories from api
  async function loadCategories() {
    const response = await getCategories();
    setCategories(response.data);
  }
  useEffect(() => {
    loadCategories();
  }, []);

  // * handle open category modal

  const onOpenModal = (mode, category = null) => {
    setOpenModal({ open: true, mode: mode, category: category });
  };

  const onCloseModal = () => {
    setOpenModal({ open: false, mode: null, category: null });
  };

  // * remove scroll when modal is open
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

  const HasCategories = categories?.length > 0;

  return (
    <div className={styles.categoriesListPage}>
      <CategoriesListHeader onOpenModal={onOpenModal} total={categories.length} />

      <div className={styles.categoryCards}>
        {HasCategories ? (
          categories?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onOpenModal={onOpenModal}
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
    </div>
  );
}

export default CategoriesList;
