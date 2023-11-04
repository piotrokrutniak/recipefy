import { ingredientSchema } from "@/app/mongodb/models/ingredientModel";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    const client = await ClientPromise();
    const ingredient = client.model("ingredient", ingredientSchema);

    try {
        const result = await ingredient.findById(params.id);
        return NextResponse.json({ ingredient: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }){
    const client = await ClientPromise();
    const ingredient = client.model("ingredient", ingredientSchema);

    try {
        const result = await ingredient.findByIdAndDelete(params.id);
        return NextResponse.json({ deletedRecipeIngredient: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }