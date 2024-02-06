import { RecipeType } from "@/app/types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const RecipeContext = createContext<
  { recipe: RecipeType; setRecipe: Dispatch<SetStateAction<RecipeType>> } | undefined
>(undefined);

export function useRecipeContext() {
  const setDeletePopUp = useContext(RecipeContext);
  if (setDeletePopUp === undefined) {
    throw new Error("useRecipeContext must be used with RecipeContext.");
  }

  return setDeletePopUp;
}
