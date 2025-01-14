import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import styles from "../aboutPage.module.scss";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Lenis from "lenis";
import Picture1 from "../../../../public/1.jpg";
import Picture2 from "../../../../public/2.jpg";
import Picture3 from "../../../../public/3.jpg";

export const Description = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.spacer}>
        <div ref={container}>
          <Slide
            src={Picture1}
            direction={"left"}
            left={"-40%"}
            progress={scrollYProgress}
          />
          <Slide
            src={Picture2}
            direction={"right"}
            left={"-25%"}
            progress={scrollYProgress}
          />
          <Slide
            src={Picture3}
            direction={"left"}
            left={"-75%"}
            progress={scrollYProgress}
          />
        </div>
      </div>
      <div className={styles.spacer}>
        <p
          className={styles.description}
          style={{
            padding: "10vw 0",
            textAlign: "center",
          }}
        >
          다양한 분야에서 문제를 정의하고 해결하며 실질적인 비즈니스 성과로
          연결했어요.
        </p>
      </div>
    </div>
  );
};

const Slide = (props: {
  direction: "left" | "right";
  progress: MotionValue<number>;
  left: string;
  src: StaticImageData;
}) => {
  const direction = props.direction == "left" ? -1 : 1;
  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction]
  );

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className={styles.scrollContainer}
    >
      <Phrase src={props.src} text={"e-commerce"} />
      <Phrase src={props.src} text={"fandom platform"} />
      <Phrase src={props.src} text={"global business"} />
    </motion.div>
  );
};

const Phrase = ({ src, text }: { src: StaticImageData; text: string }) => {
  return (
    <div className={styles.phrase}>
      <p className={styles.text}>{text}</p>
      <span className={styles.image}>
        <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
      </span>
    </div>
  );
};
