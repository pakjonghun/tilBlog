import { useCallback } from "react";
import { useRouter } from "next/router";
import { makeUrl } from "@libs/server/util";
import CheckButton from "@components/CheckButton";

const CateCheckButtons = () => {
  const categories = ["til", "algo"];
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

      if (!url) return;

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
    <div
      style={{
        gridTemplateColumns: `repeat(${categories.length},min-content)`,
      }}
      className="grid gap-3"
    >
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
