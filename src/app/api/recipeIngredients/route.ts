import { ingredientSchema } from "@/app/mongodb/models/ingredientModel";
import { recipeIngredientSchema } from "@/app/mongodb/models/recipeIngredientModel";
import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { RecipeIngredientType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const client = await ClientPromise();
    const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);
    
    const url = new URL(request.url ?? "");
    const page = Number.parseInt(url.searchParams.get("page") || "") || 1;
    const limit = Number.parseInt(url.searchParams.get("limit") || "") || 10;
    const matches = url.searchParams.get("matches") || "";
    
    const regex = matches == "" ? ".*" : `.*${matches}*.`;
    const resultsCount = await recipeIngredient.find({desc: { $regex: new RegExp(regex) }}).count().exec();
    const recipeIngredients = await recipeIngredient.find({desc: { $regex: new RegExp(regex) }}).skip((page - 1) * limit).limit(limit).exec();

    return NextResponse.json({ recipeIngredients: recipeIngredients, resultsCount: resultsCount }, { status: 200 });
}

export async function POST(request: NextRequest){
    const data: RecipeIngredientType = await request.json();
    const client = await ClientPromise();
    const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);

    const recipe = client.model("recipe", recipeSchema);
    const ingredient = client.model("ingredient", ingredientSchema);

    const recipeCheck = await recipe.findById(data.recipeId)
    const ingredientCheck = await ingredient.findById(data.ingredientId)

    if(recipeCheck && ingredientCheck){
        try {
            const result = await recipeIngredient.create(data)
            return NextResponse.json({ recipeIngredient: { _id: result._id, ...data } }, { status: 200 });
        } catch (error: any) {
            console.log(error.message)
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    }
    else
    {
        const validation: string[] = [];

        recipeCheck || validation.push("Invalid recipeId.");
        ingredientCheck || validation.push("Invalid ingredientId.");
        return NextResponse.json({ errors: validation }, { status: 400 });
    }


}

export async function PATCH(request: NextRequest){
    const data: RecipeIngredientType = await request.json();
    const client = await ClientPromise();
    const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);

    const recipe = client.model("recipe", recipeSchema);
    const ingredient = client.model("ingredient", ingredientSchema);

    const recipeCheck = await recipe.findById(data.recipeId)
    const ingredientCheck = await ingredient.findById(data.ingredientId)

    if(recipeCheck && ingredientCheck){
        try {
            const result = await recipeIngredient.findByIdAndUpdate(data._id, data, { new: true })
            return NextResponse.json({ recipeIngredient: { _id: result?._id, ...data } }, { status: 200 });
        } catch (error: any) {
            console.log(error.message)
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    }
    else
    {
        const validation: string[] = [];

        recipeCheck || validation.push("Invalid recipeId.");
        ingredientCheck || validation.push("Invalid ingredientId.");
        return NextResponse.json({ errors: validation }, { status: 400 });
    }
}