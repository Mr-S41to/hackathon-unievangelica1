import styles from "./Input.module.css";

export default function Input({
  title,
  type,
  value,
  onChange,
  placeholder,
  maxlength,
  size,
  disabled,
}) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{title}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        maxlength={maxlength}
        disabled={disabled}
      />
    </div>
  );
}
