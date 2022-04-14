import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { makeUrl } from "@libs/server/util";
import CateCheckButtons from "./CateCheckButtons";
import SortCheckboxs, { initSort, Isort } from "./SortCheckButtons";

const SearchForm = () => {
  const router = useRouter();
  const { term, title, date } = router.query;
  const [sort, setSort] = useState<Isort>({
    date: !date ? null : +date,
    title: !title ? null : +title,
  });
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const url = makeUrl("search", {
        term: term?.toString() || "",
        ...(title && { title: title.toString() }),
        ...(date && { date: date.toString() }),
      });

      router.push(url);
    },
    [router, title, date, term]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSort(initSort);
      const url = makeUrl("search", { term: event.target.value });
      router.push(url);
    },
    [router]
  );

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="relative flex items-center w-full bg-gray-600 rounded-sm"
      >
        <input
          autoFocus
          value={term}
          onChange={onChange}
          type="text"
          placeholder="Search"
          className="w-full py-3 px-10 transition ring-gray-400 focus:ring-1 focus:outline-none bg-transparent"
        />
        <button
          type="submit"
          className="absolute left-0 py-3 px-2 w-[8%] transition scale"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      <div className="flex justify-between py-3">
        <SortCheckboxs sort={sort} setSort={setSort} />
        <CateCheckButtons />
      </div>
    </>
  );
};

export default SearchForm;
