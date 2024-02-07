import { MouseEventHandler } from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  onClick,
  disabled = false,
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: undefined | MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      // className={`${className} ${!disabled ? "bg-blue-500 cursor-pointer" : "bg-slate-400 cursor-not-allowed"} p-3 rounded-lg bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 transition-all flex items-center gap-2 place-items-center`}
      className={clsx([
        className,
        !disabled ? "bg-blue-500 cursor-pointer" : "bg-slate-400 cursor-not-allowed",
        "p-3 rounded-lg bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 transition-all flex justify-center items-center gap-2 place-items-center"
      ])}
      onClick={
        onClick ??
        (() => {
          return;
        })
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
