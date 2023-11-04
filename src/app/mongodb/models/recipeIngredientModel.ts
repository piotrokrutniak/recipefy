import { Schema } from "mongoose";

export const recipeIngredientSchema = new Schema({
    _id: Schema.Types.ObjectId,
    recipeId: Schema.Types.ObjectId,
    ingredientId: Schema.Types.ObjectId,
    measurements: [String],
})