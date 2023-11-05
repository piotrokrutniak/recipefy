import { Schema } from "mongoose";

export const ingredientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    name: String,
    vegan: Boolean,
    vegetarian: Boolean,
  }, 
  {
    timestamps: true
  }
)