import { recipeDetailsSchema } from "@/app/mongodb/models/detailsModel";
import { recipeIngredientSchema } from "@/app/mongodb/models/recipeIngredientModel";
import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { RecipeDetailsType, RecipeIngredientType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// TODO: Implement nested route for the recipe details

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const client = await ClientPromise();
  const recipeDetails = client.model("recipeDetails", recipeDetailsSchema);

  try {
    const result = await recipeDetails.findById(params.id);
    return NextResponse.json({ recipeDetails: result }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const data: RecipeDetailsType = await request.json();
  const client = await ClientPromise();
  const recipeDetails = client.model("recipeDetails", recipeDetailsSchema);
  try {
    const result = await recipeDetails.replaceOne({ _id: data.recipeId }, data, { upsert: true });
    console.log(data);
    return NextResponse.json({ recipeDetails: result }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
