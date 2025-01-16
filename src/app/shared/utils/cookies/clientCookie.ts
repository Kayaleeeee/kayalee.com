const getCookieStore = () => {
  const cookieStore = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);
  return cookieStore;
};

export const getClientCookie = (key: string) => {
  const cookieStore = getCookieStore();
  return cookieStore[key];
};

export const setClientCookie = async (
  key: string,
  value: string,
  options?: {
    path?: string;
    expires?: string;
    maxAge?: number;
  }
) => {
  const cookieParts = [`${key}=${encodeURIComponent(value)}`];

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      const formattedKey = key === "maxAge" ? "max-age" : key;
      cookieParts.push(`${formattedKey}=${value}`);
    });
  }

  document.cookie = cookieParts.join("; ");
};
