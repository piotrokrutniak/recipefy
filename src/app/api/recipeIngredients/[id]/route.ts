import { recipeIngredientSchema } from "@/app/mongodb/models/recipeIngredientModel";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const client = await ClientPromise();
  const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);

  try {
    const result = await recipeIngredient.findById(params.id);
    return NextResponse.json({ ingredient: result }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const client = await ClientPromise();
  const recipeIngredient = client.model("recipeIngredient", recipeIngredientSchema);

  try {
    const result = await recipeIngredient.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedRecipeIngredient: result }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
