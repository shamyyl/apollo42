import styles from "./HeaderSection.module.scss";

export const HeaderSection = () => {
  return (
    <header className={styles['header-section']}>
      <h1>Market</h1>
      <button type="button">
        <div className={styles["content"]}>
          <span>1 month</span>
          <img
            src="/icons/arrow-up.svg"
            alt="arrow"
            className={styles["arrow"]}
          />
        </div>
      </button>
    </header>
  );
};
