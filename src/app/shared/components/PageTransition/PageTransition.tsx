"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import styles from "./pageTransition.module.scss";

export const PageTransition = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();

  const isHome = pathName === "/";

  if (isHome) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <div>{children}</div>

        <motion.div
          className={styles.slideIn}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className={styles.slideOut}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
