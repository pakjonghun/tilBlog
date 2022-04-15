import { NextPage } from "next";
import { joinStyleClass } from "@libs/server/util";

interface props {
  isSelected: boolean;
  id: string;
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const CheckButton: NextPage<props> = ({
  isSelected = 1,
  id,
  children,
  onClick,
}) => {
  return (
    <label
      className={joinStyleClass(
        "flex flex-row-reverse items-center justify-center py-2 scale cursor-pointer transition select-none",
        !isSelected ? "text-gray-400" : "text-gray-600"
      )}
      htmlFor={id}
    >
      <input onClick={onClick} type="checkbox" value={id} hidden id={id} />
      {id.toUpperCase()}
      {children}
    </label>
  );
};

export default CheckButton;
