"use client";
import Button from "@/app/components/generic/button";
import { IngredientType, RecipeType } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import { FaBan, FaEdit, FaEgg, FaFish, FaLeaf } from "react-icons/fa";
import { GetDateTime, ParseDate } from "@/app/utilities/globalMethods";
import { RecipeContext } from "@/app/components/functionalities/recipes/recipeContext";
import { patchRecipe } from "@/app/utilities/axios/recipes/patchRecipe";
import { getRecipe } from "@/app/utilities/axios/recipes/getRecipe";
import { putRecipeDetails } from "@/app/utilities/axios/recipes/details/putDetails";
import { getRecipeDetails } from "@/app/utilities/axios/recipes/details/getDetails";
import parse from 'html-react-parser';
import Link from "next/link";

export default function AddRecipePage({params}: {params: { id: string } }){
    const [recipe, setRecipe] = useState<RecipeType>({
        title: "",
        summary: "",
        cookTime: {
            prep: 0,
            idle: 0
        },
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
                return {...x.recipe, recipeDetails: recipe.recipeDetails};
            })
            .then(tempRecipe => {
                getRecipeDetails(params.id).then( x => {
                    tempRecipe.recipeDetails = x.recipeDetails ?? "<p></p>";
                    setRecipe({...tempRecipe});
                })
            })
            .catch((error) =>{
                setError(error);
                setLoading(false);  
            });
    }, []);

    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
    }, [recipe]);
    
    useEffect(() => {
        setValidated(recipe.title.length > 0 && recipe.summary.length > 0)
    }, [loading]);
    
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
            <main id="recipe-view" className='max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6' onSubmit={(e) => submitAction(e)}>
                <section id="header-section" className="flex flex-col xs:flex-row justify-between gap-2">
                    <h1 className="text-lg xs:text-xl flex font-semibold place-items-center gap-1">
                        <Link href={"/admin/"} className="w-fit opacity-80 hover:opacity-100">
                            Admin Panel
                        </Link>
                        <Link href={"/admin/recipes/"} className="w-fit opacity-80 hover:opacity-100">
                            / Recipes
                        </Link>
                        / View Recipe 
                    </h1>
                    <Link href={"/admin/recipes/edit/" + params.id} className="w-fit">
                        <Button className="text-base !p-2 font-normal"> <FaEdit/> Edit</Button> 
                    </Link>
                </section>
                <section id="summary-section" className="flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
                        {
                            // TODO: Add toggle for updated and created date section on mobile
                        }
                        <div className="flex flex-col gap-2 w-fit ml-auto mr-0">
                            <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Updated:</span> {recipe?.updatedAt ? ParseDate(recipe?.updatedAt) : "Unknown"} </p>
                            <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44"> <span className="font-semibold">Created:</span> {recipe?.createdAt ? ParseDate(recipe?.createdAt) : "Unknown"} </p>
                        </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold flex max-xs:flex-col place-items-start">
                        <div className="flex">
                        {recipe.vegetarian && <div className="relative w-7 h-7 pt-1 shrink-0"><FaFish className="absolute p-1"/> <FaBan className="absolute fill-red-500"/> </div>}
                        {recipe.vegan && <div className="relative w-7 h-7 pt-1 shrink-0"><FaEgg className="absolute p-1"/> <FaBan className="absolute fill-red-500"/> </div>}
                        </div>
                        {recipe?.title}
                    </h2>
                    <p className="text-lg">{recipe?.summary}</p>
                    <div className="flex flex-col gap-2">
                        <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-44"> <span className="font-semibold"> Prep Time:</span> {recipe?.cookTime.prep} minutes </p>
                        <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-44"> <span className="font-semibold"> Idle Time:</span> {recipe?.cookTime.idle} minutes </p>
                    </div>
                </section>
                <section id="ingredients-section">
                    <div className="w-full relative">
                        <h2 className="text-xl font-semibold px-2 sm:px-4 py-4">Ingredients</h2>
                        <ul className="flex flex-wrap gap-2">
                        { recipe.ingredients.length > 0 ? 
                            recipe.ingredients.map((x, key) => <RecipeIngredientView removeIngredient={() => removeIngredient(key)} ingredient={x} key={key}/>) : 
                            <p className="opacity-80">No ingredients added yet.</p> 
                        }
                        </ul>
                    </div>
                </section>
                <section id="instructions-section">
                    <div>
                        <h2 className="text-xl font-semibold px-2 sm:px-4 py-4">Instructions</h2>
                        {parse(recipe.recipeDetails.desc || "<p className='opacity-80'>Nic tu nie ma.</p>")}
                    </div>
                </section>
            </main>
        </RecipeContext.Provider>
        </>
    )
}

function RecipeIngredientView({ingredient, removeIngredient}: {
    ingredient: IngredientType; 
    removeIngredient: () => void;
}){
    return(
            <li className="flex gap-2 place-items-center bg-slate-50/20 py-1 px-3 w-auto shrink-0 rounded-lg flex-nowrap">{ingredient.name} </li>
    )
}

