import { RecipeDetailsType } from "@/app/types";
import axios from "axios";

export async function putRecipeDetails(recipeDetails: RecipeDetailsType) {
  const result: { data: { recipeDetails: RecipeDetailsType } } = await axios.put(
    "http://localhost:3000/api/recipes/" + recipeDetails.recipeId + "/details",
    recipeDetails
  );
  return result.data;
}
