"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./aboutPage.module.scss";
import { Intro } from "./components/Intro";
import { Description } from "./components/Description";
import { Section } from "./components/Section";
import Lenis from "lenis";
import { Footer } from "./components/Footer";
import { CoreValue } from "./components/CoreValue";

import { setClientCookie } from "../shared/utils/cookies/clientCookie";
import {
  getCurrentLanguage,
  LANGUAGE_COOKIE_KEY,
  LanguageType,
  mapLanguageToKey,
} from "./utils/getCurrentLanguage";

const langList: { key: LanguageType; value: string }[] = [
  { key: "KR", value: "한국어" },
  { key: "EN", value: "English" },
];

const AboutPage = () => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState<LanguageType | null>(null);

  const setLanguageCookie = (lang: string) => {
    if (typeof window === "undefined") return;

    const value = mapLanguageToKey(lang);

    setCurrentLang(mapLanguageToKey(value));
    setClientCookie(LANGUAGE_COOKIE_KEY, value, {
      maxAge: 30 * 24 * 60 * 60,
    });
  };

  const configureLanguageByCookie = async () => {
    const currentLang = getCurrentLanguage();

    if (!currentLang) {
      setLanguageCookie("KR");
    } else {
      setLanguageCookie(currentLang);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    configureLanguageByCookie();
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  if (!currentLang) return null;

  return (
    <div ref={scrollingContainer} className={styles.wrapper}>
      <div className={styles.languageOptionList}>
        {langList.map((item) => (
          <div
            key={item.key}
            onClick={() => setLanguageCookie(item.key)}
            className={
              currentLang === item.key ? styles.selectedItem : styles.item
            }
          >
            {item.value}
          </div>
        ))}
      </div>

      <main>
        <Intro lang={currentLang} />
        <Description lang={currentLang} />
        <CoreValue lang={currentLang} />
        <Section lang={currentLang} />
        <Footer lang={currentLang} />
      </main>
    </div>
  );
};

export default AboutPage;
