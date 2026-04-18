import styles from "../styles/Input.module.css";

function Input({
  label = null,
  error = null,
  type = "text",
  className = null,
  icon = null ,
  ...props
}) {
  return (
    <div>
      <div  className={`${className} ${styles.inputBox}`}>
        {label && <label className={styles.input_label}>{label}</label>}

        <input type={type} className={styles.input} {...props} />
        {icon !== null && icon}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
