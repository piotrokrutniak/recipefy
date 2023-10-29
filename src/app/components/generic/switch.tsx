import { Dispatch, SetStateAction, useState } from "react"

export default function Switch({value = false, setValue, className = "", label, switchColor}: {
    value?: boolean | undefined | void; 
    setValue: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void); 
    className?: string | undefined; 
    label?: string | undefined;
    switchColor?: string | undefined
}){
    return(
        <div className={`${className} flex flex-col relative w-fit gap-1 justify-center items-end shrink-0 text-white`}>
            <div className="relative right-0">{label ?? ""}</div>
            <button className={`h-fit mr-0 w-12 p-1 shrink-0 rounded-xl cursor-pointer bg-slate-500/50 flex items-center`} onClick={() => setValue(!value)}>
                <div className={` ${value ? "w-10" : "w-5"} w-10 items-center relative flex h-5 transition-all group`}>
                    <div className="w-full ml-1 rounded-md h-3 bg-sky-200/30 "></div>
                    <div className={` ${value ? switchColor ?? "bg-blue-500 " : "bg-white"} group-active:opacity-80 w-5 h-5 absolute right-0 rounded-xl transition-all shadow-sm shadow-black/50`}></div>
                </div>
            </button>
        </div>
    )
}