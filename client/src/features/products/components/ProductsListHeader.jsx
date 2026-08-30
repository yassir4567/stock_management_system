import { useState } from "react";
import Input from "../../../shared/ui/Input";
import styles from "../styles/ProductsListHeader.module.css";
import { IoSearch } from "react-icons/io5";
import { getProducts } from "../../../api/products/getProducts";

function ProductsListHeader({ setProducts, categories, suppliers }) {
  const [filters, setFilters] = useState({
    category_id: "",
    supplier_id: "",
    search: "",
  });

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilters = async (e) => {
    e.preventDefault();
 
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, val]) => val !== "" && val !== null && val !== undefined,
      ),
    );
    const params = new URLSearchParams(cleanFilters);

    const data = await getProducts(params);
    setProducts(data?.data || []);
  };

  return (
    <div className={styles.header}>
      <form onSubmit={handleFilters} className={styles.form}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterField}>
            <label htmlFor="product-category-filter">Catégorie</label>
            <select
              id="product-category-filter"
              name="category_id"
              value={filters.category_id}
              onChange={handleChangeInputs}
              className={styles.select}
            >
              <option value="">Tous</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="product-supplier-filter">Fournisseur</label>
            <select
              id="product-supplier-filter"
              name="supplier_id"
              value={filters.supplier_id}
              onChange={handleChangeInputs}
              className={styles.select}
            >
              <option value="">Tous</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.filterField}>
            <label htmlFor="product-search-filter">Recherche</label>
            <Input
              id="product-search-filter"
              className={styles.searchInput}
              icon={<IoSearch className={styles.icon} />}
              placeholder="Rechercher par nom..."
              name="search"
              value={filters.search}
              onChange={handleChangeInputs}
            />
          </div>
          <button type="submit" className={styles.applyFilter}>
            Appliquer les filtres
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductsListHeader;
