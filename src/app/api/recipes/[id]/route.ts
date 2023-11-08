import { recipeIngredientSchema } from "@/app/mongodb/models/recipeIngredientModel";
import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { RecipeIngredientType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.findById(params.id);
        return NextResponse.json({ recipe: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }){
    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.findByIdAndDelete(params.id);
        return NextResponse.json({ deletedRecipe: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

// TODO: Remove and move to recipe model

export async function PUT(request: NextRequest, { params }: { params: { id: string } }){
    const data: { ingredients: RecipeIngredientType[] } = await request.json()
    const client = await ClientPromise();
    const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);
    const recipeIngredients: any[] = [] 
    try {
        data.ingredients.forEach(ingredient => {
            recipeIngredients.push({
                ...ingredient, 
                recipeId: new Types.ObjectId(ingredient.recipeId),
                ingredientId: new Types.ObjectId(ingredient.ingredientId),
            })
        });
        const result = await recipeIngredient.findOneAndReplace(data);
        console.log(result);
        return NextResponse.json({ recipeIngredients: data }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
