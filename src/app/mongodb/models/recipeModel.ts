import { Schema } from "mongoose";
import { IngredientType } from "@/app/types";
import { ingredientSchema } from "./ingredientModel";

export const recipeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    title: String,
    summary: String,
    rating: Number,
    thumbnailUrl: String,
    imageUrl: String,
    ingredients: [ingredientSchema]
    },
    {
      timestamps: true
    }
  )