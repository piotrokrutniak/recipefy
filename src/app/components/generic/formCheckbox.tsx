export default function FormCheckbox({className, label, value = false, updateValue, inputClassName}: {
    className?: string,
    label?: string,
    defaultValue?: boolean,
    value: boolean,
    updateValue: (value: boolean) => void,
    inputClassName?: string
}){
    function Toggle(value: boolean){
        updateValue(value)
    }

    console.log(value)

    return(
        <div className={`${className ?? ""} flex flex-row gap-2 justify-between place-items-center`}>
            <div className={`${label ? "" : "hidden"} py-1 text-xl}`} >
                {label || ""}
            </div>
            <input type="checkbox" checked={value} onClick={() => Toggle(!value)}
                className={`${inputClassName ?? ""} h-6 w-5 rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent cursor-pointer focus:border-sky-100/50
                transition-all`}/>
        </div>
    )
}