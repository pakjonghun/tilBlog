import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";

const SearchForm = () => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!term.trim()) {
        return setError("검색어를 입력하세요.");
      }
      setTerm("");
      router.push(`/search/${term}`);
    },
    [router, term]
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) setError("");
      setTerm(event.target.value);
    },
    [error]
  );

  const onSort = useCallback(
    (event: React.MouseEvent) => {
      const value = (event.target as HTMLInputElement).value;
      const term = router.query.term;
      router.push(`/search/${term}?sort=${value}`);
    },
    [router]
  );

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex items-center w-full bg-gray-600 rounded-sm"
      >
        <input
          onChange={onChange}
          value={term}
          type="text"
          placeholder="Search"
          className="w-[92%] py-3 px-5 transition ring-gray-400 focus:ring-1 focus:outline-none bg-transparent"
        />
        <button type="submit" className="py-3 px-2 w-[8%] transition scale">
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
      {error && <small className="text-red-500 font-medium"> {error}</small>}
    </>
  );
};

export default SearchForm;
