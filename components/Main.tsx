import { readdirSync, readFileSync } from "fs";
import type { NextPage } from "next";
import Layout from "@components/Layout";
import Link from "next/link";

interface props {
  posts: {
    date: string;
    category: string;
    slug: string;
  }[];
  title: string;
  isMain?: boolean;
}

const Main: NextPage<props> = ({ posts, title, isMain = true }) => {
  return (
    <Layout title={title} isMain={isMain}>
      {posts.map(({ date, category, slug }, index) => (
        <article
          key={index}
          className="bg-gray-50 h-fit shadow-base transition scale cursor-pointer rounded-md"
        >
          <Link href={`/${slug}`}>
            <a className="block py-5 px-8">
              <h2 className="mb-3">{slug}</h2>
              <p className="small">Date : {date.slice(0, 10)}</p>
              <p className="small">Category : {category}</p>
            </a>
          </Link>
        </article>
      ))}
    </Layout>
  );
};

export default Main;
