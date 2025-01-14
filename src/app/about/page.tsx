"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./aboutPage.module.scss";
import { Intro } from "./components/Intro";
import { Description } from "./components/Description";
import Section from "./components/Section";
import Lenis from "lenis";
import { Footer } from "./components/Footer";

const langList = [
  { key: "kr", value: "한국어" },
  { key: "en", value: "English" },
];

const AboutPage = () => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState<string>("kr");

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div ref={scrollingContainer} className={styles.wrapper}>
      <div className={styles.languageOptionList}>
        {langList.map((item) => (
          <div
            key={item.key}
            onClick={() => setCurrentLang(item.key)}
            className={
              currentLang === item.key ? styles.selectedItem : styles.item
            }
          >
            {item.value}
          </div>
        ))}
      </div>

      <main>
        <Intro />
        <Description />
        <Section />
        <Footer />
      </main>
    </div>
  );
};

export default AboutPage;
