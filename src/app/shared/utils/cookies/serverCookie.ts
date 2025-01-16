import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(key);
};

export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(key, value);
};
