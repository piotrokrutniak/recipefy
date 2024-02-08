import { MouseEventHandler } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function LinkButton({
  children,
  className,
  href
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      className={clsx([
        className,
        "bg-blue-500 cursor-pointer",
        "p-3 rounded-lg bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 transition-all flex justify-center items-center gap-2 place-items-center"
      ])}
      href={href}
    >
      {children}
    </Link>
  );
}
