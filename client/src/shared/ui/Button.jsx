import styles from "../styles/Button.module.css";

function Button({ title, icon = null, className = null, ...props }) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {icon !== null && icon}
      <span>{title}</span>
    </button>
  );
}

export default Button;
