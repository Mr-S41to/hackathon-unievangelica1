import styles from "./Label.module.css";

export default function Label({title}){
    return (
        <label className={styles.label}>
            {title}
        </label>
    )
}