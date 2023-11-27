export type FileOrUndefined = File | undefined;

interface AuditableType {
    createdAt?: string,
    updatedAt?: string,
}

export type RecipeType = AuditableType & {
    _id?: string,
    title: string,
    summary: string,
    cookTime: {
        prep: number,
        idle: number
    },
    vegan?: boolean,
    vegetarian?: boolean,
    recipeDetails: RecipeDetailsType,
    rating: number,
    thumbnailUrl: string,
    imageUrl: string,
    ingredients: IngredientType[]
}

export type IngredientType = AuditableType & {
    _id?: string,
    name: string,
    vegan: boolean,
    vegetarian: boolean,
}

export type RecipeIngredientType = AuditableType & {
    _id?: string,
    recipeId: string,
    ingredientId: string,
    desc: string,
    measurements: string[],
}

export type RecipeDetailsType = AuditableType & {
    _id?: string,
    recipeId: string,
    desc: string
}