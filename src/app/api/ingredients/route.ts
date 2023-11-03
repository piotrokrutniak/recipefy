import { ingredientSchema } from "@/app/mongodb/models/ingredientModel";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest){
    const client = await ClientPromise();
    const ingredient = client.model("ingredient", ingredientSchema);
    
    const url = new URL(request.url ?? "");
    const page = Number.parseInt(url.searchParams.get("page") || "") || 1;
    const limit = Number.parseInt(url.searchParams.get("limit") || "") || 10;
    const matches = url.searchParams.get("matches") || "";
    
    const regex = matches == "" ? ".*" : `.*${matches}*.`;
    const resultsCount = await ingredient.find({name: { $regex: new RegExp(regex) }}).count().exec();
    const ingredients = await ingredient.find({name: { $regex: new RegExp(regex) }}).skip((page - 1) * limit).limit(limit).exec();

    return NextResponse.json({ ingredients: ingredients, resultsCount: resultsCount }, { status: 200 });
}