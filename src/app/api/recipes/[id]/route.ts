import { recipeSchema } from "@/app/mongodb/models/recipeModel";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    const client = await ClientPromise();
    const recipe = client.model("recipe", recipeSchema);

    try {
        const result = await recipe.findById(params.id);
        return NextResponse.json({ ingredient: result }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }