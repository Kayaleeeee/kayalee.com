"use client";

import { useRef } from "react";
import styles from "./rainEffectContainer.module.scss";
import { useRainEffect } from "./hooks/useRainEffect";

export const RainEffectContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useRainEffect(containerRef);

  return <div className={styles.containerWrapper} ref={containerRef} />;
};
