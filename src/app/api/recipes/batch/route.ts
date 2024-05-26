import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { RecipeType } from "@/app/types";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const client = await ClientPromise();
  const recipe = client.model("recipe", recipeSchema);
  const data: string[] = await request.json();
  console.log(data);
  const recipeIds = data.map((x) => x);

  const recipes = await recipe
    .find({ _id: { $in: recipeIds }, published: true })
    .sort({ createdAt: -1 })
    .exec();

  try {
    return NextResponse.json({ recipes: recipes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}