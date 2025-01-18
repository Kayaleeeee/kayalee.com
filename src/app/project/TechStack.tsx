import React, { useRef } from "react";
import styles from "./projectPage.module.scss";
import { LanguageType } from "../about/utils/getCurrentLanguage";
import { useScroll, motion, useTransform } from "motion/react";

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
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.86], [0, 1, 1]);

  const roleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.86], [0, 1, 1]);

  const featureOpacity = techStackList.map((_, index) => {
    const start = index * 0.05 + 0.2;

    return useTransform(scrollYProgress, [0, start], [0, 1]);
  });

  return (
    <div className={styles.footerContainer} ref={container}>
      <motion.h1 className={styles.title} style={{ opacity: titleOpacity }}>
        기술 스택 & 역할
      </motion.h1>

      <motion.div className={styles.wrapper}>
        <motion.div
          className={styles.role}
          style={{
            opacity: roleOpacity,
          }}
        >
          <p>
            <b>역할:</b> 프론트엔드 개발, 백엔드 개발, 기획 및 디자인
          </p>
        </motion.div>

        <div className={styles.techListWrapper}>
          {techStackList.map((item, index) => (
            <motion.div
              key={`${item.title}_${index}`}
              className={styles.techItem}
              style={{
                opacity: featureOpacity[index],
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
      </motion.div>
    </div>
  );
};
