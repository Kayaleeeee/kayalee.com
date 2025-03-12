"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

export const AmplitudeProvider = () => {
  const amplitudeKey = process.env.NEXT_PUBLIC_AMPLITUDE_KEY || "";

  useEffect(() => {
    amplitude.init(amplitudeKey, {
      autocapture: true,
    });
  }, []);
  return null;
};
