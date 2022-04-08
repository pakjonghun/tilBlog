import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import LayoutHeader from "@components/LayoutHeader";
import { joinStyleClass } from "@libs/server/util";

interface props {
  children: React.ReactNode;
  title: string;
  isMain?: boolean;
  isSearch?: boolean;
}

const Layout: NextPage<props> = ({
  children,
  title,
  isSearch = true,
  isMain = true,
}) => {
  return (
    <section className="max-w-screen-lg mx-auto">
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutHeader isMain={isMain} isSearch={isSearch} title={title} />

      <main
        className={joinStyleClass(
          "grid place-content-start grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-5 overflow-y-auto",
          isSearch ? "h-[79vh]" : "h-[90vh]"
        )}
      >
        {children}
      </main>
    </section>
  );
};

export default Layout;
