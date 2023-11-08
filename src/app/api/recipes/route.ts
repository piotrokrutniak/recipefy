import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { RecipeType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);
    
    const url = new URL(request.url ?? "");
    const page = Number.parseInt(url.searchParams.get("page") || "") || 1;
    const limit = Number.parseInt(url.searchParams.get("limit") || "") || 10;
    const matches = url.searchParams.get("matches") || "";
    
    const regex = matches == "" ? ".*" : `.*${matches}*.`;
    const resultsCount = await recipe.find({title: { $regex: new RegExp(regex) }}).count().exec();
    const recipes = await recipe.find({title: { $regex: new RegExp(regex) }}).skip((page - 1) * limit).limit(limit).exec();

    return NextResponse.json({ recipes: recipes, resultsCount: resultsCount }, { status: 200 });
}

export async function POST(request: NextRequest){
    const data: RecipeType = await request.json()

    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.create(data)
        return NextResponse.json({recipe: { _id: result._id, ...data} }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function PATCH(request: NextRequest){
    const data = await request.json()

    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.findByIdAndUpdate(data._id, data, { new: true })
        return NextResponse.json({ recipe: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest){
    const data = await request.json()

    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.findByIdAndUpdate(data._id, data, { new: true })
        return NextResponse.json({ recipe: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}