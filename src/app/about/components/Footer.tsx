import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import styles from "../aboutPage.module.scss";
import { LanguageType } from "../utils/getCurrentLanguage";
import { translationText } from "../utils/translationText";

type Props = {
  lang: LanguageType;
};

export const Footer = ({ lang }: Props) => {
  const offsetValue = 42;
  const container = useRef(null);
  const paths = useRef<SVGTextPathElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        path.setAttribute(
          "startOffset",
          -offsetValue + i * offsetValue + e * offsetValue + "%"
        );
      });
    });
  }, []);

  const { description } = translationText["footer"][lang];

  return (
    <div ref={container} className={styles.footerContainer}>
      <div className={styles.openToPosition}>{description[0]}</div>

      <svg className={styles.svgWrapper} viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className={styles.text}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => {
                  if (ref) paths.current[i] = ref;
                }}
                startOffset={i * 40 + "%"}
                href="#curve"
              >
                CONTACT ME CONTACT ME CONTACT ME
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
};

const Logos = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const y = useTransform(scrollProgress, [0, 1], [-200, 0]);
  const iconList = [
    {
      label: "linkedIn",
      src: "/icons/linkedin.png",
      onClick: () => {
        window.open(
          "https://www.linkedin.com/in/gayeon-lee-2448a1134/",
          "target"
        );
      },
    },
    {
      label: "github",
      src: "/icons/github.png",
      onClick: () => {
        window.open("https://github.com/Kayaleeeee", "target");
      },
    },
    {
      label: "email",
      src: "/icons/email.png",
      onClick: () => {
        const mailtoLink = `mailto:gayeon71057@gmail.com`;
        window.location.href = mailtoLink;
      },
    },
  ];

  return (
    <div className={styles.logosContainer}>
      <motion.div style={{ y }} className={styles.logos}>
        {iconList.map((icon) => {
          return (
            <img
              onClick={icon.onClick}
              key={`img_${icon.label}`}
              className={styles.logo}
              src={icon.src}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
