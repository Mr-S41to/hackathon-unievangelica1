import styles from "./Button.module.css";

export default function Button({ onClick, title }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
