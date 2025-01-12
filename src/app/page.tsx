import { RainEffectContainer } from "./Home/RainEffectContainer";
import styles from "./page.module.scss";
import { NavBar } from "./shared/components";

const Home = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <RainEffectContainer />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
