import { ingredientSchema } from "@/app/mongodb/models/ingredientModel";
import { IngredientType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await ClientPromise();
  const ingredient = client.model("ingredient", ingredientSchema);

  const url = new URL(request.url ?? "");
  const page = Number.parseInt(url.searchParams.get("page") || "") || 1;
  const limit = Number.parseInt(url.searchParams.get("limit") || "") || 10;
  const matches = url.searchParams.get("matches") || "";

  const regex = matches == "" ? ".*" : `.*${matches}*.`;
  const resultsCount = await ingredient
    .find({ name: { $regex: new RegExp(regex, "i") } })
    .count()
    .exec();
  const ingredients = await ingredient
    .find({ name: { $regex: new RegExp(regex, "i") } })
    .sort({ createdAt: "desc" })
    .sort({ createdAt: "desc" })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return NextResponse.json(
    { ingredients: ingredients, resultsCount: resultsCount },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const data: IngredientType = await request.json();

  const client = await ClientPromise();
  const ingredient = client.model("ingredient", ingredientSchema);

  try {
    const result = await ingredient.create(data);
    return NextResponse.json({ ingredient: { _id: result._id, ...data } }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const data: IngredientType = await request.json();
  const client = await ClientPromise();
  const ingredient = client.model("ingredient", ingredientSchema);

  try {
    const result = await ingredient.findByIdAndUpdate(data._id, data, { new: true });
    return NextResponse.json({ ingredient: result }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
