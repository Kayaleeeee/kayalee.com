import { useScroll, useTransform, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import styles from "../aboutPage.module.scss";
import { LanguageType } from "../utils/getCurrentLanguage";
import { translationText } from "../utils/translationText";

type Props = {
  lang: LanguageType;
};

export const Intro = ({ lang }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  const { title = "", description } = useMemo(() => {
    return translationText["intro"][lang];
  }, [lang]);

  return (
    <div className={styles.introWrapper}>
      <motion.div style={{ y }} className={styles.sectionContainer}>
        <div
          style={{
            marginTop: "5rem",
          }}
        />
        <h1 className={styles.title}>{title}</h1>
        <div
          style={{
            marginTop: "2rem",
          }}
        />
        <p className={styles.description}>{description[0]}</p>
        <div className={styles.line}></div>
      </motion.div>
    </div>
  );
};
