"use client";
import Button from "@/app/components/generic/button";
import FormInput from "@/app/components/generic/formInput";
import { IngredientType, RecipeIngredientType, RecipeType } from "@/app/types";
import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { FaPlus, FaPlusCircle, FaSave } from "react-icons/fa";
import TextArea from "@/app/components/generic/textArea";
import { useOutsideAlerter } from "@/app/utilities/hooks/useOutsideAlerter";
import FullScreenPopup from "@/app/components/popUps/schedulePopUp/fullScreenPopup";
import { BsX } from "react-icons/bs";
import { ParseDate } from "@/app/utilities/globalMethods";

export const RecipeContext = createContext<{recipe: RecipeType, setRecipe: Dispatch<SetStateAction<RecipeType>>} | undefined>(undefined);

export function useRecipeContext(){
    const setDeletePopUp = useContext(RecipeContext)
    if(setDeletePopUp === undefined){
        throw new Error("useRecipeContext must be used with RecipeContext.")
    }

    return setDeletePopUp
}

export default function AddRecipePage({params}: {params: { id: string } }){
    const [recipe, setRecipe] = useState<RecipeType>({
        title: "",
        summary: "",
        desc: "",
        rating: 0,
        thumbnailUrl: "",
        imageUrl: "",
        ingredients: []
    });

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);
    //const [ingredients, setIngredients] = useState<RecipeIngredientType[]>([]);
    const router = useRouter();

    

    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
        getRecipe(params.id)
            .then(x => {
                setRecipe(x.recipe);
            })
            .catch((error) =>{
                setError(error);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
    }, [recipe]);

    async function getRecipe(id: string){
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/recipes/' + id,
        })
        return result.data
    }

    function setSummary(value: string){
        if(recipe){
            setRecipe({...recipe, summary: value})
        }
    }

    function setTitle(value: string){
        if(recipe){
            setRecipe({...recipe, title: value})
        }
    }

    function setDesc(value: string){
        if(recipe){
            setRecipe({...recipe, desc: value})
        }
    }

    function submitAction(e: FormEvent){
        e.preventDefault();
        setLoading(true);
        if(validated){
            patchRecipe()
                .then(x => {
                    setLoading(false);
                    console.log(x);
                })
                .catch((error) =>{
                    setLoading(false);
                    setError(error);
                })
            }
    }

    async function patchRecipe(){
        const result: {data: {recipe: RecipeType}} = await axios.put('http://localhost:3000/api/recipes/', recipe)

        return result.data
    }

    function removeIngredient(index: number){
        recipe.ingredients.splice(index, 1)
        setRecipe({...recipe})
    }

    // TODO: Remove and move to recipe model

    return( 
        <>
        <RecipeContext.Provider value={{recipe: recipe, setRecipe: setRecipe}}>
            <form id="admin-recipe-view-section" className='max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6' onSubmit={(e) => submitAction(e)}>
                <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
                    {
                        // TODO: Add toggle for updated ande created date section on mobile
                    }
                    <h1 className="text-2xl font-semibold pl-4">Edit Recipe</h1>
                    <div className="flex flex-col gap-2">
                        <h2 className="opacity-70">{params.id}</h2>
                        <p className="flex whitespace-nowrap justify-between ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Updated:</span> {recipe?.updatedAt ? ParseDate(recipe?.updatedAt) : "Unknown"} </p>
                        <p className="flex whitespace-nowrap justify-between ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Created:</span> {recipe?.createdAt ? ParseDate(recipe?.createdAt) : "Unknown"} </p>
                    </div>
                </div>
                <FormInput className="w-full max-w" onChange={setTitle} value={recipe?.title} placeholder="Start typing..." label="Title"/>
                <FormInput className="w-full max-w" onChange={setSummary} value={recipe?.summary} placeholder="Start typing..." label="Summary"/>
                <TextArea onChange={setDesc} value={recipe?.desc} placeholder="Start typing..." label="Instructions"/>
                <div className="">
                    <h2 className="text-xl font-semibold p-4">Ingredients</h2>
                    <ul className="flex flex-col gap-2 list-disc pl-4">
                    {recipe.ingredients.length > 0 ? recipe.ingredients.map((x, key) => <RecipeIngredient removeIngredient={() => removeIngredient(key)} ingredient={x} key={key}/>) : <p className="opacity-80">No ingredients added yet.</p>}
                    </ul>
                    <AddIngredient id={params.id} setIngredients={setRecipe}/>
                </div>
                <div className="flex justify-end place-items-center mt-4">
                    <Button disabled={!validated} className="flex gap-2 place-items-center"><FaSave className="w-5 h-5"/> Add </Button>
                </div>
            </form>
        </RecipeContext.Provider>
        </>
    )
}

function RecipeIngredient({ingredient, removeIngredient}: {
    ingredient: IngredientType; 
    removeIngredient: () => void;
}){
    return(
            <li className="flex gap-2">{ingredient.name} <BsX className="h-8 w-8 cursor-pointer active:opacity-70 hover:fill-red-500" onClick={removeIngredient}/></li>
    )
}

function AddIngredient({setIngredients, id}: {setIngredients: Dispatch<SetStateAction<RecipeType>>, id: string}){
    const [resultsOpen, setResultsOpen] = useState<boolean>(false);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [results, setResults] = useState<IngredientType[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientType>()
    const resultsRef = useRef(null);
    const [searchString, setSearchString] = useState<string>("");

    useOutsideAlerter(resultsRef, () => setResultsOpen(false));

    const {recipe, setRecipe} = useRecipeContext()

    useEffect(() => {
        GetIngredients(1, searchString)
            .then((x) => {
                console.log(x)
                setResults([...x.ingredients])
            })
    }, [searchString])

    async function GetIngredients(page: number, matches: string){
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/ingredients',
            params: {
                page: page ?? 1,
                matches: matches
            }
        })

        return result.data
    }

    function AddRecipeIngredient(){
        if(selectedIngredient?._id){
            //setIngredients(x => {"ingredients": [...x.ingredients, newIngredient], ...x}))
            setRecipe({...recipe, ingredients: [...recipe.ingredients, selectedIngredient]})
            setPopupOpen(false)
            setResultsOpen(false)
            setSelectedIngredient(undefined)
        }
    }

    return(
       
        <>
            <div className="flex flex-col">
                <Button className="mt-8 w-fit" onClick={() => setPopupOpen(true)}> <FaPlusCircle/> Add Ingredient </Button>
            </div>
            {popupOpen &&
            <FullScreenPopup className="relative">
                <BsX className="absolute top-2 right-2 h-10 w-10 cursor-pointer active:opacity-70 hover:fill-red-500" onClick={() => setPopupOpen(false)}/>
                <h1 className="font-bold text-xl mb-4">Add Ingredient</h1>
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
                <Button className="mt-6 w-fit ml-auto mr-0" onClick={() => AddRecipeIngredient()}> <FaPlusCircle/> Save </Button>
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