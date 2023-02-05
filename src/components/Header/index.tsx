import styles from "./style.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={"container"}>
        <img
          src={"/assets/images/logo.png"}
          alt="logo"
          className={styles.logo}
        />
      </div>
    </div>
  );
}
