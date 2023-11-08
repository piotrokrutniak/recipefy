import { Schema } from "mongoose";

// TODO: Remove and move to recipe model

export const recipeIngredientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    recipeId: Schema.Types.ObjectId,
    ingredientId: Schema.Types.ObjectId,
    measurements: [String],
})