import Main from "@components/Main";
import { MainProps } from "@libs/server/interface";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

const SearchResult: NextPage<MainProps> = ({ posts }) => {
  return <Main isMain={false} posts={posts} title={`${posts.length}건 검색`} />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const term = ctx.params?.term?.toString();
  if (!term?.trim()) {
    return {
      props: {},
    };
  }
  const posts: { category: string; date: string; slug: string }[] = [];

  readdirSync("./posts").forEach((post) => {
    const {
      data: { category, date },
      content,
    } = matter(readFileSync(`./posts/${post}`));
    if (category.includes(term) || content.includes(term)) {
      posts.push({ category, date, slug: post.split(".")[0] });
    }
  });

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SearchResult;
