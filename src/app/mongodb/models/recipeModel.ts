import { Schema } from "mongoose";

export const recipeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    title: String,
    summary: String,
    rating: Number,
    thumbnailUrl: String,
    imageUrl: String
})