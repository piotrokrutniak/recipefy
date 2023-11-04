export type FileOrUndefined = File | undefined;

export type RecipeType = {
    _id?: string,
    title: string,
    summary: string,
    rating: number,
    thumbnailUrl: string,
    imageUrl: string
}

export type IngredientType = {
    _id?: string,
    name: string,
    vegan: boolean,
    vegetarian: boolean
}

export type RecipeIngredientType = {
    _id?: string,
    recipeId: string,
    ingredientId: string,
    measurements: string[],
}