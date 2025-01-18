import styles from "./projectPage.module.scss";

export const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <h1 className={styles.title} data-scroll data-scroll-speed="0.7">
        Rental Assist
      </h1>
      <h3 className={styles.description}>카메라 장비 렌탈 관리를 더 쉽게</h3>
    </div>
  );
};
