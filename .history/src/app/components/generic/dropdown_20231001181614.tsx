import { Dispatch, SetStateAction, useState } from "react"
import { BsX } from "react-icons/bs"

export default function DropdownOption({setChosenOption, toggleDropdownOpened, text, chosenOption} : {setChosenOption: Dispatch<SetStateAction<string>>, toggleDropdownOpened: () => void, text: string, chosenOption: string}){
    const [isChecked, setIsChecked] = useState(false)

    function UnCheck(): void{
        setChosenOption("")
        setIsChecked(false)
    }

    function Check(): void{
        setChosenOption(text)
        toggleDropdownOpened()
        setIsChecked(true)
    }

    return(
        <div className="border-b-2 border-solid border-white/25 py-2 flex justify-between">
                <div className="w-full" onClick={() => Check()}>
                    {text}
                </div>
                <div className="flex">
                    {chosenOption == text ? <UncheckButton onClick={UnCheck}/> : <></>}
                </div>
                 
        </div>
    )
}

function UncheckButton({onClick} : {onClick: () => void}){
    return(
    <BsX className="w-6 h-6 hover:fill-red-500 hover:scale-110 active:scale-100" onClick={() => onClick()}/>
    )
}