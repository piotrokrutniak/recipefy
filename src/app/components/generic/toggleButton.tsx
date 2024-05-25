import clsx from "clsx";
import { useState } from "react";

export const SimpleToggle = ({ initialValue, updateMethod }: { initialValue: boolean, updateMethod: (value: boolean) => void }) => {
  const [value, setValue] = useState<boolean | undefined>(undefined);
  const handleToggle = () => {
    const newValue = !value;
    setValue(newValue);
    updateMethod(newValue);
  };  
  
  return (
    <button onClick={handleToggle} className="bg-slate-700 w-full max-w-[48px] p-2 rounded-lg relative text-white">
      <div className={clsx([
        "w-6 h-6 rounded-full absolute transition-transform duration-300 ease-in-out -top-[4px]",
        value ?? initialValue ? "bg-indigo-500 right-0" : "bg-slate-400 left-0",
      ])} />
    </button>
  );
};