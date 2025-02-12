import { useMemo } from "react";
import styles from "../aboutPage.module.scss";
import { LanguageType } from "../utils/getCurrentLanguage";
import { translationText } from "../utils/translationText";

type Props = {
  lang: LanguageType;
};

export const Intro = ({ lang }: Props) => {
  const { title = "", description } = useMemo(() => {
    return translationText["intro"][lang];
  }, [lang]);

  return (
    <div className={styles.introWrapper}>
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
    </div>
  );
};
