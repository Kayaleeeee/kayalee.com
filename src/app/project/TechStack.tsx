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
    description: "안정적인 빠른 Next JS 프로젝트 배포",
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

  return (
    <div className={styles.footerContainer} ref={container}>
      <motion.h1 className={styles.title} style={{ opacity: titleOpacity }}>
        기술 스택
      </motion.h1>
      <div className={styles.techListWrapper}>
        {techStackList.map((item, index) => (
          <motion.div
            key={`${item.title}_${index}`}
            className={styles.techItem}
            style={{
              opacity: featureOpacity[index],
              top: isMobile ? `calc(12vh + ${index * 120}px)` : 0,
              left: isMobile
                ? 0
                : `calc(((100vw - 30px) / 5) * ${index} + 30px)`,
            }}
          >
            <div className={styles.iconWrapper}>
              <img src={item.icon} className={styles.icon} alt="icon" />
            </div>
            <div className={styles.textWrapper}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
