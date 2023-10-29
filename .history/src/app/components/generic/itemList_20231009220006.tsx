import { FaAngleUp } from "react-icons/fa";

function ItemList({children, title, arrayLength}:{children?: React.ReactNode; title: string; arrayLength: number}){
    return(
        <div className="flex flex-col gap-4 p-4 md:p-8 bg-slate-500/20">
            <h1 className="text-xl p-1 font-bold flex justify-between place-items-center">
                {title}
            </h1>
            {arrayLength > 0 && 
            <ul className="grid gap-4 grid-auto-fit-md">
                {children}
            </ul>}
        </div>
    )
}