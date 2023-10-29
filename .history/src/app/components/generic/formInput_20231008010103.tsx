export default function FormInput({className, label, type, defaultValue, minValue, placeholder, onChange, onBlur, onFocus, inputClassName, messageClassName, validationResult, validationMessage}:{
    className?: string;
    label?: string;
    type?: string;
    defaultValue?: string;
    minValue?: string | number;
    placeholder?: string;
    onChange?: (value: any) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    inputClassName?: string;
    messageClassName?: string;
    validationResult?: boolean;
    validationMessage?: string;
}){
    function handleChange(value: string){
        return onChange ? onChange(value) : undefined 
    }
    function handleBlur(){
        return onBlur ? onBlur() : undefined 
    }
    function handleFocus(){
        return onFocus ? onFocus() : undefined 
    }


    return(
        <div className={`${className ?? ""} flex flex-col relative`}>
            <div className={`${label ? "" : "hidden"} p-2 text-xl}`} >
                {label || ""}
            </div>
            <input type={type || "text"} defaultValue={defaultValue || ""} placeholder={placeholder ?? ""}
                min={minValue}
                onChange={(e) => handleChange(e.target.value)} 
                onBlur={() => handleBlur()} 
                onFocus={() => handleFocus()}
                className={`${inputClassName ?? ""} p-3 w-full text-base rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent focus:border-sky-100/50
                transition-all`}/>
                

                {validationResult ? <></> : 
                <div className="-bottom-6 bg-red-200">
                    <h3 className={`${messageClassName ?? ""} text-vermilion-400 text-base flex flex-row-reverse absolute right-0`}>{validationMessage}</h3>
                </div>}
                
        </div>
    )
}