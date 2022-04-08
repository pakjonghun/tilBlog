import { joinStyleClass } from "@libs/server/util";
import { NextPage } from "next";
import React from "react";

interface props {
  sort?: string[];
  id: string;
  onSort: (event: React.MouseEvent) => void;
}

const CheckButton: NextPage<props> = ({ sort, id, onSort }) => {
  return (
    <li>
      <label
        className={joinStyleClass(
          "block scale cursor-pointer transition select-none w-fit",
          sort?.includes(id) ? "text-gray-400" : "text-gray-50"
        )}
        htmlFor={id}
      >
        <input onClick={onSort} type="checkbox" value={id} hidden id={id} />
        {id.toUpperCase()}
      </label>
    </li>
  );
};

export default CheckButton;
