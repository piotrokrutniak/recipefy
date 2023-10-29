export default function TextArea({label, value = "", placeholder, inputClassName, onChange}:{
    label?: string; 
    value: string; 
    placeholder?: string; 
    inputClassName?: string;
    onChange: (value: string) => void
    }){
    return(
        <div className="flex flex-col w-full">
            <div className="p-2 text-xl">
                {label || ""}
            </div>
            <textarea onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder ?? ""}
                className={`${inputClassName ?? ""} resize-none h-32 p-4 w-full rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent focus:border-sky-100/50`}/>
        </div>
    )
}