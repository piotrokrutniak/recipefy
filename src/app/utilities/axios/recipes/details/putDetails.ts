import { RecipeDetailsType } from "@/app/types";
import axios from "axios";

export async function putRecipeDetails(recipeDetails: RecipeDetailsType) {
  const baseUrl = window.location.origin;
  const result: { data: { recipeDetails: RecipeDetailsType } } = await axios.put(
    `${baseUrl}/api/recipes/` + recipeDetails.recipeId + "/details",
    recipeDetails
  );
  return result.data;
}
