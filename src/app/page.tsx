import { RainEffectContainer } from "./home/RainEffectContainer";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RainEffectContainer />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
