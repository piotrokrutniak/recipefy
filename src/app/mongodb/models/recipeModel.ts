import { Schema } from "mongoose";

export const recipeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    summary: String,
    rating: Number,
    thumbnailUrl: String,
    imageUrl: String
})