import Button from "@/app/components/generic/button";
import { ReactNode, useState } from "react";
import { BsArrowClockwise, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

export default function SchedulePopup({setPopUpOpen, children} : {setPopUpOpen: any; children: ReactNode}){
    return(
        <div className="w-full text-base h-full bg-black/60 backdrop-blur-sm flex absolute top-0 left-0 justify-center">
            <div className="w-96 h-fit mt-32 rounded-lg shadow-md shadow-black/40 overflow-hidden bg-black">
                <div className="w-full flex gap-2 flex-col p-10 h-full bg-slate-700/20">
                    {children}
                </div>
            </div>
        </div>
    )
}