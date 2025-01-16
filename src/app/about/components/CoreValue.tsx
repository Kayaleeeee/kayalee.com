import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import styles from "../aboutPage.module.scss";
import { LanguageType } from "../utils/getCurrentLanguage";
import { translationText } from "../utils/translationText";

type Props = {
  lang: LanguageType;
};

export const CoreValue = ({ lang }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const { description } = translationText["coreValue"][lang];

  return (
    <div ref={container} className={styles.coreValueContainer}>
      <div className={styles.content}>
        <div className={styles.textUpperSmall}>
          {description.map((char, index) => {
            const start = (index / description.length) * 0.4; // 각 텍스트의 시작 지점
            const end = ((index + 1) / description.length) * 0.5; // 각 텍스트의 끝 지점

            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const translateY = useTransform(
              scrollYProgress,
              [start, end],
              [50, 0]
            );
            const fontWeight = useTransform(
              scrollYProgress,
              [start, end],
              [400, 700]
            );

            return (
              <motion.p
                key={index}
                className={styles.letter}
                style={{
                  opacity: opacity,
                  y: translateY,
                  marginBottom: "8px",
                  fontWeight: lang === "KR" ? fontWeight : 400,
                }}
              >
                {char}
              </motion.p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
