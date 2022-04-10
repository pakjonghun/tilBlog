import { joinStyleClass } from "@libs/server/util";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import SearchForm from "@components/SearchForm";
import { route } from "next/dist/server/router";

interface props {
  title: string;
  isMain: boolean;
  isSearch: boolean;
}

const LayoutHeader: NextPage<props> = ({ title, isMain, isSearch }) => {
  const router = useRouter();
  const onPrevious = useCallback(() => {
    router.back();
  }, [router]);
  const onHome = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <header className={joinStyleClass("bg-gray-800 z-10")}>
      <nav className="flex flex-col py-7 px-5  text-gray-50">
        <div className="flex">
          {!isMain && (
            <button onClick={onPrevious} className="transition scale h-fit">
              &larr;
            </button>
          )}
          <h2
            className={joinStyleClass(
              "mx-auto font-medium",
              isSearch ? "mb-10" : ""
            )}
          >
            {title}
          </h2>

          {!isMain && (
            <button onClick={onHome} className="transition scale h-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          )}
        </div>
        {isSearch && <SearchForm />}
      </nav>
    </header>
  );
};

export default LayoutHeader;
