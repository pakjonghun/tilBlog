import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { makeUrl } from "@libs/server/util";
import CateCheckButtons from "./CateCheckButtons";
import SortCheckboxs, { initSort, Isort } from "./SortCheckButtons";

const SearchForm = () => {
  const router = useRouter();
  const { title, date } = router.query;
  const [sort, setSort] = useState<Isort>({
    date: !date ? null : +date,
    title: !title ? null : +title,
  });

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSort(initSort);
      const url = makeUrl("search", { term: event.target.value });
      if (!url) return;
      router.push(url);
    },
    [router]
  );

  return (
    <>
      <div className="flex items-center sm:p-[0.1rem] w-full roundShadow-md border-gray-200 border-[1.5px] bg-gray-50 ring-gray-200 focus-within:ring-1 z-50">
        <svg
          className="w-5 h-5 ml-2 fill-gray-400"
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </svg>

        <input
          autoFocus
          onChange={onChange}
          type="text"
          className="w-full py-3 pl-3 placeholder:text-gray-400 focus:outline-none focus:ring-0 border-none bg-transparent text-sm"
        />
      </div>
      <div className="flex justify-between py-3">
        <SortCheckboxs sort={sort} setSort={setSort} />
        <CateCheckButtons />
      </div>
    </>
  );
};

export default SearchForm;
