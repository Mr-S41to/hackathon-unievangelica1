import styles from "./Radio.module.css";

export default function Radio({ value, name, title, onChange, checked }) {
  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radio}
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <label className={styles.title}>{title}</label>
    </div>
  );
}
