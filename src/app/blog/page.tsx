import { getNotionPageList } from "./actions/getNotionPageList";

const BlogPage = async () => {
  const result = await getNotionPageList();
  console.log(result);
  return <></>;
};

export default BlogPage;
