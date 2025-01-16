import { getClientCookie } from "@/app/shared/utils/cookies/clientCookie";

export const LANGUAGE_COOKIE_KEY = "LANGUAGE_KEY";
export type LanguageType = "KR" | "EN";

export const getCurrentLanguage = (): LanguageType => {
  const cookie = getClientCookie(LANGUAGE_COOKIE_KEY);

  if (!cookie) return "KR";

  return mapLanguageToKey(cookie);
};

export const mapLanguageToKey = (lang: string): LanguageType => {
  switch (lang.toUpperCase()) {
    case "EN":
      return "EN";

    default:
      return "KR";
  }
};
