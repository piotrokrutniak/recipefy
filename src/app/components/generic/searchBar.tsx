"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { BsX } from "react-icons/bs"
import { FaSearch, FaAngleDown } from "react-icons/fa"

export default function SearchBar(){
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [chosenOption, setChosenOption] = useState("")
    
    function ToggleDropdownOpened(){
        setDropdownOpened(x => !x)
    }

    return(
        <div className="bg-slate-500/40 rounded-lg flex pl-5 gap-2 items-center focus-within:bg-slate-500/50 transition-colors ease-in">
            <FaSearch className="fill-slate-50/40"/>
            <input type="text" placeholder="Search for a recipe" className="bg-transparent p-5 pl-0 text-white w-full outline-none text-lg border-none"/>

            <div className="flex text-slate-50 cursor-pointer border-l-2 pl-3 border-white/20 relative">
                <div className="flex opacity-40 hover:opacity-60 active:opacity-40 transition-opacity" onClick={() => ToggleDropdownOpened()}>

                {chosenOption || "Category"}
                <FaAngleDown className={`${dropdownOpened ? "rotate-180" : ""} fill-slate-50 w-10 h-6 transition-all`}/>
                </div>

                <div className={`${dropdownOpened ? "block" : "hidden"} absolute top-14 right-0 h-44 w-56 bg-black rounded-lg overflow-hidden`}>
                    <div className="w-full h-full bg-slate-500/50 overflow-y-auto pt-0">
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Breakfast"/>
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Lunch"/>
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Dessert"/>
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Dinner"/>
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Appetizer"/>
                        <DropdownOption toggleDropdownOpened={ToggleDropdownOpened} setChosenOption={setChosenOption} chosenOption={chosenOption} text="Pastries"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DropdownOption({setChosenOption, toggleDropdownOpened, text, chosenOption} : 
    {setChosenOption: Dispatch<SetStateAction<string>>, toggleDropdownOpened: () => void, text: string, chosenOption: string}){
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
        <div className={`${chosenOption == text ? "bg-black/30 font-bold" : ""} hover:bg-slate-100/10 px-3 py-2 flex justify-between`}>
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