import { BsArrowClockwise } from "react-icons/bs";

export function LoadingPanel(){
    return(
        <div className="flex gap-2 select-none min-h-screen-1/2 place-items-center bg-black p-8 rounded-md justify-center"> 
            <p>Loading results</p> 
            <BsArrowClockwise className="animate-spin h-6 w-6"/> 
        </div>
    )
}