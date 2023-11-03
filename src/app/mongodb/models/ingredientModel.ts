import { Schema } from "mongoose";

export const ingredientSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    vegan: Boolean,
    vegetarian: Boolean
})