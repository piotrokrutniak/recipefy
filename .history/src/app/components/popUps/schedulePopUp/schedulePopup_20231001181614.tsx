import Button from "@/app/components/generic/button";
import { useState } from "react";
import { BsArrowClockwise, BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

export default function SchedulePopup({setPopUpOpen, popupOpen, date, setDate} : {setPopUpOpen: any; popupOpen: boolean; date: string; setDate: any}){
    const [isSaved, setSaved] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)
    const [ingredientData, setIngredientData] = useState({
        __id: "",
        name: "",
        vegan: false,
        vegetarian: false,
    })



    async function Save(){
        setSaved(true)
        setPopUpOpen(false)
    }

    function Discard(){
        if(discardStarted){
            setPopUpOpen(false)
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    return(
        <div className="w-full text-base h-full bg-black/60 backdrop-blur-sm flex absolute top-0 left-0 justify-center">
            <div className="w-96 h-fit mt-32 rounded-lg shadow-md shadow-black/40 overflow-hidden bg-black">
                <div className="w-full flex gap-2 flex-col p-10 h-full bg-slate-700/20">
                    <h2 className="font-semibold text-2xl mb-5">Schedule Publication</h2>
                    <h3>Publication Date</h3>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="outline-none bg-slate-500/40 focus:bg-slate-500/50 p-3 rounded-lg mb-5"/>
                    <div className="flex flex-row-reverse gap-2">
                        <Button className={`${date ? "bg-green-500/70 hover:bg-green-500/90 active:opacity-80" : "bg-slate-500/70 cursor-not-allowed hover:opacity-80"} text-sm font-normal py-1 transition-all flex items-center gap-2`}
                            onClick={() => Save()}
                            disabled={date? false : true}> 
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