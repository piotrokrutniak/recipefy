import { BsArrowClockwise, BsTrash } from "react-icons/bs"
import Button from "./button"
import { FaSave } from "react-icons/fa"
import { useState } from "react"

export default function FormPopup({children, headerText, setPopUpOpen, popupOpen, uploadFunction, className, triggerDiscard, triggerSave} : 
    { children: React.ReactNode, headerText: string, setPopUpOpen: any, popupOpen: boolean, uploadFunction: any, className: string, triggerDiscard: () => void | undefined, triggerSave: () => void | undefined}){
    const [isSaved, setSaved] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)

    function Discard(){
        if(discardStarted){
            setPopUpOpen(false)
            if(triggerDiscard != undefined){
                triggerDiscard()
            }
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    function Save(){
        setSaved(true)
        triggerSave()
        setPopUpOpen(false)
        setSaved(false)
    }

    return(
        <div className={`w-full text-base h-full bg-black/60 backdrop-blur-sm flex absolute top-0 left-0 justify-center`}>
            <div className={`${className ?? ""} h-fit mt-32 rounded-lg shadow-md shadow-black/40 overflow-hidden bg-black`}>
                <div className="w-full flex gap-2 flex-col p-10 h-full bg-slate-700/20">
                    <h2 className="font-semibold text-2xl mb-5">{headerText}</h2>
                    {children}
                    <div className="flex flex-row-reverse gap-2 mt-6">
                        <Button className="bg-green-500/70 hover:bg-green-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                            onClick={() => Save()}> 
                            {isSaved ? <>Saving <BsArrowClockwise className="animate-spin h-4 w-4"/></> : <>Save <FaSave/></>}
                        </Button>
                        <Button className={`${discardStarted ? "hover:bg-vermilion-500/90 bg-vermilion-500/80" : "bg-slate-700/40 hover:bg-vermilion-500/90"} 
                            active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2`}
                            onClick={() => Discard()}> 
                            {discardStarted ? <> Are you sure? <BsTrash/></> : <>Discard <BsTrash/></>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}