import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../aboutPage.module.scss";
import { LanguageType } from "../utils/getCurrentLanguage";

type Props = {
  lang: LanguageType;
};

export const Section = ({ lang }: Props) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 애니메이션 값
  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 1],
    [1, 2.5, 2.5, 1]
  ); // 원 크기 변화
  const circleX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // 원 위치 변화
  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // 원 위치 변화
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 1],
    [0.3, 1, 1, 0]
  ); // 텍스트 사라짐

  return (
    <div ref={containerRef} className={styles.sectionContainer}>
      <motion.div
        className={styles.circle}
        style={{
          scale: circleScale,
          x: circleX,
          y: circleY,
        }}
      />
      <motion.div
        className={styles.text}
        style={{
          opacity: textOpacity,
        }}
      >
        {lang === "KR" ? (
          <p>
            <span className={styles.highlight}>아름다운 UI</span>와{" "}
            <span className={styles.highlight}>유저 경험</span>을 만드는 일에도
            항상 열려있습니다.
            <br />
            단순히 작동하는 서비스가 아니라, 기억에 남는 경험을 만들고 싶어요.
          </p>
        ) : (
          <p>
            Open to Crafting{" "}
            <span className={styles.highlight}>Beautiful UIs </span> &
            <span className={styles.highlight}> User Experiences</span>
            <br />
            Committed to creating not just functional services, but memorable
            and impactful user experiences
          </p>
        )}
      </motion.div>
    </div>
  );
};
