import Main from "@components/Main";
import { MainProps } from "@libs/server/interface";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetServerSideProps, NextPage } from "next";
import { join } from "path";

interface props {
  posts: MainProps[];
}

const SearchResult: NextPage<props> = ({ posts }) => {
  return <Main isMain={false} posts={posts} title={`${posts.length}건 검색`} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { term, title, date, cate } = ctx.query;
  const word = term?.toString().toLocaleLowerCase().trim();
  const posts: MainProps[] = [];
  readdirSync(join(process.cwd(), "posts")).forEach((post) => {
    const {
      data: { category, date },
      content,
    } = matter(readFileSync(join(process.cwd(), "posts", post)));

    if (!cate?.toString().trim()) {
      if (!word) posts.push({ category, date, slug: post.split(".")[0] });
      if (word && (content.includes(word) || category.includes(word))) {
        posts.push({ category, date, slug: post.split(".")[0] });
      }
    } else {
      const categories = category
        .split(",")
        .map((v: string) => v.trim().toLocaleLowerCase());

      const urlCate = cate
        .toString()
        .split(",")
        .map((v) => v.trim());

      let isMatch = true;
      for (const c of urlCate) {
        if (!categories.includes(c.toLocaleLowerCase())) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        posts.push({ category, date, slug: post.split(".")[0] });
      }
    }
  });

  if (title || date) {
    if (title === "1") posts.sort((a, b) => b.slug.localeCompare(a.slug));
    if (title === "0") posts.sort((a, b) => a.slug.localeCompare(b.slug));
    if (date === "1") posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    if (date === "0") posts.sort((a, b) => a.date.getTime() - b.date.getTime());
  } else {
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};

export default SearchResult;
