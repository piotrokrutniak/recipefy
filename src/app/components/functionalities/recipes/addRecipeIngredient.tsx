import { RecipeType, IngredientType } from "@/app/types";
import { getIngredients } from "@/app/utilities/axios/ingredients/getIngredients";
import { useOutsideAlerter } from "@/app/utilities/hooks/useOutsideAlerter";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { BsX } from "react-icons/bs";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import Button from "../../generic/button";
import FormInput from "../../generic/formInput";
import FullScreenPopup from "../../popUps/schedulePopUp/fullScreenPopup";
import { useRecipeContext } from "./recipeContext";
import Link from "next/link";

export function AddIngredient({setIngredients, id}: {setIngredients: Dispatch<SetStateAction<RecipeType>>, id: string}){
    const [resultsOpen, setResultsOpen] = useState<boolean>(false);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IngredientType[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientType>()
    const resultsRef = useRef(null);
    const [searchString, setSearchString] = useState<string>("");

    useOutsideAlerter(resultsRef, () => setResultsOpen(false));

    const {recipe, setRecipe} = useRecipeContext()

    useEffect(() => {
        getIngredients(1, searchString)
            .then((x) => {
                console.log(x)
                setResults([...x.ingredients])
            })
    }, [searchString])

    

    function AddRecipeIngredient(){
        if(selectedIngredient?._id){
            setRecipe({...recipe, ingredients: [...recipe.ingredients, selectedIngredient]})
            setPopupOpen(false)
            setResultsOpen(false)
            setSelectedIngredient(undefined)
        }
    }

    return(
        <>
            <div className="flex justify-end">
                <Button className="mt-8 w-fit" onClick={() => setPopupOpen(true)}> <FaPlusCircle/> Add Ingredient </Button>
            </div>
            {popupOpen &&
            <FullScreenPopup className="relative">
                <BsX className="absolute top-2 right-2 h-10 w-10 cursor-pointer active:opacity-70 hover:fill-red-500" onClick={() => setPopupOpen(false)}/>
                <h1 className="font-bold text-xl mb-4 flex gap-2 place-items-center">
                    Add Ingredient
                    <Link href="/admin/ingredients/add/" target="_blank" className="w-fit flex gap-2 place-items-center rounded-lg font-normal text-base !p-2 bg-transparent border-2 border-solid border-white/40 hover:border-white active:opacity-80 transition-all">
                            <FaPlusCircle/> Create
                    </Link>
                </h1>
                {selectedIngredient ? 
                <div className="flex flex-col">
                <div className="p-2"> Selected Ingredient </div>
                <div className="p-2 bg-coal-400 rounded-lg flex justify-between place-items-center"> 
                    {selectedIngredient.name} <BsX className="h-8 w-8 cursor-pointer active:opacity-70 hover:fill-red-500" onClick={() => setSelectedIngredient(undefined)}/>
                </div>
                </div> :
                
                <div className="flex flex-col relative" ref={resultsRef}>
                    <FormInput value={searchString} onChange={setSearchString} onFocus={() =>setResultsOpen(true)} className="w-full" label="Search Ingredients" placeholder="Start typing..."/>
                    <div className={`${resultsOpen ? "h-44 border-sky-100/50" : "h-0 border-none"} border-2 transition-all w-full bg-[#3d4756] rounded-lg absolute top-24 overflow-y-scroll`}>
                        {results.length ? 
                        results?.map((x, key) => <IngredientListing setIngredient={setSelectedIngredient} ingredient={x} key={key}/>) :
                        <div className="p-2"> No matching results. </div> }
                    </div>
                </div>}
                <Button className="mt-6 w-fit ml-auto mr-0" onClick={() => AddRecipeIngredient()}> <FaPlusCircle/> Add </Button>
            </FullScreenPopup>}
        </>
    )
}

function IngredientListing({ingredient, setIngredient}: {
    ingredient: IngredientType; 
    setIngredient: Dispatch<SetStateAction<IngredientType | undefined>>}){

    return(
        <li className="p-2 hover:bg-coal-900 cursor-pointer" onClick={() => setIngredient(ingredient)}>
            {ingredient.name}
        </li>
    )
}