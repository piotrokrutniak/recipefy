import { Schema } from "mongoose";
import { ingredientSchema } from "./ingredientModel";

export const recipeSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true
    },
    published: Boolean || undefined,
    title: String,
    summary: String,
    cookTime: {
      prep: Number,
      idle: Number
    },
    vegan: Boolean,
    vegetarian: Boolean,
    rating: Number,
    thumbnailUrl: String,
    imageUrl: String,
    ingredients: [ingredientSchema]
  },
  {
    timestamps: true
  }
);
