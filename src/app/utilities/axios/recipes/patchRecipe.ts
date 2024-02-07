import { RecipeType } from "@/app/types";
import axios from "axios";

export async function patchRecipe(recipe: RecipeType) {
  const baseUrl = window.location.origin;
  const result: { data: { recipe: RecipeType } } = await axios.put(
    `${baseUrl}/api/recipes/`,
    recipe
  );
  return result.data;
}
