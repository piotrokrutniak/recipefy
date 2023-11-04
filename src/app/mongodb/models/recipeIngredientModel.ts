import { Schema } from "mongoose";

export const recipeIngredientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    recipeId: Schema.Types.ObjectId,
    ingredientId: Schema.Types.ObjectId,
    measurements: [String],
})