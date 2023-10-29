export default function FormInput({...props}){
    return(
        <div className={`${props.className ?? ""} flex flex-col relative`}>
            <div className={`${props.label ? "" : "hidden"} p-2 text-xl}`} >
                {props.label || ""}
            </div>
            <input type={props.type || "text"} defaultValue={props.defaultValue || ""} placeholder={props.placeholder ?? ""}
                onChange={(e) => props.onChange(e.target.value)} 
                onBlur={() => props.onBlur()} 
                onFocus={() => props.onFocus()}
                className={`${props.inputClassName ?? ""} p-3 w-full text-base rounded-lg outline-none bg-slate-500/40 focus:bg-slate-500/50 border-2 border-transparent focus:border-sky-100/50
                transition-all`}/>
            {props.validationResult ? <></> : <h3 className={`${props.messageClassName ?? ""} text-vermilion-400 text-base flex flex-row-reverse`}>{props.validationMessage}</h3>}
        </div>
    )
}