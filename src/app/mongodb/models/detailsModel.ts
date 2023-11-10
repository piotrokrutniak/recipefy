import { Schema } from "mongoose";

// TODO: Make recipeId detail's id as well

export const recipeDetailsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: false,
      },
    recipeId: Schema.Types.ObjectId,
    desc: String
  }, 
  {
    timestamps: true
  }
)