import Image from "next/image";
import Background from "../../public/images/1.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import styles from "../aboutPage.module.scss";

export default function Section() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={container}
      className={styles.container}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className={styles.content}>
        <p className={styles.textUpperSmall}>
          아름다운 UI와 유저 중심의 경험을 만드는 일에도 항상 열려있어요. 단순히
          작동하는 서비스가 아니라, 기억에 남는 경험을 만들고 싶어서요.
        </p>
        <p className={styles.textUpperLarge}>Background Parallax</p>
      </div>
      <div className={styles.backgroundContainer}>
        <motion.div style={{ y }} className={styles.background}>
          <div
            style={{
              height: "100vh",
            }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
}
