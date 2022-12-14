import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

// 정적 페이지의 path를 알려주는 역할
export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, extension] = file.split(".");
    return {
      params: {
        slug: name,
      },
    };
  });
  return {
    paths: files, // 핵심
    fallback: false,
  };
}

// 정적 페이지 Props
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      data: data,
      post: value,
    },
  };
};

export default Post;
