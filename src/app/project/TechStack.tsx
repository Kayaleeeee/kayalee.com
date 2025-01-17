import React, { useRef } from "react";
import styles from "./projectPage.module.scss";
import { LanguageType } from "../about/utils/getCurrentLanguage";
import { useScroll, motion, useTransform } from "motion/react";
import { useIsMobile } from "../shared/hooks/useIsMobile";

const techStackList = [
  {
    title: "Next JS",
    description: "간편한 라우팅과 서버리스 API 작성을 지원",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/nextdotjs.svg",
  },
  {
    title: "Supabase",
    description: "서버리스 환경에서 빠른 백엔드 구현과 DB 관리",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/supabase.svg",
  },
  {
    title: "Vercel",
    description: "Next.js 배포에 최적화 빠르고 안정적인 배포",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/vercel.svg",
  },
  {
    title: "Scss",
    description: "복잡한 스타일 코드를 모듈화하고 유지보수를 쉽게하도록 사옹",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/sass.svg",
  },
  {
    title: "Typescript",
    description: "코드 안정성과 버그 예방을 위해 정적 타입 지원 언어 사용",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/typescript.svg",
  },
];

type Props = {
  lang: LanguageType;
};

export const TechStack = ({ lang }: Props) => {
  const { isMobile } = useIsMobile();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.86, 1],
    [0, 1, 1, 0]
  );

  const featureOpacity = techStackList.map((_, index) => {
    const start = index * 0.2; // 이전 요소와 간격 늘리기
    const mid = start + 0.05;
    const end = start + 0.2; // 나타나는 구간

    return useTransform(
      scrollYProgress,
      [0, start, mid, end], // 완전히 사라졌다가 잠시 멈춘 후 나타남
      [0, 0, 1, 1] // 나타났다 완전히 사라짐
    );
  });

  const firstRow = techStackList.slice(0, 3); // 첫 번째 줄 (3개)
  const secondRow = techStackList.slice(3); // 두 번째 줄 (2개)

  return (
    <div className={styles.footerContainer} ref={container}>
      <motion.h1 className={styles.title} style={{ opacity: titleOpacity }}>
        기술 스택
      </motion.h1>
      <div className={styles.techListWrapper}>
        {isMobile ? (
          <>
            {/* 첫 번째 줄 */}
            <div className={styles.techRow}>
              {firstRow.map((item, index) => (
                <motion.div
                  key={`${item.title}_${index}`}
                  className={styles.techItem}
                  style={{
                    top: "20vh",
                    opacity: featureOpacity[index],
                    left: `calc(((100vw - 20px) / 3) * ${index})`,
                  }}
                >
                  <div className={styles.iconWrapper}>
                    <img src={item.icon} className={styles.icon} alt="icon" />
                  </div>
                  <h3>{item.title}</h3>
                </motion.div>
              ))}
            </div>
            {/* 두 번째 줄 */}
            <div className={styles.techRow}>
              {secondRow.map((item, index) => (
                <motion.div
                  key={`${item.title}_${index + firstRow.length}`}
                  className={styles.techItem}
                  style={{
                    top: "50vh",
                    left: `calc(((100vw - 20px) / 2) * ${index} + 30px)`,

                    opacity: featureOpacity[index + firstRow.length],
                  }}
                >
                  <div className={styles.iconWrapper}>
                    <img src={item.icon} className={styles.icon} alt="icon" />
                  </div>
                  <h3>{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          // 데스크톱에서는 기존 레이아웃 유지
          techStackList.map((item, index) => (
            <motion.div
              key={`${item.title}_${index}`}
              className={styles.techItem}
              style={{
                opacity: featureOpacity[index],
                top: isMobile ? "15vh" : 0,
                left: `calc(((100vw - 100px) / 5) * ${index} + 30px)`,
              }}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} className={styles.icon} alt="icon" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
