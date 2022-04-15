import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@components/Layout";
import { join } from "path";
import matter from "gray-matter";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface props {
  html: string;
}

const Slug: NextPage<props> = ({ html }) => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <Layout isSearch={false} title={slug!.toString()} isMain={false}>
      <div className="html" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params?.slug) {
    const post = matter.read(
      join(process.cwd(), "posts", `${ctx.params?.slug}.md`)
    );

    const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(post.content);

    return {
      props: { html: JSON.parse(JSON.stringify(html.value)) },
    };
  }

  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Slug;
