import { useState } from "react";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import styles from "../styles/ProductsListHeader.module.css";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { filterProducts } from "../../../api/products/filterProducts";

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
        ([_, val]) => val !== "" && val !== null && val !== undefined,
      ),
    );
    const params = new URLSearchParams(cleanFilters);

    const data = await filterProducts(params);
    setProducts(data?.data || []);
  };

  return (
    <div className={styles.header}>
      <form onSubmit={handleFilters} className={styles.form}>
        <div className={styles.filtersContainer}>
          <select
            name="category_id"
            value={filters.category_id}
            onChange={handleChangeInputs}
            className={styles.select}
          >
            <option value="">All</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="supplier_id"
            value={filters.supplier_id}
            onChange={handleChangeInputs}
            className={styles.select}
          >
            <option value="">All</option>
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.rightSide}>
          <Input
            className={styles.searchInput}
            icon={<IoSearch className={styles.icon} />}
            placeholder="Search by name..."
            name="search"
            value={filters.search}
            onChange={handleChangeInputs}
          />
          <button type="submit" className={styles.applyFilter}>
            Apply filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductsListHeader;
