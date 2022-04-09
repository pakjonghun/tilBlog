import { makeUrl } from "@libs/server/util";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import CheckButton from "./CheckButton";

const CateCheckButtons = () => {
  const categories = ["next", "til"];
  const router = useRouter();
  const { term, title, date, cate } = router.query;
  const onCategory = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const selected = (event.target as HTMLInputElement).value;

      const url = makeUrl("search", {
        term: term?.toString() || "",
        ...(title && { title: title.toString() }),
        ...(date && { date: date.toString() }),
        cate: selected,
      });

      router.push(url);
    },
    [date, term, title, router]
  );

  const curCategories =
    cate &&
    cate
      .toString()
      .split(" ")
      .map((c: string) => c.trim());

  return (
    <div className="flex w-fit mt-1">
      {categories.map((key) => (
        <CheckButton
          key={key}
          isSelected={!!curCategories && curCategories?.includes(key)}
          id={key}
          onClick={onCategory}
        >
          <span>#</span>
        </CheckButton>
      ))}
    </div>
  );
};

export default CateCheckButtons;
