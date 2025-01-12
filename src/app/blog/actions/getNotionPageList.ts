import { fetchNotionPageList } from "../api/notion";

export const getNotionPageList = async () => {
  try {
    await fetchNotionPageList();
  } catch (e) {
    return { list: [], status: "error" };
  }
};
