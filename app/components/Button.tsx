import React from "react";

type ButtonProps = {
  text: string;
  onClickHandler: () => Promise<void>;
};

export default function Button({ text, onClickHandler }: ButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className="border rounded-md px-3 py-1 hover:bg-stone-800"
    >
      {text}
    </button>
  );
}
