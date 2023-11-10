import { RecipeType } from "@/app/types"
import axios from "axios"

export async function patchRecipe(recipe: RecipeType){
    const result: {data: {recipe: RecipeType}} = await axios.put('http://localhost:3000/api/recipes/', recipe)
    return result.data
}