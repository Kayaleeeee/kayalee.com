import Image from "next/image";
// import Background from "../../public/images/2.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import styles from "../aboutPage.module.scss";

export const Intro = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className={styles.introWrapper}>
      <motion.div style={{ y }} className={styles.sectionContainer}>
        <div
          style={{
            marginTop: "5rem",
          }}
        />
        <h1 className={styles.title}>비즈니스 지향적인 개발자</h1>
        <div
          style={{
            marginTop: "2rem",
          }}
        />
        <p className={styles.description}>
          비지니스 문제를 해결하는게 먼저니까
        </p>
        <div className={styles.line}></div>
      </motion.div>
    </div>
  );
};
