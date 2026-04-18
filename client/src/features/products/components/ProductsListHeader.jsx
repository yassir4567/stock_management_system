import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import styles from "../styles/ProductsListHeader.module.css";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

function ProductsListHeader({ categories, suppliers }) {
  return (
    <div className={styles.header}>
      <div className={styles.filtersContainer}>
        <select name="category" className={styles.select}>
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>

        <select name="supplier" className={styles.select}>
          <option value="">Select Supplier</option>
          {suppliers?.map((supplier) => (
            <option key={supplier.id}>{supplier.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.rightSide}>
        <Input
          className={styles.searchInput}
          icon={<IoSearch className={styles.icon} />}
          placeholder="Search by name..."
        />
        <Button title="Apply filters" className={styles.applyFilter} />
      </div>
    </div>
  );
}

export default ProductsListHeader;
