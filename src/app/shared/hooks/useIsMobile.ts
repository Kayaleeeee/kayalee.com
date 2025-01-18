import { useEffect, useState } from "react";

const MOBILE_SIZE = 500;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth <= MOBILE_SIZE) {
      setIsMobile(true);
    }
  }, []);

  return { isMobile };
};
