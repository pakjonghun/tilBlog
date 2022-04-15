import { readdirSync, readFileSync } from "fs";
import type { NextPage } from "next";
import Layout from "@components/Layout";
import Link from "next/link";
import { MainProps } from "@libs/server/interface";

interface props {
  posts: MainProps[];
  title: string;
  isMain?: boolean;
}

const Main: NextPage<props> = ({ posts, title, isMain = true }) => {
  return (
    <Layout title={title} isMain={isMain}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-content-start">
        {posts.map(({ date, category, slug }, index) => (
          <article
            key={index}
            className="bg-gray-50 h-fit shadow-base transition scale cursor-pointer rounded-md text-gray-600"
          >
            <Link href={`/${slug}`}>
              <a className="block py-5 px-8">
                <h2 className="mb-3">{slug}</h2>
                <p className="small">Date : {date.toString().slice(0, 10)}</p>
                <p className="small">Category : {category}</p>
              </a>
            </Link>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Main;
