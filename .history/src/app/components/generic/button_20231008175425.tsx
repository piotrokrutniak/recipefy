import { MouseEventHandler } from "react";

export default function Button({ children, className, onClick, disabled = false } : { children: React.ReactNode, className?: string, onClick: undefined | MouseEventHandler<HTMLButtonElement>, disabled?: boolean }){
    return(
        <button className={`${className} ${disabled || "bg-slate-400 cursor-not-allowed"} p-3 rounded-lg bg-blue-500 bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 cursor-pointer transition-all flex items-center gap-2 place-items-center`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}