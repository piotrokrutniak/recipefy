"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { BsX } from "react-icons/bs";
import { FaSearch, FaAngleDown } from "react-icons/fa";

export default function SearchBar({ initialValue }: { initialValue?: string }) {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [value, setValue] = useState(initialValue ?? "");
  function ToggleDropdownOpened() {
    setDropdownOpened((x) => !x);
  }

  return (
    <div className="bg-slate-500/40 rounded-lg flex pl-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in">
      <FaSearch className="fill-slate-50/40" />
      <input
        type="text"
        placeholder="Szukaj przepisów"
        className="bg-transparent p-3 pl-0 text-white w-full outline-none text-lg border-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/recipes?matches=${value}`;
          }
        }}
      />
    </div>
  );
}

function DropdownOption({
  setChosenOption,
  toggleDropdownOpened,
  text,
  chosenOption
}: {
  setChosenOption: Dispatch<SetStateAction<string>>;
  toggleDropdownOpened: () => void;
  text: string;
  chosenOption: string;
}) {
  const [isChecked, setIsChecked] = useState(false);

  function UnCheck(): void {
    setChosenOption("");
    setIsChecked(false);
  }

  function Check(): void {
    setChosenOption(text);
    toggleDropdownOpened();
    setIsChecked(true);
  }

  return (
    <div
      className={`${chosenOption == text ? "bg-black/30 font-bold" : ""} hover:bg-slate-100/10 px-3 py-2 flex justify-between`}
    >
      <div className="w-full" onClick={() => Check()}>
        {text}
      </div>
      <div className="flex">
        {chosenOption == text ? <UncheckButton onClick={UnCheck} /> : <></>}
      </div>
    </div>
  );
}

function UncheckButton({ onClick }: { onClick: () => void }) {
  return (
    <BsX
      className="w-6 h-6 hover:fill-red-500 hover:scale-110 active:scale-100"
      onClick={() => onClick()}
    />
  );
}
