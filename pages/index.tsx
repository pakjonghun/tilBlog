import { readdirSync, readFileSync } from "fs";
import type { NextPage } from "next";
import matter from "gray-matter";
import Main from "@components/Main";
import { MainProps } from "@libs/server/interface";

const Home: NextPage<MainProps> = ({ posts }) => {
  return <Main posts={posts} title={"Home"} />;
};

export const getStaticProps = async () => {
  const posts = readdirSync("./posts").map((post) => {
    const file = matter(readFileSync(`./posts/${post}`, "utf-8"));
    return { ...file.data, slug: post.split(".")[0] };
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};

export default Home;
