"use client";
import Button from "@/app/components/generic/button";
import FormInput from "@/app/components/generic/formInput";
import { IngredientType, RecipeType } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import TextArea from "@/app/components/generic/textArea";
import { BsX } from "react-icons/bs";
import { GetDateTime, ParseDate, ParseDateTime } from "@/app/utilities/globalMethods";
import { RecipeContext, useRecipeContext } from "@/app/components/functionalities/recipes/recipeContext";
import { patchRecipe } from "@/app/utilities/axios/recipes/patchRecipe";
import { getRecipe } from "@/app/utilities/axios/recipes/getRecipe";
import { AddIngredient } from "@/app/components/functionalities/recipes/addRecipeIngredient";
import { putRecipeDetails } from "@/app/utilities/axios/recipes/details/putDetails";
import { getRecipeDetails } from "@/app/utilities/axios/recipes/details/getDetails";

import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Tiptap from "@/app/components/generic/tipTap/tipTapEditor";

export default function AddRecipePage({params}: {params: { id: string } }){
    const [recipe, setRecipe] = useState<RecipeType>({
        title: "",
        summary: "",
        recipeDetails: {
            _id: params.id,
            desc: "",
            recipeId: params.id,
        },
        rating: 0,
        thumbnailUrl: "",
        imageUrl: "",
        ingredients: []
    });

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
        getRecipe(params.id)
            .then(x => {
                return {...x.recipe, recipeDetails: recipe.recipeDetails }
                //setRecipe({...tempRecipe});
            })
            .then(tempRecipe => {
                getRecipeDetails(params.id).then( x => {
                    tempRecipe.recipeDetails = x.recipeDetails ?? tempRecipe.recipeDetails
                    setRecipe({...tempRecipe});
                })
            })
            .catch((error) =>{
                setError(error);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
    }, [recipe]);
    
    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
    }, [loading]);
    

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

    function submitAction(e: FormEvent){
        e.preventDefault();
        setLoading(true);
        setError(undefined);
        if(validated){
            patchRecipe(recipe)
                .then(x => {
                    console.log(x);
                })
                .then(() => {
                    putRecipeDetails(recipe.recipeDetails)
                })
                .catch((error) =>{
                    setLoading(false);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                    setRecipe(recipe => ({...recipe, updatedAt: GetDateTime()}))
                })
            }
    }

    function removeIngredient(index: number){
        recipe.ingredients.splice(index, 1)
        setRecipe({...recipe})
    }

    return( 
        <>
        <RecipeContext.Provider value={{recipe: recipe, setRecipe: setRecipe}}>
            <form id="admin-recipe-view-section" className='max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6' onSubmit={(e) => submitAction(e)}>
                <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
                    {
                        // TODO: Add toggle for updated ande created date section on mobile
                    }
                    <h1 className="text-2xl font-semibold sm:pl-4">Edit Recipe</h1>
                    <div className="flex flex-col gap-2">
                        <h2 className="opacity-70">{params.id}</h2>
                        <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Updated:</span> {recipe?.updatedAt ? ParseDate(recipe?.updatedAt) : "Unknown"} </p>
                        <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Created:</span> {recipe?.createdAt ? ParseDate(recipe?.createdAt) : "Unknown"} </p>
                    </div>
                </div>
                <FormInput className="w-full max-w" onChange={setTitle} value={recipe?.title} placeholder="Start typing..." label="Title"/>
                <FormInput className="w-full max-w" onChange={setSummary} value={recipe?.summary} placeholder="Start typing..." label="Summary"/>
                <div className="w-full relative">
                    <h2 className="text-xl font-semibold px-2 sm:px-4 py-4">Ingredients</h2>
                    <ul className="flex flex-wrap gap-2">
                    { recipe.ingredients.length > 0 ? 
                        recipe.ingredients.map((x, key) => <RecipeIngredient removeIngredient={() => removeIngredient(key)} ingredient={x} key={key}/>) : 
                        <p className="opacity-80">No ingredients added yet.</p> 
                    }
                    </ul>
                    <AddIngredient id={params.id} setIngredients={setRecipe}/>
                </div>
                <InstructionsEditor/>
                
                
                <div className="flex justify-between place-items-center mt-4">
                    { recipe?.updatedAt && <div id="saved-status" className="opacity-70"> Last saved at: {ParseDateTime(recipe?.updatedAt)}</div> }
                    <Button disabled={!validated} className="flex flex-end gap-2 place-items-center">
                        {loading ? 
                        <><FaSpinner className="w-5 h-5 animate-spin"/> Saving </> : 
                        <><FaSave className="w-5 h-5"/> Save </>}
                    </Button>
                </div>
            </form>
        </RecipeContext.Provider>
        </>
    )
}

// function TipTapEditor(){
//     const extensions = [
//         StarterKit,
//       ]
      
//       const content = '<p>Hello World!</p>'

//     return(
//         <div className="bg-[#3d4756] focus:bg-[#404a5b] p-3 rounded-lg min-h-screen-1/3 h-64">

//             <EditorProvider extensions={extensions} content={content}>
//                 <FloatingMenu>This is the floating menu</FloatingMenu>
//                 <BubbleMenu>This is the bubble menu</BubbleMenu>
//             </EditorProvider>
//         </div>
//     )
// }

// function InstructionsEditor(){
//     const {recipe, setRecipe} = useRecipeContext();

//     function setDesc(value: string){
//         if(recipe){
//             setRecipe({...recipe, recipeDetails: {...recipe.recipeDetails, desc: value}})
//         }
//     }

//     return(
//         <TextArea onChange={setDesc} value={recipe?.recipeDetails.desc ?? ""} inputClassName="min-h-screen-1/3 h-64" placeholder="Start typing..." label="Instructions"/>
//     )
// }

function InstructionsEditor(){
    const {recipe, setRecipe} = useRecipeContext();

    function setDesc(value: string){
        if(recipe){
            setRecipe({...recipe, recipeDetails: {...recipe.recipeDetails, desc: value}})
        }
    }

    return(
        recipe.recipeDetails.desc && <Tiptap setValue={setDesc} defaultValue={recipe?.recipeDetails.desc ?? ""} className="min-h-screen-1/3 h-64" />
    )
}


function RecipeIngredient({ingredient, removeIngredient}: {
    ingredient: IngredientType; 
    removeIngredient: () => void;
}){
    return(
            <li className="flex gap-2 place-items-center bg-slate-50/20 py-1 px-3 w-auto shrink-0 rounded-lg flex-nowrap">{ingredient.name} <BsX className="h-8 w-8 shrink-0 cursor-pointer active:opacity-70 hover:fill-red-500" onClick={removeIngredient}/></li>
    )
}

