import { useEffect, useRef, useState } from "react";
import styles from "./projectPage.module.scss";
import { useScroll, useTransform, motion } from "motion/react";
import { Video } from "./Video";
import { useIsMobile } from "../shared/hooks/useIsMobile";

const featureList = [
  {
    title: "견적 & 예약을 한 번에",
    description:
      "풀세트부터 개별 장비까지, 빠르게 견적서를 생성하고 예약을 확정 할 수 있어요.\n\n복잡했던 반납 절차를 클릭 몇 번으로 간단히 처리하고 실수를 줄일 수 있어요!",
    source: [],
  },
  {
    title: "실시간 예약 현황 확인",
    description:
      "대여 가능한 장비를 실시간으로 파악하고 고객 문의에 바로 대응할 수 있도록",
    source: ["/image/calendar.png", "/image/equipment.png"],
  },

  {
    title: "매출 데이터 통합 관리",
    description:
      "월별 매출 데이터를 시각적으로 확인하고 정산 내역을 체계적으로 관리할 수 있어요.",
    source: ["/image/payment.png"],
  },
];

export const MainFeature = () => {
  const [isShowingVideo, setIsShowingVideo] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const { isMobile } = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.8, 0.84, 1],
    [0, 1, 1, 0, 0]
  );

  const featureOpacity = featureList.map((_, index) => {
    const start = index * 0.3; // 이전 요소와 간격 늘리기
    const mid = start + 0.05;
    const end = start + 0.2; // 나타나는 구간
    const pause = end + 0.01; // 텀(일시 정지) 추가

    return useTransform(
      scrollYProgress,
      [0, start, mid, end, pause, pause + 0.1], // 완전히 사라졌다가 잠시 멈춘 후 나타남
      [0, 0, 1, 1, 1, 0] // 나타났다 완전히 사라짐
    );
  });

  const imageOpacities = featureList.map((feature, featureIndex) =>
    feature.source.map((_, imageIndex) => {
      const baseStart = featureIndex * 0.35; // 각 feature의 시작 시간

      const imageStart = baseStart + imageIndex * 0.1; // 이미지별 간격 추가
      const imageMid = imageStart + 0.01;
      const imageEnd = imageStart + 0.1; // 이미지가 나타나는 구간

      return useTransform(
        scrollYProgress,
        [imageStart, imageMid, imageEnd, imageEnd + 0.1],
        [0, 1, 1, 0] // 나타났다 사라짐
      );
    })
  );

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      setIsShowingVideo(v >= 0.08 && v < 0.28);
    });
  }, []);

  return (
    <div className={styles.mainFeatureWrapper} ref={container}>
      <motion.h1 className={styles.title} style={{ opacity: titleOpacity }}>
        메인 기능
      </motion.h1>
      <div
        style={{
          height: "200vh",
        }}
      />
      <div className={styles.featureListWrapper}>
        {featureList.map((feature, featureIndex) => {
          return (
            <motion.div
              key={featureIndex}
              initial="hidden"
              className={styles.featureItemWrapper}
              style={{
                opacity: featureOpacity[featureIndex],
              }}
            >
              <div className={styles.featureItem}>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <div className={styles.imageContainer}>
                  {feature.source.map((item, imageIndex) => {
                    return (
                      <motion.img
                        key={`image_${imageIndex}`}
                        src={item}
                        alt="feature image"
                        style={{
                          zIndex: imageIndex,
                          opacity: imageOpacities[featureIndex][imageIndex],
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
        {isShowingVideo && (
          <div
            style={{
              position: "fixed",
              bottom: "10vh",
            }}
          >
            <Video />
          </div>
        )}
      </div>
    </div>
  );
};
