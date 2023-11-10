import { ReactNode } from "react";

export default function FullScreenPopup({ children, className }: { children: ReactNode, className?: string }){
    return(
        <div className="w-full text-base h-full bg-black/60 flex fixed top-0 left-0 justify-center place-items-center z-20">
            <div className={`${className ?? ""} w-96 h-fit rounded-lg shadow-md shadow-black/40 bg-coal-900`}>
                <div className="w-full rounded-lg flex gap-2 flex-col p-10 h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}