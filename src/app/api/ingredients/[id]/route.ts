import { ingredientSchema } from "@/app/mongodb/models/ingredientModel";
import { ClientPromise } from "@/app/utilities/mongodb/mongoClient";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, { params }: { params: { id: string } }){
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