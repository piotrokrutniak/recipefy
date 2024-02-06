export default function FormInput({
  className,
  label,
  type,
  value,
  minValue,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  inputClassName,
  messageClassName,
  validationResult,
  validationMessage
}: {
  className?: string;
  label?: string;
  type?: string;
  value?: string;
  minValue?: string | number;
  placeholder?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  inputClassName?: string;
  messageClassName?: string;
  validationResult?: boolean;
  validationMessage?: string;
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
      <div className={`${label ? "" : "hidden"} p-2`}>{label || ""}</div>
      <input
        type={type || "text"}
        placeholder={placeholder ?? ""}
        min={minValue}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => handleBlur()}
        onFocus={() => handleFocus()}
        className={`${inputClassName ?? ""} p-3 w-full text-base rounded-lg outline-none bg-[#3d4756] focus:bg-[#404a5b] border-2 border-transparent focus:border-sky-100/50
                transition-all`}
      />

      {validationResult ? (
        <></>
      ) : (
        <div className="-bottom-6 bg-red-200">
          <h3
            className={`${messageClassName ?? ""} text-vermilion-400 text-base flex flex-row-reverse absolute right-0`}
          >
            {validationMessage}
          </h3>
        </div>
      )}
    </div>
  );
}
