import { MouseEventHandler } from "react";

export default function Button({ children, className, onClick, disabled = false } : { children: React.ReactNode, className?: string, onClick: undefined | MouseEventHandler<HTMLButtonElement>, disabled?: boolean }){
    return(
        <button className={`${className} ${!disabled ? "bg-blue-500 cursor-pointer" : "bg-slate-400 cursor-not-allowed"} p-3 rounded-lg bg-opacity-90 active:bg-opacity-80 hover:bg-opacity-100 transition-all flex items-center gap-2 place-items-center`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}