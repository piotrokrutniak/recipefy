import clsx from "clsx";

export function SectionWrapper({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section 
      id={id}
      className={clsx([
        className, 
        "max-w-7xl bg-slate-500/30 mx-auto w-full p-2 sm:p-4 md:p-8 sm:rounded-xl shadow-md shadow-black/40 relative flex flex-col flex-1"
      ])}
    >
      {children}
    </section>
  );
}