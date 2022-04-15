import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CheckButton from "./CheckButton";
import { joinStyleClass, makeUrl } from "@libs/server/util";

export interface Isort {
  date: null | number;
  title: null | number;
}

interface IurlSort {
  date?: number;
  title?: number;
}

interface props {
  sort: Isort;
  setSort: React.Dispatch<React.SetStateAction<Isort>>;
}

export const initSort = { date: null, title: null };

const SortCheckButtons: NextPage<props> = ({ sort, setSort }) => {
  const router = useRouter();
  const { term } = router.query;
  const checkBoxs = Object.keys(sort) as ["date", "title"];

  const onSort = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const selectedSort = (event.target as HTMLInputElement)
        .value as keyof Isort;

      const selectedSorts = {
        ...initSort,
        [selectedSort]: sort[selectedSort] ? 0 : 1,
      };

      setSort(selectedSorts);

      const exceptNull = checkBoxs.reduce((acc: IurlSort, cur) => {
        const curSort = selectedSorts[cur];
        if (curSort === null) return acc;
        acc[cur] = curSort;
        return acc;
      }, {});

      const url = makeUrl("search", {
        term: term?.toString() || "",
        ...exceptNull,
      });

      router.push(url);
    },
    [sort, router, checkBoxs, term, setSort]
  );

  return (
    <div className="grid grid-cols-[repeat(2,minmax(4.2rem,_1fr))]">
      {checkBoxs.map((key) => (
        <CheckButton
          key={key}
          isSelected={sort[key] !== null}
          id={key}
          onClick={onSort}
        >
          {!!(sort[key] !== null && sort[key]) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          )}

          {!!(sort[key] !== null && !sort[key]) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          )}
        </CheckButton>
      ))}
    </div>
  );
};

export default SortCheckButtons;
