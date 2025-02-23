import { HTMLAttributes, useRef } from "react";
import styles from "./projectPage.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const problemList = [
  "800개가 넘는 장비를 엑셀로 관리하기 너무 힘들어요 💽",
  "예약 가능한 장비를 찾는 데 시간이 너무 많이 걸려요! 😫",
  "예약 인수인계에서 자꾸 실수가 생겨요. 어떻게 하면 줄일 수 있을까요? 🤯",
  "예전에 만든 견적서를 찾을 수가 없어요. 추적이 너무 힘들어요 🪪",
];

const solutionList = [
  "장비 등록, 검색, 관리를 쉽게! 🙌",
  "기간만 넣으면 어떤 장비가 예약 가능한지 한눈에 👀",
  "시스템화된 예약 관리로 누락과 실수 없게! ✅",
  "회원별, 예약별로 정산 내역을 한 번에 확인! 💡",
];

export const Problem = () => {
  const container = useRef<HTMLDivElement>(null);

  const fadeOutEnd = 0.75;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const problemOpacity = problemList.map((_, index) => {
    const start = 0.2 + index * 0.05;
    const end = start + 0.05;

    return useTransform(
      scrollYProgress,
      [0, start, end, 0.5, 0.75],
      [0, 0, 1, 1, 0]
    );
  });

  const solutionOpacity = solutionList.map((_, index) => {
    const start = 0.45 + index * 0.05;
    const end = start + 0.05;

    return useTransform(
      scrollYProgress,
      [0, start, end, 0.7, fadeOutEnd],
      [0, 0, 1, 1, 0]
    );
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.4, 0.5],
    [0, 0, 1, 1, 0]
  );

  const solutionTitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.5, 0.6, fadeOutEnd],
    [0, 0, 1, 1, 0]
  );

  return (
    <div className={styles.problemWrapper} ref={container}>
      <motion.h3
        className={styles.title}
        style={{
          opacity: titleOpacity,
        }}
      >
        기존 문제점
      </motion.h3>

      <motion.h3
        className={styles.title}
        style={{
          opacity: solutionTitleOpacity,
        }}
      >
        해결 방안
      </motion.h3>
      <div
        style={{
          height: "300vh",
        }}
      />
      <div className={styles.problemItemWrapper}>
        {problemList.map((text, index) => {
          const justifyContent = "flex-start";
          return (
            <motion.div
              key={index}
              initial="hidden"
              className={styles.problemItem}
              style={{
                justifyContent,
                top: `calc(12vh + ${index * 20}vh)`,

                opacity: problemOpacity[index],
              }}
            >
              <TextBox text={text} direction="left" />
            </motion.div>
          );
        })}
      </div>

      <div className={styles.problemItemWrapper}>
        {solutionList.map((text, index) => {
          const justifyContent = "flex-end";
          return (
            <motion.div
              key={index}
              initial="hidden"
              className={styles.problemItem}
              style={{
                justifyContent,
                top: `calc(20vh + ${index * 20}vh)`,
                opacity: solutionOpacity[index],
              }}
            >
              <TextBox text={text} direction="right" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const TextBox = ({
  text,
  direction,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  text: string;
  direction: "right" | "left";
}) => {
  return (
    <div
      {...props}
      className={
        direction === "right" ? styles.problemBoxRight : styles.problemBoxLeft
      }
    >
      <p>{text}</p>
    </div>
  );
};
