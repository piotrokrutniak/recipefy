export default function TextArea({
  label,
  value = "",
  placeholder,
  className,
  inputClassName,
  onChange,
  onBlur,
  onFocus
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}) {
  function handleChange(value: string) {
    return onChange ? onChange(value) : undefined;
  }
  function handleBlur() {
    return onBlur ? onBlur() : undefined;
  }
  function handleFocus() {
    return onFocus ? onFocus() : undefined;
  }

  return (
    <div className={`${className ?? ""} flex flex-col relative`}>
      <div className={`${label ? "" : "hidden"} p-2 text-xl}`}>{label || ""}</div>
      <textarea
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        placeholder={placeholder ?? ""}
        onBlur={() => handleBlur()}
        onFocus={() => handleFocus()}
        className={`${inputClassName ?? ""} resize-none h-32 p-4 w-full rounded-lg outline-none bg-[#3d4756] focus:bg-[#404a5b] border-2 border-transparent focus:border-sky-100/50`}
      />
    </div>
  );
}
