import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const fetchNotionPageList = () => {
  return notion.databases.query({
    database_id: "392eeeeb7cda4f858420c0df4aa3312e",
  });
};
