import Layout from "@components/Layout";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface props {
  html: string;
}

const Slug: NextPage<props> = ({ html }) => {
  return (
    <Layout isSearch={false} title={"Asdf"} isMain={false}>
      <div className="html" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params?.slug) {
    const post = matter.read(`./posts/${ctx.params?.slug}.md`);
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
